import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prenotazioni-ricevute',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prenotazioni-ricevute.component.html'
})
export class PrenotazioniRicevuteComponent {
  public auth = inject(AuthService);
  private sanitizer = inject(DomSanitizer);


  //calendarUrl!: SafeResourceUrl;

  ngOnInit() {
    
    //const calendarId = 'progettouniversita2025@gmail.com';
    //this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      //`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=Europe/Rome`
    //);

    
  }
}
