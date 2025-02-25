import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {
  selectProjects,
  selectError,
  selectLoading,
} from '../../../../store/project.selector';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { Project } from '../../models/project.model';
import { RouterModule } from '@angular/router';
import { loadProjects } from '../../../../store/project.action';

@Component({
  selector: 'app-project-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    BadgeModule,
    RouterModule,
  ],
  templateUrl: './project-list.component.html',
  standalone: true,
})
export class ProjectListComponent {
  @ViewChild('tableRef') tableRef!: Table;
  private store = inject(Store);

  projects$ = this.store.select(selectProjects);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  onSearch(event: Event) {
    this.tableRef.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  statusProjectClass(project: Project) {
    return project.isActive ? 'success' : 'danger';
  }

  ngOnInit() {
    this.store.dispatch(loadProjects());
  }
}
