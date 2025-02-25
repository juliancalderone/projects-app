import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { Store } from '@ngrx/store';
import { loadProjects } from '../../../../store/project.action';

@Component({
  selector: 'app-project-wrapper',
  standalone: true,
  imports: [ProjectListComponent],
  template: `
    <div class="project-container">
      <app-project-list />
    </div>
  `,
  styles: [
    `
      .project-container {
        padding: 0;
        max-width: 95%;
      }
    `,
  ],
})
export class ProjectWrapperComponent {}
