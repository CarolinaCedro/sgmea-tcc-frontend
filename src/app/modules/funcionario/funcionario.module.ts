import {NgModule} from '@angular/core';

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FuncionarioRoutingModule} from "./funcionario-routing.module";


@NgModule({
  imports: [FuncionarioRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class FuncionarioModule {
}
