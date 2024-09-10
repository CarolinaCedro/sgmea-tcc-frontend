import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Gestor} from "../../../model/gestor";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GestorService} from "../service/gestor.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";

@Component({
  selector: 'app-gestor-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './gestor-form.component.html',
  styleUrls: ['./gestor-form.component.scss']
})
export class GestorFormComponent extends AbstractFormController<Gestor> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: GestorService, router: Router, route: ActivatedRoute) {
    super(Gestor, formBuilder.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      role: [''],
      gestor: [''],
      perfil: [''],
      areaGestao: [''],
      usuariosAlocados: [[]],
      chamadoAtribuidos: [[]]
    }), service, router, route);


    this.form.get("perfil").valueChanges.subscribe(value => {
      this.form.get("role").setValue(value);
    });
  }

  containsMetadata(): boolean {
    return false;
  }

}
