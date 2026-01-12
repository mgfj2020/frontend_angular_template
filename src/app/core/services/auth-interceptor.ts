import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  let clone = req;

  if (token) {
    clone = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clone).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn("Token inválido o expirado — redirigiendo a login");
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
