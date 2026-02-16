import { Component, inject } from '@angular/core';
import { VisiteService } from '../../_services/visite.service';
import { CommonModule } from '@angular/common';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthRestService } from '../../_services/auth-backend.service';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-prenotazioni-effettuate',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './prenotazioni-effettuate.component.html',
  styleUrl: './prenotazioni-effettuate.component.scss'
})
export class PrenotazioniEffettuateComponent { //IDEA LIBRERIA CALENDARIO INTERATTIVO: FullCalendar

  PrenotazioniList: any[] = [];
  loading: boolean = false;
  userData: any;

  visiteService = inject(VisiteService);
  rest = inject(AuthRestService);
  immobiliService = inject(ImmobiliService);
  auth = inject(AuthService);

  ngOnInit() {
    this.loading = true;
    this.visiteService.getVisiteCliente().subscribe({
      next: async (response) => {
        console.log('Visite cliente recuperate:', response);
        this.PrenotazioniList = response
        .filter((p: any) => this.isFutura(p.dataOra));
        this.ordinaPrenotazioni();
        this.informazioniAgentePerVisita();
        this.userData = await this.rest.getUserData(this.auth.getUsername()).toPromise();
        console.log('Dati utente:', this.userData);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel recupero delle visite cliente:', error);
        this.loading = false;
      }
    });
  }

  informazioniAgentePerVisita(){
      for (let visita of this.PrenotazioniList) {
        this.immobiliService.getImmobile(visita.immobileId).subscribe({
          next: async (response) => {
            const immobile = response;
            visita.immobile = await this.immobiliService.convertRESTImmobile(immobile);
            console.log('Immobile per visita recuperato:', visita.immobile);
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

  ordinaPrenotazioni(){
    this.PrenotazioniList.sort((a, b) => new Date(a.dataOra).getTime() - new Date(b.dataOra).getTime());
  }

}
