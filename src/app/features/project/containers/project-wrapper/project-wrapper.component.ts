import { Component } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@Component({
  selector: 'app-project-wrapper',
  standalone: true,
  imports: [ProjectListComponent],
  template: `
    <div class="project-container">
      <app-project-list />
    </div>
  `,
})
export class ProjectWrapperComponent {}
