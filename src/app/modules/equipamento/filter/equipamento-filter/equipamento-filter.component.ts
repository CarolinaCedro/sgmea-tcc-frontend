import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";

export class EquipamentoFilter {
  nome?: string

}


@Component({
  selector: 'equipamento-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './equipamento-filter.component.html',
  styleUrl: './equipamento-filter.component.scss'
})
export class EquipamentoFilterComponent extends AbstractFormFilterController<EquipamentoFilter> implements OnInit {


  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      EquipamentoFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }


}
