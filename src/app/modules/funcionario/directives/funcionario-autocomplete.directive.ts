import {AbstractAutoCompleteDirective} from "../../../core/abstract/auto-complete/abstract-auto-complete.directive";
import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from "@angular/core";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable, Subject} from "rxjs";
import {NgControl} from "@angular/forms";
import {isNotNullOrUndefined, isString} from "../../utis/utils";
import {map} from "rxjs/operators";
import {ListResource} from "../../utis/http/model/list-resource.model";
import {$contains, $limit, $or, $orderByAsc, $query} from "../../utis/http/criteria";
import {Funcionario} from "../../../model/funcionario";
import {FuncionarioService} from "../service/funcionario.service";


@Directive({
  standalone: true,
  selector: "[funcionarioAutocomplete]"
})
export class FuncionarioAutocompleteDirective extends AbstractAutoCompleteDirective<Funcionario> implements AfterViewInit, OnInit {

  @Input("funcionarioAutocomplete")
  matAutoComplete: MatAutocomplete;


  private readonly _renderData: Subject<Funcionario> = new Subject();
  private setFirst: boolean = false;

  constructor(elementRef: ElementRef, form: NgControl, trigger: MatAutocompleteTrigger, private service: FuncionarioService, private cdRef: ChangeDetectorRef) {
    super(elementRef, form, trigger);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  filter(term?: string): Observable<Array<Funcionario> | ListResource<Funcionario>> {
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
        map((itens: ListResource<Funcionario>) => {
          return itens;
        })
      );
  }


  display(funcionario: Funcionario): string {
    if (isNotNullOrUndefined(funcionario)) {
      return isString(funcionario) ? null : funcionario.nome;
    }
    return null;
  }

}
