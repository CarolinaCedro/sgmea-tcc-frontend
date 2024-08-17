import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Equipamento} from "../../../model/equipamento";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService extends AbstractRestService<Equipamento> {


  constructor(http: HttpService) {
    super(Equipamento, "/api/sgmea/v1/equipamento", http)
  }

  protected getNameOfService(): string {
    return "EquipamentoService";
  }
}
