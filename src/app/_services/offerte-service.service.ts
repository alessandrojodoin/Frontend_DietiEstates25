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
    const url = `${this.url}/immobile`;
    const headers = this.getAuthHeaders();
    return this.http.post<string>(url, { nome: authState.nome, cognome: authState.cognome, email: authState.email,
      numeroTelefonico: authState.numeroTelefonico, immobileId: immobileId, offerPrice: offerPrice }, headers);

  }

  getOffersMadeByClient() {
    console.log("Getting offers made by client:", this.authService.getUsername());
    const url = `${this.url}/offerte?username=${this.authService.getUsername()}`;
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(url, headers);
  }
}
