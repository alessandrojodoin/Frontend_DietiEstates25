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


  creaImmobileService = inject(CreaImmobileService)

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

    
  // Request needed libraries.
  //loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const myLatlng = { lat: 40.82852062332247, lng: 14.190889915493532  }; //NAAAAAAAAAAAAPOLIIIIIIIIIIIII


    const map = new google.maps.Map(document.getElementById("map")!, {
      zoom: 18,
      center: myLatlng,
      mapId: "7e09b66dcfaa788fb9c8f8bd",
      zoomControl: true,
    });


    //google.maps.event.trigger(map, 'resize');
    map.setClickableIcons(false);


    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Seleziona la posizione dell'immobile",
      position: myLatlng,
    });


    infoWindow.open(map);


    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent: any) => {
      // Close the current InfoWindow.
      infoWindow.close();

      this.currentMarker?.setMap(null)
      console.log(mapsMouseEvent.latLng.toJSON());
     
      this.currentMarker = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map: map,
      });
      //this.currentMarker.setAnimation(google.maps.Animation.DROP);

       // Create a new InfoWindow.


    });

    const geocoder = new google.maps.Geocoder();


  geocoder.geocode({ address: fullAddress }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {

      const location = results[0].geometry.location;

      map.setCenter(location);

      new google.maps.Marker({
        position: location,
        map: map
      });

    } else {
      console.error("Indirizzo non trovato:", status);
    }
  });

 }

  


  constructor(private router: Router){}
  

  ngAfterViewInit(){
    this.initMap();


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
 
  }


  @Output() goToPage = new EventEmitter<number>();

}
