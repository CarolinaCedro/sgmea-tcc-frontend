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

@Component({
  selector: 'app-chamados-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './chamados-list.component.html',
  styleUrl: './chamados-list.component.scss'
})
export class ChamadosListComponent extends AbstractListController<ChamadoCriado> {


  constructor(service: ChamadoCriadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

}
