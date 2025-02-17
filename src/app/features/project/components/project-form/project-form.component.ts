import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { addProject, updateProject } from '../../../../store/project.action';

import { take } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { selectProjectById } from '../../../../store/project.selector';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
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
    RippleModule,
    ToastModule,
    RouterLink,
  ],
  providers: [MessageService],
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
    private router: Router,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.minLength(5)],
      isActive: [true, Validators.required],
    });
  }

  ngOnInit() {
    const projectId = this.route.snapshot.params['id'];

    if (projectId) {
      this.isEdit = true;
      this.store
        .pipe(select(selectProjectById(projectId)), take(1))
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

    this.showSuccessMessage();
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: this.isEdit
        ? 'Proyecto actualizado correctamente'
        : 'Proyecto creado correctamente',
      life: 2000,
    });
    setTimeout(() => {
      this.router.navigate(['/projects']);
    }, 2000);
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
