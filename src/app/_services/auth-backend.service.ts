import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, EMPTY, map } from 'rxjs';
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


   signup(signupCredentials: {username: string, password: string, email: string, nome: string,
     cognome: string, numeroTelefonico: string}){
    const url = `${this.url}/auth/cliente`;
    return this.http.post<string>(url, signupCredentials, this.jsonHttpOptions);
  }

   login(loginCredentials: {username: string, password: string}){
    console.log("login http request")
    const url = `${this.url}/auth`;
    return this.http.post<string>(url, loginCredentials, this.jsonHttpOptions);
  }

}
