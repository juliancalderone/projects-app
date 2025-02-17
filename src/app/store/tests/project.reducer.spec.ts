import { TestBed } from '@angular/core/testing';
import { projectReducer, ProjectState } from '../project.reducer';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { selectProjects } from '../project.selector';
import { Project } from '../../features/project/models/project.model';
import {
  addProjectSuccess,
  addProjectFailure,
  loadProjectsSuccess,
  updateProjectSuccess,
  updateProjectFailure,
} from '../project.action';

describe('Project Reducer', () => {
  const initialState: ProjectState = {
    projects: null,
    loading: false,
    error: null,
    selectedProject: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ project: projectReducer })],
      providers: [
        StoreModule.forRoot({ project: projectReducer }),
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectProjects,
              value: initialState.projects,
            },
          ],
        }),
      ],
    });
  });

  it('should return the initial state', () => {
    const action = {} as any;
    const state = projectReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadProjectsSuccess action', () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Proyecto Test 1',
        description: 'Descripción del proyecto 1',
        isActive: true,
      },
      {
        id: '2',
        name: 'Proyecto Test 2',
        isActive: false,
      },
    ];

    const action = loadProjectsSuccess({ projects: mockProjects });

    const state = projectReducer(initialState, action);

    expect(state.projects).toEqual(mockProjects);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle addProjectSuccess action', () => {
    const mockProject: Project = {
      id: '1',
      name: 'Proyecto Test 1',
      description: 'Descripción del proyecto 1',
      isActive: true,
    };

    const action = addProjectSuccess({ project: mockProject });

    const state = projectReducer(initialState, action);

    expect(state.projects).toEqual([mockProject]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle addProjectFailure action', () => {
    const error = 'Error al agregar el proyecto';
    const action = addProjectFailure({ error });

    const state = projectReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should handle updateProjectSuccess action', () => {
    const initialStateWithProjects: ProjectState = {
      projects: [
        {
          id: '1',
          name: 'Proyecto Original',
          description: 'Descripción original',
          isActive: false,
        },
        {
          id: '2',
          name: 'Proyecto 2',
          description: 'Descripción 2',
          isActive: true,
        },
      ],
      selectedProject: null,
      loading: false,
      error: null,
    };

    const updatedProject: Project = {
      id: '1',
      name: 'Proyecto Test 1 Actualizado',
      description: 'Descripción actualizada',
      isActive: true,
    };

    const action = updateProjectSuccess({ project: updatedProject });

    const state = projectReducer(initialStateWithProjects, action);

    expect(state.projects).toEqual([
      updatedProject,
      initialStateWithProjects.projects![1],
    ]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle updateProjectFailure action', () => {
    const error = 'Error al actualizar el proyecto';
    const action = updateProjectFailure({ error });

    const state = projectReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should add project to existing projects array', () => {
    const initialStateWithProjects: ProjectState = {
      projects: [
        {
          id: '1',
          name: 'Proyecto Existente',
          isActive: true,
        },
      ],
      selectedProject: null,
      loading: false,
      error: null,
    };

    const newProject: Project = {
      id: '2',
      name: 'Nuevo Proyecto',
      isActive: true,
    };

    const action = addProjectSuccess({ project: newProject });
    const state = projectReducer(initialStateWithProjects, action);

    expect(state.projects).toEqual([
      ...initialStateWithProjects.projects!,
      newProject,
    ]);
    expect(state.projects?.length).toBe(2);
  });
});
