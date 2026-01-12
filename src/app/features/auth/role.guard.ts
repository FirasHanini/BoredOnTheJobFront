import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/AppRoutes';
import { AuthService } from 'src/app/core/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'];
    const userRole = this.auth.getRole();

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate([APP_ROUTES.PRODUCTS]);
    return false;
  }
}
