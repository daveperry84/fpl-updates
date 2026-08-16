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
    },
    {
        path: 'standings',
        loadComponent: () => import('./standings/components/standings/standings').then(m => m.Standings)
    },
    {
        path: 'teams',
        loadComponent: () => import('./teams/components/teams/teams').then(m => m.Teams)
    },
    {
        path: 'team/:id',
        loadComponent: () => import('./team/components/team/team').then(m => m.Team)
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/components/not-found/not-found').then(m => m.NotFound)
    }
];
