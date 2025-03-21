// my-card.component.ts
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  imports: [MatCardModule, MatIconModule],
})
export class MyCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
}
