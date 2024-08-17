import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from "@angular/material/input";
import {FormController} from "../../../modules/utis/models/form-controller.interface";

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
  formController: FormController<any>;

  @Input()
  btnSaveShow?: boolean = true;
  @Input()
  iconModule!: string;

  @Input() cardWidth?: string = '360px !important';


}
