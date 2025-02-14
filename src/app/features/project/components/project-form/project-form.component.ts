import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { addProject, updateProject } from '../../../../store/project.action';

import { filter, take, map } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { selectProjectById } from '../../../../store/project.selector';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export interface ProjectStatus {
  value: boolean;
  name: string;
}

@Component({
  selector: 'app-project-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FloatLabelModule,
    TextareaModule,
    RadioButtonModule,
    CommonModule,
  ],
  providers: [],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  standalone: true,
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEdit = false;

  statuses = [
    { name: 'Activo', value: true },
    { name: 'Inactivo', value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.minLength(5)],
      is_active: [true, Validators.required],
    });
  }

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];

    if (projectId) {
      this.isEdit = true;
      this.store
        .pipe(
          select(selectProjectById(projectId)),
          filter((project) => !!project),
          take(1)
        )
        .subscribe((project) => {
          if (project) {
            this.projectForm.patchValue(project);
          }
        });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.markFormGroupTouched(this.projectForm);
      return;
    }

    const projectId = this.route.snapshot.params['id'];
    const projectData = this.projectForm.value;

    const project: Project = {
      ...projectData,
      id: projectId || this.generateProjectId(),
    };

    this.store.dispatch(
      this.isEdit ? updateProject({ project }) : addProject({ project })
    );

    //this.router.navigate(['/projects']);
  }

  private generateProjectId(): string {
    return Math.floor(Math.random() * 1000).toString();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
