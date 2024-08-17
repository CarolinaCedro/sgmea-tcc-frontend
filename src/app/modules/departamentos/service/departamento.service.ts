import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Departamento} from "../../../model/departamento";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends AbstractRestService<Departamento> {

  constructor(http: HttpService) {
    super(Departamento, "/api/sgmea/v1/departamento", http)
  }

  protected getNameOfService(): string {
    return "DepartamentoService";
  }
}
