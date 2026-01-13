import { Component } from '@angular/core';

@Component({
  selector: 'app-offerte-fatte',
  standalone: true,
  imports: [],
  templateUrl: './offerte-fatte.component.html',
  styleUrl: './offerte-fatte.component.scss'
})




export class OfferteFatteComponent {

  OfferteList: {indirizzo: string, cifraOfferta: number, dataOfferta: string, statoOfferta: string}[] = [
    {indirizzo: "Via Roma 10, Milano", cifraOfferta: 250000, dataOfferta: "2024-05-01", statoOfferta: "In attesa"},
    {indirizzo: "Corso Venezia 5, Torino", cifraOfferta: 300000, dataOfferta: "2024-04-15", statoOfferta: "Accettata"},
    {indirizzo: "Piazza Duomo 3, Firenze", cifraOfferta: 200000, dataOfferta: "2024-03-20", statoOfferta: "Rifiutata"}
  ];

}
