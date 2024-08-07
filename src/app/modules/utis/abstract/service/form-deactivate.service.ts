import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { SgmeaFormComponent } from '../../../../shared/components/sgmea-form/sgmea-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormDeactivateService implements CanDeactivate<SgmeaFormComponent> {

  static pressSalveOrCancel = false;


  canDeactivate(component: SgmeaFormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    if (FormDeactivateService.pressSalveOrCancel) {
      FormDeactivateService.pressSalveOrCancel = false;
      return true;
    }
    return null;
    // return this.dialog.confirmDialog().message(" Deseja sair dessa página sem salvar os dados? ").show();
    // return true;
    // return window.confirm("Tem certeza que deseja sair dessa página?");
  }
}
