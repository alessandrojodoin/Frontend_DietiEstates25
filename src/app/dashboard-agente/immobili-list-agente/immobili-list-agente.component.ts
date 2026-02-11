import { Component, inject } from '@angular/core';
import { ImmobiliService } from '../../_services/immobili.service';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-immobili-list-agente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './immobili-list-agente.component.html',
  styleUrl: './immobili-list-agente.component.scss'
})
export class ImmobiliListAgenteComponent {

  immobiliService = inject(ImmobiliService);
  auth = inject(AuthService);
  immobiliList: any[] = [];
  loading= false;


  
  async caricaImmobili() {
    let immobiliListTemp;
    immobiliListTemp = await this.immobiliService.getImmobiliListByAgente(this.auth.getUsername()).toPromise();

   const convertiti = await Promise.all(
    immobiliListTemp!.map(i => this.immobiliService.convertRESTImmobile(i))
  );

  this.immobiliList = convertiti.filter(i => !i.isVenduto);
    
      for (let immobile of this.immobiliList) {
        this.immobiliService.getImageList(immobile.id).subscribe((imagesIds: Number[]) => {
          immobile.immagini = imagesIds;
        });
    };
   
  }



 async ngOnInit() {
    this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 0));
    await this.caricaImmobili();
    this.loading = false;
  }

}
