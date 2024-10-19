import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from '../../../shared/components/sgmea-form/sgmea-form.component';
import {MatInputModule} from '@angular/material/input';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Gestor} from "../../../model/gestor";
import {NgxMaskDirective} from "ngx-mask";
import {take} from "rxjs/operators";
import {isNullOrUndefined} from "../../utis/utils";
import {of} from "rxjs";
import {Role} from "../../../core/roles/model/role";
import {Perfil} from "../../../model/enum/perfil";

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
    NgxMaskDirective,
    NgClass,
  ],
  templateUrl: './tecnicos-form.component.html',
  styleUrl: './tecnicos-form.component.scss'
})
export class TecnicosFormComponent extends AbstractFormController<Tecnico> implements AfterViewInit {

  notShowPasswordView: boolean = true;


  gestor: ListResource<Gestor>;

  constructor(formBuilder: FormBuilder, service: TecnicoService, router: Router, route: ActivatedRoute) {
    super(Tecnico, formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      cpf: [''],
      gestor: [''],
      disponibilidade: [true],
      especialidade: ['nenhuma'],
      senha: [''],
      perfil: [Perfil.TECNICO],
      role: [Perfil.TECNICO]
    }), service, router, route);

    // this.form.get("perfil").valueChanges.subscribe(value => {
    //   this.form.get("role").setValue(value);
    // });

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


  onGestorFiltered(gestor: ListResource<Gestor>) {
    this.gestor = gestor
  }
}
