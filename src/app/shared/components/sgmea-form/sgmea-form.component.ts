import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatPrefix } from '@angular/material/form-field';

@Component({
  selector: 'sgmea-form',
  standalone: true,
  imports: [
    MatIcon,
    MatDivider,
    MatCardActions,
    MatButton,
    MatPrefix,
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
