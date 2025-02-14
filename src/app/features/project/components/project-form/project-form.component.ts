import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { Store } from '@ngrx/store';
import { addProject, updateProject } from '../../../../store/project.action';
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
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  standalone: true,
})
export class ProjectFormComponent {
  @Input() project: Project | null = null;
  projectForm!: FormGroup;
  isEdit = false;

  statuses = [
    { name: 'Activo', value: true },
    { name: 'Inactivo', value: false },
  ];

  constructor(private fb: FormBuilder, private store: Store) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.minLength(3)],
      is_active: [true, Validators.required],
    });
  }

  ngOnInit() {
    if (this.project) {
      this.isEdit = true;
      this.projectForm.patchValue(this.project);
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

    const project: Project = {
      ...this.projectForm.value,
      id: this.isEdit ? this.project?.id : this.generateProjectId(),
    };

    this.store.dispatch(
      this.isEdit ? updateProject({ project }) : addProject({ project })
    );
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
