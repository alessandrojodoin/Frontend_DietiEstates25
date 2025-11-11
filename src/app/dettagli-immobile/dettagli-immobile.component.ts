import { Component } from '@angular/core';
import { Immobile } from '../../../data';
import Instant from 'ts-time/Instant';

@Component({
  selector: 'app-dettagli-immobile',
  standalone: true,
  imports: [],
  templateUrl: './dettagli-immobile.component.html',
  styleUrl: './dettagli-immobile.component.scss'
})
export class DettagliImmobileComponent {

  immobile: Immobile =     {
      id: 2,
      tipoImmobile: "Appartamento",
      longitudine: 14.3759,
      latitudine: 40.6279,
      indirizzo: "Corso Italia 25, Sorrento",
      tagDescrizione: ["terrazzo", "vista mare"],
      prezzo: 400000,
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

}
