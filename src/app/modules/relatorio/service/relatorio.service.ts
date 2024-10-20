import {Injectable} from '@angular/core';
import {RelatorioFilter} from "../filter/relatorio-filter/relatorio-filter.component";
import {HttpService} from "../../utis/http/services/http.service";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map, take, tap} from "rxjs/operators";
import {LocalStorageService} from "../../utis/localstorage/local-storage.service";
import {isNotNullOrUndefined} from "../../utis/utils";
import {Report} from "../relatorio-list/Report";
import {HttpObserve} from "../../utis/http/services/sr-media-type";
import {HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {


  public TOKEN: string = "token";
  private hasDataSubject = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpService, private localStorage: LocalStorageService) {

  }


  loadingReport(filter?: RelatorioFilter): Observable<Report> {
    console.log("os filtros", filter)
    const request = this.http.createRequest()
      .url(`${environment.apiUrl}api/sgmea/v1/chamado-report/generated-report`);
    if (isNotNullOrUndefined(filter)) {
      request.appendParamIfNotNullOrUndefined("nomeEquipamento", filter.nomeEquipamento)
        .appendParamDateIfNotNullOrUndefined("dataAbertura", filter.dataAbertura)
        .appendParamDateIfNotNullOrUndefined("dataFechamento", filter.dataFechamento)
    }

    return request
      .acceptPDFOnly() // Especifica que aceita apenas PDF como resposta
      .observe(HttpObserve.RESPONSE) // Observa a resposta completa (inclui status e headers)
      .setAuthToken(this.localStorage.getItem(this.TOKEN)) // Define o token de autenticação
      .get() // Envia a requisição GET
      .pipe(
        take(1), // Garante que o Observable seja completado após o primeiro valor
        tap((response: HttpResponse<Blob>) => {
          // Verifica se há dados retornados (status 204 significa sem conteúdo)
          const hasData = response.status !== 204;
          this.hasDataSubject.next(hasData);
          if (response.status === 204) {
            console.log("é 204 arquivo")
            return Report.newReportFrom(null); // Passa apenas o Blob e retorna um Report

          }
        }),
        map((response: HttpResponse<Blob>) => {
          // Cria um novo relatório a partir da resposta do Blob
          return Report.newReportFrom(response.body); // Passa apenas o Blob e retorna um Report
        }),
        catchError((error: any) => {
          console.error('Erro ao carregar o relatório:', error);
          return throwError(error); // Lança o erro para ser tratado pelo chamador
        })
      );
  }


}
