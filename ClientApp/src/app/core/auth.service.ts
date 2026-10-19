import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';

const RETURN_URL_KEY = 'auth_return_url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauthService = inject(OAuthService);

  get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims() as Record<string, unknown> | null;
    const name = claims?.['name'] ?? claims?.['preferred_username'] ?? claims?.['email'];
    return typeof name === 'string' ? name : null;
  }

  get hasAdminRole(): boolean {
    return this.roles.includes('Admin') || this.hasSuperAdminRole;
  }

  get hasSuperAdminRole(): boolean {
    return this.roles.includes('SuperAdmin');
  }
  
  get isClient(): boolean {
    return this.roles.includes('Client');
  }

  get roles(): string[] {
    const identityClaims = this.oauthService.getIdentityClaims() as Record<string, unknown> | null;
    const accessToken = this.oauthService.getAccessToken();
    let accessClaims: Record<string, unknown> | null = null;

    if (accessToken) {
      try {
        accessClaims = jwtDecode<Record<string, unknown>>(accessToken);
      } catch {
        accessClaims = null;
      }
    }

    return [...new Set([
      ...this.readRoles(identityClaims),
      ...this.readRoles(accessClaims),
    ])];
  }

  login(returnUrl?: string): void {
    sessionStorage.removeItem(RETURN_URL_KEY);
    if (returnUrl?.startsWith('/') && !returnUrl.startsWith('//')) {
      sessionStorage.setItem(RETURN_URL_KEY, returnUrl);
    }
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    sessionStorage.removeItem(RETURN_URL_KEY);
    this.oauthService.logOut();
  }

  consumeReturnUrl(): string | null {
    const returnUrl = sessionStorage.getItem(RETURN_URL_KEY);
    sessionStorage.removeItem(RETURN_URL_KEY);
    return returnUrl?.startsWith('/') && !returnUrl.startsWith('//') ? returnUrl : null;
  }

  private readRoles(claims: Record<string, unknown> | null): string[] {
    if (!claims) {
      return [];
    }

    const roleClaim = Object.entries(claims)
      .find(([key]) => key === 'role' || key === 'roles' || key.endsWith('/role'))?.[1];
    const values = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
    return values.filter((value): value is string => typeof value === 'string');
  }
}
