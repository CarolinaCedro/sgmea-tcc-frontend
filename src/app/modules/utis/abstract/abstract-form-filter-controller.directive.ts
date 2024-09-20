import {AbstractControl, FormGroup} from "@angular/forms";
import {Directive, EventEmitter, inject, Input, OnDestroy, Output} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable, of, Subject, Subscription} from "rxjs";
import {debounceTime, map, mergeMap, take, takeUntil} from "rxjs/operators";
import {QueryParamUtilsService} from "./query-param/query-param-utils.service";
import {
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isEquals,
  isModel,
  isNotNullOrUndefined,
  isNullOrUndefined, isNumber,
  isString
} from "../utils";
import {Model} from "../http/model/model";
import {ModelService} from "../../../core/abstract/service/model/model-service";


@Directive({
    standalone: true
})
export abstract class AbstractFormFilterController<T extends object> implements OnDestroy {

    form: FormGroup;

    value: T;

    private lastValue: T;

    protected queryParamService: QueryParamUtilsService;

    protected mapObservables: Map<string, BehaviorSubject<any>> = new Map<string, BehaviorSubject<any>>();

    protected unsubscribes: Subject<void> = new Subject();

    protected unsubscribeBehaviors: Subscription = Subscription.EMPTY;


    @Input()
    autoEmitValuesChange: boolean = true;

    private _valuesChanges = new EventEmitter<T>();


    /*
    * Este método retorna um fluxo observável que emite alterações nos valores do formulário.
    * Se a propriedade autoEmitValuesChange for verdadeira, o método aplica um atraso de 1000 milissegundos
    * entre as emissões. Caso contrário, aplica um atraso de 200 milissegundos.
    * Em ambos os casos, apenas a última alteração dentro do intervalo de atraso é emitida.
    * */
    @Output()
    get valuesChanges(): Observable<T> {
        if (this.autoEmitValuesChange) {
            return this._valuesChanges
                .pipe(
                    debounceTime(1000),
                    // srDistinctUntilChanged()
                );
        }
        return this._valuesChanges
            .pipe(
                debounceTime(200),
            );
    }

    private firstInterate: boolean = false;

    protected constructor(protected clazz: any, form: FormGroup) {
        this.form = form;
        this.queryParamService = inject(QueryParamUtilsService);
    }


    /*
    * Este método adiciona um observador de comportamento para um determinado campo identificado pela chave key.
    * Ele monitora as mudanças no valor do campo e atualiza o estado interno do formulário.
    * Ele também é responsável por notificar automaticamente sobre as mudanças quando há alterações no formulário.
    * */
    private addListenerBehavior(key: string, subject: BehaviorSubject<any>): void {
        //garantindo que não iremos monitorar a mesma chave mais de uma vez
        this.validateKeyInMap(key);
        //adicionando o fluxo no map
        this.mapObservables.set(key, subject);
        const observables: Array<Observable<any>> = new Array<Observable<any>>();
        //preparando todos os itens para serem monitorados
        this.mapObservables.forEach((stream, key) => {
            observables.push(
                stream.pipe(
                    map(value => {
                        return {"key": key, "value": value};
                    })
                )
            );
        });
        //se desenscrevendo do fluxo anterior
        this.unsubscribeBehaviors.unsubscribe();
        //criando novo fluxo
        this.unsubscribeBehaviors =
            of(null)
                .pipe(
                    //delay(350),
                    mergeMap(() => combineLatest(observables)
                        .pipe(
                            map((values: Array<{ key: string, value: any }>) => {
                                const currentData = {};
                                values.forEach(it => currentData[it.key] = it.value);
                                return currentData;
                            }),
                            //debounceTime(750),
                            // distinctUntilChanged() //destravando
                        )
                    )
                ).subscribe(formValue => {
                this.value = this.databinding(this.value, formValue);
                //emitir automaticamento quando ouver mudança?
                if (this.autoEmitValuesChange) {
                    this.emitValuesChange();
                }
            });
    }

  emitValuesChangeFilter(): void {
    console.log("emit values click")
    if (this.autoEmitValuesChange) {
      if (!isEquals(this.value, this.lastValue)) {
        this.lastValue = Model.cloneObject(this.value, this.clazz) as T;
        this._valuesChanges.emit(this.value);
      }
    } else {
      this._valuesChanges.emit(this.value);
    }
  }



