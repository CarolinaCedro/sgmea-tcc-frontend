import {Component, OnInit} from '@angular/core';
import {SgmeaListComponent} from '../../../shared/components/sgmea-list/sgmea-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {JsonPipe, NgForOf} from '@angular/common';
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {FuncionarioFilterComponent} from "../../funcionario/filter/funcionario-filter/funcionario-filter.component";
import {TecnicoFilter, TecnicoFilterComponent} from "../filter/tecnico-filter/tecnico-filter.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {FuncionarioService} from "../../funcionario/service/funcionario.service";
import {finalize, takeUntil} from "rxjs/operators";
import {NgxMaskPipe} from "ngx-mask";

const tecnicos = [
  {id: '1', nome: 'Ana Carolina'},
  {id: '2', nome: 'Bruno Silva'},
  {id: '3', nome: 'Carla Mendes'},
  {id: '4', nome: 'Daniel Souza'},
  {id: '5', nome: 'Eduarda Lima'},
  {id: '6', nome: 'Fábio Santos'},
  {id: '7', nome: 'Gabriela Costa'},
  {id: '8', nome: 'Henrique Almeida'},
  {id: '9', nome: 'Isabela Ferreira'},
  {id: '10', nome: 'João Pereira'},
];


@Component({
  selector: 'app-tecnicos-list',
  standalone: true,
    imports: [
        SgmeaListComponent,
        RouterLink,
        MatMenuModule,
        NgForOf,
        MatIconModule,
        MatButtonModule,
        JsonPipe,
        SgmeaContainerListComponent,
        FuncionarioFilterComponent,
        TecnicoFilterComponent,
        SgmeaNoDataComponent,
        MatPaginatorModule,
        NgxMaskPipe,
    ],
  templateUrl: './tecnicos-list.component.html',
  styleUrl: './tecnicos-list.component.scss',
})
export class TecnicosListComponent extends AbstractListController<Tecnico> implements OnInit {


  currentFilter: TecnicoFilter;
  private cancelRequest: Subject<void> = new Subject();

  constructor(service: TecnicoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  tecnicos = tecnicos;



  customList(filter: TecnicoFilter) {

    this.cancelRequest.next();
    this.currentFilter = filter;
    (this.service as TecnicoService)
      .listAdvanced(filter)
      .pipe(
        finalize(() => {
        }),
        takeUntil(this.unsubscribes),
        takeUntil(this.cancelRequest.asObservable()),
      ).subscribe(result => {
      this.values = result;
    }, (err: Error) => console.log(err.message));

  }
}
