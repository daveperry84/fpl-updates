import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/components/home/home').then(m => m.Home)
    },
    {
        path: 'previous-gameweeks',
        loadComponent: () => import('./previous-updates/components/previous-updates/previous-updates').then(m => m.PreviousUpdates)
    }   
];
