import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-immobili-list-utente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immobili-list-utente.component.html',
  styleUrl: './immobili-list-utente.component.scss'
})
export class ImmobiliListUtenteComponent {
  immobiliService= inject(ImmobiliService);
  auth= inject(AuthService)

  
  immobiliList: any[] = [];
  
  
  async caricaImmobili() {
    let immobiliListTemp;
    immobiliListTemp = await this.immobiliService.getImmobiliVisualizzati().toPromise();

      for (let immobile of immobiliListTemp!) {
        this.immobiliList.push(this.immobiliService.convertRESTImmobile(immobile));
      }
      
      for (let immobile of this.immobiliList) {
        this.immobiliService.getImageList(immobile.id).subscribe((imagesIds: Number[]) => {
          immobile.immagini = imagesIds;
        });
    };
   
  }



ngOnInit(){

  this.caricaImmobili();

}


}
