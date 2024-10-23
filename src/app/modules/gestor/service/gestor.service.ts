import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Gestor} from "../../../model/gestor";
import {HttpService} from "../../utis/http/services/http.service";
import {GestorFilter} from "../filter/gestor-filter/gestor-filter.component";
import {Observable} from "rxjs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map, take} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GestorService extends AbstractRestService<Gestor> {

  constructor(http: HttpService) {
    super(Gestor, `${environment.apiUrl}/api/sgmea/v1/gestor`, http)
  }

  protected getNameOfService(): string {
    return "GestorService";
  }

  listAdvanced(filter?: GestorFilter | string): Observable<ListResource<Gestor>> {
    const request = this.http.createRequest()
      // .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/gestor/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("nome", (filter as GestorFilter).nome)
      }
    } else {
      request.url(filter as string);
    }
    return request.acceptJsonOnly()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, Gestor))
      )
      ;

  }
}
