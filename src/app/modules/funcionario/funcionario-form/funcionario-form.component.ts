import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Funcionario} from "../../../model/funcionario";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FuncionarioService} from "../service/funcionario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NgForOf, NgIf} from "@angular/common";
import {DepartamentoAutocompleteDirective} from "../../departamentos/directives/departamento-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Departamento} from "../../../model/departamento";
import {Gestor} from "../../../model/gestor";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgForOf,
    DepartamentoAutocompleteDirective,
    GestorAutocompleteDirective,
    NgIf
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent extends AbstractFormController<Funcionario> implements AfterViewInit {


  departamentos: ListResource<Departamento>
  gestorSelected: BehaviorSubject<Array<Gestor>> = new BehaviorSubject(new Array<Gestor>());

  gestor: ListResource<Gestor>

  constructor(formBuilder: FormBuilder, service: FuncionarioService, router: Router, route: ActivatedRoute) {
    super(Funcionario, formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
      gestor: [''],
      senha: [''],
      role: [''],
      perfil: [''],
      departamento: [''],
      funcao: [''],
      chamadoCriados: [[]]
    }), service, router, route);


    this.form.get("perfil").valueChanges.subscribe(value => {
      this.form.get("role").setValue(value);
    });

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


  addGestorSelected(event: MatAutocompleteSelectedEvent) {
    // const gestor = new Array<Gestor>();
    // if (!isEmpty(this.gestorSelected.value)) {
    //   this.gestorSelected.value.forEach(it => gestor.push(it));
    // }
    // gestor.push(event.option.value as Gestor);
    // if (isNullOrUndefined(this.colaboradoresInclude.value)) {
    //   const itens = new Array();
    //   itens.push(event.option.value as Gestor);
    //   this.colaboradoresInclude.next(itens);
    // } else {
    //   const itens = this.colaboradoresInclude.value;
    //   itens.push(event.option.value as Gestor);
    //   this.colaboradoresInclude.next(itens);
    // }
    // this.colaboradoresInclude.value.forEach(it => {
    //   this.colaboradoresExclude.next(this.colaboradoresExclude.value.filter(iit => iit.id !== it.id));
    // });
    // this.gestorSelected.next(gestor);
  }

}
