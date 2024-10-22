import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Gestor} from "../../../model/gestor";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GestorService} from "../service/gestor.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {NgxMaskDirective} from "ngx-mask";
import {take} from "rxjs/operators";
import {isNullOrUndefined} from "../../utis/utils";
import {of} from "rxjs";
import {NgClass, NgIf} from "@angular/common";
import {Perfil} from "../../../model/enum/perfil";
import {AreaGestao} from "../../../model/enum/area-gestao";

@Component({
  selector: 'app-gestor-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgIf,
    NgClass
  ],
  templateUrl: './gestor-form.component.html',
  styleUrls: ['./gestor-form.component.scss']
})
export class GestorFormComponent extends AbstractFormController<Gestor> implements AfterViewInit, OnInit {

  notShowPasswordView: boolean = true;

  constructor(formBuilder: FormBuilder, service: GestorService, router: Router, route: ActivatedRoute) {
    super(Gestor, formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
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

  save(value: Gestor) {

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
        // this.form.get("areaGestao").setValue(AreaGestao.OUTROS)
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
