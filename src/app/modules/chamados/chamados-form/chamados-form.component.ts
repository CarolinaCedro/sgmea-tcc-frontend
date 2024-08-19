import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {ActivatedRoute, Router} from "@angular/router";
import {ChamadoCriadoService} from "../service/chamado-criado.service";

@Component({
  selector: 'app-chamados-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './chamados-form.component.html',
  styleUrls: ['./chamados-form.component.scss']
})
export class ChamadosFormComponent extends AbstractFormController<ChamadoCriado> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: ChamadoCriadoService, router: Router, route: ActivatedRoute) {
    super(ChamadoCriado, formBuilder.group({
      titulo: [''],
      prioridade: [''],
      status: [''],
      observacoes: [''],
      equipamentoId: [''],
      funcionarioId: ['']
    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }

}
