import { createAction, props } from '@ngrx/store';
import { Project } from '../features/project/models/project.model';

const loadProjects = createAction('[Projects] Load');

const loadProjectsSuccess = createAction(
  '[Projects] Load Success',
  props<{ projects: Project[] }>()
);

const loadProjectsFailure = createAction(
  '[Projects] Load Failure',
  props<{ error: string }>()
);

const addProject = createAction(
  '[Projects] Add',
  props<{ project: Project }>()
);

const addProjectSuccess = createAction(
  '[Projects] Add Success',
  props<{ project: Project }>()
);

const addProjectFailure = createAction(
  '[Projects] Add Failure',
  props<{ error: string }>()
);

const updateProject = createAction(
  '[Projects] Update',
  props<{ project: Project }>()
);

const updateProjectSuccess = createAction(
  '[Projects] Update Success',
  props<{ project: Project }>()
);

const updateProjectFailure = createAction(
  '[Projects] Update Failure',
  props<{ error: string }>()
);

export {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFailure,
  addProject,
  addProjectSuccess,
  addProjectFailure,
  updateProject,
  updateProjectSuccess,
  updateProjectFailure,
};
