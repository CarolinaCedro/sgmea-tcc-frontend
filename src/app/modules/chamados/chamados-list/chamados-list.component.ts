import {Component} from '@angular/core';
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
    SgmeaNoDataComponent
  ],
  templateUrl: './chamados-list.component.html',
  styleUrl: './chamados-list.component.scss'
})
export class ChamadosListComponent extends AbstractListController<ChamadoCriado> {


  constructor(service: ChamadoCriadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  customList($event: ChamadoFilter) {

  }
}
