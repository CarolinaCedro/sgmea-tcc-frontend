import {Component} from '@angular/core';
import {SgmeaListComponent} from '../../../shared/components/sgmea-list/sgmea-list.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

const tecnicos = [
  {id: '1', nome: 'Ana Carolina'},
  {id: '2', nome: 'Bruno Silva'},
  {id: '3', nome: 'Carla Mendes'},
  {id: '4', nome: 'Daniel Souza'},
  {id: '5', nome: 'Eduarda Lima'},
  {id: '6', nome: 'Fábio Santos'},
  {id: '7', nome: 'Gabriela Costa'},
  {id: '8', nome: 'Henrique Almeida'},
  {id: '9', nome: 'Isabela Ferreira'},
  {id: '10', nome: 'João Pereira'},
];


@Component({
  selector: 'app-tecnicos-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    RouterLink,
    MatMenuItem,
    MatMenuModule,
    NgForOf,
  ],
  templateUrl: './tecnicos-list.component.html',
  styleUrl: './tecnicos-list.component.scss',
})
export class TecnicosListComponent {

  tecnicos = tecnicos;


  remove(tecnico: any) {
    console.log('remove')
  }
}
