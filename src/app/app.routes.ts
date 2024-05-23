import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./pages/clients/clients.component').then((m) => m.ClientsComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./pages/clients/clients.component').then((m) => m.ClientsComponent),
    }
];
