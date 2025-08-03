import { Component } from '@angular/core';

//import {GoogleMaps} from  'google.maps'

@Component({
  selector: 'app-crea-immobile-page1',
  standalone: true,
  imports: [],
  templateUrl: './crea-immobile-page1.component.html',
  styleUrl: './crea-immobile-page1.component.scss'
})
export class CreaImmobilePage1Component {

  currentMarker: google.maps.Marker | null = null;

  
  async initMap() {



    
  // Request needed libraries.
  //loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const myLatlng = { lat: 40.82852062332247, lng: 14.190889915493532  };

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

     
      this.currentMarker = new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map: map,
      });
      //this.currentMarker.setAnimation(google.maps.Animation.DROP);

       // Create a new InfoWindow.


      


  });

}

ngAfterViewInit(){
  this.initMap();
}


}
