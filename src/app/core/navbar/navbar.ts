import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    // Elimina token o sesión
    localStorage.removeItem('token');

    // Redirige al login
    this.router.navigate(['/login']);
  }

 }
