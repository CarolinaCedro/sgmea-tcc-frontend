import {ActivatedRoute, Router} from '@angular/router';
import {Directive, inject, OnDestroy, OnInit, Query} from '@angular/core';
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


@Directive({
  standalone: true,
})
export abstract class AbstractListController<T extends Model> implements ListController<T>, OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);


  values: ListResource<T>;
  protected readonly queryService: QueryParamUtilsService;

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  protected unsubscribes: Subject<void> = new Subject();

  isLoandingMore: boolean = false;
  btnMoreData: boolean = true;
  isMore100: number = 100;


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
    // this.layoutService.onScrolledEvent
    //     .pipe(
    //         debounceTime(1000)
    //     ).subscribe(event => {
    //     if (this.values.hasNextPage()) {
    //         console.log("chega aqui ?")
    //         this.loadNextPage(this.values);
    //     }
    // });


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
        console.log("vem result ?", result)
        if (result) {
          console.log('result da list', result);
          this.values = result;
        } else {
          // console.error('Result list is undefined or null');
          return null
        }

      }, (err: ErrorMessage) => {
        console.log("error", err)
      });

  }


  /* Carrega a próxima página de recursos.
     Utiliza o serviço para obter a próxima página de recursos e atualiza a lista de recursos. */
  // protected loadNextPage(values: ListResource<T>): void {
  //   this.service.listFully(values._metadata.nextPage())
  //     .pipe(
  //       take(1),
  //       takeUntil(this.unsubscribes),
  //       tap(records => {
  //         console.log('esses recors', records);
  //         this.isLoandingMore = false; // Definir como false após o carregamento variável spinner
  //         this.btnMoreData = true;
  //
  //         if (records.records.length < 100) {
  //           this.isLoandingMore = false;
  //           this.btnMoreData = false;
  //           console.log('tamanho', records.records.length);
  //         }
  //       }),
  //     )
  //     .subscribe(records => {
  //       console.log('como vem esses recors no loadNextPage', records);
  //       this.values.pushAll(records);
  //       console.log('os valores que vem', records);
  //       // this.LayouService.updateScroll();
  //     });
  // }


  /*
  * Carrega a próxima página de recursos em uma nova implementação de paginação.
    Funciona de maneira semelhante a loadNextPage, mas com uma lógica específica para uma nova paginação
  * */
  // protected loadNextPageNewPagination(values: ListResource<T>): void {
  //   this.service.listFully(values._metadata.nextPage())
  //     .pipe(
  //       take(1),
  //       takeUntil(this.unsubscribes),
  //       tap(records => {
  //         this.isLoandingMore = false; // Definir como false após o carregamento variável spinner
  //         this.btnMoreData = true;
  //
  //         if (records.records.length < 30) {
  //           this.isLoandingMore = false;
  //           this.btnMoreData = false;
  //           console.log('tamanho', records.records.length);
  //         }
  //       }),
  //     )
  //     .subscribe(records => {
  //       this.values.pushAll(records);
  //       // this.LayouService.updateScroll();
  //     });
  // }


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

    // Exibe um diálogo de mensagem de erro
    // this._fuseConfirmationService.open({
    //     title: "Erro",
    //     message: error.message,
    //     icon: {
    //         show: true,
    //         name: "cancel",
    //         color: "warning"
    //     },
    //     actions: {
    //         confirm: {
    //             show: true,
    //             label: "Fechar",
    //             color: "warn"
    //         },
    //         cancel: {
    //             show: false,
    //             label: "Fechar"
    //         }
    //     },
    //     dismissible: true
    // });
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


  // loadMore() {
  //   console.log('clicando');
  //   this.btnMoreData = false;
  //   this.isLoandingMore = true;
  //   if (this.values.hasNextPage()) {
  //     this.loadNextPage(this.values);
  //     // this.eventInfinitScroll.currentScrollPosition = 0;
  //   }
  // }


}
