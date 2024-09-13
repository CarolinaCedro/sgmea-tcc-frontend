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
import {catchError, map, mergeMap} from "rxjs/operators";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";

@Injectable({
  providedIn: 'root'
})
export class PriorizacaoChamadoService extends AbstractRestService<ChamadoAtribuido> {

  constructor(http: HttpService, private gestorService: GestorService, private chamadoCriadoService: ChamadoCriadoService,
              private funcionarioService: FuncionarioService,
              private tecnicoService: TecnicoService
  ) {
    super(ChamadoCriado, "api/sgmea/v1/chamado/chamados-atribuidos", http)
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

  findByListOfChamadosAtribuidosFully(chamado: ChamadoAtribuido): Observable<ChamadoAtribuido> {
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



  getChamadosAtribuidos(): Observable<any> {
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


}
