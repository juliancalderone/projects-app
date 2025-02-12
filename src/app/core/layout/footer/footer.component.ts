import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  standalone: true,
})
export class FooterComponent {
  today: number = Date.now();
}
