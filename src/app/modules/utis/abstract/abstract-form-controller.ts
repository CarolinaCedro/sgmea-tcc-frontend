import {FormGroup} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AfterViewInit, Directive, EventEmitter, inject, OnDestroy, Output} from '@angular/core';
import {debounceTime, map, mergeMap, take, takeUntil} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ModelService} from '../http/services/model-service.interface';
import {Model} from '../http/model/model';
import {isEmpty, isNotNullOrUndefined, isNullOrUndefined} from '../utils';
import {ErrorMessage} from '../http/model/exception/error-message.model';
import {FormController} from '../models/form-controller.interface';
import {FormDeactivateService} from './service/form-deactivate.service';
import {QueryParamUtilsService} from './query-param/query-param-utils.service';


// const errorConfigCancel: FuseConfirmationConfig = {
//     title: "Cancelar Operação",
//     message: "Tem certeza de que deseja cancelar esta operação? Todas as alterações não salvas serão perdidas.",
//     icon: {
//         show: true,
//         name: "cancel",
//         color: "warning"
//     },
//     actions: {
//         cancel: {
//             show: true,
//             label: "Cancelar"
//         }
//     },
//     dismissible: true
// };
//
// const errorDisplay: FuseConfirmationConfig = {
//     title: "Cancelar Operação",
//     message: "Tem certeza de que deseja cancelar esta operação? Todas as alterações não salvas serão perdidas.",
//     icon: {
//         show: true,
//         name: "cancel",
//         color: "warning"
//     },
//     actions: {
//         cancel: {
//             show: true,
//             label: "Cancelar"
//         }
//     },
//     dismissible: true
// };


@Directive({
  standalone: true,
})
export abstract class AbstractFormController<T extends Model> implements FormController<T>, AfterViewInit, OnDestroy {

  value: T;

  service: ModelService<T>;

  protected unsubscribes: Subject<void> = new Subject();

  passwordTextType!: boolean;
  hidePassword = true;

  form: FormGroup;

  submitted = false;


  mult: boolean = false;

  public isUpdateData: boolean = false;

  snack: MatSnackBar = inject(MatSnackBar);


  isFormActive: boolean = true;

  // protected dialog: SrDialogService;

  protected queryParamService: QueryParamUtilsService;


  @Output()
  valuesOnChange: EventEmitter<T>;

  // readonly log: Logg = Logg.of('AbstractFormController');
  private disablePatrimonioIfEditing: boolean;


  constructor(protected clazz: any, form: FormGroup, service: ModelService<T>, protected router: Router, protected route: ActivatedRoute) {

    this.form = form;
    this.service = service;
    this.valuesOnChange = new EventEmitter<T>();
    this.queryParamService = inject(QueryParamUtilsService);

    if (!this.isFormActive) {
      this.form.disable();
    }


  }


