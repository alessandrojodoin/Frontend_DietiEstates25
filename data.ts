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
    tagDescrizione: string[];
    prezzo: number;
    quadratura: number;
    numeroVisualizzazioni: number;
    tipologiaContratto: string;
    speseCondominiali: number; 
    offerte: Offerte[];
    agenteImmobiliare: AgenteImmobiliare;
    isVenduto: boolean;
    istanteCreazione: Instant;
    immagini: string[];
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
}


export type Offerte = {}
