import { Component, inject } from '@angular/core';
import { SearchResultImmobiliComponent } from '../search-result-immobili/search-result-immobili.component';
import { SearchResultMapComponent } from '../search-result-map/search-result-map.component';
import Instant from 'ts-time/Instant';
import { Immobile } from '../../../data';
import { SearchFiltersService } from '../_services/search-filters.service';
import { ImmobiliService } from '../_services/immobili.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchResultImmobiliComponent, SearchResultMapComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  SearchFiltersService = inject(SearchFiltersService);
  immobileService = inject(ImmobiliService);

  immobili: any[] = []; 

  async ngOnInit() {
    
    console.log("Immobili da visualizzare:", this.SearchFiltersService.arrayImmobili);
    const nuoviImmobili: Immobile[] = [];

    for (let immobile of this.SearchFiltersService.arrayImmobili) {
      nuoviImmobili.push( await this.immobileService.convertRESTImmobile(immobile));
    }

    this.immobili = [...this.immobili, ...nuoviImmobili];

}
  

}
