import { Injectable, inject } from '@angular/core';
import { AgenteImmobiliare, Immobile, Indirizzo } from '../../../data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, EMPTY } from 'rxjs';
import Instant from 'ts-time/Instant';
import { AuthService } from './auth.service';
import { RedirectCommand } from '@angular/router';
import { AuthRestService } from './auth-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private rest = inject(AuthRestService);
  private url = "http://localhost:8080/api/1.0";

  


  immobileExample = {
    "immobile": {
        "tipoImmobile": "affitto",
        "latitudine": "40.898804999999996",
        "longitudine": "14.312139741946309",
        "indirizzo": "Corso Umberto 2000",
        "citta": "Napoli",
        "provincia": "Napoli",
        "tags": [
            {
                "nome": "hello",
                "type": "NoValue"
            }
        ]
    },
    "tipologiaContratto": "Affitto",
    "speseCondominiali": 320,
    "prezzo": 2000
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }),
        responseType: 'json' as const,
      }
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': ``
        }),
        responseType: 'json' as const,
      }
    }
  }


  private jsonHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': ''
    }),
    responseType: 'json' as const,
  };


  private textHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': ''
    }),
    responseType: 'text' as const,
  };

  

  createImmobile(immobile: {tipoImmobile: string, latitudine: string, longitudine: string, nome: string, descrizione: string, via: string, citta: string,
                  provincia: string, tags: Array<{nome: string, type: string, valore?: any}>,
                  tipologiaContratto: string, speseCondominiali: number, prezzo: number}) 
                {

    let datiImmobile = {
      immobile: {
        tipoImmobile: immobile.tipoImmobile,
        latitudine: immobile.latitudine,
        longitudine: immobile.longitudine,
        via: immobile.via,
        citta: immobile.citta,
        provincia: immobile.provincia,
        tags: immobile.tags
      },
      nome: immobile.nome,
      descrizione: immobile.descrizione, 
      tipologiaContratto: immobile.tipologiaContratto,
      speseCondominiali: immobile.speseCondominiali,
      prezzo: immobile.prezzo
    }


    const url = `${this.url}/immobile`;
    const headers = this.getAuthHeaders();
    return this.http.post<string>(url, datiImmobile, headers);

  }


  caricaFoto(immagini: { file: File }[], immobileId: number) {
    const url = `${this.url}/immobile/${immobileId}/image`;
    const headers = this.getAuthHeaders().headers; 

    for (const imageObj of immagini) {
      const file: File = imageObj.file;

      this.http.post(url, file, {
        headers,
        responseType: 'text'
      }).subscribe({
        next: () => console.log('Upload OK'),
        error: err => console.error(err)
      });
    }
  }


  getFotoImmobile(immobileId: number, imageId: number) {
      const url = `${this.url}/immobile/${immobileId}/image/${imageId}`;
      const headers = this.getAuthHeaders();

      return this.http.get(url, {
        ...headers,
        responseType: 'blob'
      });
      
  }

  getImmobiliList(){
    const url = `${this.url}/immobili`;
    return this.http.get<Immobile[]>(url, {
      responseType: 'json'
    });
  }

  getImmobiliListByAgente(agenteUsername: string){
    const url = `${this.url}/immobile?agenteImmobiliare=${agenteUsername}`;
    const headers = this.getAuthHeaders();
    return this.http.get<Immobile[]>(url, headers);
  }

  getImmobile(immobileId: number){
    console.log("getImmobile http request")
    const url = `${this.url}/immobile/${immobileId}`;
    return this.http.get<Immobile>(url, {
      responseType: 'json'
  });
  }

  getImageList(immobileId: number) {
    const url = `${this.url}/immobile/${immobileId}/imageIds`;
    return this.http.get<number[]>(url, {
      responseType: 'json'
    });
  }

  postVisualizzazione(immobileId: number | string) {
  const url = `${this.url}/immobile/visualizzazione`;
  const headers = this.getAuthHeaders();

  return this.http.post(
    url,
    { id: Number(immobileId) },
    headers
  );
}

getImmobiliVisualizzati(){
  const url = `${this.url}/immobile?cliente=${this.authService.getUsername()}`;
  const headers = this.getAuthHeaders();
    return this.http.get<Immobile[]>(url, headers);
}

postImmobileVenduto(immobileId: number){
const url = `${this.url}/immobile/${immobileId}/venduto`;
const headers = this.getAuthHeaders();
 return this.http.post(
    url,
    { id: Number(immobileId) },
    headers
  );
}


getImmobileListFiltri(
            appliedFilters: boolean,
            minPrice: number | null,
            maxPrice: number | null,
            propertyType: string | null,
            bathrooms: number | null,
            bedrooms: number | null,
            areaSize: number | null,
            energyClass: string | null,
            citta: string | null,
            terrazzo: boolean | null,
            balcone: boolean | null,
            ascensore: boolean | null,
            garage: boolean | null,
            giardino: boolean | null,
            postoAuto: boolean | null,
            accessoDisabili: boolean | null
    ) 
    {
 let params = new HttpParams();

  if (appliedFilters != null) params = params.set('filters', appliedFilters.toString());
  if (minPrice != null) params = params.set('minPrice', minPrice.toString());
  if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());
  if (propertyType) params = params.set('propertyType', propertyType);
  if (bathrooms != null) params = params.set('bathrooms', bathrooms.toString());
  if (bedrooms != null) params = params.set('bedrooms', bedrooms.toString());
  if (areaSize != null) params = params.set('areaSize', areaSize.toString());
  if (energyClass) params = params.set('energyClass', energyClass);
  if (citta) params = params.set('citta', citta);
  if (terrazzo != null) params = params.set('terrazzo', terrazzo.toString());
  if (balcone != null) params = params.set('balcone', balcone.toString());
  if (ascensore != null) params = params.set('ascensore', ascensore.toString());
  if (garage != null) params = params.set('garage', garage.toString());
  if (giardino != null) params = params.set('giardino', giardino.toString());
  if (postoAuto != null) params = params.set('postoAuto', postoAuto.toString());
  if (accessoDisabili != null) params = params.set('accessoDisabili', accessoDisabili.toString());

  return this.http.get<Immobile[]>(`${this.url}/immobile`, {
    ...this.getAuthHeaders(),
    params
  });

    }



  async convertRESTImmobile(RESTImmobile: any){
    let immobile;
    let agente = await this.rest.getUserData(RESTImmobile.creatore).toPromise();


    return immobile = {
      nome: RESTImmobile.nome,
      descrizione: RESTImmobile.descrizione,
      id: RESTImmobile.id,
      numeroVisualizzazioni: RESTImmobile.numeroVisualizzazioni,
      tipologiaContratto: RESTImmobile.tipologiaContratto,
      prezzo: RESTImmobile.prezzo,
      speseCondominiali: RESTImmobile.speseCondominiali,
      isVenduto: RESTImmobile.isVenduto,
      istanteCreazione: RESTImmobile.istanteCreazione,
      tipoImmobile: RESTImmobile.immobile.tipoImmobile,
      longitudine: Number(RESTImmobile.immobile.longitudine),
      latitudine: Number(RESTImmobile.immobile.latitudine),
      indirizzo: {
        via: RESTImmobile.immobile.indirizzo.via,
        citta: RESTImmobile.immobile.indirizzo.citta,
        provincia: RESTImmobile.immobile.indirizzo.provincia,
        nome: ""
      },
      quadratura: 42,
      tagDescrizione: RESTImmobile.immobile.tags,
      offerte: [],
      immagini: [],
      agenteImmobiliare: agente as AgenteImmobiliare

    }
  }






}
