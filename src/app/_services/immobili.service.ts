import { Injectable, inject } from '@angular/core';
import { Immobile } from '../../../data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, EMPTY } from 'rxjs';
import Instant from 'ts-time/Instant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
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

  

  createImmobile(immobile: {tipoImmobile: string, latitudine: string, longitudine: string, indirizzo: string, citta: string,
                  provincia: string, tags: Array<{nome: string, type: string, valore?: any}>,
                  tipologiaContratto: string, speseCondominiali: number, prezzo: number}) 
                {

    let datiImmobile = {
      immobile: {
        tipoImmobile: immobile.tipoImmobile,
        latitudine: immobile.latitudine,
        longitudine: immobile.longitudine,
        indirizzo: immobile.indirizzo,
        citta: immobile.citta,
        provincia: immobile.provincia,
        tags: immobile.tags
      },
      tipologiaContratto: immobile.tipologiaContratto,
      speseCondominiali: immobile.speseCondominiali,
      prezzo: immobile.prezzo
    }


    const url = `${this.url}/immobile`;
    const headers = this.getAuthHeaders();
    return this.http.post<string>(url, datiImmobile, headers);

  }

  //ex caricaFotoPenxsnrello, Alessandro e' stronzo e me lo ha fatto togliere (AIUTO MI MINACCIA)
/*caricaFoto(immagini: any[], immobileId: number){ 
    const url = `${this.url}/immobile/${immobileId}/image`;
    const headers = this.getAuthHeaders();

    for (let imageObj of immagini) {

    const reader = new FileReader();
    console.log("Penesrnello");
    console.log(imageObj);
    reader.readAsArrayBuffer(imageObj);

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = Array.from(new Uint8Array(arrayBuffer));
      this.http.post(url, byteArray, headers).subscribe()
    };

    }


  }
  */

/*caricaFoto(immagini: { file: File }[], immobileId: number) {
  const url = `${this.url}/immobile/${immobileId}/image`;
  const headers = this.getAuthHeaders(); // NON settare Content-Type

  for (const imageObj of immagini) {
    const file: File = imageObj.file;

    // 🔥 manda direttamente il Blob
    this.http.post(url, file, headers).subscribe({
      next: () => console.log('Immagine caricata'),
      error: err => console.error(err)
    });
  }
}*/

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










/*
  async caricaFoto(immagini: any[], immobileId: number) {

  const url = `${this.url}/immobile/${immobileId}/image`;
  const headers = this.getAuthHeaders();

  for (const imageObj of immagini) {

    const file: File = imageObj.file;

    const arrayBuffer = await file.arrayBuffer();

    const byteArray = Array.from(new Uint8Array(arrayBuffer));

    this.http.post(url, byteArray, headers).subscribe();
  }
}*/




}


