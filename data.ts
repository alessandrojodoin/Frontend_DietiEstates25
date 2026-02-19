import Instant, {EPOCH} from "ts-time/Instant";

export type Cliente = {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    telefono: string;
}


export type Immobile = {
    nome: string;
    id: number;
    tipoImmobile: string; 
    longitudine: number;
    latitudine: number;
    indirizzo: Indirizzo;
    descrizione: string;
    tagDescrizione: any[];
    prezzo: number;
    numeroVisualizzazioni: number;
    tipologiaContratto: string;
    speseCondominiali: number; 
    offerte: Offerte[];
    agenteImmobiliare: AgenteImmobiliare;
    isVenduto: boolean;
    esisteOffertaAccettata?: boolean;
    superficie?: number | null;
    istanteCreazione: Instant;
    immagini: string[];
}

export function getSuperficie(immobile: any): number | null {
  const tag = immobile.tagDescrizione?.find(
    (t: any) => t.nome === 'superficie'
  );

  return tag ? Number(tag.valore) : null;
}


export type Indirizzo = {
    nome: string;
    via: string;
    citta: string;
    provincia: string;
}


export type AgenteImmobiliare = {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    telefono: string;
    agenziaImmobiliare: string;
}


export type Offerte = {}
