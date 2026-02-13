import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthRestService } from '../../_services/auth-backend.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { VisiteService } from '../../_services/visite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prenotazioni-ricevute',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prenotazioni-ricevute.component.html',
  styleUrls: ['./prenotazioni-ricevute.component.scss']
})
export class PrenotazioniRicevuteComponent {
  private sanitizer = inject(DomSanitizer);  

    
      PrenotazioniList: any[] = [];
      loading: boolean = false;
      userData: any;
    
      visiteService = inject(VisiteService);
      rest = inject(AuthRestService);
      immobiliService = inject(ImmobiliService);
      auth = inject(AuthService);
    
      ngOnInit() {
        this.loading = true;
        this.visiteService.getVisiteAgente().subscribe({
          next: async (response) => {
            console.log('Visite agente recuperate:', response);
            this.PrenotazioniList = response;
            this.immobilePerVisita();
            this.userData = await this.rest.getUserData(this.auth.getUsername()).toPromise();
            console.log('Dati utente:', this.userData);
            
            this.loading = false;
          },
          error: (error) => {
            console.error('Errore nel recupero delle visite agente:', error);
            this.loading = false;
          }
        });
      }

       immobilePerVisita(){
      for (let visita of this.PrenotazioniList) {
        this.immobiliService.getImmobile(visita.immobileId).subscribe({
          next: async (response) => {
            const immobile = response;
            visita.immobile = await this.immobiliService.convertRESTImmobile(immobile);
            
          },
          error: (error) => {
            console.error('Errore nel recupero dell\'immobile per la visita:', error);
          }
          });
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

    
    
       //calendarUrl!: SafeResourceUrl;
    //ngOnInit() {
    //const calendarId = 'progettouniversita2025@gmail.com';
    //this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      //`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=Europe/Rome`
    //);
//}

  
}
