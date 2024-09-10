import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Tecnico} from "../../../model/tecnico";
import {HttpService} from "../../utis/http/services/http.service";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {forkJoin, Observable} from "rxjs";
import {Funcionario} from "../../../model/funcionario";
import {map, mergeMap} from "rxjs/operators";
import {GestorService} from "../../gestor/service/gestor.service";

@Injectable({
  providedIn: 'root'
})
export class TecnicoService extends AbstractRestService<Tecnico> {


  constructor(http: HttpService, private gestorService: GestorService) {
    super(Tecnico, "/api/sgmea/v1/tecnico", http)
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


}
