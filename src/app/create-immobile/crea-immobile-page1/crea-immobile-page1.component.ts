import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreaImmobileService } from '../../_services/crea-immobile.service';
import { CommonModule } from '@angular/common';
import { Comuni } from '../../../assets/comuni';
import { Province } from '../../../assets/province';


//import {GoogleMaps} from  'google.maps'


@Component({
  selector: 'app-crea-immobile-page1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crea-immobile-page1.component.html',
  styleUrl: './crea-immobile-page1.component.scss'
})
export class CreaImmobilePage1Component {
  provinceList: any[] = [];
  comuniList: any[] = [];
  allComuni: { [sigla: string]: string[] } = Comuni.comuni;
  provinciaNonSelezionata = false;
  mostraFeedback = false;
  filteredComuni: string[] = [];
  map: google.maps.Map | null = null;
  geocoder: google.maps.Geocoder | null = null;



  creaImmobileService = inject(CreaImmobileService);

    locationForm = new FormGroup({
      indirizzo: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
      citta: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
      provincia: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
    })

  currentMarker: google.maps.Marker | null = null;

  
  async initMap() {
  let fullAddress = `${this.locationForm.value.indirizzo} ${this.locationForm.value.citta} ${this.locationForm.value.provincia}`;

  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  await google.maps.importLibrary("marker");

  const myLatlng = { lat: 40.82852062332247, lng: 14.190889915493532 };

  this.map = new Map(document.getElementById("map")!, {
    zoom: 18,
    center: myLatlng,
    mapId: "7e09b66dcfaa788fb9c8f8bd",
    zoomControl: true,
  });

  this.map.setClickableIcons(false);

  this.geocoder = new google.maps.Geocoder();

  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Seleziona la posizione dell'immobile",
    position: myLatlng,
  });

  infoWindow.open(this.map);

  // Configure the click listener.
  this.map.addListener("click", (mapsMouseEvent: any) => {
 // Close the current InfoWindow.
    infoWindow.close();

    const latLng = mapsMouseEvent.latLng;

    this.placeMarker(latLng);
    this.reverseGeocode(latLng);
  });

  //se i campi erano già riempiti, metti il marker di conseguenza
  if (fullAddress.trim()) {
    this.geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === "OK" && results && results.length > 0 && this.map) {
        const location = results[0].geometry.location;

        this.map.setCenter(location);
        this.placeMarker(location);
      }
    });
  }

  
  this.locationForm.valueChanges.subscribe(val => {
    if (!val.indirizzo || !val.citta || !val.provincia) return;

    const address = `${val.indirizzo} ${val.citta} ${val.provincia}`;

    this.geocoder?.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results.length > 0 && this.map) {
        const pos = results[0].geometry.location;
        this.map.setCenter(pos);
        this.placeMarker(pos);
      }
    });
  });
}



  placeMarker(latLng: google.maps.LatLng) {
  if (!this.map) return;

  this.currentMarker?.setMap(null);

  this.currentMarker = new google.maps.Marker({
    position: latLng,
    map: this.map,
  });
}

reverseGeocode(latLng: google.maps.LatLng) {
  if (!this.geocoder) return;

  this.geocoder.geocode({ location: latLng }, (results, status) => {
    if (status === "OK" && results && results.length > 0) {
      const r = results[0];

      let indirizzo = "";
      let citta = "";
      let provincia = "";

      for (const comp of r.address_components) {
        if (comp.types.includes("route")) indirizzo = comp.long_name;
        if (comp.types.includes("locality")) citta = comp.long_name;
        if (comp.types.includes("administrative_area_level_2"))
          provincia = comp.short_name;
      }

      this.locationForm.patchValue({
        indirizzo,
        citta,
        provincia,
      });
    }
  });
}


  constructor(private router: Router){}
  

  ngAfterViewInit(){
    this.initMap();

    this.locationForm.valueChanges.subscribe(val => {
    if (!val.indirizzo || !val.citta || !val.provincia) return;

    const full = `${val.indirizzo} ${val.citta} ${val.provincia}`;

    this.geocoder?.geocode({ address: full }, (results, status) => {
      if (status === "OK" && results && results.length > 0 && this.map) {
        const pos = results[0].geometry.location;

        this.map.setCenter(pos);
        this.placeMarker(pos);
      }
    });
    });

    this.locationForm.value.indirizzo = this.creaImmobileService.immobile.indirizzo?.nome;
    this.locationForm.value.indirizzo = this.creaImmobileService.immobile.indirizzo?.citta;
    this.locationForm.value.indirizzo = this.creaImmobileService.immobile.indirizzo?.provincia;
    //posizione mappa DA AGGIUNGERE???
    
    this.locationForm.patchValue({
      indirizzo: this.creaImmobileService.immobile.indirizzo?.nome,
      citta: this.creaImmobileService.immobile.indirizzo?.citta,
      provincia: this.creaImmobileService.immobile.indirizzo?.provincia
    });



    console.log(this.creaImmobileService.immobile);

  this.locationForm.patchValue({
    indirizzo: this.creaImmobileService.immobile.indirizzo?.nome,
    citta: this.creaImmobileService.immobile.indirizzo?.citta,
    provincia: this.creaImmobileService.immobile.indirizzo?.provincia
  });

  Province.province.forEach(item => {
    this.provinceList.push({ ...item });
  });

  // Inizializza comuni filtrati se la provincia è già presente
  const prov = this.locationForm.value.provincia;
  if (prov) {
    this.filterComuniByProvincia(prov);
  }

   // Aggiorna i comuni quando cambia la provincia
  this.locationForm.get('provincia')?.valueChanges.subscribe(sigla => {
    if(sigla)
      this.filterComuniByProvincia(sigla);
    this.locationForm.patchValue({ citta: '' });
  });

  /*Comuni.comuni.forEach(item => {
    this.comuniList.push({ ...item });
  });*/
 
  }

filterComuniByProvincia(siglaProvincia: string) {
  this.comuniList = (this.allComuni[siglaProvincia] || []).map(c => ({ nome: c, sigla: siglaProvincia }));
}

onInputComune(event: any) {
  const val = event.target.value.toLowerCase();
  this.filteredComuni = this.comuniList.filter(c => c.toLowerCase().includes(val));
}
selectComune(c: string) {
  this.locationForm.patchValue({ citta: c });
  this.filteredComuni = [];
}

checkProvincia() {
  if (!this.locationForm.value.provincia) {
    this.mostraFeedback = true;

    // Nasconde il messaggio dopo 3 secondi
    setTimeout(() => {
      this.mostraFeedback = false;
    }, 3000);

    return false; // eventualmente impedisce la selezione del comune
  }
  return true;
}


  onSubmit(){
    //this.router.navigate(['/create-immobile-page2']);
    this.updateImmobile();
    this.goToPage.emit(2);
  }


  onAnnulla() {
      this.updateImmobile();
      this.router.navigate(['/']);
  }


  updateImmobile() {
    this.creaImmobileService.immobile.indirizzo = {
      nome: this.locationForm.value.indirizzo!,
      via: this.locationForm.value.indirizzo!,
      citta: this.locationForm.value.citta!,
      provincia: this.locationForm.value.provincia!,
    }
    this.creaImmobileService.immobile.latitudine = this.currentMarker?.getPosition()?.lat();
    this.creaImmobileService.immobile.longitudine = this.currentMarker?.getPosition()?.lng();
 
    console.log("LAT: ", this.creaImmobileService.immobile.latitudine);
    console.log("LNG: ", this.creaImmobileService.immobile.longitudine);
  }


  @Output() goToPage = new EventEmitter<number>();

}
