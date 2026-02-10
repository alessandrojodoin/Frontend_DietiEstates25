import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFiltersService } from '../../_services/search-filters.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  selected: 'compra' | 'affitta' = 'compra';
  filtersApplied = false;
  showFilters = false;
  SearchFiltersService = inject(SearchFiltersService);

  // Stato dei filtri temporaneo
  tempFilters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    propertyType: '', 
    bathrooms: null as number | null,
    bedrooms: null as number | null,
    areaSize: null as number | null,
    extraFeatures: '',
    energyClass: null as string | null,
    citta: '' as string | null,

  };


  homelessBuys() { this.selected = 'compra'; }
  homelessRents() { this.selected = 'affitta'; }


  openFilters() { this.showFilters = true; }
  closeFilters() { this.showFilters = false; }


  // Salva i filtri selezionati
  applyFilters() {

    this.showFilters = false;

    this.SearchFiltersService.filters.minPrice = this.tempFilters.minPrice;
    this.SearchFiltersService.filters.maxPrice = this.tempFilters.maxPrice;
    this.SearchFiltersService.filters.propertyType = this.tempFilters.propertyType;
    this.SearchFiltersService.filters.bathrooms = this.tempFilters.bathrooms;
    this.SearchFiltersService.filters.bedrooms = this.tempFilters.bedrooms;
    this.SearchFiltersService.filters.areaSize = this.tempFilters.areaSize;
    this.SearchFiltersService.filters.extraFeatures = this.tempFilters.extraFeatures;
    this.SearchFiltersService.filters.energyClass = this.tempFilters.energyClass;
    this.SearchFiltersService.filters.citta = this.tempFilters.citta;

    this.filtersApplied = true;
  }


  startSearch() {
    console.log("PenesrnelloDiSearch");
   
  }

}
