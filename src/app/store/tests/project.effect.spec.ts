import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProjectEffects } from '../project.effect';
import { ProjectService } from '../../features/project/services/project.service';
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
} from '../project.action';
import { Project } from '../../features/project/models/project.model';

describe('ProjectEffects', () => {
  let actions$: Observable<any>;
  let effects: ProjectEffects;
  let projectService: jasmine.SpyObj<ProjectService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProjectService', [
      'getProjects',
      'createProject',
      'updateProject',
    ]);
    TestBed.configureTestingModule({
      providers: [
        ProjectEffects,
        provideMockActions(() => actions$),
        { provide: ProjectService, useValue: spy },
      ],
    });

    effects = TestBed.inject(ProjectEffects);
    projectService = TestBed.inject(
      ProjectService
    ) as jasmine.SpyObj<ProjectService>;
  });

  describe('loadProjects$', () => {
    it('should return loadProjectsSuccess with projects on success', (done) => {
      const mockProjects: Project[] = [
        { id: '1', name: 'Project 1', isActive: true },
        { id: '2', name: 'Project 2', isActive: false },
      ];

      actions$ = of(loadProjects());
      projectService.getProjects.and.returnValue(of(mockProjects));

      effects.loadProjects$.subscribe((action) => {
        expect(action).toEqual(loadProjectsSuccess({ projects: mockProjects }));
        done();
      });
    });

    it('should return loadProjectsFailure on error', (done) => {
      const error = new Error('Error loading projects');

      actions$ = of(loadProjects());
      projectService.getProjects.and.returnValue(throwError(() => error));

      effects.loadProjects$.subscribe((action) => {
        expect(action).toEqual(loadProjectsFailure({ error: error.message }));
        done();
      });
    });
  });

  describe('addProject$', () => {
    it('should return addProjectSuccess with project on success', (done) => {
      const newProject: Project = {
        id: '1',
        name: 'New Project',
        isActive: true,
      };

      actions$ = of(addProject({ project: newProject }));
      projectService.createProject.and.returnValue(of(newProject));

      effects.addProject$.subscribe((action) => {
        expect(action).toEqual(addProjectSuccess({ project: newProject }));
        done();
      });
    });

    it('should return addProjectFailure on error', (done) => {
      const newProject: Project = {
        id: '1',
        name: 'New Project',
        isActive: true,
      };
      const error = new Error('Error creating project');

      actions$ = of(addProject({ project: newProject }));
      projectService.createProject.and.returnValue(throwError(() => error));

      effects.addProject$.subscribe((action) => {
        expect(action).toEqual(addProjectFailure({ error: error.message }));
        done();
      });
    });
  });

  describe('updateProject$', () => {
    it('should return updateProjectSuccess with project on success', (done) => {
      const updatedProject: Project = {
        id: '1',
        name: 'Updated Project',
        isActive: true,
      };

      actions$ = of(updateProject({ project: updatedProject }));
      projectService.updateProject.and.returnValue(of(updatedProject));

      effects.updateProject$.subscribe((action) => {
        expect(action).toEqual(
          updateProjectSuccess({ project: updatedProject })
        );
        done();
      });
    });

    it('should return updateProjectFailure on error', (done) => {
      const project: Project = {
        id: '1',
        name: 'Project',
        isActive: true,
      };
      const error = new Error('Error updating project');

      actions$ = of(updateProject({ project }));
      projectService.updateProject.and.returnValue(throwError(() => error));

      effects.updateProject$.subscribe((action) => {
        expect(action).toEqual(updateProjectFailure({ error: error.message }));
        done();
      });
    });
  });
});
