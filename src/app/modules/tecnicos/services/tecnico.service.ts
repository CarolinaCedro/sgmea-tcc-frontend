import {Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {Tecnico} from "../../../model/tecnico";
import {HttpService} from "../../utis/http/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class TecnicoService extends AbstractRestService<Tecnico> {

  constructor(http: HttpService) {
    super(Tecnico, "/api/sgmea/v1/tecnico", http)
  }
}
