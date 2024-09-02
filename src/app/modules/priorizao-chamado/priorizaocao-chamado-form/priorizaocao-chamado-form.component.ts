import {Component} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule, FormGroup} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {ChamadoAtribuidoService} from "../../chamados/service/chamado-atribuido.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {TecnicoAutocompleteDirective} from "../../tecnicos/directives/tecnico-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Tecnico} from "../../../model/tecnico";

@Component({
  selector: 'app-priorizaocao-chamado-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgForOf,
    TecnicoAutocompleteDirective
  ],
  templateUrl: './priorizaocao-chamado-form.component.html',
  styleUrl: './priorizaocao-chamado-form.component.scss'
})
export class PriorizaocaoChamadoFormComponent extends AbstractFormController<ChamadoAtribuido> {

  tecnicos: ListResource<Tecnico>;

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

  onTecFiltered(tecnicos: ListResource<Tecnico>) {
    this.tecnicos = tecnicos;

  }
}
