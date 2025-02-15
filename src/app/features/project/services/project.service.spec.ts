import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects', () => {
    const mockProjects: Project[] = [
      { id: '1', name: 'Project 1', isActive: true },
      { id: '2', name: 'Project 2', isActive: false },
    ];

    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    http.get<Project[]>('project').subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne('project');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProjects);
    httpTestingController.verify();
  });

  it('should get project by id', () => {
    const mockProject: Project = { id: '1', name: 'Project 1', isActive: true };

    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    http.get<Project>(`project/${mockProject.id}`).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne(`project/${mockProject.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProject);
    httpTestingController.verify();
  });

  it('should create project', () => {
    const mockProject: Project = { id: '1', name: 'Project 1', isActive: true };

    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    http.post<Project>('project/', mockProject).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpTestingController.expectOne('project/');
    expect(req.request.method).toEqual('POST');
    req.flush(mockProject);
  });

  it('should update project', () => {
    const mockProject: Project = { id: '1', name: 'Project 1', isActive: true };

    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    http
      .put<Project>(`project/${mockProject.id}`, mockProject)
      .subscribe((project) => {
        expect(project).toEqual(mockProject);
      });

    const req = httpTestingController.expectOne(`project/${mockProject.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockProject);
    httpTestingController.verify();
  });
});
