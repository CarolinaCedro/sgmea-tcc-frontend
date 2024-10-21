import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {NgClass, NgIf} from "@angular/common";
import {SignUpService} from "./service/sign-up.service";
import {NewUser} from "../../../../model/newUser";
import {Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxMaskDirective} from "ngx-mask";
import {Perfil} from "../../../../model/enum/perfil";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, NgClass, NgIf, RouterLink, MatProgressSpinnerModule, NgxMaskDirective],
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  showPassword: boolean = false;
  passwordStrength: number = 0; // 0-4, where 0 is weak and 4 is strong
  private _snackBar = inject(MatSnackBar);


  constructor(private formBuilder: FormBuilder, private service: SignUpService,private router: Router) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      perfil: [''],
      role: [''],
      senha: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});

    // Subscribe to password changes to update strength
    this.form.get('senha')?.valueChanges.subscribe(value => this.updatePasswordStrength(value));
  }

  ngOnInit(): void {
  }

  createNewUser(form: FormGroup) {
    if (form.valid) {
      const perfil = this.form.get("perfil")?.value;

      if (perfil) {
        const role = perfil;
        this.form.get("role")?.setValue(role);
      }


      const user = new NewUser();
      user.id = '';
      user.nome = form.get("nome")?.value;
      user.cpf = form.get("cpf")?.value;
      user.email = form.get("email")?.value;
      user.senha = form.get("senha")?.value;
      user.perfil = Perfil.GESTOR;
      user.role = Perfil.GESTOR;

      this.service.newUser(user).subscribe(
        res => {
          console.log("criado", res)
          this.router.navigate(['/auth/sign-in']);
        }, error => {
          this.openSnackBar(error?.error?.message)
        }
      );
    } else {
      this.openSnackBar("Atenção: O formulário não pode conter campos nulos. Por favor, preencha todos os campos obrigatórios.");
    }

  }

  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this._snackBar.open(message, "Fechar", config);
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updatePasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    this.passwordStrength = strength;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const senha = formGroup.get('senha')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return senha === confirmPassword ? null : {mismatch: true};
  }
}
