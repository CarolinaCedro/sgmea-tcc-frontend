import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {HttpService} from "../../utis/http/services/http.service";
import {forkJoin, Observable} from "rxjs";
import {catchError, map, mergeMap, take, tap} from "rxjs/operators";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {FuncionarioService} from "../../funcionario/service/funcionario.service";
import {SrQuery} from "../../utis/http/criteria";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {ChamadoFilter} from "../filter/chamado-filter/chamado-filter.component";
import {HistoricoFilter} from "../../historico/filter/historico-filter/historico-filter.component";
import {GestorService} from "../../gestor/service/gestor.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChamadoCriadoService extends AbstractRestService<ChamadoCriado> {


  constructor(http: HttpService, private equipamentoService: EquipamentoService,
              private funcionarioService: FuncionarioService,
              private gestorFuncionario: GestorService
  ) {
    super(ChamadoCriado, `${environment.apiUrl}/api/sgmea/v1/chamado`, http)
  }

  protected getNameOfService(): string {
    return "ChamadoCriadoService";
  }


  findByIdFully(id: any, pathVariable?: PathVariable): Observable<ChamadoCriado> {
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(chamado =>
          forkJoin([
            this.equipamentoService.findById(chamado?.equipamento?.id).pipe(map(equipamento => chamado.equipamento = equipamento)),
            this.funcionarioService.findById(chamado?.funcionario?.id).pipe(map(funcionario => chamado.funcionario = funcionario))

          ]).pipe(map(() => {
            return chamado;
          }))
        )
      );
  }


  // listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<ChamadoCriado>> {
  //   return super.listFully(query, pathVariable)
  //     .pipe(
  //       mergeMap((result: ListResource<ChamadoCriado>) => {
  //         const chamadoCriado = result.records.filter(it => isNotNullOrUndefined(it) && isNotNullOrUndefined(it))
  //           .map(it => it);
  //         return forkJoin([
  //
  //           this.equipamentoService.findByIds(result.records.map(it => it.equipamento), result),
  //           this.funcionarioService.findByIds(result.records.map(it => it.funcionario), result),
  //         ]).pipe(
  //           map(() => result)
  //         );
  //       })
  //     );
  //
  // }


  listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<ChamadoCriado>> {
    return super.listFully(query, pathVariable)
      .pipe(
        mergeMap((result: ListResource<ChamadoCriado>) => {

          const funcionarios = result.records
            .filter(it => isNotNullOrUndefined(it.funcionario))
            .map(it => it.funcionario);

          const equipamentos = result.records
            .filter(it => isNotNullOrUndefined(it.equipamento))
            .map(it => it.equipamento);

          return forkJoin([
            this.funcionarioService.findByIds(result.records.map(it => it.funcionario), result),
            this.equipamentoService.findByIds(result.records.map(it => it.equipamento), result),
          ]).pipe(
            tap(() => console.log("tá desserializando não ?", result)),  // Use tap para logging
            map(res => this.deserializeListResource(res, ChamadoCriado))
          );
        })
      );
  }


  getChamadosEncerrados(): Observable<any[]> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      // .usingLog(this.log)
      .url(`${environment.apiUrl}/api/sgmea/v1/chamado/chamados-encerrados`)
      .get()
      .pipe(
        map((result: any) => {
            console.log("os results service", result);
            let list = this.deserializeListResource(result);
            console.log("a list depois do deserializer", list);

            // Retorna o array contido na propriedade records
            return list.records || [];
          },
          mergeMap((result: any) =>
            forkJoin([
              this.funcionarioService.findByIds(result.records.map(it => it.funcionario), result),
              this.equipamentoService.findByIds(result.records.map(it => it.equipamento), result),
            ]).pipe(
              map(() => this.deserializeListResource(result, ChamadoCriado))
            )
          )
        ),
        catchError((err) => throwErrorMessage(err)),
      );
  }

  listAdvanced(filter?: ChamadoFilter | string): Observable<ListResource<ChamadoCriado>> {

    const request = this.http.createRequest()
      // .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/chamado/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("titulo", (filter as ChamadoFilter).titulo)
      }
    } else {
      request.url(filter as string);
    }
    return request.acceptJsonOnly()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, ChamadoCriado)),
        mergeMap((result: ListResource<ChamadoCriado>) =>
          forkJoin([
            this.funcionarioService.findByIds(result.records.map(it => it.funcionario), result),
            this.equipamentoService.findByIds(result.records.map(it => it.equipamento), result),
          ]).pipe(
            map(() => this.deserializeListResource(result, ChamadoCriado))
          )
        )
      );

  }

  listAdvancedByConcluidos(filter?: HistoricoFilter | string): Observable<ListResource<ChamadoCriado>> {
    const request = this.http.createRequest()
      // .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/chamado/chamados-encerrados/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("titulo", (filter as ChamadoFilter).titulo)
      }
    } else {
      request.url(filter as string);
    }
    return request.acceptJsonOnly()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, ChamadoCriado))
      );
  }
}
