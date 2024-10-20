import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Directive, inject, Input, OnDestroy, OnInit, Query, ViewChild} from '@angular/core';
import {take, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Model} from '../http/model/model';
import {ListResource} from '../http/model/list-resource.model';
import {QueryParam, QueryParamUtilsService} from './query-param/query-param-utils.service';
import {ModelService} from '../http/services/model-service.interface';
import {ErrorMessage} from '../http/model/exception/error-message.model';
import {ListController} from '../models/list-controller.interface';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/dialog/confirmation-dialog/confirmation-dialog.component";
import {SrQuery} from "../http/criteria";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


@Directive({
  standalone: true,
})
export abstract class AbstractListController<T extends Model> implements ListController<T>, OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);


  totalItems = 0; // Variável para armazenar o número total de itens
  itemsPorPagina = 8; // Número de itens exibidos por página
  pageSizeOptions = [5, 10, 25, 100]; // Opções de tamanhos de página disponíveis
  currentPage = 1; // Página atual


  values: ListResource<T>;
  protected readonly queryService: QueryParamUtilsService;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _snackBar = inject(MatSnackBar);



  protected unsubscribes: Subject<void> = new Subject();

  isLoandingMore: boolean = false;
  btnMoreData: boolean = true;
  isMore100: number = 100;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  protected constructor(protected service: ModelService<T>,
                        protected router: Router,
                        protected route: ActivatedRoute,
  ) {
    // this._fuseConfirmationService = inject(FuseConfirmationService)

    this.queryService = inject(QueryParamUtilsService);
    // this._fuseAlertService = inject(FuseAlertService)

  }

  // Método Angular executado quando o componente é inicializado.
  // Inicializa a listagem de recursos e configura um observador para eventos de rolagem da tela.
  ngOnInit() {

    this.list();
  }




  //Retorna o nome da lista para identificação.
  nameList(): string {
    return 'loandingList';
  }


  isFieldNul(field: any): string {
    if (typeof field === 'string' && field !== '') {
      return field;
    }

    return 'Não informado.';
  }


  /* Lista os recursos, opcionalmente aceitando parâmetros de consulta.
  Inicializa a lista de recursos por meio do serviço fornecido. */
  list(query?: SrQuery | any): void {
    this.service
      .listFully(query)
      .subscribe(result => {
        // console.log("vem result ?", result)
        if (result) {
          // console.log('result da list', result);
          this.values = result;
          this.totalItems = result?.records?.length;
        } else {
          // console.error('Result list is undefined or null');
          return null
        }

      }, (err: ErrorMessage) => {
        console.log("error", err)
      });

  }





  /*
  * Filtra os recursos com base no termo fornecido.
    Atualmente, recarrega a lista sem aplicar nenhum filtro.
  * */
  filter(term?: string | any): void {
    this.list();
  }


  /*
  * Navega para a página de edição do recurso especificado.
    Utiliza o Angular Router para navegar para a rota de edição do recurso.
  * */
  edit(value: T): void {
    this.router.navigate(['../' + value.id], {relativeTo: this.route});
  }


  /*
  * Remove um recurso da lista.
    Exibe um diálogo de confirmação e, se confirmado, remove o recurso usando o serviço.
  * */
  remove(value: T): void {
    console.log("clicando");
    this.openDialog({
      title: 'Confirmação',
      content: 'Tem certeza que deseja remover este item?',
      action: 'Confirmar',
      closeLabel: 'Fechar',
      data: value
    });
  }

  openDialog(data: { title: string, content: string, action: string, closeLabel: string, data: T }): void {
    console.log("entrou em open dialog")
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: data // Passando todos os dados, incluindo o item `data`
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log("clicando fora")
      if (result.action === "Confirmar") {
        console.log("result dentro", result)
        // Ação confirmada, extraindo o `value` dos dados do diálogo
        this.service.delete(data?.data).subscribe(
          () => {
            this.values.records = this.values?.records?.filter(it => it.id !== data.data.id);
          },
          (err: ErrorMessage) => {
            console.log('erros', err);
            this.showErrors(err);
          },
        );
      }
    });
  }


  /*
  * Retorna uma instância do controlador de lista atual.
  * */
  getInstance(): ListController<T> {
    return this;
  }


  /*
 * Exibe mensagens de erro.
   Registra o erro no console e pode exibir um diálogo de mensagem de erro.
 * */
  showErrors(error: ErrorMessage) {
    console.log('error show error', error.message);
  }


  /*
  * Retorna os parâmetros de consulta atuais.
  * */
  getCurrentQueryParams(): QueryParam {
    return this.queryService.addPrefix(this.queryService.getAll(), 'backParam.');
  }


  /*
  * Método Angular chamado quando o componente está prestes a ser destruído.
    Completa o observável de unsubscribes, que é usado para cancelar inscrições em observáveis para evitar vazamentos de memória.
  * */
  ngOnDestroy(): void {
    this.unsubscribes.next();
    this._unsubscribeAll.next(null);
  }


  getPaginatedList(): any[] {
    // Retorna os usuários correspondentes à página atual
    const startIndex = (this.currentPage - 1) * this.itemsPorPagina; // Índice de início da página
    const endIndex = startIndex + this.itemsPorPagina; // Índice de fim da página
    return this.values.records.slice(startIndex, endIndex); // Retorna uma fatia dos usuários com base nos índices
  }

  onPageChange(event: any): void {
    // Atualiza a página atual quando ocorre a mudança de página
    this.currentPage = event.pageIndex + 1;
    this.itemsPorPagina = event.pageSize;
  }

  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this._snackBar.open(message, "Fechar", config);
  }


}
