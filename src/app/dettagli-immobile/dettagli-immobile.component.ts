import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Immobile } from '../../../data';
import { ImmobiliService } from '../_services/immobili.service';

import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dettagli-immobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dettagli-immobile.component.html',
  styleUrl: './dettagli-immobile.component.scss'
})
export class DettagliImmobileComponent implements OnInit, AfterViewInit{

  map: google.maps.Map | null = null;
  markers: any[] = [];
  currentMarker: any = null;
  
  immobiliService = inject(ImmobiliService);
  imageIds: number[] = [];
  
  immobile: Immobile =     {
      id: 1,
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
      tagDescrizione: ["terrazzo", "vista mare", "luminoso", "moderno", "arredato", "climatizzato"],
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


  ngOnInit() {
      const immobileID = this.immobile.id;
      this.immobiliService.getImmobile(immobileID).subscribe({
        next: (data) => {
          this.immobile = data;
        }
      });

      this.immobiliService.getImageList(immobileID).subscribe({
        next: (imageIds) => {
          console.log('Image IDs:', imageIds);
          this.imageIds = imageIds;
        }
      });
  }

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

    const center = { lat: this.immobile.latitudine, lng: this.immobile.longitudine     }; 

    this.map = new Map(mapEl, {
      center,
      zoom: 17,
      mapId: "7e09b66dcfaa788fb9c8f8bd",
      zoomControl: true,
    });
  }


  async updateMap() {
    if (!this.map) return;

    // Import the marker library dynamically
    const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      const marker = new Marker({
        position: { lat: this.immobile.latitudine, lng: this.immobile.longitudine },
        map: this.map!,
        title: this.immobile.indirizzo.nome
      });

      marker.addListener("click", () => {
        new google.maps.InfoWindow({
          content: `
            <div>
              <b>${this.immobile.tipoImmobile}</b><br>
              ${this.immobile.indirizzo.nome}<br>
              Prezzo: €${this.immobile.prezzo.toLocaleString()}
            </div>
          `
        }).open(this.map!, marker);
      });

      this.markers.push(marker);
    };
}
