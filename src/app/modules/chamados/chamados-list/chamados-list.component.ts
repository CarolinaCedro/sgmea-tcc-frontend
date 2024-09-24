import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {ChamadoCriadoService} from "../service/chamado-criado.service";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {GestorFilterComponent} from "../../gestor/filter/gestor-filter/gestor-filter.component";
import {ChamadoFilter, ChamadoFilterComponent} from "../filter/chamado-filter/chamado-filter.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {$contains, $is, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {isNotEmpty, isNotNullOrUndefined} from "../../utis/utils";
import {finalize, takeUntil} from "rxjs/operators";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TecnicoFilter} from "../../tecnicos/filter/tecnico-filter/tecnico-filter.component";
import {Subject} from "rxjs";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";

@Component({
  selector: 'app-chamados-list',
  standalone: true,
    imports: [
        SgmeaListComponent,
        NgForOf,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterLink,
        SgmeaContainerListComponent,
        GestorFilterComponent,
        ChamadoFilterComponent,
        SgmeaNoDataComponent,
        MatPaginatorModule
    ],
  templateUrl: './chamados-list.component.html',
  styleUrl: './chamados-list.component.scss'
})
export class ChamadosListComponent extends AbstractListController<ChamadoCriado>  implements OnInit, OnDestroy {



  currentFilter: ChamadoFilter;
  private cancelRequest: Subject<void> = new Subject();

  constructor(service: ChamadoCriadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  customList(filter?: ChamadoFilter): void {
    this.cancelRequest.next();
    this.currentFilter = filter;
    (this.service as ChamadoCriadoService)
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
