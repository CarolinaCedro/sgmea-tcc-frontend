import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from '../../../shared/components/sgmea-form/sgmea-form.component';
import {MatInputModule} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Gestor} from "../../../model/gestor";

@Component({
  selector: 'app-tecnicos-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgForOf,
    GestorAutocompleteDirective,
  ],
  templateUrl: './tecnicos-form.component.html',
  styleUrl: './tecnicos-form.component.scss'
})
export class TecnicosFormComponent extends AbstractFormController<Tecnico> implements AfterViewInit {

  gestor: ListResource<Gestor>;

  constructor(formBuilder: FormBuilder, service: TecnicoService, router: Router, route: ActivatedRoute) {
    super(Tecnico, formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      cpf: [''],
      gestor: [''],
      disponibilidade: [true],
      especialidade: [''],
      senha: [''],
      perfil: [''],
      role: ['']
    }), service, router, route);

    this.form.get("perfil").valueChanges.subscribe(value => {
      this.form.get("role").setValue(value);
    });

  }

  containsMetadata(): boolean {
    return false;
  }


  onGestorFiltered(gestor: ListResource<Gestor>) {
    this.gestor = gestor
  }
}
