import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChamadoFilter} from "../../../chamados/filter/chamado-filter/chamado-filter.component";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";

@Component({
  selector: 'priorizacao-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './priorizacao-filter.component.html',
  styleUrl: './priorizacao-filter.component.scss'
})
export class PriorizacaoFilterComponent extends AbstractFormFilterController<ChamadoFilter> implements OnInit {

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
