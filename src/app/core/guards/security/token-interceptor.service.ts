import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AuthService} from "../../../modules/auth/service/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,
              private _snackBar: MatSnackBar
  ) {
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

          } else if (err.status === 403) {
            this.openSnackBar("Você não tem permissão para acessar esta página.");
          } else if (err.status === 404) {
            this.openSnackBar("Ops! Página não encontrada.");
            console.log("Ops! Página não encontrada.")
          } else if (err.status === 400) {
            this.openSnackBar("Solicitação inválida. Verifique os dados enviados.");
          } else if (err.status === 500) {
            this.openSnackBar("Erro interno no servidor. Tente novamente mais tarde.");
          } else if (err.status === 502) {
            this.openSnackBar("Erro de gateway. Tente novamente mais tarde.");
          } else if (err.status === 503) {
            this.openSnackBar("Serviço indisponível. Tente novamente mais tarde.");
          } else if (err.status === 504) {
            this.openSnackBar("Tempo de resposta do servidor esgotado. Tente novamente mais tarde.");
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
    this._snackBar.open(message, "Fechar");
  }

}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};

