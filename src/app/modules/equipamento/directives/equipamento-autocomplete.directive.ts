import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable, Subject} from "rxjs";
import {NgControl} from "@angular/forms";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {Equipamento} from "../../../model/equipamento";
import {EquipamentoService} from "../service/equipamento.service";


@Directive({
  standalone: true,
  selector: "[equipamentosAutocomplete]"
})
export class EquipamentoAutocompleteDirective extends AbstractAutoCompleteDirective<Equipamento> implements AfterViewInit, OnInit {

  @Input("equipamentosAutocomplete")
  matAutoComplete: MatAutocomplete;


  private readonly _renderData: Subject<Equipamento> = new Subject();
  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: EquipamentoService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  filter(term?: string): Observable<Array<Equipamento> | ListResource<Equipamento>> {
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
        map((itens: ListResource<Equipamento>) => {
          return itens;
        })
      );
  }


  display(departamento: Equipamento): string {
    if (isNotNullOrUndefined(departamento)) {
      return isString(departamento) ? null : departamento.descricao;
    }
    return null;
  }

}
