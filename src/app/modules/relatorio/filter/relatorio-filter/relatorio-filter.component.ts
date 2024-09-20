import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../../shared/components/button/button.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractFormFilterController} from "../../../utis/abstract/abstract-form-filter-controller.directive";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {RelatorioService} from "../../service/relatorio.service";


export class RelatorioFilter {

  nomeEquipamento?: string
  dataAbertura?: Date
  dataFechamento?: Date

}


@Component({
  selector: 'relatorio-filter',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  templateUrl: './relatorio-filter.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  styleUrl: './relatorio-filter.component.scss'
})
export class RelatorioFilterComponent extends AbstractFormFilterController<RelatorioFilter> implements OnInit {


  constructor(formBuilder: FormBuilder, private relatorioService: RelatorioService) {
    super(
      RelatorioFilter, formBuilder.group({
        nomeEquipamento: [],
        dataAbertura: [],
        dataFechamento: [],

      })
    );
  }

  ngOnInit() {
    this.addListenerForString("nomeEquipamento");
    this.addListenerForDate("dataAbertura");
    this.addListenerForDate("dataFechamento");
  }


}
