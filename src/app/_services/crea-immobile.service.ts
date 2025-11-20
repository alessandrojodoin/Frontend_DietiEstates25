import { Injectable } from '@angular/core';
import { Indirizzo } from '../../../data';

@Injectable({
  providedIn: 'root'
})
export class CreaImmobileService {

 immobile: {
   tipoImmobile: string | null;
   longitudine: number | null;
   latitudine: number | null;
   indirizzo: Indirizzo | null;
   descrizione: string | null;
   tagDescrizione: string[];
   prezzo: number | null;
   quadratura: number | null;
   tipologiaContratto: string | null;
   speseCondominiali: number | null;
   immagini: string[];
 } = {
   tipoImmobile: null,
   longitudine: null,
   latitudine: null,
   indirizzo: null,
   descrizione: null,
   tagDescrizione: [],
   prezzo: null,
   quadratura: null,
   tipologiaContratto: null,
   speseCondominiali: null,
   immagini: [],
 }; 
 
 
 
}
