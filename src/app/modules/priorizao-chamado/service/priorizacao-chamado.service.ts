import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {HttpService} from "../../utis/http/services/http.service";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {FuncionarioService} from "../../funcionario/service/funcionario.service";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {GestorService} from "../../gestor/service/gestor.service";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {serialize} from "class-transformer";
import {ListResource} from "../../utis/http/model/list-resource.model";

@Injectable({
  providedIn: 'root'
})
export class PriorizacaoChamadoService extends AbstractRestService<ChamadoAtribuido> {

  constructor(http: HttpService, private gestorService: GestorService, private chamadoCriadoService: ChamadoCriadoService,
              private funcionarioService: FuncionarioService,
              private tecnicoService: TecnicoService,
              private equipamentoService: EquipamentoService
  ) {
    super(ChamadoCriado, "api/sgmea/v1/chamado", http)
  }


  findByIdFully(id: any, pathVariable?: PathVariable): Observable<ChamadoAtribuido> {
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(chamado =>
          forkJoin([
            this.gestorService.findById(chamado?.gestor?.id).pipe(map(gestor => chamado.gestor = gestor)),
            this.tecnicoService.findById(chamado?.tecnico?.id).pipe(map(tecnico => chamado.tecnico = tecnico)),
            this.chamadoCriadoService.findById(chamado?.chamadoCriado?.id).pipe(map(chamadoCriado => chamado.chamadoCriado = chamadoCriado))
          ]).pipe(
            map(() => {
              console.log("aquiiiiiiii", chamado)
              return chamado
            })
          )
        )
      );
  }

  save(value: ChamadoAtribuido, pathVariable?: PathVariable): Observable<ChamadoAtribuido> {
    return of(serialize(value))
      .pipe(
        mergeMap(payload =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            .usingLog(this.log)
            .url(this.buildServiceUrl("api/sgmea/v1/chamado/atribuir-chamado", pathVariable))
            .post(payload)
            //pelo fato de ser um poste não se tem necessidade de se pegar a resposta
            //.map((res: Response) => res.json())
            .pipe(
              take(1),
              catchError((err) => throwErrorMessage(err, this.log)),
            ),
        ),
      );
  }


  findByListOfChamadosAtribuidosFully(chamado?: ChamadoAtribuido): Observable<ChamadoAtribuido> {
    console.log("Chamado recebido:", chamado);

    // Verificar se os IDs estão corretos
    console.log("Gestor ID:", chamado?.gestor?.id);
    console.log("Técnico ID:", chamado?.tecnico?.id);
    console.log("Chamado Criado ID:", chamado?.chamadoCriado?.id);

    return forkJoin([
      this.gestorService.findById(chamado?.gestor).pipe(map(gestor => chamado.gestor = gestor)),
      this.tecnicoService.findById(chamado?.tecnico).pipe(map(tecnico => chamado.tecnico = tecnico)),
      this.chamadoCriadoService.findById(chamado?.chamadoCriado).pipe(map(chamadoCriado => chamado.chamadoCriado = chamadoCriado))
    ]).pipe(
      map(() => {
        console.log("Chamado completo:", chamado);
        return chamado;
      })
    );
  }


  getChamadosAtribuidos(): Observable<ListResource<ChamadoAtribuido>> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .usingLog(this.log)
      .url("api/sgmea/v1/chamado/chamados-atribuidos")
      .get()
      .pipe(
        // mergeMap((chamados: any[]) => {
        //   return of(chamados);
        // }),
        catchError((err) => throwErrorMessage(err, this.log))
      );
  }

  getChamadosAtribuidosByTec(currentTecnico: string): Observable<ListResource<ChamadoAtribuido>> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .usingLog(this.log)
      .url(`api/sgmea/v1/chamado/chamados-atribuidos/byTecnico?currentTecnico=${currentTecnico}`)
      .get()
      .pipe(
        // mergeMap((chamados: any[]) => {
        //   return of(chamados);
        // }),
        catchError((err) => throwErrorMessage(err, this.log))
      );
  }


}
