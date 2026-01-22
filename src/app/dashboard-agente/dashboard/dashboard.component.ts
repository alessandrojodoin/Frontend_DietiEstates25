import { Component } from '@angular/core';
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';
import { VisualizzazioneDashboardComponent } from '../visualizzazione-dashboard/visualizzazione-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarDashboardComponent, VisualizzazioneDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  

}
