import {NgModule} from '@angular/core';

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {EquipamentoRoutingModule} from "./equipamento-routing.module";


@NgModule({
  imports: [EquipamentoRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class EquipamentoModule {
}
