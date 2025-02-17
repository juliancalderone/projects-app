import { inject, Injectable } from '@angular/core';
import { ProjectService } from '../features/project/services/project.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFailure,
  addProject,
  addProjectSuccess,
  addProjectFailure,
  updateProject,
  updateProjectSuccess,
  updateProjectFailure,
} from './project.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProjectEffects {
  actions$ = inject(Actions);
  projectService = inject(ProjectService);
  messageService = inject(MessageService);

  private showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000,
    });
  }

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProjects),
      switchMap(() => {
        return this.projectService.getProjects().pipe(
          map((projects) => loadProjectsSuccess({ projects })),
          catchError((error) =>
            of(loadProjectsFailure({ error: error.message }))
          )
        );
      })
    );
  });

  addProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProject),
      switchMap(({ project }) =>
        this.projectService.createProject(project).pipe(
          map((project) => {
            this.showSuccessMessage('Proyecto creado exitosamente');
            return addProjectSuccess({ project });
          }),
          catchError((error) => of(addProjectFailure({ error: error.message })))
        )
      )
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProject),
      switchMap(({ project }) =>
        this.projectService.updateProject(project.id, project).pipe(
          map((project) => {
            this.showSuccessMessage('Proyecto actualizado exitosamente');
            return updateProjectSuccess({ project });
          }),
          catchError((error) =>
            of(updateProjectFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
