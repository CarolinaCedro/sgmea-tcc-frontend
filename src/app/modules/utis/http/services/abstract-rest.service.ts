import {HttpService} from './http.service';
import {forkJoin, Observable, of} from 'rxjs';
import {serialize} from 'class-transformer';
import {ModelService, PathVariable} from './model-service.interface';
import {catchError, expand, map, mergeMap, reduce, take, takeWhile} from 'rxjs/operators';
import {throwErrorMessage} from '../model/exception/error-message.model';
import {isListResource, ListResource} from '../model/list-resource.model';
import {Model} from '../model/model';
import {SrQuery} from '../criteria';
import {isEmpty, isNotNullOrUndefined, isNullOrUndefined, isObject, isString, splitArray} from '../../utils';
import {
  deserializeArray as customDeserializeArray,
  deserializeItem as customDeserializeItem,
  deserializeListResource as customDeserializeListResource,
} from '../converter/converte';
import {LocalStorageService} from "../../localstorage/local-storage.service";
import {inject} from "@angular/core";

export abstract class AbstractRestService<T extends Model> implements ModelService<T> {
  // protected readonly log: Logg = Logg.of(this.getNameOfService());

  public TOKEN: string = "token";
  public localStorage: LocalStorageService;


  constructor(public type: any, protected serviceUrl: string, public http: HttpService) {
    this.localStorage = inject(LocalStorageService)
  }

  public setToken(token: string): void {
    this.TOKEN = token;
  }


  protected buildServiceUrl(query?: SrQuery | string | null, pathVariable?: PathVariable | null): string {
    let url: string = '';

    if (isNotNullOrUndefined(query)) {
      url = isString(query) ? query as string : this.serviceUrl + (query as SrQuery).build();
    } else {
      url = this.serviceUrl;
    }

    if (isNotNullOrUndefined(pathVariable)) {
      Object.keys(pathVariable)
        .forEach((key: string) => {
          if (pathVariable) {
            url = url.replace('{' + key + '}', pathVariable[key]);
          }
        });
    }
    return url;
  }

  protected getNameOfService(): string {
    return this.constructor.name;
  }

  save(value: T, pathVariable?: PathVariable): Observable<T> {

    // console.log("ele pega o token", this.localStorage.getItem(this.TOKEN))
    return of(serialize(value))
      .pipe(
        mergeMap(payload =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            // .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable))
            .post(payload)
            //pelo fato de ser um poste não se tem necessidade de se pegar a resposta
            //.map((res: Response) => res.json())
            .pipe(
              take(1),
              catchError((err) => throwErrorMessage(err)),
            ),
        ),
      );
  }

