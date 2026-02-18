import { Component, inject } from '@angular/core';
import { SearchResultImmobiliComponent } from '../search-result-immobili/search-result-immobili.component';
import { SearchResultMapComponent } from '../search-result-map/search-result-map.component';
import Instant from 'ts-time/Instant';
import { Immobile } from '../../../data';
import { SearchFiltersService } from '../_services/search-filters.service';
import { ImmobiliService } from '../_services/immobili.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchResultImmobiliComponent, SearchResultMapComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  SearchFiltersService = inject(SearchFiltersService);
  immobileService = inject(ImmobiliService);

    immobili: any[] = [
    {
      nome: "hi",
      id: 1,
      tipoImmobile: "Appartamento",
      longitudine: 14.190889915493532,
      latitudine: 40.82852062332247,
      indirizzo: {
        nome: "Via Roma 10, Napoli",
        via: "via Roma 10",
        citta: "Napoli",
        provincia: "Napoli",
      },
      descrizione: "Appartamento accogliente situato nel cuore di Napoli, vicino a tutti i servizi principali.",
      tagDescrizione: ["balcone", "garage"],
      prezzo: 250000,
      quadratura: 90,
      numeroVisualizzazioni: 150,
      tipologiaContratto: "Vendita",
      speseCondominiali: 50,
      offerte: [],
      agenteImmobiliare: {
        username: "agente1",
        email: "pene",
        nome: "Mario",
        cognome: "Rossi",
        telefono: "1234567890",
        agenziaImmobiliare: "Napoli Casa"
      },
      isVenduto: false,
      istanteCreazione: Instant.now(),
      immagini: ["img1.jpg", "img2.jpg"]
    },
    {
      nome: "hello",
      id: 2,
      tipoImmobile: "Appartamento",
      longitudine: 14.3759,
      latitudine: 40.6279,
      indirizzo: {
        nome: "Corso Italia 25, Sorrento",
        via: "Corso Italia 25",
        citta: "Sorrento",
        provincia: "Napoli",
      },
      descrizione: "Appartamento luminoso con vista mare, dotato di ampio terrazzo e finiture moderne.",
      tagDescrizione: ["terrazzo", "vista mare"],
      prezzo: 400000,
      quadratura: 90,
      numeroVisualizzazioni: 80,
      tipologiaContratto: "Vendita",
      speseCondominiali: 30,
      offerte: [],
      agenteImmobiliare: {
        username: "agente2",
        email: "agente2@example.com",
        nome: "Luigi",
        cognome: "Verdi",
        telefono: "0987654321",
        agenziaImmobiliare: "Sorrento Immobiliare"
      },
      isVenduto: false,
      istanteCreazione: Instant.now(),
      immagini: ["img1.jpg", "img2.jpg"]
    }
  ];





  async ngOnInit() {
    
    console.log("Immobili da visualizzare:", this.SearchFiltersService.arrayImmobili);
    const nuoviImmobili: Immobile[] = [];

    for (let immobile of this.SearchFiltersService.arrayImmobili) {
      nuoviImmobili.push( await this.immobileService.convertRESTImmobile(immobile));
    }

    this.immobili = [...this.immobili, ...nuoviImmobili];

}
  

}
