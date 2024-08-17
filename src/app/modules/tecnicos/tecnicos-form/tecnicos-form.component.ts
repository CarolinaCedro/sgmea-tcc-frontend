import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from '../../../shared/components/sgmea-form/sgmea-form.component';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";
import {ActivatedRoute, Router} from "@angular/router";

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
export class TecnicosFormComponent extends AbstractFormController<Tecnico> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: TecnicoService, router: Router, route: ActivatedRoute) {
    super(Tecnico, formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      cpf: [''],
      gestor: formBuilder.group({
        id: ['']
      }),
      disponibilidade: [false],
      senha: [''],
      perfil: [''],
      role: ['']
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }


}
