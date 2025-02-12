import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL =
    'https://67ace5053f5a4e1477dc3ad7.mockapi.io/project';

  private http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.API_URL, project);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, project);
  }
}
