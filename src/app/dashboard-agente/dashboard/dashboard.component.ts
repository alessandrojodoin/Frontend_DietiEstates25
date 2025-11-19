import { Component, inject } from '@angular/core';
import { SidebarDashboardComponent } from '../sidebar-dashboard/sidebar-dashboard.component';
import { VisualizzazioneDashboardComponent } from '../visualizzazione-dashboard/visualizzazione-dashboard.component';
import { ExportReportService } from '../../_services/export-report.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarDashboardComponent, VisualizzazioneDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  export = inject(ExportReportService);

}
