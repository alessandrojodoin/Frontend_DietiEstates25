import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OfferteServiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = "http://localhost:8080/api/1.0";

  constructor() {}

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
  
  //Per offerte su un immobile...
  createOffer(immobileId: number, offerPrice: number) {

    const authState = this.authService.authState; 
    const url = `${this.url}/offerte`;
    const headers = this.getAuthHeaders();
    return this.http.post<string>(url, { nome: authState.nome, cognome: authState.cognome, email: authState.email,
      numeroTelefonico: authState.numeroTelefonico, immobileId: immobileId, offerPrice: offerPrice }, headers);

  }

  createExternalOffer(immobileId: number, nome: String, cognome: String, email: String, numeroTelefonico: String, offerPrice: number){
    
    const url= `${this.url}/offerte/offerteEsterne`;
     const headers = this.getAuthHeaders();
      return this.http.post<string>(url, { nome: nome, cognome: cognome, email: email,
      numeroTelefonico: numeroTelefonico, immobileId: immobileId, offerPrice: offerPrice }, headers);
  }

annullaAccettazione(offertaId: number){
    const url =  `${this.url}/offerte/${offertaId}/revisionata`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, {}, headers);
}


  getOffersMadeByClient() {
    console.log("Getting offers made by client:", this.authService.getUsername());
    const url = `${this.url}/offerte?username=${this.authService.getUsername()}`;
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(url, headers);
  }

  getOffersForImmobile(immobileId: number) {
    const url = `${this.url}/offerte?immobileId=${immobileId}&offerteEsterne=true`;
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(url, headers);
  }

  accettaOfferta(offertaId: number){
    const url = `${this.url}/offerte/${offertaId}/accettata`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, {}, headers);
  }


  rifiutaOfferta(offertaId: number){
    const url = `${this.url}/offerte/${offertaId}/rifiutata`;
    const headers = this.getAuthHeaders();
    return this.http.post<any>(url, {}, headers);
  }

  contropropostaOfferta(offertaId: number, valoreOfferta: number) {
  const url = `${this.url}/offerte/${offertaId}/controproposta`;

  const body = {
    controproposta: valoreOfferta
  };

  return this.http.post<any>(url, body, this.getAuthHeaders());
}

deleteOfferta(offertaId: number){

  const url = `${this.url}/offerte/${offertaId}`;
  return this.http.delete(url);

}


}
