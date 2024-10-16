import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractListController} from "../../utis/abstract/abstract-list-controller";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SgmeaListComponent} from "../../../shared/components/sgmea-list/sgmea-list.component";
import {
  SgmeaContainerListComponent
} from "../../../shared/components/sgmea-container-list/sgmea-container-list.component";
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {SgmeaNoDataComponent} from "../../../shared/components/sgmea-no-data/sgmea-no-data.component";
import {ChamadoAtribuido} from "../../../model/chamado-atribuido";
import {forkJoin, Observable} from "rxjs";
import {PriorizacaoChamadoService} from "../../priorizao-chamado/service/priorizacao-chamado.service";
import {MatIconModule} from "@angular/material/icon";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {ChamadoAtribuidoService} from "../service/chamado-atribuido.service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AuthService} from "../../../core/auth/service/auth/auth.service";
import {User} from "../../../model/user";
import {Perfil} from "../../../model/enum/perfil";

@Component({
  selector: 'app-consolidacao-list',
  standalone: true,
  imports: [
    SgmeaListComponent,
    SgmeaContainerListComponent,
    NgForOf,
    MatMenuModule,
    RouterLink,
    SgmeaNoDataComponent,
    MatIconModule,
    JsonPipe,
    NgClass,
    MatPaginatorModule
  ],
  templateUrl: './consolidacao-list.component.html',
  styleUrl: './consolidacao-list.component.scss'
})
export class ConsolidacaoListComponent extends AbstractListController<ChamadoAtribuido> implements OnInit, AfterViewInit {

  chamadosAtribuidos: ListResource<ChamadoAtribuido>
  currentUser!: User

  constructor(service: ChamadoAtribuidoService,
              private chamadoAtribuidoService: PriorizacaoChamadoService,
              router: Router, route: ActivatedRoute,
              private authService: AuthService
  ) {
    super(service, router, route);
  }


  ngAfterViewInit() {
    this.getCurrentUser()
    console.log('current user',this.currentUser)
    this.getChamadosAtribuidos()
  }


  getChamadosAtribuidos(): void {

    // if (this.currentUser.perfil === "TECNICO") {
    //   console.log('é tecnico')
      // const idTec = this.currentUser.id;
      //
      // this.chamadoAtribuidoService.getChamadosAtribuidosByTec(idTec).subscribe((chamados: ListResource<ChamadoAtribuido>) => {
      //   console.log("Chamados atribuídos by tecn recebidos:", chamados.records);
      //
      //   forkJoin(
      //     chamados.records.map((chamado) =>
      //       this.chamadoAtribuidoService.findByListOfChamadosAtribuidosFully(chamado)
      //     )
      //   ).subscribe((chamadosCompletos: ChamadoAtribuido[]) => {
      //     console.log("Chamados completos:", chamadosCompletos);
      //
      //     // Atualiza o objeto `records` do `ListResource` com os chamados completos
      //     chamados.records = chamadosCompletos;
      //
      //     // Agora o objeto `ListResource` atualizado está pronto para uso
      //     this.chamadosAtribuidos = chamados;
      //     console.log("ListResource atualizado com chamados completos:", chamados);
      //   }, (error) => {
      //     console.error("Erro ao carregar chamados completos:", error);
      //   });
      // });

    // }

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
        console.log("ListResource atualizado com chamados completos:", chamados);
      }, (error) => {
        console.error("Erro ao carregar chamados completos:", error);
      });
    });
  }


  getCurrentUser(): Observable<User> {

    return this.authService.userCurrent;
  }


}
