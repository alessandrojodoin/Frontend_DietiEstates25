import { Component, inject, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

import { CommonModule } from '@angular/common';
import { AuthRestService } from '../../_services/auth-backend.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { VisiteService } from '../../_services/visite.service';
import { RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-prenotazioni-ricevute',
  standalone: true,
  imports: [CommonModule, RouterLink, FullCalendarModule],
  templateUrl: './prenotazioni-ricevute.component.html',
  styleUrls: ['./prenotazioni-ricevute.component.scss']
})
export class PrenotazioniRicevuteComponent { //AGGIUNGI SCROLL AUTOMATICO ALLA LISTA QUANDO SELEZIONO UNA DATA CON EVENTI
  
  visiteService = inject(VisiteService);
  rest = inject(AuthRestService);
  immobiliService = inject(ImmobiliService);
  auth = inject(AuthService);
   private ngZone = inject(NgZone);

  @ViewChild('listaPrenotazioni') listaPrenotazioni!: ElementRef<HTMLDivElement>;

  PrenotazioniList: any[] = [];
  selectedPrenotazioni: any[] = [];
  selectedDate: Date | null = null;
  loading: boolean = false;
  agenteData: any;



  calendarOptions: any = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: 'it',
  dateClick: (info: any) => this.onDateSelect(info.date),
  eventClick: (info: any) => {
    const p = info.event.extendedProps.prenotazione;
    this.onDateSelect(new Date(p.dataOra)); // forza selezione giorno
    console.log(p);
  },
  events: this.PrenotazioniList
    .filter(p => this.isFutura(p.dataOra))
    .filter(p => p.stato === 'RICHIESTA' || p.stato === 'CONFERMATA')
    .map(p => ({
      title: `${p.immobile?.indirizzo?.via}`, 
      date: p.dataOra,
      prenotazione: p
    }))
};

onDateSelect(date: Date) {
  this.ngZone.run(() => {
    this.selectedDate = date;
    this.selectedPrenotazioni = this.PrenotazioniList
      .filter(p => this.isFutura(p.dataOra))
      .filter(p => p.stato === 'RICHIESTA' || p.stato === 'CONFERMATA')
      .filter(p => new Date(p.dataOra).toDateString() === date.toDateString());
  });

  // scroll alla lista
  setTimeout(() => {
    this.listaPrenotazioni?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

  

  ngOnInit() {
    this.loading = true;
    this.visiteService.getVisiteAgente().subscribe({
      next: async (response) => {
        this.PrenotazioniList = response;
        await this.immobilePerVisita();
        this.agenteData = await this.rest.getUserData(this.auth.getUsername()).toPromise();
        this.clientePerVisita();

        // Popola il calendario con eventi solo future e non rifiutate
        this.calendarOptions.events = this.PrenotazioniList
          .filter(p => this.isFutura(p.dataOra))
          .filter(p => p.stato === 'RICHIESTA' || p.stato === 'CONFERMATA')
          .map(p => ({
             title: p.immobile?.indirizzo?.via,
            date: p.dataOra,
            prenotazione: p
          }));

        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel recupero delle visite agente:', error);
        this.loading = false;
      }
    });
  }

  async immobilePerVisita() {
    for (let visita of this.PrenotazioniList) {
      try {
        const immobile = await this.immobiliService.getImmobile(visita.immobileId).toPromise();
        visita.immobile = await this.immobiliService.convertRESTImmobile(immobile);
      } catch (error) {
        console.error('Errore nel recupero dell\'immobile per la visita:', error);
      }
    }
  }

async clientePerVisita() {
    for (let visita of this.PrenotazioniList) {
      try {
        let clienteData;
        const cliente = await this.rest.getUsername(visita.clienteId).toPromise() as string;
        clienteData = await this.rest.getUserData(cliente).toPromise();
        visita.clienteData = clienteData;
        console.log('Dati cliente per visita recuperati:', visita.clienteData);
      } catch (error) {
        console.error('Errore nel recupero dell\'immobile per la visita:', error);
      }
    }
  }

  isFutura(data: string | Date): boolean {
    return new Date(data) >= new Date();
  }

  accetta(id: number) {
    this.visiteService.putConfermaVisita(id).subscribe({
      next: () => {
        const p = this.PrenotazioniList.find(x => x.id === id);
        if (p) p.stato = 'CONFERMATA';
      },
      error: (err) => console.error(err)
    });
  }

  rifiuta(id: number) {
    this.visiteService.putRifiutaVisita(id).subscribe({
      next: () => {
        const p = this.PrenotazioniList.find(x => x.id === id);
        if (p) p.stato = 'RIFIUTATA';
      },
      error: (err) => console.error(err)
    });
  }

onDateClick(info: any) {
    // forza Angular a rilevare i cambiamenti
    this.ngZone.run(() => {
      this.selectedDate = info.date;
      this.selectedPrenotazioni = this.PrenotazioniList
        .filter(p => this.isFutura(p.dataOra))
        .filter(p => p.stato === 'RICHIESTA' || p.stato === 'CONFERMATA')
        .filter(p => new Date(p.dataOra).toDateString() === info.date.toDateString());
    });
    

    // Scroll automatico alla lista
    setTimeout(() => {
      this.listaPrenotazioni?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  
}
