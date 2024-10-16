import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgClass
  ],
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent {

  form: FormGroup;
  hidePassword = true;
  hideNewPassword = true;

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      password: [''],
      newPassword: [''],
    });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'newPassword') {
      this.hideNewPassword = !this.hideNewPassword;
    }
  }
}
