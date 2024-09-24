import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Equipamento} from "../../../model/equipamento";
import {HttpService} from "../../utis/http/services/http.service";
import {Observable} from "rxjs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {EquipamentoFilter} from "../filter/equipamento-filter/equipamento-filter.component";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService extends AbstractRestService<Equipamento> {


  constructor(http: HttpService) {
    super(Equipamento, "/api/sgmea/v1/equipamento", http)
  }

  protected getNameOfService(): string {
    return "EquipamentoService";
  }

  listAdvanced(filter: EquipamentoFilter | string): Observable<ListResource<Equipamento>> {
    const request = this.http.createRequest()
      .usingLog(this.log);
    if (!isString(filter)) {
      request.url("/api/sgmea/v1/equipamento/list-advanced");
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
      )
      ;

  }
}
