import { AfterViewInit, Component } from '@angular/core';
import { AbstractFormController } from "../../utis/abstract/abstract-form-controller";
import { Funcionario } from "../../../model/funcionario";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { FuncionarioService } from "../service/funcionario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SgmeaFormComponent } from "../../../shared/components/sgmea-form/sgmea-form.component";

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent extends AbstractFormController<Funcionario> implements AfterViewInit {

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
        id: ['']
      }),
      funcao: [''],
      chamadoCriados: [[]]
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }
}
