import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";

@Component({
  selector: 'app-priorizaocao-chamado-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    SgmeaListComponent,
    RouterLink
  ],
  templateUrl: './priorizaocao-chamado-list.component.html',
  styleUrl: './priorizaocao-chamado-list.component.scss'
})
export class PriorizaocaoChamadoListComponent extends AbstractListController<ChamadoCriado> {


  constructor(service: ChamadoCriadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  remove(tec: any) {


  }


}
