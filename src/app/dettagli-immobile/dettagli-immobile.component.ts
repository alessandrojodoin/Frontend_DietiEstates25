import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { getSuperficie, Immobile } from '../../../data';
import { ImmobiliService } from '../_services/immobili.service';

import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OfferteServiceService } from '../_services/offerte-service.service';
import { AuthService } from '../_services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { VisiteService } from '../_services/visite.service';
import { ToastrService } from 'ngx-toastr';

type StatoPopup = 'prenotazione' | 'riepilogo' | 'acknowledgment';

@Component({
  selector: 'app-dettagli-immobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dettagli-immobile.component.html',
  styleUrl: './dettagli-immobile.component.scss'
})
export class DettagliImmobileComponent implements OnInit, AfterViewInit{

  loading: boolean = false;
  map: google.maps.Map | null = null;
  markers: any[] = [];
  currentMarker: any = null;
  superficie: any = null;
  
  immobiliService = inject(ImmobiliService);
  activatedRoute = inject(ActivatedRoute);
  offerteService= inject(OfferteServiceService);
  auth = inject(AuthService);
  visiteService = inject(VisiteService);
  toastr = inject(ToastrService);

  imageIds: number[] = [];
  currentlyDisplayedImageIndex: number = 0;

  mostraPopup: boolean = false;
  statoPopup: StatoPopup = 'prenotazione';
  now: Date = new Date();
  twoWeeksLater: Date = new Date(new Date().setDate(new Date().getDate() + 14)); // oggi + 14 giorni
  

  
  minDate = this.formatDateInput(new Date());
  maxDate = this.formatDateInput(new Date(new Date().setDate(new Date().getDate() + 14)));

formatDateInput(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T00:00`;
}
 

  showOffer: boolean = false;
  applyOffer: boolean = false;
  tempOffers = {
    price: null as number | null,
  };

  immobileTrovato = false;

visiteForm!: FormGroup;


contattiForm = new FormGroup({
  telefono: new FormControl('',
    [Validators.required,
    Validators.minLength(1),
    Validators.maxLength(10)]
  ),
  email: new FormControl('',
    [Validators.required,
    Validators.email]
  )
})

  immobile: Immobile = {} as Immobile;

offertaValueForm = new FormGroup({
      value: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      )
    })


  ngOnInit() {
    this.now = new Date();
    this.twoWeeksLater = new Date();
    this.twoWeeksLater.setDate(this.now.getDate() + 14);

     this.visiteForm = new FormGroup({
    dataVisita: new FormControl(
      this.formatDateInput(this.now), // valore di default
      [
        Validators.required,
        this.dataDentroDueSettimane(this.now, this.twoWeeksLater),
        this.orarioValido
        
      ]
    ),
    modeVisita: new FormControl('In Presenza', Validators.required)
  });
const control = this.visiteForm.get('dataVisita');

control?.valueChanges.subscribe(() => {
  control.updateValueAndValidity({ emitEvent: false });

  if (control.errors?.['orarioNonValido']) {
    this.toastr.warning("Orario non valido. Fasce disponibili: 9-12, 15-19");
  }
});

   
  
    console.log(this.activatedRoute.snapshot.params['id']);
      const immobileID = this.activatedRoute.snapshot.params['id'];
      this.immobiliService.getImmobile(immobileID).subscribe({
        next: async (data) => {
          console.log(data)

          this.immobile = await this.immobiliService.convertRESTImmobile(data);
          this.immobileTrovato = true;
          this.superficie= getSuperficie(this.immobile);
          this.initMap().then(() => {

           this.updateMap();

  
          })
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

      if(this.auth.getUserType() === 'cliente'){
        this.immobiliService.postVisualizzazione(immobileID).subscribe({
        next: (data: any) => {
          console.log("postVisualizzazione: ", data);
        }
        });

      }
  
  }

    async ngAfterViewInit() {


     // await this.initMap();
      this.updateMap;
      
  }


  async initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const center = { lat: this.immobile.latitudine, lng: this.immobile.longitudine     }; 

    const mapEl = document.getElementById('map');
    
    if (!mapEl) {
      console.error('Map element not found!');
      return;
    }


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


  tornaIndietro(){
    this.statoPopup = 'prenotazione';
  }


  onSubmit() {
  const control = this.visiteForm.get('dataVisita');
  if (!control) return;

  if (control.errors) {
    if (control.errors['fuoriRange']) { 
      this.showErrorToast("La visita deve essere entro le prossime 2 settimane");
    }
    if (control.errors['orarioNonValido']) { 
      this.showErrorToast("Orario non valido. Fasce disponibili: 9-12, 15-19");
    }
    return; // blocca il passaggio allo stato riepilogo
  }

  this.statoPopup = 'riepilogo';
}




  conferma(){
  this.loading = true;
  this.visiteService.postVisiteCliente(this.immobile.id, this.visiteForm.value.dataVisita!, this.visiteForm.value.modeVisita).subscribe({
     next: (data) => {
       this.statoPopup = 'acknowledgment';
       this.loading = false;
     },
     error: (err) => {
       console.error(err);
    

        const msg = err.error?.message;

        if (msg?.includes("Slot")) {
          this.showErrorToast("Lo slot selezionato è già occupato");
        } else {
          this.showErrorToast("Errore nella prenotazione.");
        }

        this.statoPopup = 'prenotazione';
       
       this.showErrorToast(msg);
     }
  });
}


  chiudiPopup(){
    this.mostraPopup = false;
    this.statoPopup = 'prenotazione';
  }

  dataDentroDueSettimane = (min: Date, max: Date): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const valore = new Date(control.value);
    if (isNaN(valore.getTime())) return null;
    if (valore < min || valore > max) return { fuoriRange: true };
    return null;
  };
}

orarioValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const data = new Date(control.value);
  if (isNaN(data.getTime())) return null;
  const ora = data.getHours();
  if ((ora >= 9 && ora < 13) || (ora >= 15 && ora < 19)) {
    return null;
  }
  return { orarioNonValido: true };
};

showErrorToast(message: string) {
  this.toastr.error(message, 'Errore prenotazione', { positionClass: 'toast-center-center' });
}


}
