import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  imports: [TableModule, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  standalone: true,
})
export class ProjectListComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }
}
