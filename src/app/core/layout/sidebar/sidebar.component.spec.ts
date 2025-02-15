import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, BrowserAnimationsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items in the menu', () => {
    expect(component.items).toBeDefined();
    expect(component.items?.length).toBe(2);
  });

  it('should have correct menu items with proper properties', () => {
    expect(component.items).toBeDefined();
    expect(component.items?.length).toBe(2);

    expect(component.items?.[0]).toEqual({
      label: 'Mis proyectos',
      icon: 'pi pi-list',
      routerLink: ['/projects'],
    });

    expect(component.items?.[1]).toEqual({
      label: 'Nuevo proyecto',
      icon: 'pi pi-plus',
      routerLink: ['/projects/new'],
    });
  });
});
