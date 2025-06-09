// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  // Protege la ruta padre
  canActivate(): boolean | UrlTree {
    if (this.auth.currentUser) {
      return true;
    }
    return this.router.parseUrl('/login');
  }

  // Protege todas las rutas hijas
  canActivateChild(): boolean | UrlTree {
    if (this.auth.currentUser) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
