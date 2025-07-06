import Instant, {EPOCH} from "ts-time/Instant";

export type Cliente = {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    telefono: string;
}


export type Immobile = {
    id: number;
    tipoImmobile: string; 
    longitudine: number;
    latitudine: number;
    indirizzo: string;
    tagDescrizione: string[];
    prezzo: number;
    numeroVisualizzazioni: number;
    tipologiaContratto: string;
    speseCondominiali: number; 
    offerte: Offerte[];
    agenteImmobiliare: AgenteImmobiliare;
    isVenduto: boolean;
    istanteCreazione: Instant;
    immagini: string[];
}


export type AgenteImmobiliare = {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    telefono: string;
}

export type Offerte = {}
