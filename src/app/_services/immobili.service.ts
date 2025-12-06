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

  











}
