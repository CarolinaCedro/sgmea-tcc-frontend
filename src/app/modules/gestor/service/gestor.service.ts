import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Gestor} from "../../../model/gestor";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class GestorService extends AbstractRestService<Gestor> {

  constructor(http: HttpService) {
    super(Gestor, "/api/sgmea/v1/gestor", http)
  }

  protected getNameOfService(): string {
    return "GestorService";
  }
}
