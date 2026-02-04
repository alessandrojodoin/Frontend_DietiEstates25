import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type StatoPopup = 'controproposta' | 'successo';

@Component({
  selector: 'app-offerte-fatte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './offerte-fatte.component.html',
  styleUrl: './offerte-fatte.component.scss'
})

export class OfferteFatteComponent {
  offerteService = inject(OfferteServiceService);
  immobileService = inject(ImmobiliService)
  OfferteList: any[] = [];

  loading = false;
  mostraPopup = false;
  statoPopup: StatoPopup = 'controproposta';
  controproposta = 0;
  offertaSelezionataId: number | null = null;


  ngOnInit() {
    this.loading = true;
    this.caricaOfferte();
    this.loading = false;
    console.log(this.OfferteList);
  }
  

async conversioneBackToFront(offerteFromBack: any[]) {
  let OfferteConvertite: any[] = [];
  console.log("Offerte from back:", offerteFromBack);

  for (let offerta of offerteFromBack) {
    let offertaId= offerta.id;
    let cifraOfferta= offerta.cifraInCentesimi;
    let statoOfferta= offerta.risultatoOfferta;
    let dataOfferta= offerta.dataOfferta;
    const immobileData = await firstValueFrom(
      this.immobileService.getImmobile(offerta.idListino)
      
    );
    let id= immobileData.id;
    let indirizzo= immobileData.nome;

    OfferteConvertite.push({id, indirizzo, offertaId, cifraOfferta, dataOfferta, statoOfferta});


  }
  return OfferteConvertite;
}

  public caricaOfferte() {
    this.offerteService.getOffersMadeByClient().subscribe(async (data: any[]) => {
      this.OfferteList= await this.conversioneBackToFront(data);
    });
  }


  acettaOfferta(offertaId: number){
this.offerteService.accettaOfferta(offertaId).subscribe({
    next: async (response) => {
      console.log('Offerta accettata');

      // Ricarico 
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;
      
    },
    error: (err) => {
      console.error('Errore accettazione offerta', err);
    }
  });
  }
  
  rifiutaOfferta(offertaId: number){
console.log("rifiutando offerta: ", offertaId);
  if (!offertaId) return;
  

  this.offerteService.rifiutaOfferta(offertaId).subscribe({
    next: async () => {
      console.log('Offerta rifiutata');
      
      this.loading = true;
      await this.caricaOfferte();
      this.loading = false;
      
    },
    error: err => console.error(err)
  });
  }


  apriPopup(offerta: any){
    this.offertaSelezionataId = offerta;
    this.statoPopup = 'controproposta';
    this.mostraPopup= true;
  }

chiudiPopup(){
  this.mostraPopup= false;
  this.offertaSelezionataId = null;
  this.controproposta = 0;
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