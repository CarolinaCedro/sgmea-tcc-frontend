import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService, public alert: MatSnackBar) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.grantAthority(request))
      .pipe(
        tap((event: HttpEvent<any>) => {
          //this.sr.show();
        }, (err: any) => {
          if (err.status === 401 || !this.auth.isLoged) {
            this.auth.logout();
            this.openSnackBar("Faça login para acessar esta página!")
            console.log("Não autorizado 401")
          } else if (err.status === 403) {
            this.openSnackBar("Você não tem permissão para acessar esta página.")
            console.log("Sem permissão 403")

          } else if (err.status === 404) {
            // this.alert.show({
            //     message: "Ops! Página não encontrada.",
            //     showIcon: true,
            //     type: "warn"
            // });
            console.log("Ops! Página não encontrada.")
          } else if (err.status === 400) {

            this.openSnackBar("Solicitação inválida. Verifique os dados enviados.")
            console.log("Solicitação invalida 400 erro de client")

          } else if (err.status === 500) {
            // this.alert.show({
            //     message: "Erro interno no servidor. Tente novamente mais tarde.",
            //     showIcon: true,
            //     type: "error"
            // });
          } else if (err.status === 502) {
            this.openSnackBar("Erro de gateway. Tente novamente mais tarde.")
          } else if (err.status === 503) {
            this.openSnackBar("Serviço indisponível. Tente novamente mais tarde.")
          } else if (err.status === 504) {
            this.openSnackBar("Tempo de resposta do servidor esgotado. Tente novamente mais tarde.")
          }
        })
      );
  }


  private grantAthority(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `${this.auth.toke.getToken()}`
      }
    });
  }


  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.alert.open(message, "Fechar", config);
  }
}
