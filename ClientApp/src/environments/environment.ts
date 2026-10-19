const adminEnv = typeof window !== 'undefined' ? (window as any).AdminEnv ?? {} : {};

export const environment = {
  production: true,
  identityManager: adminEnv.IdentityManager,
  angularAuthLogLevel: adminEnv.AngularAuthLogLevel,
  revueRemUrl: adminEnv.RevueRemUrl,
  aceRentalApiUrl: 'http://localhost:5000/api',
  auth: {
    authority: 'https://localhost:7192/',
    clientId: 'ace-rental-angular',
    redirectUri: 'http://localhost:4200/signin-callback',
    postLogoutRedirectUri: 'http://localhost:4200',
    scope: 'openid profile email api roles offline_access',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html'
  },
};
