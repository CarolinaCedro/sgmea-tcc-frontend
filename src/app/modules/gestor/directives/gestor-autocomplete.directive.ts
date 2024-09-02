import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable, Subject} from "rxjs";
import {NgControl} from "@angular/forms";
import {isArray, isEmpty, isEquals, isNotNullOrUndefined, isString} from "../../utis/utils";
import {debounceTime, map, takeUntil} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {Gestor} from "../../../model/gestor";
import {GestorService} from "../service/gestor.service";


@Directive({
  standalone: true,
  selector: "[gestorAutocomplete]"
})
export class GestorAutocompleteDirective extends AbstractAutoCompleteDirective<Gestor> implements AfterViewInit, OnInit {

  private gestor: Gestor;

  @Input("gestorAutocomplete")
  matAutoComplete: MatAutocomplete;

  @Input("gestorForm")
  gestorForm: Observable<Array<Gestor>>;

  @Input()
  viewOnly: boolean = false;

  private readonly _renderData: Subject<Gestor> = new Subject();

  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: GestorService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
  }

  ngOnInit(): void {
    super.ngOnInit();
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

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.unsubscribes)
    ).subscribe(it => {
      if (isNotNullOrUndefined(it) && !isString(it) && !this.viewOnly) {
        this.form.control.enable({emitEvent: false});
      }
    });
    if (isNotNullOrUndefined(this.gestorForm)) {
      this.form.control.disable();
      this.cdRef.detectChanges();
      this.gestorForm
        .pipe(debounceTime(200))
        .subscribe((gestores: Array<Gestor>) => {
          if (isArray(gestores) && !isEmpty(gestores) && gestores.length === 1) {
            //verificando se é pra setar o primeiro resultado
            // console.log("itemSelected", this.itemSelected);
            //console.log("this.form.value", this.form.value);
            if (!isEquals(gestores[0], this.gestor)) {
              this.setFirst = true;
            }
            this.gestor = gestores[0];
            this._renderData.next(gestores[0]);
          } else {
            this._renderData.next(gestores[0]);
          }
        });
    }
  }


  display(gestor: Gestor): string {
    if (gestor && gestor.nome) {
      return gestor.nome;
    }
    return '';
  }


}
