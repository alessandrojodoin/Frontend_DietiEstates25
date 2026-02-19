import { Component, Input } from '@angular/core';
import { getSuperficie, Immobile } from '../../../data';
import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-search-result-immobili',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-immobili.component.html',
  styleUrl: './search-result-immobili.component.scss'
})
export class SearchResultImmobiliComponent {

    immobiliArray: Immobile[] = [];

    estraiSuperficie() {
      for(let immobile of this.immobiliArray){
        
        immobile.superficie = getSuperficie(immobile);
        
        
      }
    
    }

  @Input()
set immobili(value: Immobile[]) {
  this._immobili = value;
  this.estraiSuperficie();
}
get immobili(): Immobile[] {
  return this._immobili;
}
private _immobili: Immobile[] = [];


}
