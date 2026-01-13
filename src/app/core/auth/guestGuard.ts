import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class guestGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Si l'utilisateur est déjà connecté (possède un token valide)
    if (this.authService.isAuthenticated()) {
      // On le redirige vers la page principale
      this.router.navigate(['/products']);
      return false; // On bloque l'accès à /login
    }
    // Sinon, on le laisse passer vers /login
    return true;
  }
}