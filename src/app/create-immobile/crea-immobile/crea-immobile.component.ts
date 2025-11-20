import { Component } from '@angular/core';
import { CreaImmobilePage1Component } from "../crea-immobile-page1/crea-immobile-page1.component";
import { CreaImmobilePage2Component } from "../crea-immobile-page2/crea-immobile-page2.component";
import { CreaImmobilePage3Component } from "../crea-immobile-page3/crea-immobile-page3.component";
import { CreaImmobilePage4Component } from "../crea-immobile-page4/crea-immobile-page4.component";
import { Immobile } from '../../../../data';
import { Indirizzo } from '../../../../data';

@Component({
  selector: 'app-crea-immobile',
  standalone: true,
  imports: [CreaImmobilePage1Component, CreaImmobilePage2Component, CreaImmobilePage3Component, CreaImmobilePage4Component],
  templateUrl: './crea-immobile.component.html',
  styleUrl: './crea-immobile.component.scss'
})
export class CreaImmobileComponent {

  page = 1;

  updatePage(page: any) {
    this.page = page;
  }


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
