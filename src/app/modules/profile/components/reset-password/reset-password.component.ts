import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../core/auth/service/auth/auth.service';
import {NgClass, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    ButtonComponent,
    NgIf
  ],
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  passwordStrength: number = 0; // 0-4, where 0 is weak and 4 is strong
  private _snackBar = inject(MatSnackBar);
  token: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      novaSenha: ['', [Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});

    this.form.get('novaSenha')?.valueChanges.subscribe(value => this.updatePasswordStrength(value));


    // Captura o token da URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        // Handle the case where token is missing
        console.error('Token is missing.');
        this.router.navigate(['/']); // Redireciona para a página inicial ou mostra uma mensagem de erro
      }
    });
  }

  updatePasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    this.passwordStrength = strength;
  }

  passwordMatchValidator(form: FormGroup) {
    const novaSenha = form.get('novaSenha')?.value;
    const confirmarSenha = form.get('confirmarSenha')?.value;
    return novaSenha === confirmarSenha ? null : {mismatch: true};
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitResetPassword() {
    if (this.form.valid) {
      const resetPasswordRequest = {
        token: this.token,
        newPassword: this.form.get('novaSenha')?.value
      };

      this.authService.resetPassword(resetPasswordRequest).subscribe(
        response => {
          this.openSnackBar('Senha redefinida com sucesso');
          this.router.navigate(['/auth/sign-in']);
        },
        error => {
          console.error('Erro ao redefinir senha', error);
        }
      );
    } else {
      console.log('Formulário inválido');
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
