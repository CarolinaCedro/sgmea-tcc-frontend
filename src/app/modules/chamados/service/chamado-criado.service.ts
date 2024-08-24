import {inject, Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {HttpService} from "../../utis/http/services/http.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {LocalStorageService} from "../../utis/localstorage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChamadoCriadoService extends AbstractRestService<ChamadoCriado> {


  constructor(http: HttpService) {
    super(ChamadoCriado, "api/sgmea/v1/chamado", http)
  }

  protected getNameOfService(): string {
    return "ChamadoCriadoService";
  }

  getChamadosEncerrados(): Observable<any> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorage.getItem(this.TOKEN))
      .usingLog(this.log)
      .url("api/sgmea/v1/chamado/chamados-encerrados")
      .get()
      .pipe(
        map((result) => {
          console.log("os results service", result)
          let list = this.deserializeListResource(result)
          console.log("a list depois do deserializer", list)
          return list;
        }),
        catchError((err) => throwErrorMessage(err, this.log)),
      )

  }
}
