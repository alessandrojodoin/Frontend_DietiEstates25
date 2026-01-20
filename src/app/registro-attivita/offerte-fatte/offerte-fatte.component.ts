import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-offerte-fatte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerte-fatte.component.html',
  styleUrl: './offerte-fatte.component.scss'
})

export class OfferteFatteComponent {
  offerteService = inject(OfferteServiceService);
  immobileService = inject(ImmobiliService)
  OfferteList: any[] = [];


  ngOnInit() {
    this.caricaOfferte();
    console.log(this.OfferteList);
  }
  

async conversioneBackToFront(offerteFromBack: any[]) {
  let OfferteConvertite: any[] = [];
  console.log("Offerte from back:", offerteFromBack);

  for (let offerta of offerteFromBack) {
    let cifraOfferta= offerta.cifraInCentesimi;
    let statoOfferta= offerta.risultatoOfferta;
    let dataOfferta= offerta.dataOfferta;
    const immobileData = await firstValueFrom(
      this.immobileService.getImmobile(offerta.idListino)
      
    );
    let id= immobileData.id;
    let indirizzo= immobileData.nome;

    OfferteConvertite.push({id, indirizzo, cifraOfferta, dataOfferta, statoOfferta});


  }
  return OfferteConvertite;
}

/*
  OfferteList: {indirizzo: string, cifraOfferta: number, dataOfferta: string, statoOfferta: string}[] = [
    {indirizzo: "Via Roma 10, Milano", cifraOfferta: 250000, dataOfferta: "2024-05-01", statoOfferta: "In attesa"},
    {indirizzo: "Corso Venezia 5, Torino", cifraOfferta: 300000, dataOfferta: "2024-04-15", statoOfferta: "Accettata"},
    {indirizzo: "Piazza Duomo 3, Firenze", cifraOfferta: 200000, dataOfferta: "2024-03-20", statoOfferta: "Rifiutata"}
  ];
*/

  public caricaOfferte() {
    this.offerteService.getOffersMadeByClient().subscribe(async (data: any[]) => {
      this.OfferteList= await this.conversioneBackToFront(data);
    });
  }


}