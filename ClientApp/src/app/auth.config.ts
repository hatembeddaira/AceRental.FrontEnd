import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.auth.authority,
  redirectUri: environment.auth.redirectUri,
  postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
  clientId: environment.auth.clientId,
  scope: environment.auth.scope,
  responseType: 'code',
  showDebugInformation: !environment.production,
  useSilentRefresh: false,
  silentRefreshRedirectUri: environment.auth.silentRefreshRedirectUri,
  clearHashAfterLogin: true,
};