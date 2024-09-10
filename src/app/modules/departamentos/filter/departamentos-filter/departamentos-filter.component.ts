import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";


export class DepartamentoFilter {
  nome?: string

}


@Component({
  selector: 'departamentos-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './departamentos-filter.component.html',
  styleUrl: './departamentos-filter.component.scss'
})
export class DepartamentosFilterComponent extends AbstractFormFilterController<DepartamentoFilter> implements OnInit {

  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      DepartamentoFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }

}
