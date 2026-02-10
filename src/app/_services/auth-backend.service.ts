import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, EMPTY, map, shareReplay } from 'rxjs';
import { response } from 'express';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthRestService {
  //private auth = inject(AuthService);
  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/1.0";

  

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

  constructor() { }

  getUserData(username: string) {
    const url = `${this.url}/auth/users?username=${username}`;
    return this.http.get<string>(url, {responseType: 'json'});
    
  }

   signup(signupCredentials: {username: string, password: string, email: string, nome: string,
     cognome: string, numeroTelefonico: string}){
    const url = `${this.url}/auth/cliente`;
    return this.http.post<string>(url, signupCredentials, this.jsonHttpOptions);
  }


   signupAmministratore(signupCredentials: {username: string, password: string, email: string, nome: string,
     cognome: string, numeroTelefonico: string, agenziaImmobiliare: string}){
    const url = `${this.url}/auth/accountSupporto`;
    return this.http.post<string>(url, signupCredentials, this.jsonHttpOptions);
  }


   signupAgente(signupCredentials: {username: string, password: string, email: string, nome: string,
     cognome: string, numeroTelefonico: string, agenziaImmobiliare: string}){
    const url = `${this.url}/auth/agente-immobiliare`;
    return this.http.post<string>(url, signupCredentials, this.jsonHttpOptions);
  }


  modificaAmministratore(old_username: string, new_username: string, password: string, headers: any){
    const url = `${this.url}/auth/amministratore/${old_username}`;
    //const headers = this.getAuthHeaders();
    return this.http.put(url, {new_username, password}, headers);
  }


   login(loginCredentials: {username: string, password: string}){
    console.log("login http request")
    const url = `${this.url}/auth`;
    return this.http.post(url, loginCredentials, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'
  });
  }

}
