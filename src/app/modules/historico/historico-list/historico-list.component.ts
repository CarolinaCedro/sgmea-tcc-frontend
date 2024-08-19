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
    SgmeaListComponent
  ],
  templateUrl: './historico-list.component.html',
  styleUrl: './historico-list.component.scss'
})
export class HistoricoListComponent {

  displayedColumns: string[] = ['titulo', 'status', 'dataAbertura', 'acoes'];
  chamados: Chamado[] = [
    {titulo: 'Erro no sistema X', status: 'Aberto', dataAbertura: new Date('2024-08-01')},
    {titulo: 'Problema na rede', status: 'Fechado', dataAbertura: new Date('2024-07-25')},
    {titulo: 'Solicitação de suporte', status: 'Aberto', dataAbertura: new Date('2024-08-15')}
  ];
  dataSource = new MatTableDataSource(this.chamados);
  totalChamados = this.chamados.length;

}
