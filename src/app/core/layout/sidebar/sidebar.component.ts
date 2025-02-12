import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-layout-sidebar',
  imports: [Menu],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Mis proyectos',
        icon: 'pi pi-list',
        routerLink: ['/projects'],
      },
      {
        label: 'Nuevo proyecto',
        icon: 'pi pi-plus',
        routerLink: ['/projects/new'],
      },
    ];
  }
}
