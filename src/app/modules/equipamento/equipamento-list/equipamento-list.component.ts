import {Component, OnInit} from '@angular/core';
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Equipamento} from "../../../model/equipamento";
import {EquipamentoService} from "../service/equipamento.service";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-equipamento-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './equipamento-list.component.html',
  styleUrl: './equipamento-list.component.scss'
})
export class EquipamentoListComponent extends AbstractListController<Equipamento> implements OnInit {


  constructor(service: EquipamentoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  remove(tec) {


  }
}
