import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Immobile } from '../../../data';
import { ImmobiliService } from '../_services/immobili.service';

import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OfferteServiceService } from '../_services/offerte-service.service';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dettagli-immobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dettagli-immobile.component.html',
  styleUrl: './dettagli-immobile.component.scss'
})
export class DettagliImmobileComponent implements OnInit, AfterViewInit{

  map: google.maps.Map | null = null;
  markers: any[] = [];
  currentMarker: any = null;
  
  immobiliService = inject(ImmobiliService);
  activatedRoute = inject(ActivatedRoute);
  offerteService= inject(OfferteServiceService);
  auth = inject(AuthService);

  imageIds: number[] = [];
  currentlyDisplayedImageIndex: number = 0;

  showOffer: boolean = false;
  applyOffer: boolean = false;
  tempOffers = {
    price: null as number | null,
  };

  immobileTrovato = false;

  immobile: Immobile =     {
      nome: "testName",
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

offertaValueForm = new FormGroup({
      value: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      )
    })


  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id']);
      const immobileID = this.activatedRoute.snapshot.params['id'];
      this.immobiliService.getImmobile(immobileID).subscribe({
        next: (data) => {
          console.log(data)

          this.immobile = this.immobiliService.convertRESTImmobile(data);
          this.immobileTrovato = true;
          /*this.initMap().then(() => {

           this.updateMap();

  
          })*/
         this.map?.setCenter({
          lat: this.immobile.latitudine,
          lng: this.immobile.longitudine
         })
         this.updateMap();
        }
      });

      this.immobiliService.getImageList(immobileID).subscribe({
        next: (imageIds) => {
          console.log('Image IDs:', imageIds);
          this.imageIds = imageIds;
        }
      });

  this.immobiliService.postVisualizzazione(immobileID).subscribe({
     next: (data: any) => {
        console.log("postVisualizzazione: ", data);
    }
  })

  }

    async ngAfterViewInit() {
      await this.initMap();
      this.updateMap;
      
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

    nextImage(){
      this.currentlyDisplayedImageIndex = (this.currentlyDisplayedImageIndex + 1  + this.imageIds.length) % this.imageIds.length;
    }

    previousImage(){
      this.currentlyDisplayedImageIndex = (this.currentlyDisplayedImageIndex - 1  + this.imageIds.length) % this.imageIds.length;
    }

    closeOfferta(){
      this.showOffer = false;
      this.applyOffer = false;
    }

    applyOfferta(){

    this.showOffer = false;
    this.offerteService.createOffer(this.immobile.id, Number(this.offertaValueForm.value.value!)).subscribe({
      next: (data: any) => {
        console.log('Offerta creata con successo:', data);

    //    this.applyOffer = true;
      },
      error: (error: any) => {
        console.error('Errore nella creazione dell\'offerta:', error);
      }
    });
  }
}
