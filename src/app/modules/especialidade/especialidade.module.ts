import {NgModule} from '@angular/core';

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {EspecialidadeRoutingModule} from "./especialidade-routing.module";


@NgModule({
  imports: [EspecialidadeRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class EspecialidadeModule {
}
