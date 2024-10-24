import {Component} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {ActivatedRoute, Router} from "@angular/router";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {JsonPipe, NgForOf} from "@angular/common";
import {TecnicoAutocompleteDirective} from "../../tecnicos/directives/tecnico-autocomplete.directive";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {Tecnico} from "../../../model/tecnico";
import {GestorAutocompleteDirective} from "../../gestor/directives/gestor-autocomplete.directive";
import {Gestor} from "../../../model/gestor";
import {PriorizacaoChamadoService} from "../service/priorizacao-chamado.service";
import {AuthService} from "../../../core/auth/service/auth/auth.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-priorizaocao-chamado-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    NgForOf,
    TecnicoAutocompleteDirective,
    GestorAutocompleteDirective,
    JsonPipe
  ],
  templateUrl: './priorizaocao-chamado-form.component.html',
  styleUrl: './priorizaocao-chamado-form.component.scss'
})
export class PriorizaocaoChamadoFormComponent extends AbstractFormController<ChamadoAtribuido> {

  tecnicos: ListResource<Tecnico>;
  gestores: ListResource<Gestor>;
  currentUser!: User

  constructor(formBuilder: FormBuilder, service: PriorizacaoChamadoService,
              private authService: AuthService,
              router: Router, route: ActivatedRoute) {
    super(ChamadoAtribuido, formBuilder.group({
      titulo: [''],
      tecnico: [''],
      gestor: [''],
      observacoes: [''],
      prioridade: [''],
      status: ['']
    }), service, router, route);


    this.form.get("titulo").disable()
    this.form.get("observacoes").disable()
    this.form.get("status").disable()
  }


  save(value: ChamadoAtribuido) {
    const chamadoAtribuido: any = {
      chamadoCriado: value.id,
      tecnico: value?.tecnico?.id,
      gestor: value?.gestor?.id,
      prioridade: value?.prioridade

    }
    console.log("chamado atribuido", chamadoAtribuido)

    super.save(chamadoAtribuido);
  }

  containsMetadata(): boolean {
    return false;
  }

  onTecFiltered(tecnicos: ListResource<Tecnico>) {
    this.tecnicos = tecnicos;
  }

  onGestorFiltered(gestor: ListResource<Gestor>) {
    this.gestores = gestor;

  }
}
