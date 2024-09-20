import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideSgmea} from "../@sgmea/sgmea.provider";
import {TokenInterceptor} from "./core/guards/security/token-interceptor.service";
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideSgmea({}),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ]
};
