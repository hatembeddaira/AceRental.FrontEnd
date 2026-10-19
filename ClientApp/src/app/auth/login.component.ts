import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page login">
      <h1>ACE SOUND</h1>
      <p>Connectez-vous pour accéder à votre espace.</p>
      <button class="btn btn--primary" (click)="login()">Se connecter</button>
    </section>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  login(): void {
    void this.auth.login(this.route.snapshot.queryParamMap.get('returnUrl') ?? undefined);
  }
}
