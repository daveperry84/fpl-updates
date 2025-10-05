import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/components/home/home').then(m => m.Home)
    }   
];
