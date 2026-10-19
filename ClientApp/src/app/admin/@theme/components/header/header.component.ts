import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService, private readonly router: Router) {
  }
  
  login(): void {
    this.authService.login(this.router.url || '/');
  }

  logout(): void {
    this.authService.logout();
  }

  get userName(): string {
    return this.authService.userName ?? 'Mon compte';
  }


  get role(): string {
    return this.authService.hasSuperAdminRole ? 'SuperAdmin' : this.authService.hasAdminRole ? 'Admin' : 'User';
  }
}
