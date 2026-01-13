import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferteFatteComponent } from '../offerte-fatte/offerte-fatte.component';
import { ImmobiliListUtenteComponent } from '../immobili-list-utente/immobili-list-utente.component';
import { PrenotazioniEffettuateComponent } from '../prenotazioni-effettuate/prenotazioni-effettuate.component';

@Component({
  selector: 'app-visualizzazione-attivita',
  standalone: true,
  imports: [CommonModule, OfferteFatteComponent, ImmobiliListUtenteComponent, PrenotazioniEffettuateComponent],
  templateUrl: './visualizzazione-attivita.component.html',
  styleUrl: './visualizzazione-attivita.component.scss'
})
export class VisualizzazioneAttivitaComponent implements OnInit {
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
    }
  }
  
}
