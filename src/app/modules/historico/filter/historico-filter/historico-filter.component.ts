import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";
import {TecnicoFilter} from "../../../tecnicos/filter/tecnico-filter/tecnico-filter.component";



export class HistoricoFilter {
  nome?: string

}

@Component({
  selector: 'historico-filter',
  standalone: true,
    imports: [
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './historico-filter.component.html',
  styleUrl: './historico-filter.component.scss'
})
export class HistoricoFilterComponent extends AbstractFormFilterController<HistoricoFilter> implements OnInit{

  form: FormGroup


  constructor(formBuilder: FormBuilder) {
    super(
      HistoricoFilter, formBuilder.group({
        titulo: []
      })
    );
  }

  ngOnInit() {
    this.addListenerForString("titulo")
  }



}
