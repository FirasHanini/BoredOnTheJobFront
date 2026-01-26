import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('access_token');
      const isAuthRequest = request.url.includes('/auth/login');
      
    if (token && !isAuthRequest) {
       request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('//////// HTTP Error:', error);
        // On vérifie si le serveur répond 401 (Unauthorized)
        if (error.status === 401) {
          console.warn("Session expirée ou token révoqué.");
          
          // Nettoyage du stockage local
          localStorage.removeItem('access_token');
          
          // Redirection forcée vers le login
          this.router.navigate(['/login']);
        }
        
        // On laisse passer l'erreur pour que les services puissent la traiter si besoin
        return throwError(() => error);
      })
    );
  }
  }

