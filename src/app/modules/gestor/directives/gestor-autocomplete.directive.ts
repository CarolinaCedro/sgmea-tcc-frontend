import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {combineLatest, Observable, Subject} from "rxjs";
import {AbstractControl, NgControl} from "@angular/forms";
import {isArray, isEmpty, isEquals, isNotNullOrUndefined, isString} from "../../utis/utils";
import {debounceTime, map, takeUntil, tap} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {Gestor} from "../../../model/gestor";
import {GestorService} from "../service/gestor.service";
import {Model} from "../../utis/http/model/model";


@Directive({
  standalone: true,
  selector: "[gestorAutocomplete]"
})
export class GestorAutocompleteDirective extends AbstractAutoCompleteDirective<Gestor> {

  private gestor: Gestor;

  @Input("gestorAutocomplete")
  matAutoComplete: MatAutocomplete;

  @Input("gestorForm")
  gestorForm: AbstractControl;

  @Input()
  viewOnly: boolean = false;

  private readonly _renderData: Subject<Gestor> = new Subject();

  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: GestorService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
  }


  filter(term?: string): Observable<Array<Gestor> | ListResource<Gestor>> {
    //this.loandingService.showTopBar();
    const q = $query($orderByAsc("nome"), $limit(40));
    if (isNotNullOrUndefined(term)) {
      q.and(
        $or(
          $contains("nome", term)
        )
      );
    }
    return this.service
      .list(q)
      .pipe(
        map((itens: ListResource<Gestor>) => {
          return itens;
        })
      );
  }


  display(gestor: Gestor): string {
    if (isNotNullOrUndefined(gestor)) {
      return isString(gestor) ? null : gestor?.nome;
    }
    return null;
  }


}
