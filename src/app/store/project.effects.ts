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
} from './project.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProjectEffects {
  actions$ = inject(Actions);
  projectService = inject(ProjectService);

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
          map((project) => addProjectSuccess({ project })),
          catchError((error) => of(addProjectFailure({ error: error.message })))
        )
      )
    );
  });
}
