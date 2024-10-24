import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

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
          // Sucesso, aqui você pode tratar respostas positivas
        }),
        catchError((err: any) => {
          // Aqui você captura qualquer erro, incluindo erros de rede
          if (err.status === 0) {
            this.openSnackBar("Servidor offline ou problema de conexão.");
            console.log("Erro de rede ou servidor offline.");
          } else if (err.status === 401) {
            this.auth.logout();
            this.openSnackBar("Faça login para acessar esta página!");
            console.log("Não autorizado 401");
          } else if (err.status === 403) {
            this.openSnackBar("Você não tem permissão para acessar esta página.");
            console.log("Sem permissão 403");
          } else if (err.status === 404) {
            this.openSnackBar("Página não encontrada.");
            console.log("Ops! Página não encontrada.");
          } else if (err.status === 400) {
            this.openSnackBar("Solicitação inválida. Verifique os dados enviados.");
            console.log("Solicitação inválida 400.");
          } else if (err.status === 500) {
            this.openSnackBar("Erro interno no servidor.");
            console.log("Erro no servidor 500.");
          } else if (err.status === 502) {
            this.openSnackBar("Erro de gateway.");
            console.log("Erro de gateway 502.");
          } else if (err.status === 503) {
            this.openSnackBar("Serviço indisponível.");
            console.log("Serviço indisponível 503.");
          } else if (err.status === 504) {
            this.openSnackBar("Tempo de resposta do servidor esgotado.");
            console.log("Tempo de resposta esgotado 504.");
          }

          // Rejeita o erro para permitir que o fluxo de erros continue
          return throwError(err);
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