  get f() {
    return this.form.controls;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  openSnackBar(message: string) {
    const config: MatSnackBarConfig = {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };

    this.snack.open(message, "Fechar", config);
  }


  containsMetadata(): boolean {
    return this.form.contains("metadata") ? isNotNullOrUndefined(this.form.get("metadata").get("domain")) : false;
  }

  /*
  * Método Angular chamado após a inicialização da exibição do componente.
    Configura um observador para as alterações no formulário e inicia o carregamento do recurso pelo ID.
  * */
  ngAfterViewInit(): void {

    console.log("is form active ?", this.isFormActive)

    //ovindo alterações no formulário e fazendo databing
    this.form.valueChanges
      .pipe(
        debounceTime(600),
      ).subscribe(value1 => {
      this.databinding(this.value, value1);
      this.valuesOnChange.emit(this.value);
    });
    this.loadById();
  }


  /*
  * Carrega o recurso pelo ID da rota.
  Verifica se o ID é para um novo registro ou um existente e realiza as operações correspondentes.
  * */
  loadById(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      let beforeLoadId = this.beforeLoadId(params['id']);
      if (isNullOrUndefined(beforeLoadId)) {
        beforeLoadId = of(null);
      }

      if (params['id'] === 'new_record') {
        beforeLoadId = beforeLoadId
          .pipe(
            map(() => {
              if (this.clazz) {
                this.value = createNew(this.clazz);
              }
              this.afterLoadId(this.value);
              this.valuesOnChange.emit(this.value);
            }),
          );
      } else {
        beforeLoadId = beforeLoadId
          .pipe(
            mergeMap(() => this.service.findByIdFully(params['id'])
              // .pipe(
              //   finalize(() => this.loading.hide())
              // ),
            ),
            map((result: T) => {
              this.value = result;
              this.afterLoadId(this.value);
              this.valuesOnChange.emit(this.value);
              console.log('valueeee', this.value);
              this.form.patchValue(this.value, {emitEvent: true});
            }),
          );

      }

      beforeLoadId.subscribe((result: T) => {

        }, (err: ErrorMessage) => {
          this.showErrorsDialog(err);

        },
      );
    });
  }


  /*
  * Método chamado antes de carregar o recurso pelo ID.
    Pode ser substituído nas subclasses para realizar operações adicionais antes do carregamento do recurso.
  * */
  beforeLoadId(id?: string): Observable<any> {
    return null;
  }


  /*
  * Método chamado após o carregamento bem-sucedido do recurso.
    Pode ser substituído nas subclasses para realizar operações adicionais após o carregamento do recurso.
  * */
  afterLoadId(value: T): void {
  }


  /*
  * Método chamado antes de salvar o recurso.
    Pode ser substituído nas subclasses para realizar operações adicionais antes de salvar o recurso.
  * */
  beforeSave(value: T): void {
  }


  /*
  * Salva o recurso.
    Realiza operações de salvamento e atualização do recurso usando o serviço fornecido.
  * */
  save(value: T) {
    console.log('SAVE', value);
    if (this.form.valid) {
      of(value)
        .pipe(
          map(value => {
            this.beforeSave(value);
            return value;
          }),
          mergeMap(value => {
            // this.openSnackBar("Registro atualizado' com sucesso!")
            return (isEmpty(value.id)) ? this.service.save(value) : this.service.update(value);
          }),
          map(value => {
            this.afterSave(value);
            return value;
          }),
          // finalize(() => this.loading.hide())

        ).subscribe(() => {
        if (this.mult) {
          this.form.reset();
          this.value = createNew(this.clazz);
          // this._fuseAlertService.show({
          //     message: "Operação cancelada com sucesso.",
          //     type: "warning"
          // })
        } else {
          this.openSnackBar("Registro salvo com sucesso!")
          // this._fuseAlertService.show({
          //     message: "Registro salvo com sucesso!",
          //     type: "success"
          // })
          this.returnList();
        }
      }, (err) => {
        this.openSnackBar(err?.details?.message)
        console.log('Error: ', err?.details?.message)

      });
    } else {
      this.openSnackBar("Por favor, preencha todos os campos obrigatórios antes de continuar.");
    }

  }


  /*
  * Método chamado após o salvamento bem-sucedido do recurso.
    Pode ser substituído nas subclasses para realizar operações adicionais após o salvamento do recurso.
  * */
  afterSave(value: T): void {
  }


  /*
  * Cancela a operação em andamento.
    Pode exibir um diálogo de confirmação antes de cancelar, se o método viewOnly() estiver disponível.
  * */
  cancel(): void {
    this.openSnackBar("Operação Cancelada!")
    this.returnList()
  }

  viewOnly(): Observable<boolean> {
    return of(false)
  }


  /*
  * Exibe mensagens de erro.
    Registra o erro no console e pode exibir um diálogo de mensagem de erro.
  * */
  showErrorsDialog(error: ErrorMessage) {
    // Registra o erro no console
    console.log('error', error.message, error);

    // Exibe um diálogo de mensagem de erro
    // this._fuseConfirmationService.open({
    //     title: 'Atenção',
    //     message: error?.message,
    //     icon: {
    //         show: true,
    //         name: 'heroicons_outline:exclamation-triangle',
    //         color: 'warn',
    //     },
    //     actions: {
    //         confirm: {
    //             show: true,
    //             label: 'Fechar',
    //             color: 'warn',
    //         },
    //         cancel: {
    //             show: false,
    //             label: "Cancelar",
    //         }
    //     },
    //     dismissible: false,
    // });
  }


  /*
  * Retorna uma instância do controlador de formulário atual.
  * */
  getInstance(): FormController<T> {
    return this;
  }


  /*
  * Retorna à lista de recursos.
    Navega de volta à lista após a conclusão das operações no formulário.
  * */
  private returnList(): void {
    FormDeactivateService.pressSalveOrCancel = true;
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: this.queryParamService.removePrefix(this.queryParamService.getAll('backParam.'), 'backParam.'),
    });
  }


  /*
  * Define um parâmetro de consulta na URL.
    Útil para definir parâmetros de consulta dinamicamente
  * */
  setQueryParameter(key: string, value: string) {
    if (isNotNullOrUndefined(key)) {
      const params = {};
      const keys: Array<string> = this.route.snapshot.queryParamMap.keys;
      if (!isEmpty(keys)) {
        keys.forEach(key => params[key] = this.route.snapshot.queryParamMap.get(key));
      }
      params[key] = value;
      this.router.navigate([], {queryParams: params});
    }
  }


  /*
 * Realiza o mapeamento de dados entre o formulário e o objeto de modelo.
   Pode ser estendido nas subclasses para manipular a ligação de dados
 * */
  protected databinding(currentValue: T, value: any): void {
    currentValue = Model.databinding(currentValue, value, this.clazz) as T;
  }


  /*
  * Verifica se o registro atual é um novo registro.
    Retorna um observável booleano indicando se o ID na rota é para um novo registro.
  * */
  isNewRecord(): Observable<boolean> {
    return this.route.params
      .pipe(
        map((params: Params) => params['id'] === 'new_record'),
        takeUntil(this.unsubscribes),
      );
  }


  /*
  * Método Angular chamado quando o componente está prestes a ser destruído.
    Completa o observável de unsubscribes, que é usado para cancelar inscrições em observáveis para evitar vazamentos de memória.
  * */
  ngOnDestroy(): void {
    this.unsubscribes.next();
  }

}

/*
* cria uma nova instância de um tipo de modelo específico e pode ser usada para criar novos objetos de modelo.
* */
function createNew<T extends Model>(type: { new(): T; }): T {
  return new type();
}

