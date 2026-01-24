import { Routes } from '@angular/router';

export const LICITACIONES_ROUTES: Routes = [
    {
        path: 'new',
        loadComponent: () => import('./pages/new/new.component').then(m => m.LicitacionNewComponent)
    }
];
