import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { VisualizzazioneAttivitaComponent } from '../visualizzazione-attivita/visualizzazione-attivita.component';

@Component({
  selector: 'app-riepilogo-attivita',
  standalone: true,
  imports: [SidebarComponent, VisualizzazioneAttivitaComponent],
  templateUrl: './riepilogo-attivita.component.html',
  styleUrl: './riepilogo-attivita.component.scss'
})
export class RiepilogoAttivitaComponent {

}
