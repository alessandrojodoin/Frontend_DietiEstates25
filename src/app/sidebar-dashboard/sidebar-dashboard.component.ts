import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.scss'
})
export class SidebarDashboardComponent {
  sidebar: string = 'Immobili';
  
 
  onImmobiliVisuClick() {
    this.sidebar = 'Immobili';
  }

  offerte() {
    this.sidebar = 'Offerte';
  }

  prenotazioni() {
    this.sidebar = 'Prenotazioni';
  }

  venditeEffettuate() {
    this.sidebar = 'Vendite';
  }

  storico() {
    this.sidebar = 'Storico';
  }

}
