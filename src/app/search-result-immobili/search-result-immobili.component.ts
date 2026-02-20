import { Component, inject, Input } from '@angular/core';
import { getSuperficie, Immobile } from '../../../data';
import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterModule } from '@angular/router';
import { ImmobiliService } from '../_services/immobili.service';

@Component({
  selector: 'app-search-result-immobili',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './search-result-immobili.component.html',
  styleUrl: './search-result-immobili.component.scss'
})
export class SearchResultImmobiliComponent {

    immobiliArray: Immobile[] = [];
    immobiliService = inject(ImmobiliService);

    estraiSuperficie() {
      for(let immobile of this.immobili){
        immobile.superficie = getSuperficie(immobile);     
      }
    }

@Input()
set immobili(value: Immobile[]) {
  this._immobili = value;
  this.estraiSuperficie();
   for (let immobile of this.immobili) {
        this.immobiliService.getImageList(immobile.id).subscribe((imagesIds: Number[]) => {
          immobile.immagini = imagesIds;
        });
    };
    console.log(this.immobili);
}
get immobili(): Immobile[] {
  return this._immobili;
}
private _immobili: Immobile[] = [];


}
