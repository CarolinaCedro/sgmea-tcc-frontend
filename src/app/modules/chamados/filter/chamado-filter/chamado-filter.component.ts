import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";
import {TecnicoFilter} from "../../../tecnicos/filter/tecnico-filter/tecnico-filter.component";


export class ChamadoFilter {
  titulo?: string
}


@Component({
  selector: 'chamado-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chamado-filter.component.html',
  styleUrl: './chamado-filter.component.scss'
})
export class ChamadoFilterComponent extends AbstractFormFilterController<ChamadoFilter> implements OnInit {

  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      ChamadoFilter, formBuilder.group({
        titulo: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("titulo")
  }


}
