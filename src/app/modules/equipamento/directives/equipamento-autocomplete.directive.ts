import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
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
export class EquipamentoAutocompleteDirective extends AbstractAutoCompleteDirective<Equipamento> {

  @Input("equipamentosAutocomplete")
  matAutoComplete: MatAutocomplete;
  itemSelected: Equipamento;
  @Output()
  onItemSelectedEvent: EventEmitter<Equipamento> = new EventEmitter<Equipamento>();

  @Output()
  onItensFiltered: EventEmitter<Array<Equipamento> | ListResource<Equipamento>> = new EventEmitter<Array<Equipamento> | ListResource<Equipamento>>();



  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: EquipamentoService) {
    super(elementRef, form, trigger);
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


  display(equipamento: Equipamento): string {
    if (isNotNullOrUndefined(equipamento)) {
      return isString(equipamento) ? null : equipamento.descricao;
    }
    return null;
  }

}
