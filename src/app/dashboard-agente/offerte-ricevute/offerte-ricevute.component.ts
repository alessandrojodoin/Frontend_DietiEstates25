import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImmobiliService } from '../../_services/immobili.service';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offerte-ricevute',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerte-ricevute.component.html',
  styleUrl: './offerte-ricevute.component.scss'
})
export class OfferteRicevuteComponent {
  
  offerteService = inject(OfferteServiceService);
  immobileService = inject(ImmobiliService)
  authService = inject(AuthService);
  ImmobiliList: any[] = [];
  loading = false;


 async ngOnInit() {
   this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 0));

   await this.caricaOfferte();
     this.loading = false;
    console.log(this.ImmobiliList);
  }
  

async conversioneBackToFront(offerteFromBack: any[]) {
  let OfferteConvertite: any[] = [];

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

async ImmobiliListBackToFront(immobiliFromBack: any[]) {
  let ImmobiliConvertiti: any[] = [];

  for(let immobile of immobiliFromBack) {
    let id= immobile.id;
    let indirizzo= immobile.immobile.indirizzo;
    let nome= immobile.nome;
    let offerte= [];

      for (let offerta of immobile.offerte) {
        let cifraOfferta= offerta.cifraInCentesimi;
        let statoOfferta= offerta.risultatoOfferta;
        let dataOfferta= offerta.dataOfferta;
        let telefono= offerta.telefono;
        let emailOfferente= offerta.emailOfferente;
        let nomeOfferente= offerta.nome;
        let cognomeOfferente= offerta.cognome;

        offerte.push({cifraOfferta, dataOfferta, statoOfferta, telefono, emailOfferente, nomeOfferente, cognomeOfferente});
      }
    ImmobiliConvertiti.push({id, indirizzo, nome, offerte});
  
  }

  
  return ImmobiliConvertiti;
}

public async caricaOfferte() {
  const immobili = await firstValueFrom(
    this.immobileService.getImmobiliListByAgente(
      this.authService.getUsername()
    )
  );

  if (!immobili || immobili.length === 0) {
    this.ImmobiliList = [];
    return;
  }

  await Promise.all(
    immobili.map(async (immobile: any) => {
      immobile.offerte = await firstValueFrom(
        this.offerteService.getOffersForImmobile(immobile.id)
      );
    })
  );

  this.ImmobiliList = await this.ImmobiliListBackToFront(immobili);
}



}
