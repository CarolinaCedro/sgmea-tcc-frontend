import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Departamento} from "../../../model/departamento";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartamentoService} from "../service/departamento.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SgmeaFormComponent
  ],
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.scss']
})
export class DepartamentoFormComponent extends AbstractFormController<Departamento> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: DepartamentoService, router: Router, route: ActivatedRoute) {
    super(Departamento, formBuilder.group({
      nome: [''],
      descricao: [''],
      disponibilidade: [false]
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }

}
