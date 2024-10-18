import {AfterViewInit, Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
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
import {forkJoin, Subject} from "rxjs";
import {finalize, takeUntil} from "rxjs/operators";
import {PriorizacaoChamadoService} from "../service/priorizacao-chamado.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatExpansionModule} from "@angular/material/expansion";

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
    JsonPipe,
    NgClass,
    MatPaginatorModule,
    MatExpansionModule
  ],
  templateUrl: './priorizaocao-chamado-list.component.html',
  styleUrl: './priorizaocao-chamado-list.component.scss'
})
export class PriorizaocaoChamadoListComponent extends AbstractListController<ChamadoCriado> implements AfterViewInit {

  chamadosAtribuidos: ListResource<ChamadoAtribuido>
  currentFilter: ChamadoFilter;
  private cancelRequest: Subject<void> = new Subject();


  constructor(public service: ChamadoCriadoService, private chamadoAtribuidoService: PriorizacaoChamadoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }


  ngAfterViewInit() {
    this.getChamadosAtribuidos()
  }


  getChamadosAtribuidos(): void {
    this.chamadoAtribuidoService.getChamadosAtribuidos().subscribe((chamados: ListResource<ChamadoAtribuido>) => {
      console.log("Chamados atribuídos recebidos:", chamados.records);

      forkJoin(
        chamados.records.map((chamado) =>
          this.chamadoAtribuidoService.findByListOfChamadosAtribuidosFully(chamado)
        )
      ).subscribe((chamadosCompletos: ChamadoAtribuido[]) => {
        console.log("Chamados completos:", chamadosCompletos);

        // Atualiza o objeto `records` do `ListResource` com os chamados completos
        chamados.records = chamadosCompletos;

        // Agora o objeto `ListResource` atualizado está pronto para uso
        this.chamadosAtribuidos = chamados;
        this.totalItems = chamados?.records?.length;

        console.log("ListResource atualizado com chamados completos:", chamados);
      }, (error) => {
        console.error("Erro ao carregar chamados completos:", error);
      });
    });
  }


  customList(filter?: ChamadoFilter) {

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
