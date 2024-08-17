import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Especialidade} from "../../../model/especialidade";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService extends AbstractRestService<Especialidade> {

  constructor(http: HttpService) {
    super(Especialidade, "/api/sgmea/v1/especialidade", http)
  }

  protected getNameOfService(): string {
    return "EspecialidadeService";
  }
}
