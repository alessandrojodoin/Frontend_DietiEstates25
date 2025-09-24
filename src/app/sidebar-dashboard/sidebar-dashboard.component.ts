import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.scss'
})
export class SidebarDashboardComponent {
  sidebar: string = 'Immobili';

    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.route.fragment.subscribe(fragment => {
        console.log('Fragment is:', fragment);
  
        if (fragment === 'Immobili') {
          this.onImmobiliVisuClick();
        } else if (fragment === 'Offerte') {
          this.offerteRicevute();
        } else if (fragment === 'Prenotazioni') {
          this.prenotazioniRicevute();
        } else if (fragment === 'Vendite') {
          this.venditeEffettuate();
        } else if (fragment === 'Storico') {
          this.storico();
        }
      });
    }
  
 
  onImmobiliVisuClick() {
    this.sidebar = 'Immobili';
  }

  offerteRicevute() {
    this.sidebar = 'Offerte';
  }

  prenotazioniRicevute() {
    this.sidebar = 'Prenotazioni';
  }

  venditeEffettuate() {
    this.sidebar = 'Vendite';
  }

  storico() {
    this.sidebar = 'Storico';
  }

}
