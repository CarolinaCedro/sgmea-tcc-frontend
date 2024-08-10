import { Component } from '@angular/core';
import { SgmeaFormComponent } from '../../../shared/components/sgmea-form/sgmea-form.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tecnicos-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './tecnicos-form.component.html',
  styleUrl: './tecnicos-form.component.scss'
})
export class TecnicosFormComponent {

}
