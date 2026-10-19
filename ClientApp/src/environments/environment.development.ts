export const environment = {
  production: false,
  // identityManager: (window as any).AdminEnv.IdentityManager,
  // angularAuthLogLevel: (window as any).AdminEnv.AngularAuthLogLevel,
  // revueRemUrl: (window as any).AdminEnv.RevueRemUrl
  aceRentalApiUrl: 'http://localhost:5000/api',
  
  // Configuration OAuth2 / OpenID Connect (client public + PKCE)
  auth: {
    authority: 'https://localhost:7192/',
    clientId: 'ace-rental-angular',
    redirectUri: 'http://localhost:4200/signin-callback',
    postLogoutRedirectUri: 'http://localhost:4200',
    scope: 'openid profile email api roles offline_access',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html'
  },
};
