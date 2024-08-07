import {Observable} from "rxjs";
// import {SrQuery} from "../sr-criteria";
// import {Model} from "../model/model";
// import {ListResource} from "../model/list-resource.model";



export declare interface PathVariable {
  [key: string]: any;
}

export interface ModelService<T> {
  type: any;

  save(value: T, pathVariable?: PathVariable): Observable<T>;

  update(value: T, pathVariable?: PathVariable): Observable<T>;

  findById(id: string | T, pathVariable?: PathVariable): Observable<T>;

  findByIds(ids: Array<string | T>, pathVariable?: PathVariable): Observable<Array<T>>;

  findByIds(ids: any, pathVariable?: PathVariable): Observable<Array<T>>;

  findByIdFully(ids: any, pathVariable?: PathVariable): Observable<T>;

  first(pathVariable?: PathVariable): Observable<T>;

  firstFully(pathVariable?: PathVariable): Observable<T>;

  delete(value: T, pathVariable?: PathVariable): Observable<T>;

  count(pathVariable?: PathVariable): Observable<number>;

  // list(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;
  //
  // listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;
  //
  // listAll(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;
  //
  // listAllFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;
}
