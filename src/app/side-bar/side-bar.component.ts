import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../AppRoutes';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
   email: string | null = '';
   role: string | null = '';
  constructor( private authService: AuthService,
              private router: Router
  ) {}
  ngOnInit(): void {
    this.getDetails();
  }




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

  isSeller(): boolean {
    const role = localStorage.getItem('role');
    
    return role === 'SELLER';
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

  getDetails(): void {
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    console.log("Email from sidebar"+this.email);
  }

}
