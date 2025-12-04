import { Injectable } from '@angular/core';
import { Indirizzo } from '../../../data';
export type TagDescrittivoTipo = 'number' | 'string';

interface TagDescrittivi{
  tipo: TagDescrittivoTipo;
  nome: string;
  valore: any;
}


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
   tagDescrizione: TagDescrittivi[] | undefined;
   prezzo: number | undefined;
   quadratura: number | undefined;
   tipologiaContratto: string | undefined;
   speseCondominiali: number | undefined;
   immagini: any[] | undefined;
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
