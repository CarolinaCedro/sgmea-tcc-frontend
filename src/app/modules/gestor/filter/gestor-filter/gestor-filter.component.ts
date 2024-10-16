import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";

export class GestorFilter {
  nome?: string

}


@Component({
  selector: 'gestor-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestor-filter.component.html',
  styleUrl: './gestor-filter.component.scss'
})
export class GestorFilterComponent extends AbstractFormFilterController<GestorFilter> implements OnInit {

  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      GestorFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }


}
