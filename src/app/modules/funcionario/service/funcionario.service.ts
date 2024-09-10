import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Funcionario} from "../../../model/funcionario";
import {HttpService} from "../../utis/http/services/http.service";
import {FuncionarioFilter} from "../filter/funcionario-filter/funcionario-filter.component";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {SrQuery} from "../../utis/http/criteria";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {forkJoin, Observable, of} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {isNotNullOrUndefined, isNullOrUndefined} from "../../utis/utils";
import {GestorService} from "../../gestor/service/gestor.service";
import {DepartamentoService} from "../../departamentos/service/departamento.service";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends AbstractRestService<Funcionario> {

  constructor(http: HttpService, private gestorService: GestorService, private departamentoService: DepartamentoService) {
    super(Funcionario, "/api/sgmea/v1/funcionario", http)
  }


  // listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<Funcionario>> {
  //   return super.listFully(query, pathVariable)
  //     .pipe(
  //       mergeMap((result: ListResource<Funcionario>) => {
  //         const gestor = result.records.filter(it => isNotNullOrUndefined(it.gestor) && isNotNullOrUndefined(it.gestor))
  //           .map(it => it.gestor);
  //         return forkJoin([
  //           this.gestorService.findByIds(gestor, gestor)
  //         ]).pipe(
  //           map(() => result)
  //         );
  //       })
  //     );
  //
  // }


  findByIdFully(id: any, pathVariable?: PathVariable): Observable<Funcionario> {
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(funcionario =>
          forkJoin([
            this.gestorService.findById(funcionario?.gestor?.id).pipe(map(gestor => funcionario.gestor = gestor)),
            this.departamentoService.findById(funcionario?.departamento?.id).pipe(map(departamento => funcionario.departamento = departamento))

          ]).pipe(map(() => {
            return funcionario;
          }))
        )
      );
  }


  listAdvanced(filter?: FuncionarioFilter | string): ListResource<Funcionario> {
    return null;

  }
}