  /*
  * Este método emite um evento informando que houve uma mudança nos valores do formulário.
  * Ele compara o valor atual com o último valor emitido e só emite um evento se houver uma diferença.
  * */
    emitValuesChange(): void {
        // console.log("emitValuesChange sendo apertado")
        if (this.autoEmitValuesChange) {
            if (!isEquals(this.value, this.lastValue)) {
                this.lastValue = Model.cloneObject(this.value, this.clazz) as T;
                this._valuesChanges.emit(this.value);
            }
        } else {
            this._valuesChanges.emit(this.value);
        }
    }


    /*
    * Este método retorna os itens associados a uma chave específica no mapa de observáveis.
    * */
    getItensFrom(key: string): Array<any> {
        return this.mapObservables.get(key).value;
    }


    /*
    * Este método adiciona itens a uma chave específica no mapa de observáveis.
    * */
    addItensFrom(key: string, items: any): void {
        const newItens = new Array();
        if (isArray(items)) {
            (items as Array<any>).forEach(it => newItens.push(it));
        } else {
            newItens.push(items);
        }
        let currentValues = this.mapObservables.get(key).value;
        if (isNullOrUndefined(currentValues)) {
            currentValues = new Array();
        }
        newItens.forEach(it => currentValues.push(it));
        this.mapObservables.get(key).next(currentValues);
    }


    /*
    * Este método remove itens de uma chave específica no mapa de observáveis.
    * */
    removeItensFrom(key: string, items: any): void {
        const newItens = new Array();
        if (isArray(items)) {
            (items as Array<any>).forEach(it => newItens.push(it));
        } else {
            newItens.push(items);
        }
        let currentValues = this.mapObservables.get(key).value;

        currentValues = currentValues.filter(it => newItens.filter(other => other["id"] === it["id"]).length === 0);

        this.mapObservables.get(key).next(currentValues);
    }


