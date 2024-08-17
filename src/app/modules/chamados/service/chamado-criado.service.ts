import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ChamadoCriadoService extends AbstractRestService<ChamadoCriado> {


  constructor(http: HttpService) {
    super(ChamadoCriado, "/api/sgmea/v1/chamado-criado", http)
  }

  protected getNameOfService(): string {
    return "ChamadoCriadoService";
  }
}
