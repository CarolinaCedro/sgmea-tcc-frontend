import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";


export class RelatorioFilter {
  nome?: string

}


@Component({
  selector: 'app-relatorio-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './relatorio-filter.component.html',
  styleUrl: './relatorio-filter.component.scss'
})
export class RelatorioFilterComponent extends AbstractFormFilterController<RelatorioFilter> implements OnInit {

  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      RelatorioFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }

}
