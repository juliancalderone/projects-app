import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProjectFormComponent } from './project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { addProject } from '../../../../store/project.action';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    storeSpy.pipe.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [ProjectFormComponent, ReactiveFormsModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
            },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.projectForm.get('name')?.value).toBe('');
    expect(component.projectForm.get('description')?.value).toBe('');
    expect(component.projectForm.get('isActive')?.value).toBe(true);
  });

  it('should mark form as invalid when name is empty', () => {
    const nameControl = component.projectForm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();

    expect(component.isFieldInvalid('name')).toBe(true);
  });

  it('should mark form as valid with correct values', () => {
    component.projectForm.patchValue({
      name: 'Test Project',
      description: 'Test Description',
      isActive: true,
    });

    expect(component.projectForm.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.projectForm.patchValue({
      name: '',
      description: 'Test',
      isActive: true,
    });

    component.onSubmit();

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
