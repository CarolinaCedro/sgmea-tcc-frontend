import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {JsonPipe, NgForOf} from "@angular/common";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {ChamadoCriado} from "../../../model/chamado-criado";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {
  DepartamentosFilterComponent
} from "../../departamentos/filter/departamentos-filter/departamentos-filter.component";
import {PriorizacaoFilterComponent} from "../filter/priorizacao-filter/priorizacao-filter.component";
import {ChamadoFilter} from "../../chamados/filter/chamado-filter/chamado-filter.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {forkJoin, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {PriorizacaoChamadoService} from "../service/priorizacao-chamado.service";

@Component({
  selector: 'app-priorizaocao-chamado-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    SgmeaListComponent,
    RouterLink,
    SgmeaContainerListComponent,
    DepartamentosFilterComponent,
    PriorizacaoFilterComponent,
    SgmeaNoDataComponent,
    MatTabsModule,
    JsonPipe
  ],
  templateUrl: './priorizaocao-chamado-list.component.html',
  styleUrl: './priorizaocao-chamado-list.component.scss'
})
export class PriorizaocaoChamadoListComponent extends AbstractListController<ChamadoCriado> implements AfterViewInit {

  chamadosAtribuidos: ChamadoAtribuido[] = []


  constructor(public service: ChamadoCriadoService, private chamadoAtribuidoService: PriorizacaoChamadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  ngAfterViewInit() {
    this.getChamadosAtribuidos()
  }


  getChamadosAtribuidos(): void {
    this.chamadoAtribuidoService.getChamadosAtribuidos().subscribe((chamados: ChamadoAtribuido[]) => {
      console.log("Chamados atribuídos recebidos:", chamados);
      forkJoin(
        chamados.map((chamado) => this.chamadoAtribuidoService.findByListOfChamadosAtribuidosFully(chamado))
      ).subscribe((chamadosCompletos: ChamadoAtribuido[]) => {
        this.chamadosAtribuidos = chamadosCompletos;  // Agora o tipo é ChamadoAtribuido[]
        console.log("Chamados atribuídos com dados completos:", chamadosCompletos);
      }, (error) => {
        console.error("Erro ao carregar chamados completos:", error);
      });
    });
  }


  customList($event: ChamadoFilter) {

  }
}
