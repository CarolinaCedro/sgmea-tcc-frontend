import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserLogin } from '../../../../model/user-login';
import { Token } from '../model/token';
import { Router } from '@angular/router';
import {JwtTokenService} from "../jwt/jwt-token.service";
import {HttpService} from "../../../../modules/utis/http/services/http.service";
import {LocalStorageService} from "../../../../modules/utis/localstorage/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService,
    private localStorageService: LocalStorageService,
    private tokenService: JwtTokenService,
    private router: Router
  ) {}

  login(user: UserLogin): Observable<any> {
    return this.http
      .createRequest()
      .url('http://localhost:8083/api/sgmea/v1/auth/login')
      .post(user)
      .pipe(
        map(res => {
          if (res.token) {
            this.localStorageService.setItem('token', res.token); // Armazenar o token
            console.log("vamos para home aqui")
            this.router.navigate(['/home/dashboard']); // Redirecionar para a página inicial
          }
          return res;
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  logout() {
    this.localStorageService.clear(); // Limpar o localStorage
    this.router.navigate(['/auth/sign-in']); // Redirecionar para a página de login
  }

  get isLoged(): boolean {
    return this.tokenService.containsToken();
  }

  get toke(): Token {
    return this.tokenService.token;
  }
}
