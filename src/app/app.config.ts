import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideSgmea} from "../@sgmea/sgmea.provider";
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";
import {TokenInterceptorService} from "./core/auth/service/token/token-interceptor.service";
import {provideEnvironmentNgxMask} from "ngx-mask";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    provideSgmea({}),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ]
};
