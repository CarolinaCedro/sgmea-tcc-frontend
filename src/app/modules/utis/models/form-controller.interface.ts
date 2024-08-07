import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../http/model/exception/error-message.model';
import { Model } from '../http/model/model';


export interface FormController<T extends Model> {
  value: T;

  mult: boolean;

  form: FormGroup;

  beforeLoadId?(id?: string): Observable<any>;

  afterLoadId(value: T): void;

  beforeSave(value: T): void;

  save(value: T);

  afterSave(value: T): void;

  cancel(): void;

  showErrorsDialog(error: ErrorMessage);

  getInstance(): FormController<T>;

  setQueryParameter(key: string, value: string);

  viewOnly?(): Observable<boolean>;

  isNewRecord(): Observable<boolean>;

  containsMetadata(): boolean;
}
