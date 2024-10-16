import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {Departamento} from "../../../model/departamento";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable, Subject} from "rxjs";
import {AbstractControl, NgControl} from "@angular/forms";
import {isEquals, isNotNullOrUndefined, isString} from "../../utis/utils";
import {debounceTime, map, takeUntil} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {DepartamentoService} from "../service/departamento.service";
import {Gestor} from "../../../model/gestor";


@Directive({
  standalone: true,
  selector: "[departamentosAutocomplete]"
})
export class DepartamentoAutocompleteDirective extends AbstractAutoCompleteDirective<Departamento>  {

  @Input("departamentosAutocomplete")
  matAutoComplete: MatAutocomplete;

  private departamento: Departamento;

  @Input("departamentoForm")
  departamentoForm: AbstractControl;

  @Input()
  viewOnly: boolean = false;


  private readonly _renderData: Subject<Departamento> = new Subject();
  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: DepartamentoService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
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
    if (isNotNullOrUndefined(this.departamentoForm)) {
      this.form.control.disable();
      this.cdRef.detectChanges();
      this.departamentoForm
        .valueChanges
        .pipe(
          debounceTime(200),
          // map(value => {
          //   try {
          //     return Model.deserialize(value)
          //   } catch (e) {
          //     return value;
          //   }
          // })
        )
        .subscribe((departamento: Departamento) => {
          if (!isString(departamento)) {
            //verificando se é pra setar o primeiro resultado
            // console.log("itemSelected", this.itemSelected);
            //console.log("this.form.value", this.form.value);
            if (!isEquals(departamento, this.departamento)) {
              this.setFirst = true;
            }
            this.departamento = departamento;
            this._renderData.next(departamento);
          }
        });
    }
    // this.gestor = Estado.deserialize(this.gestorForm?.value);
    this._renderData.next(this.departamento);
    this.cdRef.detectChanges();
  }


  filter(term?: string): Observable<Array<Departamento> | ListResource<Departamento>> {
    //this.loandingService.showTopBar();
    const q = $query($orderByAsc("descricao"), $limit(40));
    if (isNotNullOrUndefined(term)) {
      q.and(
        $or(
          $contains("descricao", term)
        )
      );
    }
    return this.service
      .list(q)
      .pipe(
        map((itens: ListResource<Departamento>) => {
          return itens;
        })
      );
  }


  display(departamento: Departamento): string {
    if (isNotNullOrUndefined(departamento)) {
      return isString(departamento) ? null : departamento.descricao;
    }
    return null;
  }

}
