import { Component, inject } from '@angular/core';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-immobili-list-agente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immobili-list-agente.component.html',
  styleUrl: './immobili-list-agente.component.scss'
})
export class ImmobiliListAgenteComponent {

  immobiliService = inject(ImmobiliService);
  auth = inject(AuthService);
  immobiliList: any[] = [];


  
  async caricaImmobili() {
    let immobiliListTemp;
    immobiliListTemp = await this.immobiliService.getImmobiliListByAgente(this.auth.getUsername()).toPromise();

      for (let immobile of immobiliListTemp!) {
        this.immobiliList.push(this.immobiliService.convertRESTImmobile(immobile));
      }
      console.log("penesrnello");
      for (let immobile of this.immobiliList) {
        this.immobiliService.getImageList(immobile.id).subscribe((imagesIds: Number[]) => {
          immobile.immagini = imagesIds;
        });
    };
   
  }



  ngOnInit(): void {
    this.caricaImmobili();
  }

}
