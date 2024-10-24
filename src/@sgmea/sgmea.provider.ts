import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider} from '@angular/core';
import {sgmeaLoadingInterceptor} from "./services/loading";
import {SgmeaLoadingService} from "../app/shared/components/services/sgmea-loading.service";

export type SgmeaProviderConfig = {
  mockApi?: {
    delay?: number;
    services?: any[];
  }

}

/**
 * Fuse provider
 */
export const provideSgmea = (config: SgmeaProviderConfig): Array<Provider | EnvironmentProviders> => {
  return [


    provideHttpClient(withInterceptors([sgmeaLoadingInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(SgmeaLoadingService),
      multi: true,
    },
  ];
};
