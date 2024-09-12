import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { requestHeaderInterceptor } from './core/interceptors/request-header.interceptor';
import { requestErrorInterceptor } from './core/interceptors/request-error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

// Create a function to load translation files from assets/i18n/
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} // ==> go and create the folder in the described path then create all languages files with .json extension ==> file name is the same as the lang name we use to call.

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([requestHeaderInterceptor, requestErrorInterceptor, loadingInterceptor])),
    // importProvidersFrom(BrowserAnimationsModule),
    // or
    provideAnimations(), // this is better 😁

    // Date in arabic
    DatePipe,

    provideToastr({
      countDuplicates: true,
      preventDuplicates: true,
    }),

    importProvidersFrom(
      SweetAlert2Module.forRoot(),
      SweetAlert2Module.forChild(),
      NgxSpinnerModule,
      TranslateModule.forRoot({ // forRoot ==> allow to add configurations to this module over the whole root or project
        defaultLanguage: "en",
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory, // useFactory value ==> is the function that does loading to the translate files.
          deps: [HttpClient]
        }
      })
    ),

    provideAnimationsAsync(),

  ]
};
