import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Tecnico} from "../../../model/tecnico";
import {HttpService} from "../../utis/http/services/http.service";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {forkJoin, Observable} from "rxjs";
import {Funcionario} from "../../../model/funcionario";
import {map, mergeMap, take} from "rxjs/operators";
import {GestorService} from "../../gestor/service/gestor.service";
import {TecnicoFilter} from "../filter/tecnico-filter/tecnico-filter.component";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {FuncionarioFilter} from "../../funcionario/filter/funcionario-filter/funcionario-filter.component";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TecnicoService extends AbstractRestService<Tecnico> {


  constructor(http: HttpService, private gestorService: GestorService) {
    super(Tecnico, `${environment.apiUrl}/api/sgmea/v1/tecnico`, http)
  }

  protected getNameOfService(): string {
    return "TecnicoService";
  }


  findByIdFully(id: any, pathVariable?: PathVariable): Observable<Tecnico> {
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(tecnico =>
          forkJoin([
            this.gestorService.findById(tecnico?.gestor?.id).pipe(map(gestor => tecnico.gestor = gestor)),

          ]).pipe(map(() => {
            return tecnico;
          }))
        )
      );
  }


  listAdvanced(filter?: TecnicoFilter | string): Observable<ListResource<Tecnico>> {

    const request = this.http.createRequest()
      .usingLog(this.log);
    if (!isString(filter)) {
      request.url(`${environment.apiUrl}/api/sgmea/v1/tecnico/list-advanced`);
      if (isNotNullOrUndefined(filter)) {
        request.appendParamIfNotNullOrUndefined("nome", (filter as TecnicoFilter).nome)
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
        map(result => this.deserializeListResource(result, Tecnico))
      )
      ;


  }
}
