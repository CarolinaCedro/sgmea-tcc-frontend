import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Especialidade} from "../../../model/especialidade";
import {HttpService} from "../../utis/http/services/http.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService extends AbstractRestService<Especialidade> {

  constructor(http: HttpService) {
    super(Especialidade, `${environment.apiUrl}/api/sgmea/v1/especialidade`, http)
  }

  protected getNameOfService(): string {
    return "EspecialidadeService";
  }
}
