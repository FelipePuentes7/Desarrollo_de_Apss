import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./calculadora/calculadora.page').then((m) => m.CalculadoraPage),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
