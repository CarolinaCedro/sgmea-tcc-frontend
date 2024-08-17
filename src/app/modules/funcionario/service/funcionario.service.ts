import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Funcionario} from "../../../model/funcionario";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends AbstractRestService<Funcionario> {

  constructor(http: HttpService) {
    super(Funcionario, "/api/sgmea/v1/funcionario", http)
  }

  protected getNameOfService(): string {
    return "FuncionarioService";
  }
}
