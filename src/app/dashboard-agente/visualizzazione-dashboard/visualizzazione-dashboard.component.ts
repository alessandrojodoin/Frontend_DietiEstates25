import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VenditeEffettuateAgenteComponent } from '../vendite-effettuate-agente/vendite-effettuate-agente.component';
import { StoricoAgenteComponent } from '../storico-agente/storico-agente.component';
import { PrenotazioniRicevuteComponent } from '../prenotazioni-ricevute/prenotazioni-ricevute.component';
import { OfferteRicevuteComponent } from '../offerte-ricevute/offerte-ricevute.component';
import { ImmobiliListAgenteComponent } from '../immobili-list-agente/immobili-list-agente.component';

@Component({
  selector: 'app-visualizzazione-dashboard',
  standalone: true,
  imports: [CommonModule, VenditeEffettuateAgenteComponent, StoricoAgenteComponent, PrenotazioniRicevuteComponent, OfferteRicevuteComponent, ImmobiliListAgenteComponent],
  templateUrl: './visualizzazione-dashboard.component.html',
  styleUrl: './visualizzazione-dashboard.component.scss'
})
export class VisualizzazioneDashboardComponent {
currentSection: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.currentSection = fragment;
      this.loadData(fragment);
    });
  }

  loadData(section: string | null) {
    if (!section) return;
    switch (section) {
      case 'Immobili':
        console.log('Loading immobili summary');
        break;
      case 'Offerte':
        console.log('Loading offerte summary');
        break;
      case 'Prenotazioni':
        console.log('Loading prenotazioni summary');
        break;
      case 'Vendite':
        console.log('Loading prenotazioni summary');
        break;
      case 'Storico':
        console.log('Loading prenotazioni summary');
        break;
    }
  }
}
