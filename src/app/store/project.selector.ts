import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects
);

export const selectLoading = createSelector(
  selectProjectState,
  (state: ProjectState) => state.loading
);

export const selectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
);
