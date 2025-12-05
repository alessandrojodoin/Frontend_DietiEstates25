import { Injectable } from '@angular/core';
import { Indirizzo } from '../../../data';
export type TagDescrittivoTipo = 'number' | 'string';

interface TagDescrittivo{
  tipo: TagDescrittivoTipo;
  nome: string;
  valore: any;
}


@Injectable({
  providedIn: 'root'
})
export class CreaImmobileService {

  findTag(nome: string): TagDescrittivo | null {
  return this.immobile.tagDescrizione?.find(element => element.nome === nome) ?? null;
}



 immobile: {
   tipoImmobile: string | undefined;
   longitudine: number | undefined;
   latitudine: number | undefined;
   indirizzo: Indirizzo | undefined;
   descrizione: string | undefined;
   tagDescrizione: TagDescrittivo[] ;
   prezzo: number | undefined;
   quadratura: number | undefined;
   tipologiaContratto: string | undefined;
   speseCondominiali: number | undefined;
   immagini: any[];
 } = {
   tipoImmobile: undefined,
   longitudine: undefined,
   latitudine: undefined,
   indirizzo: undefined,
   descrizione: undefined,
   tagDescrizione: [],
   prezzo: undefined,
   quadratura: undefined,
   tipologiaContratto: undefined,
   speseCondominiali: undefined,
   immagini: [],
 }; 
 
 
 
}
