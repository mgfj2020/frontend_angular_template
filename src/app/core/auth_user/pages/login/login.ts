
// ----------------------------------------------------------------------------
// SERVICE
// ----------------------------------------------------------------------------


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8000/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: string, pass: string): Observable<any> {
    const body = {
      username: user,
      password: pass
    };

    return this.http.post<any>(this.API_URL, body).pipe(
      tap(res => {
        console.log(res)
        if (res?.access_token) {
          localStorage.setItem('token', res.access_token);
          if (res?.nombre_usuario) {
            localStorage.setItem('nombre_usuario', res.nombre_usuario);
          }
        }
      })
    );
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expired = payload.exp * 1000 < Date.now();
      return !expired;
    } catch (e) {
      return false;
    }
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

// ----------------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------------


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  user = 'usuario';
  pass = 'password';
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = false;

    this.auth.login(this.user, this.pass).subscribe({
      next: () => {
        // si el backend devolvió un token, ya fue guardado en el AuthService
        this.router.navigate(['/main']);
      },
      error: () => {
        // backend responde 401 → credenciales inválidas
        this.error = true;
      }
    });
  }
}
