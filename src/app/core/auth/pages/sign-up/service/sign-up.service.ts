import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../../modules/utis/http/services/http.service";
import {NewUser} from "../../../../../model/newUser";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private _snackBar = inject(MatSnackBar);


  constructor(private http: HttpService, private router: Router) {
  }


  newUser(user: NewUser): Observable<any> {
    return this.http.createRequest()
      .url(`${environment.apiUrl}/api/sgmea/v1/auth/register`)
      .post(user)
      .pipe(
        map(res => {
          console.log("usuario criado", res)
          this.router.navigate(['/auth/sign-in']);
          this.openSnackBar("Usúario criado com sucesso")
        }),
        catchError(err => {
          return throwError(err)
        })
      )
  }


  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this._snackBar.open(message, "Fechar", config);
  }

}
