import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/my-dashboard/my-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatCardModule, DashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'financial-dashboard-app-cs';
}
