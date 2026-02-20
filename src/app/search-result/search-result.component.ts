import { Component, inject } from '@angular/core';
import { SearchResultImmobiliComponent } from '../search-result-immobili/search-result-immobili.component';
import { SearchResultMapComponent } from '../search-result-map/search-result-map.component';
import { Immobile } from '../../../data';
import { SearchFiltersService } from '../_services/search-filters.service';
import { ImmobiliService } from '../_services/immobili.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchResultImmobiliComponent, SearchResultMapComponent, CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  SearchFiltersService = inject(SearchFiltersService);
  immobileService = inject(ImmobiliService);

  immobili: Immobile[] = [];
  loading = true;

  async ngOnInit() {
    this.loading = true;

    const nuoviImmobili: Immobile[] = [];

    // fallback se arrayImmobili è vuoto
    if(this.SearchFiltersService.ricercaFatta === true){
      const array = this.SearchFiltersService.arrayImmobili ?? [];
      
      for (let immobile of array) {
        nuoviImmobili.push(await this.immobileService.convertRESTImmobile(immobile));
      }
    }
    


    this.immobili = nuoviImmobili;
    this.loading = false;
  }
}
