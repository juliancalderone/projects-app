import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';

import {
  selectProjects,
  selectError,
  selectLoading,
} from '../../../../store/project.selector';

@Component({
  selector: 'app-project-list',
  imports: [TableModule, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  standalone: true,
})
export class ProjectListComponent {
  private store = inject(Store);

  projects$ = this.store.select(selectProjects);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  ngOnInit() {}
}
