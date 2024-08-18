import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Equipamento} from "../../../model/equipamento";
import {ActivatedRoute, Router} from "@angular/router";
import {EquipamentoService} from "../service/equipamento.service";

@Component({
  selector: 'app-equipamento-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent extends AbstractFormController<Equipamento> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: EquipamentoService, router: Router, route: ActivatedRoute) {
    super(Equipamento, formBuilder.group({
      nome: [''],
      descricao: [''],
      fabricante: [''],
      modelo: [''],
      emUso: [false]
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }

}
