import { Routes } from '@angular/router';

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/demo/demo').then(m => m.Demo)
  },

  {
    path: 'list',
    loadComponent: () => import('./pages/list/list').then(m => m.List)
  },

  {
    path: 'show/:id',
    loadComponent: () =>
      import('./pages/show/show')
        .then(m => m.Show)
  }
];
