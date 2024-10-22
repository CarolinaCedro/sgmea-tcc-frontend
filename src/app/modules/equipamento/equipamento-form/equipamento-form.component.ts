import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SgmeaFormComponent} from "../../../shared/components/sgmea-form/sgmea-form.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AbstractFormController} from "../../utis/abstract/abstract-form-controller";
import {Equipamento} from "../../../model/equipamento";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EquipamentoService} from "../service/equipamento.service";
import {map, mergeMap, take} from "rxjs/operators";
import {isNullOrUndefined} from "../../utis/utils";
import {of} from "rxjs";
import {ErrorMessage} from "../../utis/http/model/exception/error-message.model";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-equipamento-form',
  standalone: true,
  imports: [
    SgmeaFormComponent,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent extends AbstractFormController<Equipamento> implements AfterViewInit, OnInit {

  constructor(formBuilder: FormBuilder, service: EquipamentoService, router: Router, route: ActivatedRoute) {
    super(Equipamento, formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      patrimonio: ['', [Validators.required]],
      modelo: [''],
      emUso: ['']
    }), service, router, route);
  }

  save(value: Equipamento) {

    if (this.form.invalid) {
      this.openSnackBar("Por favor, preencha todos os campos obrigatórios.");
    }

    super.save(value);
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      let beforeLoadId = this.beforeLoadId(params['id']);

      if (isNullOrUndefined(beforeLoadId)) {
        beforeLoadId = of(null);
      }

      if (params['id'] === 'new_record') {
        console.log("Criando novo registro");
        this.form.get("emUso").setValue(true)


      } else {
        console.log("Editando registro existente");


        beforeLoadId = beforeLoadId.pipe(
          mergeMap(() => this.service.findByIdFully(params['id'])),
          map((result: any) => {
            this.value = result;
            this.form.patchValue(this.value, {emitEvent: true});
            console.log('Dados do registro:', this.value);
            this.form.get("patrimonio").disabled
            this.form.get("patrimonio").disable()

          })
        );
      }

      beforeLoadId.subscribe(
        (result: any) => {
          console.log('Resultado após carregar dados:', result);
        },
        (err: ErrorMessage) => {
          this.showErrorsDialog(err);
        }
      );
    });
  }


  containsMetadata(): boolean {
    return false;
  }

}
