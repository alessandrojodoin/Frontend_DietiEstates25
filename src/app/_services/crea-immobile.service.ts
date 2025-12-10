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

  passaDatiImmobile() {
    this.immobiliService.createImmobile({
      tipoImmobile: this.immobile.tipoImmobile!,
      latitudine: '40.82852062332247',
      longitudine: '14.190889915493532',
      indirizzo: `${this.immobile.indirizzo?.via}, ${this.immobile.indirizzo?.citta}, ${this.immobile.indirizzo?.provincia}`,
      citta: this.immobile.indirizzo!.citta,
      provincia: this.immobile.indirizzo!.provincia,
      tags: this.immobile.tagDescrizione.map(tag => {
        return this.convertTag(tag);
      }),
      tipologiaContratto: this.immobile.tipologiaContratto!,
      speseCondominiali: this.immobile.speseCondominiali!,
      prezzo: this.immobile.prezzo!
    }).subscribe({
      next: (response) => {
        console.log("Immobile creato con successo. ID:", response);
        this.immobiliService.caricaFoto(this.immobile.immagini, Number(response))
      },
      error: (error) => {
        console.error("Errore durante la creazione dell'immobile:", error);
      }
    });

  }


  convertTag(tag: TagDescrittivo): any {
    if(tag.nome === 'aria condizionata' || tag.nome === 'camino' || tag.nome === 'wifi' || tag.nome === 'impianto d’allarme' 
      || tag.nome === 'videosorveglianza' ||tag.nome === 'veranda / portico' || tag.nome === 'posto auto' 
      || tag.nome === 'garage' || tag.nome === 'arredata' || tag.nome === 'cucina a vista' || tag.nome === 'ascensore' 
      || tag.nome === 'accesso disabili' || tag.nome === 'animali ammessi'){
      return {
        nome: tag.nome,
        type: 'Boolean',
        value: tag.valore === 'Sì' ? "true" : "false"
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
