import {Component, inject, Input, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from "@angular/material/input";
import {FormController} from "../../../modules/utis/models/form-controller.interface";
import {map, mergeMap, take} from "rxjs/operators";
import {ButtonComponent} from "../button/button.component";
import {SgmeaLoadingService} from "../services/sgmea-loading.service";
import * as console from "console";
import {Subject} from "rxjs/internal/Subject";

@Component({
  selector: 'sgmea-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './sgmea-form.component.html',
  styleUrl: './sgmea-form.component.scss',
})
export class SgmeaFormComponent implements OnInit{

  @Input()
  formTitle?: string = 'Seu título aqui';
  @Input()
  descriptionOnForm?: string = 'Descrição formulario';
  @Input()
  btnSave = 'Salvar';

  @Input()
  formController: FormController<any>;




  private unsubscribes: Subject<void> = new Subject();


  @Input()
  btnSaveShow?: boolean = true;
  @Input()
  iconModule!: string;
  containsDomain: boolean = false;

  @Input() cardWidth?: string = '360px !important';


  constructor() {
  }

  ngOnInit() {
    this.containsDomain = this.formController?.containsMetadata();

    if (!this.formController?.viewOnly) {
      this.formController.isNewRecord()
        .pipe(
          map(isNewRecord => {
            // Se não for um novo registro, ou seja, uma atualização, desabilita o formulário.
            if (!isNewRecord) {
              this.formController.form.disable({ emitEvent: false });
            }
          }),
          take(1)
        ).subscribe();
    }else {
      // console.log("registro já populado")
    }
  }



  // ngOnInit() {
  //   this.containsDomain = this.formController?.containsMetadata();
  //   if (!this.formController?.viewOnly) {
  //     this.formController.isNewRecord()
  //       .pipe(
  //         mergeMap(value => {
  //           if (!value) {
  //             return this.authService.hasRole(this.roleUpdate)
  //               .pipe(
  //                 map(result => {
  //                   if (!result) {
  //                     this.formController.form.disable({emitEvent: false});
  //                   }
  //                 })
  //               );
  //           } else {
  //             return this.authService.hasRole(this.roleCreate)
  //               .pipe(
  //                 map(result => {
  //                   if (!result) {
  //                     this.formController.form.disable({emitEvent: false});
  //                   }
  //                 })
  //               );
  //           }
  //         }),
  //         take(1)
  //       ).subscribe(() => {
  //     });
  //   }
  // }


  ngOnDestroy(): void {
    this.unsubscribes.next();
  }

}
