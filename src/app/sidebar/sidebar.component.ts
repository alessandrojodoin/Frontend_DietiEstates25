import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebar: string = 'Immobili';
  
 
  onImmobiliVisuClick() {
    this.sidebar = 'Immobili';
  }

  offerteFatte() {
    this.sidebar = 'Offerte';
  }

  prenotazioniEffettuate() {
    this.sidebar = 'Prenotazioni';
  }

}
