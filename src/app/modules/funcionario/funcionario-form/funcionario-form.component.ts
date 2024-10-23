import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Funcionario} from "../../../model/funcionario";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FuncionarioService} from "../service/funcionario.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {DepartamentoAutocompleteDirective} from "../../departamentos/directives/departamento-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Departamento} from "../../../model/departamento";
import {Gestor} from "../../../model/gestor";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";
import {BehaviorSubject, of} from "rxjs";
import {NgxMaskDirective} from "ngx-mask";
import {take} from "rxjs/operators";
import {isNullOrUndefined} from "../../utis/utils";
import {Perfil} from "../../../model/enum/perfil";

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
    NgIf,
    NgxMaskDirective,
    NgClass
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent extends AbstractFormController<Funcionario> implements AfterViewInit, OnInit {


  departamentos: ListResource<Departamento>
  gestorSelected: BehaviorSubject<Array<Gestor>> = new BehaviorSubject(new Array<Gestor>());

  submitted = false;

  gestor: ListResource<Gestor>

  notShowPasswordView: boolean = true;

  constructor(formBuilder: FormBuilder, service: FuncionarioService, router: Router, route: ActivatedRoute) {
    super(Funcionario, formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gestor: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      role: [Perfil.FUNCIONARIO],
      perfil: [Perfil.FUNCIONARIO],
      departamento: [''],
      funcao: [''],
      chamadoCriados: [[]]
    }), service, router, route);


    // this.form.get("perfil").valueChanges.subscribe(value => {
    //   this.form.get("role").setValue(value);
    // });


  }

  save(value: Funcionario) {
    if (this.form.invalid) {
      this.openSnackBar("Por favor, preencha todos os campos obrigatórios.");
    }
    super.save(value);
  }


  ngOnInit() {

    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      let beforeLoadId = this.beforeLoadId(params['id']);
      if (isNullOrUndefined(beforeLoadId)) {
        beforeLoadId = of(null);
      }

      if (params['id'] === 'new_record') {
        this.notShowPasswordView = true
        console.log("novo record")
      } else {
        this.notShowPasswordView = false
      }

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


}
