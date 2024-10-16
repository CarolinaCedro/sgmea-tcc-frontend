import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Gestor} from "../../../model/gestor";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GestorService} from "../service/gestor.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {NgxMaskDirective} from "ngx-mask";
import {take} from "rxjs/operators";
import {isNullOrUndefined} from "../../utis/utils";
import {of} from "rxjs";
import {NgIf} from "@angular/common";
import {Perfil} from "../../../model/enum/perfil";

@Component({
  selector: 'app-gestor-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgIf
  ],
  templateUrl: './gestor-form.component.html',
  styleUrls: ['./gestor-form.component.scss']
})
export class GestorFormComponent extends AbstractFormController<Gestor> implements AfterViewInit, OnInit {

  notShowPasswordView: boolean = true;

  constructor(formBuilder: FormBuilder, service: GestorService, router: Router, route: ActivatedRoute) {
    super(Gestor, formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      role: [Perfil.GESTOR],
      gestor: [''],
      perfil: [Perfil.GESTOR],
      areaGestao: [''],
      usuariosAlocados: [[]],
      chamadoAtribuidos: [[]]
    }), service, router, route);


    this.form.get("perfil").valueChanges.subscribe(value => {
      this.form.get("role").setValue(value);
    });
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

}
