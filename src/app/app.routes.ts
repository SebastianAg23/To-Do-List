import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./to-do/pages/main/main.component').then((m) => m.ToDoMainComponent)
  }
];
