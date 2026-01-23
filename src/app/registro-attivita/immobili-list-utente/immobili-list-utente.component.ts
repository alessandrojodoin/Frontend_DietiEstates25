import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-immobili-list-utente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immobili-list-utente.component.html',
  styleUrl: './immobili-list-utente.component.scss'
})
export class ImmobiliListUtenteComponent {

  
  immobileList: {indirizzo: string,  tipoImmobile: string, prezzo: number}[] = [
    {indirizzo: "Via Roma 10, Milano", tipoImmobile: "Appartamento", prezzo: 250000},
    {indirizzo: "Corso Venezia 5, Torino", tipoImmobile: "Casa", prezzo: 300000},
    {indirizzo: "Piazza Duomo 3, Firenze", tipoImmobile: "Villa", prezzo: 450000}
  ];  





}
