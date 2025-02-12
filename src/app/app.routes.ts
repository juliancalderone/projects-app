import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/project/project.routes').then(
            (m) => m.PROJECT_ROUTES
          ),
      },
    ],
  },
];
