import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoConsolidado} from "../../../model/chamado-consolidado";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ConsolidacaoService extends AbstractRestService<ChamadoConsolidado> {

  constructor(http: HttpService) {
    super(ChamadoConsolidado, "/api/sgmea/v1/chamado", http)
  }
}
