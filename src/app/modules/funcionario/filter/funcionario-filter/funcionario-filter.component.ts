import {Component, OnInit} from '@angular/core';
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../../shared/components/button/button.component";

export class FuncionarioFilter {

  nome?: string


}

@Component({
  selector: 'funcionario-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './funcionario-filter.component.html',
  styleUrl: './funcionario-filter.component.scss'
})
export class FuncionarioFilterComponent extends AbstractFormFilterController<FuncionarioFilter> implements OnInit {

  form: FormGroup;


  constructor(formBuilder: FormBuilder) {
    super(
      FuncionarioFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }


  filter() {
    this.autoEmitValuesChange = true
    this.emitValuesChange();
  }
}
