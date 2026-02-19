import { Injectable,inject } from '@angular/core';
import { Indirizzo } from '../../../data';
export type TagDescrittivoTipo = 'number' | 'string';
import { ImmobiliService } from './immobili.service';


interface TagDescrittivo{
  tipo: TagDescrittivoTipo;
  nome: string;
  valore: any;
}


@Injectable({
  providedIn: 'root'
})
export class CreaImmobileService {

  private immobiliService = inject(ImmobiliService);
  findTag(nome: string): TagDescrittivo | null {
  return this.immobile.tagDescrizione?.find(element => element.nome === nome) ?? null;
}



 immobile: {
   nome: string | undefined;
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
   nome: undefined,
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

  
reset() {
  this.immobile = {
    nome: undefined,
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

  passaDatiImmobile() {
  return this.immobiliService.createImmobile({
    nome: this.immobile.nome!,
    descrizione: this.immobile.descrizione!,
    tipoImmobile: this.immobile.tipoImmobile!,
    latitudine: String(this.immobile.latitudine!),
    longitudine: String(this.immobile.longitudine!),
    via: this.immobile.indirizzo!.via,
    citta: this.immobile.indirizzo!.citta,
    provincia: this.immobile.indirizzo!.provincia,
    tags: this.immobile.tagDescrizione.map(t => this.convertTag(t)),
    tipologiaContratto: this.immobile.tipologiaContratto!,
    speseCondominiali: this.immobile.speseCondominiali!,
    prezzo: this.immobile.prezzo!
  });
}

getRiepilogoTags(): {nome: string, valore: any}[] {
  return this.immobile.tagDescrizione
             .filter(tag => tag.valore !== undefined && tag.valore !== null && tag.valore !== '')
             .map(tag => ({nome: tag.nome, valore: tag.valore}));
}


  convertTag(tag: TagDescrittivo): any {
    if(tag.nome === 'aria condizionata' || tag.nome === 'camino' || tag.nome === 'wifi' || tag.nome === 'impianto d’allarme' 
      || tag.nome === 'videosorveglianza' ||tag.nome === 'veranda / portico' || tag.nome === 'posto auto' 
      || tag.nome === 'garage' || tag.nome === 'cucina a vista' || tag.nome === 'ascensore' 
      || tag.nome === 'accesso disabili' || tag.nome === 'animali ammessi' || tag.nome === 'vicinanza a centro storico'){
      return {
        nome: tag.nome,
        type: 'Boolean',
        value: tag.valore === 'Sì' ? "true" : "false"
      }
    }
    else if(tag.nome === 'giardino' || tag.nome === 'arredata'){
      return {
        nome: tag.nome,
        type: 'String',
        value: tag.valore
      }
    }
    else if(tag.nome === 'numero di balconi' || tag.nome === 'numero di terrazzi' || tag.nome === 'locali' || tag.nome === 'bagni' 
            || tag.nome === 'piano'){
      return {
        nome: tag.nome,
        type: 'Integer',
        value: Number(tag.valore)
            }
    }
    else if(tag.nome === 'superficie'){
      return {
        nome: tag.nome,
        type: 'Float',
        value: Number(tag.valore)
            }
    }
    else if(tag.nome === 'classe' || tag.nome === 'collocazione' || tag.nome === 'vicinanza a mezzi pubblici'){
      return {
        nome: tag.nome,
        type: 'String',
        value: String(tag.valore)
            }
    }
  }
 
 
}
