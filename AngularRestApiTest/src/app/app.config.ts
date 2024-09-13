import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http'
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes), provideClientHydration(),provide : HTTP_INTERCEPTORS, useClass : errorHandlerInterceptor, multi : true]
};
