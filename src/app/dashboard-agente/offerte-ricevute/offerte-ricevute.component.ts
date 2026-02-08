import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImmobiliService } from '../../_services/immobili.service';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Immobile } from '../../../../data';
import { RouterLink } from '@angular/router';

type StatoPopup = 'chiedi' | 'controproposta' | 'successo';


@Component({
  selector: 'app-offerte-ricevute',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
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
  mostraPopupOfferte = false;
  mostraPopupEsterne= false;
  offertaSelezionataId: number | null = null;
  controproposta = 0;
  
  statoPopup: StatoPopup = 'chiedi';
  selected: 'attesa' | 'accettate' = 'attesa'; // default: "in attesa"
  riepilogoOfferta: any = null;
  statoPopupOfferta: 'inserimento' | 'riepilogo' = 'inserimento';
  tabDaLampeggiare: 'attesa' | 'accettate' | null = null;

  

offertaForm = new FormGroup({
      nome: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
      cognome: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
      email: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
      numeroTelefonico: new FormControl('',
        [Validators.required,
          Validators.minLength(1),
        Validators.maxLength(10)]
      ),
      valoreOfferta: new FormControl('',
        [Validators.required,
        Validators.minLength(1)]
      ),
    })


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
    let isVenduto= immobile.isVenduto;
    let tipologiaContratto = immobile.tipologiaContratto;
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
        let tipoOfferta= offerta.offertaType;

        offerte.push({offertaId, cifraOfferta, dataOfferta, statoOfferta, telefono, emailOfferente, nomeOfferente, cognomeOfferente, tipoOfferta});
      }
    ImmobiliConvertiti.push({id, indirizzo, nome, isVenduto, tipologiaContratto, offerte});
  
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

immobiliDaRevisionare(offerte: any[]){
  let offerteFiltrate: any[] = [];
  
  for(let offerta of offerte){
       
      if(offerta.statoOfferta != "ContropropostaRicevuta" && offerta.statoOfferta != "Rifiutata"){
          offerteFiltrate.push(offerta);
      }
    }
  return offerteFiltrate;
}

public accetta(offertaId: number){
  this.offerteService.accettaOfferta(offertaId).subscribe({
    next: async (response) => {
      console.log('Offerta accettata');

      // Ricarico tutte le offerte dal backend
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;

      // seleziono automaticamente la tab "accettate" OPPURE METTERE UNA NOTIFICA
      //this.selected = 'accettate';
      this.tabDaLampeggiare = 'accettate';

      setTimeout(() => {
        this.tabDaLampeggiare = null;
      }, 3000); 

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

apriPopupOfferta() {
  
  this.mostraPopupOfferte = true;
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

chiudiPopupOfferta(){
   this.mostraPopupOfferte = false;
  this.riepilogoOfferta = null;
  this.statoPopupOfferta = 'inserimento';
  this.offertaForm.reset();
}

apriPopupEsterne(offertaId: number){
 this.offertaSelezionataId = offertaId;
 this.statoPopup = 'chiedi';
 this.mostraPopupEsterne = true;
}

chiudiPopupEsterne(){
   this.mostraPopupEsterne = false;
   this.offertaSelezionataId = null;
}


confermaRifiuto() {
  console.log("rifiutando offerta: ", this.offertaSelezionataId);
  if (!this.offertaSelezionataId) return;
  

  this.offerteService.rifiutaOfferta(this.offertaSelezionataId).subscribe({
    next: async () => {
      console.log('Offerta rifiutata');
      this.chiudiPopup();
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;
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
      next: async () => {
        this.statoPopup = 'successo';
        this.loading = true;
        await this.caricaOfferte();
        this.loading = false;
      },
      error: err => {
        console.error('Errore invio controproposta', err);
      }
    });
}

concludiContratto(immobileId: number) {
  console.log('Concludi contratto per immobile:', immobileId);
  this.immobileService.postImmobileVenduto(immobileId).subscribe({
    next: async (response) => {
      console.log('Immobile venduto');
      

      // Ricarico tutte le offerte dal backend
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;

     
    },
    error: (err) => {
      console.error('Errore vendita immobile', err);
    }
  })
}

annullaAccettazione(offertaId: number) {
  this.offerteService.annullaAccettazione(offertaId).subscribe({
    next: async () =>{
        this.loading = true;
      await this.caricaOfferte();
      this.loading = false;
    }
  });

  //this.selected = 'attesa';
  this.tabDaLampeggiare = 'attesa';

  setTimeout(() => {
    this.tabDaLampeggiare = null;
  }, 3000);

}

onSubmit(immobileId: number){
  
if (this.offertaForm.invalid) return;

  this.riepilogoOfferta = this.offertaForm.value;
  this.statoPopupOfferta = 'riepilogo';
}


confermaInvio(immobileId: number) {
  const v = this.riepilogoOfferta;

  this.offerteService.createExternalOffer(immobileId, v.nome, v.cognome, v.email, v.numeroTelefonico, Number(v.valoreOfferta)).subscribe({
    next: async () => {
      console.log('Offerta creata');
      this.chiudiPopupOfferta();
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;
    },
    error: err => console.error(err)
  });
}



}
