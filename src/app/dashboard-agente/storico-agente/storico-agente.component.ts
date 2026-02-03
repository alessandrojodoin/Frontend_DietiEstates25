import { Component, inject } from '@angular/core';
import { ExportReportService } from '../../_services/export-report.service';
import { Immobile } from '../../../../data';
import { ImmobiliService } from '../../_services/immobili.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { OfferteServiceService } from '../../_services/offerte-service.service';

@Component({
  selector: 'app-storico-agente',
  standalone: true,
  imports: [],
  templateUrl: './storico-agente.component.html',
  styleUrl: './storico-agente.component.scss'
})
export class StoricoAgenteComponent {


  export = inject(ExportReportService);
  immobileService = inject(ImmobiliService);
  offerteService = inject(OfferteServiceService);
  authService = inject(AuthService);
  ImmobiliList: any[] = [];


  ngOnInit() {
    
    this.contrattiConclusi();
    this.totaleOfferte();
    this.totaleVisualizzazioni();
    this.caricaOfferte();
  }


  async ImmobiliListBackToFront(immobiliFromBack: any[]) {
    let ImmobiliConvertiti: any[] = [];

    for(let immobile of immobiliFromBack) {
      if (ImmobiliConvertiti.find(i => i.id === immobile.id)) continue;

      let id= immobile.id;
      let indirizzo= immobile.immobile.indirizzo;
      let nome= immobile.nome;
      let isVenduto= immobile.isVenduto;
      let tipologiaContratto= immobile.tipologiaContratto;
      let numeroVisualizzazioni= immobile.numeroVisualizzazioni;
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
      ImmobiliConvertiti.push({id, indirizzo, nome, offerte, isVenduto, tipologiaContratto, numeroVisualizzazioni});
    
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

  
  public contrattiConclusi() {
    let countVenduti = 0;
    let countAffittati = 0;
    let immobiliTotali = this.ImmobiliList.length;
    for ( let immobile of this.ImmobiliList ) {
      if ( immobile.isVenduto === true && immobile.tipologiaContratto === 'Vendita' ) {
        countVenduti++;
      }

      if ( immobile.isVenduto === true && immobile.tipologiaContratto === 'Affitto' ) {
        countAffittati++;
      }
    }
    return { venduti: countVenduti, affittati: countAffittati, totali: immobiliTotali };
  }


  public totaleOfferte() {
    let totalOfferte = 0;
    for ( let immobile of this.ImmobiliList ) {
      totalOfferte += immobile.offerte.length;
    }
    return totalOfferte;
  }

  
  public totaleVisualizzazioni() {
    let totalVisualizzazioni = 0;
    for ( let immobile of this.ImmobiliList ) {
      totalVisualizzazioni += immobile.numeroVisualizzazioni;
    }
    return totalVisualizzazioni;
  }  










}
