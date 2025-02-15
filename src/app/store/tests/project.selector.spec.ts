import { TestBed } from '@angular/core/testing';
import { projectReducer, ProjectState } from '../project.reducer';
import { select, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  selectError,
  selectLoading,
  selectProjectById,
  selectProjects,
} from '../project.selector';

describe('Project Selectors', () => {
  const initialProjectState: ProjectState = {
    projects: [
      {
        id: '1',
        name: 'Project 1',
        description: 'Description 1',
        isActive: true,
      },
      {
        id: '2',
        name: 'Project 2',
        description: 'Description 2',
        isActive: false,
      },
      {
        id: '3',
        name: 'Project 3',
        description: 'Description 3',
        isActive: true,
      },
    ],
    selectedProject: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreModule.forRoot({
          projects: projectReducer,
        }),
        provideMockStore({
          initialState: initialProjectState,
        }),
      ],
    });
  });

  it('should select projects state', () => {
    const result = selectProjects.projector(initialProjectState);
    expect(result?.length).toBe(3);
    expect(result?.[0].id).toBe('1');
    expect(result?.[1].id).toBe('2');
    expect(result?.[2].id).toBe('3');
    expect(result?.[0].name).toBe('Project 1');
    expect(result?.[1].name).toBe('Project 2');
    expect(result?.[2].name).toBe('Project 3');
  });

  it('should select loading state', () => {
    const result = selectLoading.projector(initialProjectState);
    expect(result).toBe(false);
  });

  it('should select error state', () => {
    const result = selectError.projector(initialProjectState);
    expect(result).toBe(null);
  });

  it('should select project by id', () => {
    const projectId = '2';
    const result = selectProjectById(projectId).projector(
      initialProjectState.projects
    );

    expect(result).toBeDefined();
    expect(result?.id).toBe('2');
    expect(result?.name).toBe('Project 2');
    expect(result?.description).toBe('Description 2');
    expect(result?.isActive).toBe(false);
  });

  it('should return undefined when project id does not exist', () => {
    const nonExistentId = '999';
    const result = selectProjectById(nonExistentId).projector(
      initialProjectState.projects
    );
    expect(result).toBeUndefined();
  });
});
