import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['USER', Validators.required] // Défini par défaut sur USER
    });
  }

  submit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = '';
    console.log(this.registerForm.value.role== 'USER');

    if(this.registerForm.value.role == 'USER' ) {
      this.authService.registerUser({email: this.registerForm.value.email, password: this.registerForm.value.password}).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log("Error here user", err);
        this.error = err.error?.message || "Registration failed";
        this.loading = false;
      }
    });
    }  else {
 
    this.authService.registerSeller({email: this.registerForm.value.email, password: this.registerForm.value.password}).subscribe({
      next: (res:any) => {
        console.log("Seller registered successfully", res.onboardingUrl);
        if (res.onboardingUrl) {
          console.log("Redirection vers Stripe...");
          window.location.href = res.onboardingUrl; // Redirection externe
     //  this.router.navigate(['/products']); 
        }
      },
      error: (err) => {
        console.log("Error here seller", err);
        this.error = err.error?.message || "Registration failed";
        this.loading = false;
      }
    });
  } 
    
  }




}
