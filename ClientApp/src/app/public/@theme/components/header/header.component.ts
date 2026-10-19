import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { PublicMenus } from '../../../../Enum/public-menus';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public readonly PublicMenus = PublicMenus;
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  login(): void {
    this.authService.login(this.router.url || '/');
  }

  logout(): void {
    this.authService.logout();
  }

  get userName(): string {
    return this.authService.userName ?? 'Mon compte';
  }

  get isClient()
  {
    return this.authService.isClient;
  }
}
