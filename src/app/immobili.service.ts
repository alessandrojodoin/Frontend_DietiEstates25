import { Injectable, inject } from '@angular/core';
import { Immobile } from '../../data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, EMPTY } from 'rxjs';
import Instant from 'ts-time/Instant';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private http = inject(HttpClient);

  constructor(http: HttpClient, auth: AuthService) {
    this.http = http;
    this.authService = auth;
  }

getImmobiliById(id: number) {
  const url = 1;
  return this.http.get<Immobile[]>(url).pipe(
    map(immobili => immobili.map(immobile => ({
      ...immobile,
      istanteCreazione: Instant.parse(immobile.istanteCreazione),
    }))),
  );
}









}
