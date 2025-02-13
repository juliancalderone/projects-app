import { createReducer, on, Action } from '@ngrx/store';

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
import { Project } from '../features/project/models/project.model';

export interface ProjectState {
  projects: Project[] | null;
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: ProjectState = {
  projects: null,
  selectedProject: null,
  loading: false,
  error: null,
};

export const projectReducer = createReducer(
  INITIAL_STATE,

  on(loadProjects, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    loading: false,
    projects,
    error: null,
  })),

  on(loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    loading: false,
    projects: [...(state.projects || []), project],
    error: null,
  })),

  on(addProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(updateProjectSuccess, (state, { project }) => ({
    ...state,
    loading: false,
    projects: (state.projects || []).map((p) =>
      p.id === project.id ? project : p
    ),
    error: null,
  })),

  on(updateProjectFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
