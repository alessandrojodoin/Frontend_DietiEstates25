import { Injectable, inject } from '@angular/core';
import { Immobile } from '../../data';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, EMPTY } from 'rxjs';
import Instant from 'ts-time/Instant';
import { AuthService } from '../app/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImmobiliService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor(http: HttpClient, auth: AuthService) {
    this.http = http;
    this.authService = auth;
  }

getImmobiliById(id: number) {
  const url = 1;
  return this.http.get<Immobile[]>(url).pipe(
    map(immobili => immobili.map(immobile: any => ({
      ...immobile,
      istanteCreazione: Instant.parse(immobile.istanteCreazione),
    }))),
  );
}









}
