import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'gallery',
        loadComponent: () =>
          import('../gallery/gallery.page').then((m) => m.GalleryPage),
      },
      {
        path: 'tab1',
        redirectTo: '/tabs/gallery',
        pathMatch: 'full',
      },
      {
        path: 'tab2',
        redirectTo: '/tabs/gallery',
        pathMatch: 'full',
      },
      {
        path: 'tab3',
        redirectTo: '/tabs/gallery',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: '/tabs/gallery',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/gallery',
    pathMatch: 'full',
  },
];
