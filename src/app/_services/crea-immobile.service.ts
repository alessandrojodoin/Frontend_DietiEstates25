import { Injectable } from '@angular/core';
import { Indirizzo } from '../../../data';

@Injectable({
  providedIn: 'root'
})
export class CreaImmobileService {

 immobile: {
   tipoImmobile: string | undefined;
   longitudine: number | undefined;
   latitudine: number | undefined;
   indirizzo: Indirizzo | undefined;
   descrizione: string | undefined;
   tagDescrizione: string[] | undefined;
   prezzo: number | undefined;
   quadratura: number | undefined;
   tipologiaContratto: string | undefined;
   speseCondominiali: number | undefined;
   immagini: string[] | undefined;
 } = {
   tipoImmobile: undefined,
   longitudine: undefined,
   latitudine: undefined,
   indirizzo: undefined,
   descrizione: undefined,
   tagDescrizione: undefined,
   prezzo: undefined,
   quadratura: undefined,
   tipologiaContratto: undefined,
   speseCondominiali: undefined,
   immagini: undefined,
 }; 
 
 
 
}
