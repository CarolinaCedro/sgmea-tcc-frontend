import {Injectable} from '@angular/core';
import {Token} from '../model/token';
import {JwtTokenService} from '../jwt/jwt-token.service';
import {HttpService} from '../../../utis/http/services/http.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {throwErrorMessage} from '../../../utis/http/model/exception/error-message.model';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../utis/localstorage/local-storage.service';
import {UserLogin} from '../../../../model/user-login';

const LOGIN_ENDPOINT: string = 'http://localhost:8083/api/sgmea/v1/auth/login';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService,
    private tokenService: JwtTokenService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }


  get toke(): Token {
    return this.tokenService.token;
  }


  login(user: UserLogin): Observable<any> {
    console.log('entrando no metodo');
    return this.http
      .createRequest()
      .url(LOGIN_ENDPOINT)
      .post(user)
      .pipe(
        map(res => {
          this.tokenService.token = new Token(res.token);
          console.log('resposta aqui', res);
        }),
        // mergeMap(() => {
        //   return this.refreshUserInfo()
        //     .pipe(
        //       take(1)
        //     );
        // }),
        catchError((err) => {
          if (err.status === 404) {
            console.log('Erro 404: Página não encontrada');
            const errorObject = {error: err, showError: true, loading: false};
            return throwError(errorObject);
          }
          return throwErrorMessage(err);
        }),
      );
  }

  public logout() {
    this.tokenService.token = null;
    this.router.navigate(['/sign-in']);
    this.localStorageService.clear();
  }


}
