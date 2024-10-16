import {Component, OnInit} from '@angular/core';
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../../../shared/components/button/button.component";


export class TecnicoFilter {
  nome?: string

}


@Component({
  selector: 'tecnico-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './tecnico-filter.component.html',
  styleUrl: './tecnico-filter.component.scss'
})
export class TecnicoFilterComponent extends AbstractFormFilterController<TecnicoFilter> implements OnInit {


  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      TecnicoFilter, formBuilder.group({
        nome: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nome")
  }


}
