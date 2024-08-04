import {NgModule} from '@angular/core';

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {DepartamentosRoutingModule} from "./departamentos-routing.module";


@NgModule({
  imports: [DepartamentosRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class DepartamentoModule {
}
