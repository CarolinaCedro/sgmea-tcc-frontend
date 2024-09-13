import {inject, Injectable} from '@angular/core';
import {AbstractRestService} from "../../utis/http/services/abstract-rest.service";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {HttpService} from "../../utis/http/services/http.service";
import {forkJoin, Observable} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {throwErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {LocalStorageService} from "../../utis/localstorage/local-storage.service";
import {PathVariable} from "../../utis/http/services/model-service.interface";
import {Funcionario} from "../../../model/funcionario";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {FuncionarioService} from "../../funcionario/service/funcionario.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";

@Injectable({
  providedIn: 'root'
})
export class ChamadoCriadoService extends AbstractRestService<ChamadoCriado> {


  constructor(http: HttpService, private equipamentoService: EquipamentoService, private funcionarioService: FuncionarioService) {
    super(ChamadoCriado, "api/sgmea/v1/chamado", http)
  }

  protected getNameOfService(): string {
    return "ChamadoCriadoService";
  }


  findByIdFully(id: any, pathVariable?: PathVariable): Observable<ChamadoCriado> {
    return super.findByIdFully(id, pathVariable)
      .pipe(
        mergeMap(chamado =>
          forkJoin([
            this.equipamentoService.findById(chamado?.equipamento?.id).pipe(map(equipamento => chamado.equipamento = equipamento)),
            this.funcionarioService.findById(chamado?.funcionario?.id).pipe(map(funcionario => chamado.funcionario = funcionario))

          ]).pipe(map(() => {
            return chamado;
          }))
        )
      );
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
