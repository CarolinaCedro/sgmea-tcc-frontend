import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {AuthService} from "../../../../core/auth/service/auth/auth.service";
import {User} from "../../../../model/user";
import {catchError, of} from 'rxjs';
import {NgClass, NgIf} from "@angular/common";
import {UpdateUser} from "../../../../model/updateUser";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  currentUser: User | null = null;
  errorMessage: string = '';
  updatePassword: boolean = false;
  formPassword: FormGroup;
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  confirmNewPassword: boolean = false;


  constructor(private builder: FormBuilder, private authService: AuthService,
              private router: Router,
              private snack: MatSnackBar) {
    this.form = this.builder.group({
      id: [''],
      nome: [''],
      cpf: [''],
      email: [''],
      senha: ["", [Validators.required]],
      novaSenha: ["", [Validators.required]],
      confirmSenha: ["", [Validators.required]]
    });
    this.formPassword = this.builder.group({});
  }

  ngOnInit() {
    this.authService.userCurrent
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Erro ao carregar os dados do usuário';
          console.error(error);
          return of(null);
        })
      )
      .subscribe((res: User | null) => {
        if (res) {
          this.currentUser = res;
          this.form.patchValue({
            id: res.id,
            nome: res.nome,
            cpf: res.cpf,
            email: res.email,
            senha: ''
          });
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmNewPassword = !this.confirmNewPassword;
  }


  updatePass() {
    this.updatePassword = true
  }

  updateInfos() {
    if (this.form.valid) {
      const user: UpdateUser = {
        id: this.form.get("id")?.value || '',
        nome: this.form.get("nome")?.value || '',
        cpf: this.form.get("cpf")?.value || '',
        email: this.form.get("email")?.value || '',
        oldSenha: this.form.get("senha")?.value || '',
        novaSenha: this.form.get("novaSenha")?.value || '',
        confirmSenha: this.form.get("confirmSenha")?.value || ''
      }

      console.log("o payload pra update User", user);
      this.authService.updateUser(user).subscribe(res => {
        this.openSnackBar("É necessario relogar no sistema")
        this.router.navigate(['/home/dashboard']);
      });
    } else {
      console.log("O formulário contém erros ou campos obrigatórios não preenchidos.");
    }
  }

  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.snack.open(message, "Fechar", config);
  }

}
