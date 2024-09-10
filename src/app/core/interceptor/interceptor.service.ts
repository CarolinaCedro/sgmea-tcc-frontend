import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import * as console from "console";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private _snack = inject(MatSnackBar);

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status < 400) {
              //decidir de vai apitar ou não
            }

            if (event.status === 404) {
              console.log("Ops! Página não encontrada.")
            }
          }
        }, (err: any) => {
          if (err.status === 403) {
            //

          } else if (err.status === 401) {
            this.openSnackBar("Faça login para acessar esta página. | CODE: 401")

          } else if (err.status === 400) {

            this.openSnackBar("Solicitação inválida. Verifique os dados enviados.  | CODE: 400")


          } else if (err.status === 500) {
            this.openSnackBar("Erro interno no servidor. Tente novamente mais tarde. | CODE: 500")


          } else if (err.status === 502) {
            this.openSnackBar("Erro de gateway. Tente novamente mais tarde. | CODE: 502")
          } else if (err.status === 503) {

            this.openSnackBar("Serviço indisponível. Tente novamente mais tarde. | CODE: 503")


          } else if (err.status === 504) {

            this.openSnackBar("Tempo de resposta do servidor esgotado. Tente novamente mais tarde. | CODE: 504")

          }
        })
      );
  }

  openSnackBar(message: string) {
    this._snack.open(message, "Fechar");
  }


}
