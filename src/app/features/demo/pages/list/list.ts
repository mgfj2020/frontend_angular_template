import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoListService } from '../../services/list.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html'
})
export class List implements OnInit {
  // Inyectamos el servicio que contiene los Signals
  protected demoService = inject(DemoListService);

  ngOnInit(): void {
    this.demoService.fetchList();
  }
}
