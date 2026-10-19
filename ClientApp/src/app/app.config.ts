import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { OAuthErrorEvent, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { authCodeFlowConfig } from './auth.config';
import { environment } from '../environments/environment';

registerLocaleData(localeFr);

const OIDC_CALLBACK_ERROR_KEY = 'oidc_callback_error';

function errorMessage(reason: unknown): string {
  if (reason instanceof Error) {
    return reason.message;
  }
  if (typeof reason === 'string') {
    return reason;
  }
  if (reason && typeof reason === 'object') {
    const details = reason as Record<string, unknown>;
    const description = details['error_description'] ?? details['message'] ?? details['error'];
    if (typeof description === 'string') {
      return description;
    }
  }
  return 'Échec de la validation ou de l’échange du code OIDC.';
}

function initializeOAuth(): void | Promise<void> {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return;
  }

  const oauthService = inject(OAuthService);
  oauthService.configure(authCodeFlowConfig);
  const isCallback = window.location.pathname === '/signin-callback';
  if (isCallback) {
    sessionStorage.removeItem(OIDC_CALLBACK_ERROR_KEY);
    oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        sessionStorage.setItem(OIDC_CALLBACK_ERROR_KEY, `${event.type}: ${errorMessage(event.reason)}`);
      }
    });
  }

  return oauthService.loadDiscoveryDocumentAndTryLogin()
    .then(() => oauthService.setupAutomaticSilentRefresh())
    .catch((error: unknown) => {
      if (isCallback) {
        sessionStorage.setItem(OIDC_CALLBACK_ERROR_KEY, errorMessage(error));
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxExtendedPdfViewerModule),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [environment.aceRentalApiUrl],
        sendAccessToken: true,
      },
    }),
    provideAppInitializer(initializeOAuth),
    provideClientHydration(withEventReplay()),
    {
      provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue:{appearance : 'outline', subscriptSizing : 'dynamic'}
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};
