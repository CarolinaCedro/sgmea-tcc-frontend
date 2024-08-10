import { Component, Input } from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatCardActions, MatCardModule} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatPrefix } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'sgmea-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './sgmea-form.component.html',
  styleUrl: './sgmea-form.component.scss',
})
export class SgmeaFormComponent {

  @Input()
  formTitle?: string = 'Seu título aqui';
  @Input()
  descriptionOnForm?: string = 'Descrição formulario';
  @Input()
  btnSave = 'Salvar';

  @Input()
  btnSaveShow?: boolean = true;
  @Input()
  iconModule!: string;

  @Input() cardWidth?: string = '360px !important';

}
