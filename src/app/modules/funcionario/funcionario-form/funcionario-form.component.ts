import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Funcionario} from "../../../model/funcionario";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FuncionarioService} from "../service/funcionario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgForOf} from "@angular/common";
import {DepartamentoAutocompleteDirective} from "../../departamentos/directives/departamento-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Departamento} from "../../../model/departamento";
import {Gestor} from "../../../model/gestor";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgForOf,
    DepartamentoAutocompleteDirective,
    GestorAutocompleteDirective
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent extends AbstractFormController<Funcionario> implements AfterViewInit {


  departamentos: ListResource<Departamento>
  gestor: ListResource<Gestor>

  constructor(formBuilder: FormBuilder, service: FuncionarioService, router: Router, route: ActivatedRoute) {
    super(Funcionario, formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
      gestor: formBuilder.group({
        id: ['']
      }),
      senha: [''],
      role: [''],
      perfil: [''],
      departamento: formBuilder.group({
        id: [''],
        descricao: ['']
      }),
      funcao: [''],
      chamadoCriados: [[]]
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }

  onDepartamentFiltered(departamentos: ListResource<Departamento>) {
    this.departamentos = departamentos
  }

  onGestorFiltered(gestor: ListResource<Gestor>) {
    this.gestor = gestor
  }

}
