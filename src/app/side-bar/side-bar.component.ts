import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../AppRoutes';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor( private authService: AuthService,
              private router: Router
  ) {}




  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
      localStorage.clear();
      this.router.navigate([APP_ROUTES.LOGIN]);
      console.log('User logged out ');
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    }
    );
    
  }

}
