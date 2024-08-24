import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {ChamadoCriadoService} from "../../chamados/service/chamado-criado.service";
import {MatChipsModule} from "@angular/material/chips";


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
    MatChipsModule
  ],
  templateUrl: './historico-list.component.html',
  styleUrl: './historico-list.component.scss'
})
export class HistoricoListComponent {

  chamados: any[] = [];
  displayedColumns: string[] = ['titulo', 'status', 'dataAbertura', 'dataFechamento', 'responsavel', 'prioridade', 'acoes'];

  constructor(private chamadoService: ChamadoCriadoService) {}

  ngOnInit(): void {
    this.loadChamados();
  }

  loadChamados(): void {
    this.chamadoService.getChamadosEncerrados().subscribe(data => {
      this.chamados = data;
    });
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'ABERTO':
        return 'primary'; // ou qualquer cor desejada
      case 'ENCERRADO':
        return 'accent'; // ou qualquer cor desejada
      default:
        return 'warn'; // ou qualquer cor padrão desejada
    }
  }

  getPriorityColor(priority: string): 'primary' | 'accent' | 'warn' {
    switch (priority) {
      case 'ALTA':
        return 'warn'; // ou qualquer cor desejada
      case 'Média':
        return 'accent'; // ou qualquer cor desejada
      case 'Baixa':
        return 'primary'; // ou qualquer cor desejada
      default:
        return 'primary'; // ou qualquer cor padrão desejada
    }
  }

  verDetalhes(chamado: any): void {
    // Implemente a lógica para ver detalhes
  }

}
