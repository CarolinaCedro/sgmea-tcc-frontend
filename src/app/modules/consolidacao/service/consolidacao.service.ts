import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoConsolidado} from "../../../model/chamado-consolidado";
import {HttpService} from "../../utis/http/services/http.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {Observable, of} from "rxjs";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsolidacaoService extends AbstractRestService<ChamadoAtribuido> {

  constructor(http: HttpService) {
    super(ChamadoConsolidado, `${environment.apiUrl}/api/sgmea/v1/chamado/chamados-atribuidos`, http)
  }


  save(payload: any, pathVariable?: PathVariable): Observable<any> {
    return of(payload.observacaoConsolidacao).pipe(
      mergeMap(observacao =>
        this.http
          .createRequest()
          .setAuthToken(this.localStorage.getItem(this.TOKEN))
          // .usingLog(this.log)
          .url(this.buildServiceUrl(`${environment.apiUrl}/api/sgmea/v1/chamado/consolidacao-chamado`, pathVariable) + '/' + payload.id)
          .setHeader('Content-Type', 'text/plain')
          .put(observacao)
          .pipe(
            take(1),
            map((result) => result),
            catchError((err) => throwErrorMessage(err))
          )
      )
    );
  }


}
