import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizzazione-attivita',
  standalone: true,
  imports: [CommonModule],
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
