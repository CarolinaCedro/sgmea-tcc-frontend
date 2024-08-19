import { Component } from '@angular/core';
import { SgmeaFormComponent } from "../../../shared/components/sgmea-form/sgmea-form.component";
import { FormBuilder, ReactiveFormsModule, FormGroup } from "@angular/forms";
import { AbstractFormController } from "../../utis/abstract/abstract-form-controller";
import { ChamadoAtribuido } from "../../../model/chamado-atribuido";
import { ChamadoAtribuidoService } from "../../chamados/service/chamado-atribuido.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-priorizaocao-chamado-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './priorizaocao-chamado-form.component.html',
  styleUrl: './priorizaocao-chamado-form.component.scss'
})
export class PriorizaocaoChamadoFormComponent extends AbstractFormController<ChamadoAtribuido> {

  constructor(formBuilder: FormBuilder, service: ChamadoAtribuidoService, router: Router, route: ActivatedRoute) {
    super(ChamadoAtribuido, formBuilder.group({
      titulo: [''],
      tecnicoId: [''],
      gestorId: [''],
      prioridade: ['']
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }
}
