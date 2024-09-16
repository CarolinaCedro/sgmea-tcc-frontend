import {Component, OnInit} from '@angular/core';
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Gestor} from "../../../model/gestor";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GestorService} from "../service/gestor.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {
    SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {TecnicoFilterComponent} from "../../tecnicos/filter/tecnico-filter/tecnico-filter.component";
import {GestorFilter, GestorFilterComponent} from "../filter/gestor-filter/gestor-filter.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-gestor-list',
  standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        NgForOf,
        SgmeaListComponent,
        RouterLink,
        SgmeaContainerListComponent,
        TecnicoFilterComponent,
        GestorFilterComponent,
        SgmeaNoDataComponent,
        MatPaginatorModule
    ],
  templateUrl: './gestor-list.component.html',
  styleUrl: './gestor-list.component.scss'
})
export class GestorListComponent extends AbstractListController<Gestor> implements OnInit {
  constructor(service: GestorService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  customList($event: GestorFilter) {


  }
}
