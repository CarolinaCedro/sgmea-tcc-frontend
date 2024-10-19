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
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {ChamadoFilterComponent} from "../../chamados/filter/chamado-filter/chamado-filter.component";
import {EquipamentoFilter, EquipamentoFilterComponent} from "../filter/equipamento-filter/equipamento-filter.component";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TecnicoFilter} from "../../tecnicos/filter/tecnico-filter/tecnico-filter.component";
import {Subject} from "rxjs";
import {TecnicoService} from "../../tecnicos/services/tecnico.service";
import {finalize, takeUntil} from "rxjs/operators";
import {MatTabsModule} from "@angular/material/tabs";
import {ListResource} from "../../utis/http/model/list-resource.model";

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
    JsonPipe,
    SgmeaContainerListComponent,
    ChamadoFilterComponent,
    EquipamentoFilterComponent,
    SgmeaNoDataComponent,
    MatPaginatorModule,
    MatTabsModule
  ],
  templateUrl: './equipamento-list.component.html',
  styleUrl: './equipamento-list.component.scss'
})
export class EquipamentoListComponent extends AbstractListController<Equipamento> implements OnInit {

  currentFilter: EquipamentoFilter;
  equipamentosInativos: ListResource<Equipamento>;

  private cancelRequest: Subject<void> = new Subject();


  constructor(public service: EquipamentoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.service.getAllEquipamentosInactive().subscribe(res => {
      this.equipamentosInativos = res
    })
  }



  customList(filter: EquipamentoFilter) {

    this.cancelRequest.next();
    this.currentFilter = filter;
    (this.service as EquipamentoService)
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

  inativated(id: string): void {
    if (!id) {
      console.error('ID do equipamento inválido.');
      return;
    }

    this.service.inactiveEquipamento(id).subscribe({
      next: (res) => {
        this.openSnackBar("Equipamento Inativado com sucesso");
        console.log('Equipamento inativado com sucesso:', id);

        // Recarregar a lista de equipamentos
        this.refreshEquipamentoList();
      },
      error: (err) => {
        console.error('Erro ao inativar o equipamento:', err);
        this.openSnackBar("Falha ao inativar o equipamento. Tente novamente.");
      }
    });
  }

  refreshEquipamentoList(): void {
    if (this.currentFilter) {
      // Se houver um filtro aplicado, usa-o para recarregar a lista
      this.customList(this.currentFilter);
    } else {
      // Caso não haja filtro, carregue os equipamentos inativos ou ativos conforme necessário
      this.service.list().subscribe(res => {
        this.values = res;
      }, (err) => console.error('Erro ao carregar os equipamentos:', err));
      this.service.getAllEquipamentosInactive().subscribe(res => {
        this.equipamentosInativos = res;
      }, (err) => console.error('Erro ao carregar os equipamentos:', err));
    }
  }


}
