import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Funcionario} from "../../../model/funcionario";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FuncionarioService} from "../service/funcionario.service";
import {FuncionarioFilter, FuncionarioFilterComponent} from "../filter/funcionario-filter/funcionario-filter.component";
import {Subject} from "rxjs";
import {MatListModule} from "@angular/material/list";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {finalize, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    RouterLink,
    FuncionarioFilterComponent,
    MatListModule,
    SgmeaContainerListComponent,
    SgmeaNoDataComponent,
    MatPaginatorModule
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent extends AbstractListController<Funcionario> implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  currentFilter: FuncionarioFilter;
  private cancelRequest: Subject<void> = new Subject();

  constructor(service: FuncionarioService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  customList(filter: FuncionarioFilter) {
    console.log("filterrrrr", filter)
    this.cancelRequest.next();
    this.currentFilter = filter;
    (this.service as FuncionarioService)
      .listAdvanced(filter)
      .pipe(
        finalize(() => {
          // this.loading.timeOut(this.nameList());
        }),
        takeUntil(this.unsubscribes),
        takeUntil(this.cancelRequest.asObservable()),
      ).subscribe(result => {
      this.values = result;
    }, (err: Error) => console.log(err.message));


  }


}
