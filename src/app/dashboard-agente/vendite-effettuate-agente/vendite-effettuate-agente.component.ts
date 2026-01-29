import { Component, inject } from '@angular/core';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendite-effettuate-agente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendite-effettuate-agente.component.html',
  styleUrl: './vendite-effettuate-agente.component.scss'
})
export class VenditeEffettuateAgenteComponent {


  offerteService = inject(OfferteServiceService);
  immobileService = inject(ImmobiliService)
  authService = inject(AuthService);
  ImmobiliList: any[] = [];
  loading = false;


 async ngOnInit() {
   this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 0));

   await this.caricaOfferteAccettate();
     this.loading = false;
    console.log(this.ImmobiliList);
  }
  

async ImmobiliListBackToFront(immobiliFromBack: any[]) {
  let ImmobiliConvertiti: any[] = [];

  for(let immobile of immobiliFromBack) {
    let id= immobile.id;
    let indirizzo= immobile.immobile.indirizzo;
    let nome= immobile.nome;
    let isVenduto= immobile.isVenduto;
    let offerte= [];


      for (let offerta of immobile.offerte) {
        let offertaId= offerta.id;
        let cifraOfferta= offerta.cifraInCentesimi;
        let statoOfferta= offerta.risultatoOfferta;
        let dataOfferta= offerta.dataOfferta;
        let telefono= offerta.telefono;
        let emailOfferente= offerta.emailOfferente;
        let nomeOfferente= offerta.nome;
        let cognomeOfferente= offerta.cognome;

        offerte.push({offertaId, cifraOfferta, dataOfferta, statoOfferta, telefono, emailOfferente, nomeOfferente, cognomeOfferente});
      }
    ImmobiliConvertiti.push({id, indirizzo, nome, isVenduto, offerte});
  
  }

  
  return ImmobiliConvertiti;
}


  public async caricaOfferteAccettate() {
    let immobili = await firstValueFrom(
      this.immobileService.getImmobiliListByAgente(
        this.authService.getUsername()
      )
    );
    immobili = immobili.filter((immobile: any) => immobile.isVenduto === true);
  
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

    for (let immobile of immobili) {
      immobile.offerte = immobile.offerte.filter((offerta: any) => offerta.risultatoOfferta === 'Accettata');
    }

    this.ImmobiliList = await this.ImmobiliListBackToFront(immobili);
  }


}
