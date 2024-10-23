import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Departamento} from "../../../model/departamento";
import {HttpService} from "../../utis/http/services/http.service";
import {DepartamentoFilter} from "../filter/departamentos-filter/departamentos-filter.component";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends AbstractRestService<Departamento> {

  constructor(http: HttpService) {
    super(Departamento, `${environment.apiUrl}/api/sgmea/v1/departamento`, http)
  }

  protected getNameOfService(): string {
    return "DepartamentoService";
  }

  listAdvanced(filter?: DepartamentoFilter): Observable<ListResource<Departamento>> {
    const request = this.http.createRequest()
      // .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/departamento/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("nome", (filter as DepartamentoFilter).nome)
        // .appendParamDateIfNotNullOrUndefined("dtInicio", (filter as CicloFilter).dtInicio)
        // .appendParamDateIfNotNullOrUndefined("dtFinal", (filter as CicloFilter).dtFinal);
      }
    } else {
      request.url(filter as string);
    }
    return request.acceptJsonOnly()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .get()
      .pipe(
        take(1),
        map(result => this.deserializeListResource(result, Departamento))
      )
      ;

  }
}
