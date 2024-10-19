import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {HttpService} from "../../utis/http/services/http.service";
import {SrQuery} from "../../utis/http/criteria";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {forkJoin, Observable} from "rxjs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {map, mergeMap} from "rxjs/operators";
import {isNotNullOrUndefined} from "../../utis/utils";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";
import {GestorService} from "../../gestor/service/gestor.service";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {ChamadoCriado} from "../../../model/chamado-criado";

@Injectable({
  providedIn: 'root'
})
export class ChamadoAtribuidoService extends AbstractRestService<ChamadoAtribuido> {

  constructor(http: HttpService, private chamadoCriadoService: ChamadoCriadoService,
              private tecnicoService: TecnicoService,
              private gestorService: GestorService,
              private equipamentoService: EquipamentoService
  ) {
    super(ChamadoAtribuido, "api/sgmea/v1/chamado/chamados-atribuidos", http);
  }

  findByIdFully(id: any, pathVariable?: PathVariable): Observable<ChamadoAtribuido> {
    console.log("cai aqui ????")
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(chamado =>
          forkJoin([
            this.equipamentoService.findById(chamado?.chamadoCriado?.equipamento).pipe(map(equipamento => chamado.chamadoCriado.equipamento = equipamento)),
          ]).pipe(map(() => {
            console.log("tá desserializando não ?", chamado)
            return chamado;
          }))
        )
      );
  }

  listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<ChamadoAtribuido>> {
    return super.listFully(query, pathVariable)
      .pipe(
        mergeMap((result: ListResource<ChamadoAtribuido>) => {
          const chamadoCriado = result.records.filter(it => isNotNullOrUndefined(it.chamadoCriado.id) && isNotNullOrUndefined(it.chamadoCriado.id))
            .map(it => it.chamadoCriado);
          return forkJoin([
            this.chamadoCriadoService.findByIds(result.records.map(it => it.chamadoCriado), result),
            this.tecnicoService.findByIds(result.records.map(it => it.tecnico), result),
            this.gestorService.findByIds(result.records.map(it => it.gestor), result),
          ]).pipe(
            map(() => this.deserializeListResource(result,ChamadoAtribuido))
          );
        })
      );

  }
}
