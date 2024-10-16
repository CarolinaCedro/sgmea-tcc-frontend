import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Equipamento} from "../../../model/equipamento";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {EquipamentoService} from "../../equipamento/service/equipamento.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {PriorizacaoChamadoService} from "../../priorizao-chamado/service/priorizacao-chamado.service";
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {ConsolidacaoService} from "../service/consolidacao.service";
import {ChamadoConsolidado} from "../../../model/chamado-consolidado";
import {map, mergeMap, take} from "rxjs/operators";
import {of} from "rxjs";
import {ErrorMessage} from "../../utis/http/model/exception/error-message.model";

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
export class ConsolidacaoFormComponent extends AbstractFormController<ChamadoAtribuido> implements AfterViewInit, OnInit {


  constructor(formBuilder: FormBuilder, public service: ConsolidacaoService, router: Router, route: ActivatedRoute) {
    super(ChamadoAtribuido, formBuilder.group({
      id: [''],
      observacaoConsolidacao: [''],

    }), service, router, route);
  }

  ngOnInit() {
    console.log("valueeee", this.value)
  }


  save(value: ChamadoAtribuido): void {
    const id = this.form.get("id").value;
    const observacaoConsolidacao = this.form.get("observacaoConsolidacao").value;

    const payload = {
      id: id, // ou value?.id, dependendo da lógica
      observacaoConsolidacao: observacaoConsolidacao
    };

    console.log("Chamado consolidado payload", payload);

    this.service.save(payload).pipe(take(1)).subscribe(
      () => {
        this.openSnackBar("Chamado Consolidado");
        this.router.navigate(['../'], {
          relativeTo: this.route,
          queryParams: this.queryParamService.removePrefix(this.queryParamService.getAll('backParam.'), 'backParam.'),
        });
      },
      (error) => {
        this.openSnackBar("Erro ao consolidar chamado");
        console.error("Erro ao consolidar chamado", error);
      }
    );
  }

  containsMetadata(): boolean {
    return false;
  }


}
