import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export let API_URL = '';

export function loadConfig() {
  return () =>
    fetch('/assets/config/config.json')
      .then(response => response.json())
      .then(config => {
        API_URL = config.apiUrl;
      })
      .catch(error => console.error('Failed to load config:', error));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: APP_INITIALIZER, useFactory: loadConfig, multi: true }
  ]
};
