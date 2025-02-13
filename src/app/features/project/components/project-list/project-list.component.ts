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

@Component({
  selector: 'app-project-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  standalone: true,
})
export class ProjectListComponent {
  @ViewChild('tableRef') tableRef!: Table;
  private store = inject(Store);

  projects$ = this.store.select(selectProjects);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  ngOnInit() {}

  onSearch(event: Event) {
    this.tableRef.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }
}
