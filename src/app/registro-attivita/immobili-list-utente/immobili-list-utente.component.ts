import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-immobili-list-utente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './immobili-list-utente.component.html',
  styleUrl: './immobili-list-utente.component.scss'
})
export class ImmobiliListUtenteComponent {
  immobiliService= inject(ImmobiliService);
  auth= inject(AuthService)
  url = environment.URL_BACKEND
  
  immobiliList: any[] = [];
  
  
  async caricaImmobili() {

    let immobiliListTemp;
    immobiliListTemp = await this.immobiliService.getImmobiliVisualizzati().toPromise();

      for (let immobile of immobiliListTemp!) {
        this.immobiliList.push(await this.immobiliService.convertRESTImmobile(immobile));
      }
      
      for (let immobile of this.immobiliList) {
        this.immobiliService.getImageList(immobile.id).subscribe((imagesIds: Number[]) => {
          immobile.immagini = imagesIds;
        });
    };
    
    this.sortImmobili();
   
  }

 sortImmobili(){
  this.immobiliList.sort((a, b) => {
    const dateA = new Date(a.istanteVisualizzazione);
    const dateB = new Date(b.istanteVisualizzazione);
    return dateB.getTime() - dateA.getTime();
  }
  );
 }

async ngOnInit(){

  await this.caricaImmobili();
}


}
