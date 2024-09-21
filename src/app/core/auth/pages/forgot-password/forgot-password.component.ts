import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent, ReactiveFormsModule, NgIf],
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  isLoading: boolean = false;



  constructor(private http: HttpClient, private router: Router, builder: FormBuilder) {
    this.form = builder.group({
      email: ['']
    })
  }


  recoveryPassword(email: string) {
    this.isLoading = true;
    this.http.post<void>('http://localhost:8083/api/sgmea/v1/users/forgot-password', {email:email})
      .subscribe(
        () => {
          this.isLoading = false;
          this.openSnackBar('Instruções de recuperação de senha enviadas para seu e-mail.');
          this.router.navigate(['/auth/sign-in']);
        },
        error => {
          this.isLoading = false;
          console.error("Erro ao enviar instruções de recuperação de senha", error);
          this.openSnackBar('Erro ao enviar instruções de recuperação de senha. Verifique o email e tente novamente.');
        }
      );
  }


  ngOnInit(): void {
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
