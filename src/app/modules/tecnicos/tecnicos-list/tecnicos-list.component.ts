import {Component, OnInit} from '@angular/core';
import {SgmeaListComponent} from '../../../shared/components/sgmea-list/sgmea-list.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";

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
    RouterLink,
    MatMenuModule,
    NgForOf,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './tecnicos-list.component.html',
  styleUrl: './tecnicos-list.component.scss',
})
export class TecnicosListComponent extends AbstractListController<Tecnico> implements OnInit {


  constructor(service: TecnicoService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
  }

  tecnicos = tecnicos;


  remove(tecnico: any) {
    console.log('remove')
  }
}