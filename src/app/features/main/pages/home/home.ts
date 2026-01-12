import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/auth_user/pages/login/login';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {

  isDragging = false;
  nombre = localStorage.getItem('nombre_usuario') || '';

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }


}
