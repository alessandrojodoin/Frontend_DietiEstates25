import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private url = "http://localhost:8080/api/1.0";

  constructor() { }

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
    

getVisiteCliente(){
const url= `${this.url}/prenotazioni/mie`;
const headers = this.getAuthHeaders();
return this.http.get<any>(url, headers);
}


postVisiteCliente(immobileId: number, dataOra: string){
const url= `${this.url}/prenotazioni`;
const headers = this.getAuthHeaders();
return this.http.post<any>(url, {immobileId, dataOra}, headers);
}

getVisiteAgente(){
const url= `${this.url}/prenotazioni/agente`;
const headers = this.getAuthHeaders();
return this.http.get<any>(url, headers);
}

putConfermaVisita(prenotazioneId: number){
const url= `${this.url}/prenotazioni/${prenotazioneId}/conferma`;
const headers = this.getAuthHeaders();
return this.http.put<any>(url, {}, headers);
}

putRifiutaVisita(prenotazioneId: number){
const url= `${this.url}/prenotazioni/${prenotazioneId}/rifiuta`;
const headers = this.getAuthHeaders();
return this.http.put<any>(url, {}, headers);
}

}
