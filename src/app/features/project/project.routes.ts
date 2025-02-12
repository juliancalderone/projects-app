import { Routes } from '@angular/router';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectWrapperComponent } from './containers/project-wrapper/project-wrapper.component';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectWrapperComponent,
  },
  {
    path: 'new',
    component: ProjectFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProjectFormComponent,
  },
];
