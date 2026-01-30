import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImmobiliService } from '../../_services/immobili.service';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Immobile } from '../../../../data';
import { RouterLink } from '@angular/router';

type StatoPopup = 'chiedi' | 'controproposta' | 'successo';
type StatoImmobile = 'attesa' | 'accettata';


@Component({
  selector: 'app-offerte-ricevute',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './offerte-ricevute.component.html',
  styleUrl: './offerte-ricevute.component.scss'
})

export class OfferteRicevuteComponent {
  
  offerteService = inject(OfferteServiceService);
  immobileService = inject(ImmobiliService)
  authService = inject(AuthService);
  ImmobiliList: any[] = [];
  loading = false;
  mostraPopup = false;
  offertaSelezionataId: number | null = null;
  controproposta = 0;
  
  statoPopup: StatoPopup = 'chiedi';
  selected: 'attesa' | 'accettate' = 'attesa'; // default: "in attesa"
  




 async ngOnInit() {
   this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 0));

   await this.caricaOfferte();
     this.loading = false;
    console.log(this.ImmobiliList);
  }
  

async ImmobiliListBackToFront(immobiliFromBack: any[]) {
  let ImmobiliConvertiti: any[] = [];

  for(let immobile of immobiliFromBack) {
    if (ImmobiliConvertiti.find(i => i.id === immobile.id)) continue;

    let id= immobile.id;
    let indirizzo= immobile.immobile.indirizzo;
    let nome= immobile.nome;
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

offerteInAttesa() {
  this.selected = 'attesa';
}

offerteAccettate() {
  this.selected = 'accettate';
}


public accetta(offertaId : number){
  console.log(offertaId);
  this.offerteService.accettaOfferta(offertaId).subscribe({
    next: (response) => {
      console.log('Offerta accettata');
    },
    error: (err) => {
      console.error('Errore accettazione offerta', err);
    }
  });
}

public statoImmobile(immobile: any){
  for(const offerta of immobile.offerte){
    if(offerta.statoOfferta === 'Accettata'){
      return 'accettata';
    }
  }
  return 'attesa';
}

apriPopupRifiuto(offertaId: number) {
  this.offertaSelezionataId = offertaId;
  this.statoPopup = 'chiedi';
  this.mostraPopup = true;
}

vaiAControproposta() {
  this.statoPopup = 'controproposta';
}

tornaAllaDomanda() {
  this.statoPopup = 'chiedi';
  this.controproposta = 0;
}

chiudiPopup() {
  this.mostraPopup = false;
  this.offertaSelezionataId = null;
  this.controproposta = 0;
}

confermaRifiuto() {
  if (!this.offertaSelezionataId) return;

  this.offerteService.rifiutaOfferta(this.offertaSelezionataId).subscribe({
    next: () => {
      console.log('Offerta rifiutata');
      this.chiudiPopup();
    },
    error: err => console.error(err)
  });
}

inviaControproposta() {
  if (!this.offertaSelezionataId || this.controproposta <= 0) return;

  console.log('Controproposta:', this.controproposta);

  this.offerteService
    .contropropostaOfferta(this.offertaSelezionataId, this.controproposta)
    .subscribe({
      next: () => {
        this.statoPopup = 'successo';
      },
      error: err => {
        console.error('Errore invio controproposta', err);
      }
    });
}



}
