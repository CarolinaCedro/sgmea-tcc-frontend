import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {AuthService} from '../../service/auth/auth.service';
import {NgClass, NgIf} from "@angular/common";
import {UserLogin} from "../../../../model/user-login";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, ButtonComponent, MatProgressSpinnerModule],
})
export class SignInComponent implements OnInit {


  form: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  isNotUserValid: boolean = false;
  showLoanding: boolean = false;
  hidePassword = true;
  hideNewPassword = true;


  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private authService: AuthService) {
  }

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required]],
      senha: ['', Validators.required],
    });
  }


  get f() {
    return this.form.controls;
  }

  login(value: UserLogin) {
    console.log('clicando')
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.showLoanding = true;
    this.authService.login(value).subscribe(
      res => {
        console.log('conseguiu logar', res);
        this.showLoanding = false;
      },
      error => {
        console.log("error", error?.error?.message)
        this.isNotUserValid = true;
        this.showLoanding = false;
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  @HostListener('document:keydown', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }


}
