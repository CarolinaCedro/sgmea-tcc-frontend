import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Equipamento} from "../../../model/equipamento";
import {HttpService} from "../../utis/http/services/http.service";
import {forkJoin, Observable, of, pipe} from "rxjs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {EquipamentoFilter} from "../filter/equipamento-filter/equipamento-filter.component";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {request} from "express";
import {SrQuery} from "../../utis/http/criteria";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService extends AbstractRestService<Equipamento> {


  constructor(http: HttpService) {
    super(Equipamento, `${environment.apiUrl}/api/sgmea/v1/equipamento`, http)
  }

  protected getNameOfService(): string {
    return "EquipamentoService";
  }




  list(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<Equipamento>> {
    return of([query])
      .pipe(
        map(() => this.buildServiceUrl(`${environment.apiUrl}/api/sgmea/v1/equipamento/allEquipamentosActive`)),
        mergeMap(url =>
          this.http
            .createRequest()
            // .usingLog(this.log)
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            .url(url)
            .get()
            .pipe(
              map((result) => this.deserializeListResource(result)),
              catchError((err) => throwErrorMessage(err))
            )
        )
      );
  }

  getAllEquipamentosInactive(): Observable<any> {
    return this.http.createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .url(`${environment.apiUrl}/api/sgmea/v1/equipamento/allEquipamentoIsNotActive`)
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, Equipamento))
      );
  }

  inactiveEquipamento(equipamento: string): Observable<any> {
    return this.http.createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .url(`${environment.apiUrl}/api/sgmea/v1/equipamento/inative/${equipamento}`)
      .post()
      .pipe(
        take(1),
        map(result => result)
      );
  }

  listAdvanced(filter: EquipamentoFilter | string): Observable<ListResource<Equipamento>> {
    const request = this.http.createRequest()
      // .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/equipamento/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("nome", (filter as EquipamentoFilter).nome)
      }
    } else {
      request.url(filter as string);
    }
    return request.acceptJsonOnly()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, Equipamento))
      );

  }
}
