import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Equipamento} from "../../../model/equipamento";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {PriorizacaoChamadoService} from "../../priorizao-chamado/service/priorizacao-chamado.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";

@Component({
  selector: 'app-consolidacao-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './consolidacao-form.component.html',
  styleUrl: './consolidacao-form.component.scss'
})
export class ConsolidacaoFormComponent extends AbstractFormController<ChamadoAtribuido> implements AfterViewInit {

  constructor(formBuilder: FormBuilder, service: PriorizacaoChamadoService, router: Router, route: ActivatedRoute) {
    super(ChamadoAtribuido, formBuilder.group({
      chamadoCriado: [''],
      tecnico: [''],
      gestor: [''],
      prioridade: ['']

    }), service, router, route);
  }

  containsMetadata(): boolean {
    return false;
  }


}
