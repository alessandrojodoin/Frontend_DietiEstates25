import { Component } from '@angular/core';
import { Immobile } from '../../../data';
import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-search-result-immobili',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-immobili.component.html',
  styleUrl: './search-result-immobili.component.scss'
})
export class SearchResultImmobiliComponent {
    immobiliArray: Immobile[] = [];

  immobili: Immobile[] = [
    {
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
        telefono: "1234567890"
      },
      isVenduto: false,
      istanteCreazione: Instant.now(),
      immagini: ["img1.jpg", "img2.jpg"]
    },
    {
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
        telefono: "0987654321"
      },
      isVenduto: false,
      istanteCreazione: Instant.now(),
      immagini: ["img1.jpg", "img2.jpg"]
    }
  ];

}
