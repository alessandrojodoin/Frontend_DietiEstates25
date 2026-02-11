import { Component, inject, AfterViewInit } from '@angular/core';
import { ExportReportService } from '../../_services/export-report.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';
import { OfferteServiceService } from '../../_services/offerte-service.service';
import { firstValueFrom } from 'rxjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-storico-agente',
  standalone: true,
  imports: [],
  templateUrl: './storico-agente.component.html',
  styleUrl: './storico-agente.component.scss'
})
export class StoricoAgenteComponent implements AfterViewInit {

  export = inject(ExportReportService);
  immobileService = inject(ImmobiliService);
  offerteService = inject(OfferteServiceService);
  authService = inject(AuthService);
  ImmobiliList: any[] = [];

  // riferimento al grafico
  grafico: any;

  ngOnInit() {
    this.caricaOfferte();
  }

  ngAfterViewInit() {
    // inizializza il grafico vuoto, sarà aggiornato quando ImmobiliList è caricata
    this.inizializzaGrafico();
  }

  async ImmobiliListBackToFront(immobiliFromBack: any[]) {
    let ImmobiliConvertiti: any[] = [];

    for (let immobile of immobiliFromBack) {
      if (ImmobiliConvertiti.find(i => i.id === immobile.id)) continue;

      let id = immobile.id;
      let indirizzo = immobile.immobile.indirizzo;
      let nome = immobile.nome;
      let isVenduto = immobile.isVenduto;
      let tipologiaContratto = immobile.tipologiaContratto;
      let numeroVisualizzazioni = immobile.numeroVisualizzazioni;
      let offerte: any[] = [];

      for (let offerta of immobile.offerte) {
        let offertaId = offerta.id;
        let cifraOfferta = offerta.cifraInCentesimi;
        let statoOfferta = offerta.risultatoOfferta;
        let dataOfferta = offerta.dataOfferta;
        let telefono = offerta.telefono;
        let emailOfferente = offerta.emailOfferente;
        let nomeOfferente = offerta.nome;
        let cognomeOfferente = offerta.cognome;

        offerte.push({ offertaId, cifraOfferta, dataOfferta, statoOfferta, telefono, emailOfferente, nomeOfferente, cognomeOfferente });
      }

      ImmobiliConvertiti.push({ id, indirizzo, nome, offerte, isVenduto, tipologiaContratto, numeroVisualizzazioni });
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
      this.aggiornaGrafico();
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
    this.aggiornaGrafico(); // aggiorna grafico appena i dati sono pronti
  }

  public contrattiConclusi() {
    let countVenduti = 0;
    let countAffittati = 0;
    let immobiliTotali = this.ImmobiliList.length;

    for (let immobile of this.ImmobiliList) {
      if (immobile.isVenduto === true && immobile.tipologiaContratto === 'Vendita') countVenduti++;
      if (immobile.isVenduto === true && immobile.tipologiaContratto === 'Affitto') countAffittati++;
    }

    return { venduti: countVenduti, affittati: countAffittati, totali: immobiliTotali };
  }

  public totaleOfferte() {
    let totalOfferte = 0;
    for (let immobile of this.ImmobiliList) totalOfferte += immobile.offerte.length;
    return totalOfferte;
  }

  public totaleVisualizzazioni() {
    let totalVisualizzazioni = 0;
    for (let immobile of this.ImmobiliList) totalVisualizzazioni += immobile.numeroVisualizzazioni;
    return totalVisualizzazioni;
  }

  // ---------------- Grafico ----------------

  private inizializzaGrafico() {
    const ctx = document.getElementById('graficoStorico') as HTMLCanvasElement;
    this.grafico = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Venduti', 'Affittati', 'Contratti Aperti'],
        datasets: [{
          label: 'Immobili',
          data: [0, 0, 0],
          backgroundColor: ['#2490CA', '#74B3EF', '#DDECFF']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  private aggiornaGrafico() {
    if (!this.grafico) return;
    const stats = this.contrattiConclusi();
    this.grafico.data.datasets[0].data = [
      stats.venduti,
      stats.affittati,
      stats.totali - (stats.venduti + stats.affittati)
    ];
    this.grafico.update();
  }

  exportCSV() {
    
    const contratti = this.contrattiConclusi();
    this.export.exportCSV(contratti.totali, contratti.venduti, contratti.affittati, this.totaleOfferte(), this.totaleVisualizzazioni());
  }
}
