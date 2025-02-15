import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProjectListComponent } from './project-list.component';
import { loadProjects } from '../../../../store/project.action';
import { Project } from '../../models/project.model';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProjects action', () => {
    const store = TestBed.inject(MockStore);
    const loadProjectsSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(loadProjectsSpy).toHaveBeenCalledWith(loadProjects());
  });

  it('should return correct status class for active project', () => {
    const activeProject: Project = { id: '1', name: 'Test', isActive: true };
    const result = component.statusProjectClass(activeProject);
    expect(result).toBe('success');
  });

  it('should return correct status class for inactive project', () => {
    const inactiveProject: Project = { id: '2', name: 'Test', isActive: false };
    const result = component.statusProjectClass(inactiveProject);
    expect(result).toBe('danger');
  });
});