    /*
    * Este método adiciona um observador para um campo numérico identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForNumber(key: string, defaultValue?: number): void {
        const numberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, numberSubject);
        //recuperando dados da URL
        of(this.queryParamService.getParameter(key))
            .pipe(
                map(value => {
                    const numValue = isEmpty(value) ? null : Number(value);
                    if (isNaN(numValue)) {
                        // this.queryParamService.remove(key);
                        return null;
                    }
                    return numValue;
                }),
                map(numValue => {
                    //se não recuperou nada, logo iremos setar o valor padrão passado
                    if (isNullOrUndefined(numValue)) {
                        //console.log("Setando valor default");
                        if (isNotNullOrUndefined(defaultValue)) {
                            this.queryParamService.setParameter(key, defaultValue.toString());
                        }
                        return defaultValue;
                    }
                    //console.log("recuperou valor da URL");
                    return numValue;
                }),
                //setando o valor recuperado no form e notificando a cadeia
                map(numValue => {
                    numberSubject.next(numValue);
                    this.getPath(key).patchValue(numValue);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //console.log("Teve alteração no formulário");
            //garantindo que iremos notificar somente strings
            if (isNullOrUndefined(value) || isString(value)) {
                numberSubject.next(value);
                this.queryParamService.setParameter(key, value);
            }
        });
    }


    /*
    * Este método adiciona um observador para um campo de texto identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForString(key: string, defaultValue?: string): void {
        const stringSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, stringSubject);
        //recuperando dados da URL
        of(this.queryParamService.getParameter(key))
            .pipe(
                map(strValue => {
                    //se não recuperou nada, logo iremos setar o valor padrão passado
                    if (isNullOrUndefined(strValue)) {
                        //console.log("Setando valor default");
                        this.queryParamService.setParameter(key, defaultValue);
                        return defaultValue;
                    }
                    //console.log("recuperou valor da URL");
                    return strValue;
                }),
                //setando o valor recuperado no form e notificando a cadeia
                map(strValue => {
                    stringSubject.next(strValue);
                    this.getPath(key).patchValue(strValue);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //console.log("Teve alteração no formulário");
            //garantindo que iremos notificar somente strings
            if (isNullOrUndefined(value) || isString(value)) {
                stringSubject.next(value);
                this.queryParamService.setParameter(key, value);
            }
        });
    }


    /*
    * Este método adiciona um observador para um campo de data identificado pela chave key
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForDate(key: string, defaultValue?: Date): void {
        const dateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, dateSubject);
        //recuperando dados da URL
        of(this.queryParamService.getDate(key))
            .pipe(
                map(dateValue => {
                    //se não recuperou nada, logo iremos setar o valor padrão passado
                    if (isNullOrUndefined(dateValue)) {
                        //console.log("Setando valor default");
                        this.queryParamService.setDateParameter(key, defaultValue);
                        return defaultValue;
                    }
                    //console.log("recuperou valor da URL");
                    return dateValue;
                }),
                //setando o valor recuperado no form e notificando a cadeia
                map(dateValue => {
                    dateSubject.next(dateValue);
                    this.getPath(key).patchValue(dateValue);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //console.log("Teve alteração no formulário");
            //garantindo que iremos notificar somente datas
            if (isNullOrUndefined(value) || isDate(value)) {
                dateSubject.next(value);
                this.queryParamService.setDateParameter(key, value);
            }
        });
    }


    /*
    * Este método adiciona um observador para um campo de modelo identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForModel(key: string, service: ModelService<Model>): void {
        const modelSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, modelSubject);
        //recuperando dados da URL
        of(this.queryParamService.getModel(key, service.type))
            .pipe(
                mergeMap(modelValue => isNotNullOrUndefined(modelValue) ? service.findByIdFully(modelValue) : of(null)),
                //setando o valor recuperado no form e notificando a cadeia
                map(modelValue => {
                    modelSubject.next(modelValue);
                    this.getPath(key).patchValue(modelValue);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //garantindo que iremos notificar somente models
            if (isNullOrUndefined(value) || isModel(value)) {
                modelSubject.next(value);
                this.queryParamService.setModelParam(key, value);
            }
        });
    }


    /*
    * Este método adiciona um observador para um array de modelos identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForArrayOfModel(key: string, service: ModelService<Model>): void {
        const arrayModelSubject: BehaviorSubject<Array<Model>> = new BehaviorSubject<Array<Model>>(new Array<Model>());
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, arrayModelSubject);
        //recuperando dados da URL
        of(this.queryParamService.getAllModel(key, service.type))
            .pipe(
                mergeMap(modelValues => !isEmpty(modelValues) ? service.findByIds(modelValues) : of(new Array<Model>())),
                //setando o valor recuperado no form e notificando a cadeia
                map(modelValue => {
                    arrayModelSubject.next(modelValue);
                    //this.getPath(key).patchValue(modelValue);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        arrayModelSubject
            .pipe(
                takeUntil(this.unsubscribes)
            )
            .subscribe(values => {
                this.queryParamService.setModelParam(key, values);
            });

    }


    /*
    * Este método adiciona um observador para um campo booleano identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForBoolean(key: string, defaultValue?: boolean): void {
        const booleanSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, booleanSubject);
        //recuperando dados da URL
        of(this.queryParamService.getParameter(key))
            .pipe(
                map(value => {
                    //se não recuperou nada, logo iremos setar o valor padrão passado
                    if (isNullOrUndefined(value)) {
                        //console.log("Setando valor default");
                        this.queryParamService.setParameter(key, "" + defaultValue);
                        return defaultValue;
                    }
                    //console.log("recuperou valor da URL");
                    return value === "true";
                }),
                //setando o valor recuperado no form e notificando a cadeia
                map(value => {
                    booleanSubject.next(value);
                    this.getPath(key).patchValue(value);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //console.log("Teve alteração no formulário");
            //garantindo que iremos notificar somente boolean
            if (isNullOrUndefined(value) || isBoolean(value)) {
                booleanSubject.next(value);
                this.queryParamService.setParameter(key, "" + value);
            }
        });
    }


    /*
    * Este método adiciona um observador para um campo de enumeração identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForEnum(key: string, deserializer: (value: string) => any, serializer: (value: any) => string, defaultValue?: any): Observable<void> {
        const enumSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, enumSubject);
        //recuperando dados da URL
        of(this.queryParamService.getParameter(key))
            .pipe(
                map(valueRecovered => deserializer(valueRecovered)),
                map(valueRecovered => {
                    //se não recuperou nada, logo iremos setar o valor padrão passado
                    if (isNullOrUndefined(valueRecovered)) {
                        //console.log("Setando valor default");
                        this.queryParamService.setParameter(key, serializer(defaultValue));
                        return defaultValue;
                    }
                    return valueRecovered;
                }),
                map(valueRecovered => {
                    enumSubject.next(valueRecovered);
                    this.getPath(key).patchValue(valueRecovered);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes)
            ).subscribe(value => {
            //console.log("Teve alteração no formulário de enum");
            //garantindo que iremos notificar somente models
            if (isNullOrUndefined(value) || isString(value) || isNumber(value)) {
                enumSubject.next(value);
                this.queryParamService.setParameter(key, serializer(value));
            }
        });
        return of(key)
            .pipe(
                map(key => this.queryParamService.getParameter(key)),
                map(valueRecovered => deserializer(valueRecovered)),
                map(valueRecovered => this.getPath(key).patchValue(valueRecovered, {emitEvent: false}))
            );
    }


    /*
    * Este método adiciona um observador para um array de enumerações identificado pela chave key.
    * Ele também recupera dados da URL e atualiza o formulário com os valores recuperados.
    * */
    addListenerForArrayOfEnum(key: string, deserializer: (value: string) => any, serializer: (value: any) => string): Observable<void> {
        const enumArraySubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
        //adicionando subject para a cadeia de monitoramento
        this.addListenerBehavior(key, enumArraySubject);
        //recuperando dados da URL
        of(this.queryParamService.getAllParameter(key))
            .pipe(
                map(valueRecovered => valueRecovered.map(it => deserializer(it))),
                map(valueRecovered => {
                    enumArraySubject.next(valueRecovered);
                    //console.log("setou o valor no enum ", valueRecovered);
                    this.getPath(key).patchValue(valueRecovered);
                }),
                take(1),
                takeUntil(this.unsubscribes)
            ).subscribe();
        //Escutando todas as alterações que tem no form
        this.getPath(key).valueChanges
            .pipe(
                takeUntil(this.unsubscribes),
                map((value: Array<any>) => value.map(it => serializer(it)))
            ).subscribe(value => {
            //console.log("Teve alteração no formulário de enum");
            //garantindo que iremos notificar somente array de enums
            if (isNullOrUndefined(value) || isArray(value)) {
                enumArraySubject.next(value);
                this.queryParamService.setParameter(key, value);
            }
        });
        return of(key)
            .pipe(
                map(key => this.queryParamService.getAllParameter(key)),
                map((valueRecovered: Array<string>) => valueRecovered.map(it => deserializer(it))),
                map(valueRecovered => this.getPath(key).patchValue(valueRecovered, {emitEvent: false}))
            );

    }


    /*
    * Este método valida se a chave já está sendo monitorada.
    * Se a chave já estiver no mapa de observáveis, uma exceção será lançada.
    * */
    validateKeyInMap(key: string): void {
        if (this.mapObservables.has(key)) {
            throw new Error("Esse campo já esta sendo monitorado [" + key + "]");
        }
    }


    /*
    * Este método é chamado quando o componente é destruído.
    * Ele finaliza todas as assinaturas e libera recursos.
    * */
    ngOnDestroy(): void {
        this.unsubscribes.next();
    }


    /*
    * Este método realiza o binding de dados entre o valor atual e o novo valor.
    * */
    private databinding(currentValue: T, value: any): T {
        return Model.databinding(currentValue, value, this.clazz) as T;
    }


    /*
    * Este método retorna o controle abstrato associado ao caminho especificado.
    * Se o controle não puder ser recuperado, uma exceção será lançada.
    * */
    private getPath(path: string): AbstractControl {
        const ctrl = this.form.get(path);
        if (isNullOrUndefined(ctrl)) {
            throw new Error("Não foi possivel recuperar o AbstractControl de [" + path + "]");
        }
        return ctrl;
    }


}
