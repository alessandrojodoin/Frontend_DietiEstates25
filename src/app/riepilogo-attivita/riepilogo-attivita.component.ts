import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { VisualizzazioneAttivitaComponent } from '../visualizzazione-attivita/visualizzazione-attivita.component';

@Component({
  selector: 'app-riepilogo-attivita',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent, VisualizzazioneAttivitaComponent],
  templateUrl: './riepilogo-attivita.component.html',
  styleUrl: './riepilogo-attivita.component.scss'
})
export class RiepilogoAttivitaComponent {

}
