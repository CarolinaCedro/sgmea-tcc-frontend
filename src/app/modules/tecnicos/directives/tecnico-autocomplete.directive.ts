import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable, Subject} from "rxjs";
import {NgControl} from "@angular/forms";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {Tecnico} from "../../../model/tecnico";
import {TecnicoService} from "../services/tecnico.service";


@Directive({
  standalone: true,
  selector: "[tecnicoAutocomplete]"
})
export class TecnicoAutocompleteDirective extends AbstractAutoCompleteDirective<Tecnico> implements AfterViewInit, OnInit {

  @Input("tecnicoAutocomplete")
  matAutoComplete: MatAutocomplete;


  private readonly _renderData: Subject<Tecnico> = new Subject();
  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: TecnicoService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  filter(term?: string): Observable<Array<Tecnico> | ListResource<Tecnico>> {
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
        map((itens: ListResource<Tecnico>) => {
          return itens;
        })
      );
  }


  display(tecnico: Tecnico): string {
    if (isNotNullOrUndefined(tecnico)) {
      return isString(tecnico) ? null : tecnico.nome;
    }
    return null;
  }

}
