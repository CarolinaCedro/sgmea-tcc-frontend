import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {MatChipsModule} from "@angular/material/chips";
import {
  PriorizacaoFilterComponent
} from "../../priorizao-chamado/filter/priorizacao-filter/priorizacao-filter.component";
import {HistoricoFilter, HistoricoFilterComponent} from "../filter/historico-filter/historico-filter.component";
import {Subject} from "rxjs";
import {finalize, takeUntil} from "rxjs/operators";
import {ChamadoFilter} from "../../chamados/filter/chamado-filter/chamado-filter.component";


export interface Chamado {
  titulo: string;
  status: string;
  dataAbertura: Date;
}

@Component({
  selector: 'app-historico-list',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    NgClass,
    DatePipe,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    SgmeaListComponent,
    MatChipsModule,
    PriorizacaoFilterComponent,
    HistoricoFilterComponent
  ],
  templateUrl: './historico-list.component.html',
  styleUrl: './historico-list.component.scss'
})
export class HistoricoListComponent {

  chamados: any[] = [];
  displayedColumns: string[] = ['titulo', 'status', 'dataAbertura', 'dataFechamento', 'responsavel', 'prioridade', 'acoes'];

  currentFilter: HistoricoFilter;
  private cancelRequest: Subject<void> = new Subject();
  protected unsubscribes: Subject<void> = new Subject();


  constructor(private chamadoService: ChamadoCriadoService) {
  }

  ngOnInit(): void {
    this.loadChamados();
  }

  loadChamados(): void {
    this.chamadoService.getChamadosEncerrados().subscribe(data => {
      console.log("aqui o data", data)
      this.chamados = data;
    });
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' | 'fechado' {
    switch (status) {
      case 'ABERTO':
        return 'primary';
      case 'ENCERRADO':
        return 'accent';
      case 'CONCLUIDO':
        return 'fechado';
      default:
        return 'warn';
    }
  }

  getPriorityColor(priority: string): 'primary' | 'accent' | 'warn' {
    switch (priority) {
      case 'ALTA':
        return 'warn';
      case 'BAIXA':
        return 'accent';
      case 'MEDIA':
        return 'primary';
      default:
        return 'primary';
    }
  }

  verDetalhes(chamado: any): void {
    // Implemente a lógica para ver detalhes
  }

  customList(filter: HistoricoFilter) {

    this.cancelRequest.next();
    this.currentFilter = filter;
    (this.chamadoService as ChamadoCriadoService)
      .listAdvancedByConcluidos(filter)
      .pipe(
        finalize(() => {
        }),
        takeUntil(this.unsubscribes),
        takeUntil(this.cancelRequest.asObservable()),
      ).subscribe(result => {
      console.log("qual a response", result)
      this.chamados = result.records ;
    }, (err: Error) => console.log(err.message));

  }
}
