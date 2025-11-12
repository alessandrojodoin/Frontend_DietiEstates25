import { Component, AfterViewInit } from '@angular/core';
import { Immobile } from '../../../data';
import Instant from 'ts-time/Instant';

@Component({
  selector: 'app-search-result-map',
  standalone: true,
  templateUrl: './search-result-map.component.html',
  styleUrl: './search-result-map.component.scss'
})
export class SearchResultMapComponent implements AfterViewInit {

  map: google.maps.Map | null = null;
  markers: any[] = [];
  currentMarker: any = null;

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

  async ngAfterViewInit() {
    await this.initMap();
    this.updateMap();
  }

  async initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    const mapEl = document.getElementById('map');
    if (!mapEl) {
      console.error('Map element not found!');
      return;
    }

    const center = { lat: 40.8518, lng: 14.2681 }; // Napoli roughly

    this.map = new Map(mapEl, {
      center,
      zoom: 10,
      mapId: "7e09b66dcfaa788fb9c8f8bd",
      zoomControl: true,
    });
  }

  async updateMap() {
    if (!this.map) return;

    // Import the marker library dynamically
    const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.immobili.forEach((immobile) => {
      const marker = new Marker({
        position: { lat: immobile.latitudine, lng: immobile.longitudine },
        map: this.map!,
        title: immobile.indirizzo.nome
      });

      marker.addListener("click", () => {
        new google.maps.InfoWindow({
          content: `
            <div>
              <b>${immobile.tipoImmobile}</b><br>
              ${immobile.indirizzo}<br>
              Prezzo: €${immobile.prezzo.toLocaleString()}
            </div>
          `
        }).open(this.map!, marker);
      });

      this.markers.push(marker);
    });
  }
}