  update(value: T, pathVariable?: PathVariable): Observable<T> {
    console.log("caindo aqui put ????")
    return of(serialize(value))
      .pipe(
        mergeMap(payload =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            .url(this.buildServiceUrl(null, pathVariable) + '/' + value.id)
            .put(payload)
            .pipe(
              take(1),
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err)),
            ),
        ),
      );
  }

  findById(id: string | T, pathVariable?: PathVariable): Observable<T> {
    return of(id)
      .pipe(
        mergeMap(_id => {
            if (isNullOrUndefined(_id)) {
              return of(null);
            }
            return this.http
              .createRequest()
              .setAuthToken(this.localStorage.getItem(this.TOKEN))
              // .usingLog(this.log)
              .url(this.buildServiceUrl(null, pathVariable) + '/' + (isString(_id) ? _id as string : (_id as T).id))
              .get()
              .pipe(
                take(1),
                map((result) => this.deserializeItem(result)),
                catchError((err) => throwErrorMessage(err)),
              );
          },
        ),
      );
  }

  findByIds(ids: Array<string | T>, targetList?: ListResource<any> | Array<any>, pathVariable?: PathVariable): Observable<Array<T>>;
  findByIds(ids: any, targetList?: any, pathVariable?: PathVariable): Observable<Array<T>> {
    return of(ids)
      .pipe(
        mergeMap((ids: Array<string | T>) => {
          //se não tiver itens válidos, devemos retornar um array vazio
          if (isEmpty(ids)) {
            return of([]);
          }
          //pegando apenas itens válidos
          const _ids = ids
            .filter(id => isNotNullOrUndefined(id))
            .map(id => isString(id) ? id as string : (id as T).id);

          if (isEmpty(_ids)) {
            return of([]);
          }

          return of(_ids)
            .pipe(
              //removendo qualquer id repetido
              map((_idss: Array<string>) => Array.from(new Set(_idss))),
              //criando pool de requisições para carregar os itens
              map((_idss: Array<string>) => {
                return splitArray(_idss, 50).map(it => this.createRequestFindByIds(it, pathVariable));
              }),
              mergeMap((idsRequest: Array<Observable<T[]>>) => forkJoin(idsRequest)),
              map((results: Array<Array<T>>) => {
                return results.reduce((value, currentValue) => value.concat(currentValue), []);
              }),
              map((result: Array<T>) => {
                //vamos fazer o processo de databinding
                if (!isEmpty(targetList)) {
                  result.forEach((resultIt: T) => {

                    let targetItens: Array<any> = null;
                    //pegando uma listagem de itens de um resource
                    if (isListResource(targetList)) {
                      targetItens = (targetList as ListResource<any>).records.filter(it => isNotNullOrUndefined(it));
                    } else {
                      targetItens = (targetList as Array<any>).filter(it => isNotNullOrUndefined(it));
                    }
                    //iterando a listagem de target
                    //pode ser que estejamos interando um array de contas
                    //nesse caso vamo ver se encontramo algum objeto com o id esperado
                    let aux = false;
                    targetItens.filter(it => resultIt.id === it["id"])
                      .forEach((it: any, index: number) => {
                        Model.databinding(it, resultIt);
                        //targetItens[index] = resultIt;
                        aux = true;
                      });
                    if (!aux) {
                      targetItens.forEach(itTarget => {
                        Object.keys(itTarget).filter(itKey =>
                          isNotNullOrUndefined(itTarget[itKey]) &&
                          isObject(itTarget[itKey]) &&
                          isNotNullOrUndefined(itTarget[itKey]["id"]) &&
                          itTarget[itKey]["id"] === resultIt.id
                        ).map(itKey => itTarget[itKey] = resultIt);
                      });
                    }
                  });
                }
                return result;
              })
            );
        })
      );
  }


  private createRequestFindByIds(ids: Array<string>, pathVariable?: PathVariable): Observable<T[]> {
    return of(ids)
      .pipe(
        mergeMap(idsRequest => {
          const request = this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            // .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + '/ids');

          //adicionado parametros da requisicao
          idsRequest.forEach(idsr => request.appendParam('ids', idsr));

          return request.get()
            .pipe(
              take(1),
              map((result) => this.deserializeArray(result)),
              catchError((err) => throwErrorMessage(err)),
            );
        }),
      );
  }

  findByIdFully(id: any, pathVariable?: PathVariable): Observable<T> {
    return this.findById(id, pathVariable);
  }

  first(pathVariable?: PathVariable): Observable<T> {
    console.log('first');
    return of(null)
      .pipe(
        mergeMap(() =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            // .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + '/first')
            .get()
            .pipe(
              take(1),
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err)),
            ),
        ),
      );
  }

  firstFully(pathVariable?: PathVariable): Observable<T> {
    return this.first(pathVariable);
  }

  delete(value: T, pathVariable?: PathVariable): Observable<T> {
    return of(value)
      .pipe(
        mergeMap(_value =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            // .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + '/' + _value.id)
            .delete()
            .pipe(
              take(1),
              catchError((err) => throwErrorMessage(err)),
            ),
        ),
      );
  }

  count(pathVariable?: PathVariable): Observable<number> {
    return of(null)
      .pipe(
        mergeMap(() =>
          this.http
            .createRequest()
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            // .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + '/count')
            .acceptTextOnly()
            .get()
            .pipe(
              take(1),
              map((value: string) => Number(value)),
              catchError((err) => throwErrorMessage(err)),
            ),
        ),
      );
  }

  list(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of([query])
      .pipe(
        map(() => this.buildServiceUrl(query, pathVariable)),
        mergeMap(url =>
          this.http
            .createRequest()
            // .usingLog(this.log)
            .setAuthToken(this.localStorage.getItem(this.TOKEN))
            .url(url)
            .get()
            .pipe(
              map((result) => this.deserializeListResource(result)),
              catchError((err) => throwErrorMessage(err))
            )
        )
      );
  }

  listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return this.list(query, pathVariable);
  }

  listAll(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.list(query, pathVariable)
            .pipe(
              // expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage(), pathVariable) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list);
              }),
              map(list => list),
              reduce((acumulator: ListResource<T>, currentVaue: ListResource<T>) => {
                return acumulator.pushAll(currentVaue);
              })
            )
        )
      );
  }

  listAllFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.listFully(query)
            .pipe(
              // expand((list: ListResource<T>) => list.hasNextPage() ? this.listFully(list._metadata.nextPage(), pathVariable) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list);
              }),
              map(list => list),
              reduce((acumulator: ListResource<T>, currentVaue: ListResource<T>) => {
                return acumulator.pushAll(currentVaue);
              })
            )
        )
      );
  }

  protected deserializeItem(value: object, clazz?: any);
  protected deserializeItem(value: object, clazz?: any): T {
    if (isNullOrUndefined(clazz)) {
      clazz = this.type;
    }
    try {
      const result = customDeserializeItem(value, clazz);
      // this.log.d('payload response', result);
      return result;
    } catch (error) {
      // this.log.e('error on deserialize item ', error);
      throw error;
    }
  }

  protected deserializeArray(values, clazz?: any);
  protected deserializeArray(values, clazz?: any): Array<T> {
    let itens = new Array<T>();
    if (isNullOrUndefined(clazz)) {
      clazz = this.type;
    }
    try {
      itens = customDeserializeArray(values, clazz);
      // this.log.d('payload response', itens);
    } catch (error) {
      // this.log.e('error on deserialize ', error);
      throw error;
    }
    return itens;
  }

  protected deserializeListResource(value: any, clazz?: any);
  protected deserializeListResource(value: any, clazz?: any): ListResource<T> {
    let list = new ListResource<T>();
    if (isNullOrUndefined(clazz)) {
      clazz = this.type;
    }
    try {
      list = customDeserializeListResource(value, clazz);
    } catch (error) {
      // this.log.e("error on deserialize ", error);
      throw error;
    }

    return list;
  }

}
