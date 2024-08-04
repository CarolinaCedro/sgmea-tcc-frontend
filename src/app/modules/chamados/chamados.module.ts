import {NgModule} from '@angular/core';

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ChamadosRoutingModule} from "./chamados-routing.module";


@NgModule({
  imports: [ChamadosRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class ChamadosModule {
}
