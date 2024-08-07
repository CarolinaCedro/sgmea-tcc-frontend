import { Observable } from 'rxjs';
import { Model } from '../http/model/model';
import { ListResource } from '../http/model/list-resource.model';
import { SrQuery } from '../http/criteria';
import { ErrorMessage } from '../http/model/exception/error-message.model';


export interface ListController<T extends Model> {
  nameList?: () => string;

  values: ListResource<T>;

  list(query?: SrQuery): void;

  filter(term: string): void;

  edit(value: T): void;

  remove(value: T): void;

  labelButonConfirmeRemove?(): Observable<string>;

  showErrors(error: ErrorMessage);

  getInstance(): ListController<T>;

  messageToConfirmeRemove?(): Observable<string>;
}
