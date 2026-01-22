import { Component, inject } from '@angular/core';
import { ExportReportService } from '../../_services/export-report.service';

@Component({
  selector: 'app-storico-agente',
  standalone: true,
  imports: [],
  templateUrl: './storico-agente.component.html',
  styleUrl: './storico-agente.component.scss'
})
export class StoricoAgenteComponent {
export = inject(ExportReportService);
}
