import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('project');
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`project/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('project/', project);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`project/${id}`, project);
  }
}
