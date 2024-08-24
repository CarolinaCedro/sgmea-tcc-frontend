import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Departamento} from "../../../model/departamento";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DepartamentoService} from "../service/departamento.service";

@Component({
  selector: 'app-departamento-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    SgmeaListComponent,
    RouterLink
  ],
  templateUrl: './departamento-list.component.html',
  styleUrl: './departamento-list.component.scss'
})
export class DepartamentoListComponent extends AbstractListController<Departamento> implements OnInit {

  constructor(service: DepartamentoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


}
