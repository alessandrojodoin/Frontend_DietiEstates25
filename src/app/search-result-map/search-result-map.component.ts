import { Component, AfterViewInit, Input } from '@angular/core';
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

  @Input()
set immobili(value: Immobile[]) {
  console.log("Aggiornamento immobili per la mappa:", value);
  this._immobili = value;
  if (this.map) {
    this.updateMap();
  }
}
get immobili(): Immobile[] {
  return this._immobili;
}
private _immobili: Immobile[] = [];


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

      console.log(`Aggiunto marker per immobile: ${immobile.nome} (${immobile.latitudine}, ${immobile.longitudine})`);
      marker.addListener("click", () => {
        new google.maps.InfoWindow({
          content: `
            <div>
              <b>${immobile.tipoImmobile}</b><br>
              ${immobile.indirizzo.nome}<br>
              Prezzo: €${immobile.prezzo.toLocaleString()}
            </div>
          `
        }).open(this.map!, marker);
      });

      this.markers.push(marker);
    });
  }
}
