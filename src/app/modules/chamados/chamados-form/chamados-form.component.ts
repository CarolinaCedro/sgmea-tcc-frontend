import {AfterViewInit, Component} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {ActivatedRoute, Router} from "@angular/router";
import {ChamadoCriadoService} from "../service/chamado-criado.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {EquipamentoAutocompleteDirective} from "../../equipamento/directives/equipamento-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Equipamento} from "../../../model/equipamento";
import {Funcionario} from "../../../model/funcionario";
import {FuncionarioAutocompleteDirective} from "../../funcionario/directives/funcionario-autocomplete.directive";
import {AuthService} from "../../../core/auth/service/auth/auth.service";

@Component({
  selector: 'app-chamados-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgForOf,
    EquipamentoAutocompleteDirective,
    FuncionarioAutocompleteDirective
  ],
  templateUrl: './chamados-form.component.html',
  styleUrls: ['./chamados-form.component.scss']
})
export class ChamadosFormComponent extends AbstractFormController<ChamadoCriado> implements AfterViewInit {

  equipamentos: ListResource<Equipamento>;
  funcionarios: ListResource<Funcionario>;
  isStatusDisabled: boolean;



  constructor(formBuilder: FormBuilder, service: ChamadoCriadoService, router: Router, route: ActivatedRoute, private authService: AuthService) {
    super(ChamadoCriado, formBuilder.group({
      id: [''],
      titulo: [''],
      prioridade: ['BAIXA'],
      status: ['ABERTO'],
      observacoes: [''],
      equipamento: formBuilder.group({
        id: ['']
      }),
      funcionario: formBuilder.group({
        id: ['']
      }),
      dataFechamento: [null]
    }), service, router, route);

    this.isStatusDisabled = true;

    this.route.params.subscribe(params => {
      if (!params['id']) {  // Se não houver ID nos parâmetros, é um novo registro
        this.form.patchValue({status: 'ABERTO'});
        this.form.setValue({status: 'ABERTO'});
        this.form.get('status').disable();
      }
    });

  }

  isFormActive = true


  save(value: ChamadoCriado) {
    // Extrair apenas o campo 'id' dos objetos
    const equipamentoId: string = this.form.get("equipamento.id").value?.id || this.form.get("equipamento.id").value;
    const funcionarioId: string = this.form.get("funcionario.id").value?.id || this.form.get("funcionario.id").value;

    console.log('equipamentoId:', equipamentoId);
    console.log('funcionarioId:', funcionarioId);

    value.equipamento.id = equipamentoId
    value.funcionario.id = funcionarioId

    super.save(value);
  }


  containsMetadata(): boolean {
    return false;
  }

  onEquipamentoFiltered(equipamento: ListResource<Equipamento>) {
    this.equipamentos = equipamento;
  }

  onFuncionarioFiltered(funcionario: ListResource<Funcionario>) {
    this.funcionarios = funcionario;
  }
}
