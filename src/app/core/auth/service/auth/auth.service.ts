import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserLogin} from '../../../../model/user-login';
import {Token} from '../model/token';
import {Router} from '@angular/router';
import {JwtTokenService} from "../jwt/jwt-token.service";
import {HttpService} from "../../../../modules/utis/http/services/http.service";
import {LocalStorageService} from "../../../../modules/utis/localstorage/local-storage.service";
import {User} from "../../../../model/user";
import {UpdateUser} from "../../../../model/updateUser";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public TOKEN: string = "token";
  private _userRoles = new BehaviorSubject<string[]>([]);  // Armazena e emite as roles do usuário
  public userRoles$ = this._userRoles.asObservable();

  user: User

  constructor(
    private http: HttpService,
    private localStorageService: LocalStorageService,
    private tokenService: JwtTokenService,
    private router: Router,
    private snack: MatSnackBar
  ) {
  }

  login(user: UserLogin): Observable<any> {
    return this.http
      .createRequest()
      .url('http://localhost:8083/api/sgmea/v1/auth/login')
      .post(user)
      .pipe(
        map(res => {
          if (res.token) {
            this.localStorageService.setItem('token', res.token); // Armazenar o token
            this.updateUserRoles(); // Atualizar as roles do usuário
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

  updateUser(user: UpdateUser): Observable<User> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorageService.getItem(this.TOKEN))
      .url('http://localhost:8083/api/sgmea/v1/users/updateUser')
      .post(user)
      .pipe(
        map(res => {
          this.openSnackBar("Usuário atualizado com sucesso !")
          return res;
        }),
        catchError(err => {
          this._userRoles.next([]);
          return throwError(err);
        })
      );
  }

  get userCurrent(): Observable<User> {
    return this.http
      .createRequest()
      .setAuthToken(this.localStorageService.getItem(this.TOKEN))
      .url('http://localhost:8083/api/sgmea/v1/auth/me')
      .get()
      .pipe(
        map(res => {
          this.user = res
          const roles = res?.authorities?.map(a => a.authority) || [];
          this._userRoles.next(roles);  // Atualiza as roles
          this.updateUserRoles();
          return res;
        }),
        catchError(err => {
          this._userRoles.next([]);
          return throwError(err);
        })
      );
  }


  private updateUserRoles() {
    if (this.user?.authorities) {
      const roles = this.user.authorities.map(a => a.authority);
      this._userRoles.next(roles);
    } else {
      this._userRoles.next([]);
    }
  }

  logout() {
    this._userRoles.next([]);
    this.localStorageService.clear();
    this.router.navigate(['/auth/sign-in']); // Redirecionar para a página de login
  }

  get userCurrentValue(): User {
    return this.user;
  }

  get isLoged(): boolean {
    return this.tokenService.containsToken();
  }

  get toke(): Token {
    return this.tokenService.token;
  }

  // Getter para acessar as roles diretamente (sincronamente)
  get userRoles(): string[] {
    return this._userRoles.getValue();
  }

  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.snack.open(message, "Fechar", config);
  }

  resetPassword(resetPasswordRequest: { newPassword: string; token: string }): Observable<any> {
    return this.http
      .createRequest()
      .url('http://localhost:8083/api/sgmea/v1/users/reset-password')
      .post(resetPasswordRequest)
      .pipe(
        map(res => {
          this.openSnackBar("Senha atualizada !")
          return res;
        }),
        catchError(err => {
          this._userRoles.next([]);
          return throwError(err);
        })
      );
  }
}
