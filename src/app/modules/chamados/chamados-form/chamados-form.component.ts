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
import {Status} from "../../../model/enum/status";
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


  constructor(formBuilder: FormBuilder, service: ChamadoCriadoService, router: Router, route: ActivatedRoute, private authService: AuthService) {
    super(ChamadoCriado, formBuilder.group({
      titulo: [''],
      prioridade: [''],
      status: [{value: 'ABERTO', disabled: true}],
      observacoes: [''],
      equipamentoId: [''],
      funcionarioId: ['']
    }), service, router, route);

    this.route.params.subscribe(params => {
      if (!params['id']) {  // Se não houver ID nos parâmetros, é um novo registro
        this.form.patchValue({status: 'ABERTO'});
        this.form.get('status').disable();
      }
    });
    
  }

  isFormActive = true

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
