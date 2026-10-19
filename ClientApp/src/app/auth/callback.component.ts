import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

const OIDC_CALLBACK_ERROR_KEY = 'oidc_callback_error';

@Component({
  selector: 'app-callback',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      @if (error()) {
        <p class="error">Échec de la connexion : {{ error() }}</p>
        <a routerLink="/login">Réessayer</a>
      } @else {
        <p>Connexion en cours…</p>
      }
    </section>
  `,
})
export class CallbackComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    if (this.auth.isAuthenticated) {
      await this.router.navigateByUrl(this.auth.consumeReturnUrl() ?? '/');
      return;
    }

    const params = this.route.snapshot.queryParamMap;
    const authError = sessionStorage.getItem(OIDC_CALLBACK_ERROR_KEY);
    sessionStorage.removeItem(OIDC_CALLBACK_ERROR_KEY);
    this.error.set(
      params.get('error_description') ??
      params.get('error') ??
      authError ??
      (params.has('code')
        ? 'Le code est revenu, mais l’échange avec le serveur n’a pas abouti. Le code peut être expiré ou déjà utilisé; relancez une nouvelle connexion.'
        : 'Le callback ne contient ni code ni erreur OAuth. Relancez une nouvelle connexion.'),
    );
  }
}
