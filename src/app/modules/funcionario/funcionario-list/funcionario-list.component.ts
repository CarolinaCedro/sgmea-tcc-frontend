import {Component, OnInit} from '@angular/core';
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Funcionario} from "../../../model/funcionario";
import {ActivatedRoute, Router} from "@angular/router";
import {FuncionarioService} from "../service/funcionario.service";

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss'
})
export class FuncionarioListComponent extends AbstractListController<Funcionario> implements OnInit {

  constructor(service: FuncionarioService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


}
