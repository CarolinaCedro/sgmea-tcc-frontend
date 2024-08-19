import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ChamadoAtribuidoService extends AbstractRestService<ChamadoAtribuido> {

  constructor(http: HttpService) {
    super(ChamadoAtribuido, "/api/sgmea/v1/chamado", http)
  }

  protected getNameOfService(): string {
    return "ChamadoAtribuidoService";
  }
}

