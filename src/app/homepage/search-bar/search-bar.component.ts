import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFiltersService } from '../../_services/search-filters.service';
import { ImmobiliService } from '../../_services/immobili.service';

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
  immobiliService = inject(ImmobiliService);

  // Stato dei filtri temporaneo
  tempFilters = {
    filtersApplied: false as boolean,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    propertyType: '', 
    bathrooms: null as number | null,
    bedrooms: null as number | null,
    areaSize: null as number | null,
    Terrazzo: null as boolean | null,
    Balcone: null as boolean | null,
    Ascensore: null as boolean | null,
    Garage: null as boolean | null,
    Giardino: null as boolean | null,
    PostoAuto: null as boolean | null,
    AccessoDisabili: null as boolean | null,
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
    this.SearchFiltersService.filters.Terrazzo = this.tempFilters.Terrazzo;
    this.SearchFiltersService.filters.Balcone = this.tempFilters.Balcone;
    this.SearchFiltersService.filters.Ascensore = this.tempFilters.Ascensore;
    this.SearchFiltersService.filters.Garage = this.tempFilters.Garage;
    this.SearchFiltersService.filters.Giardino = this.tempFilters.Giardino;
    this.SearchFiltersService.filters.PostoAuto = this.tempFilters.PostoAuto;
    this.SearchFiltersService.filters.AccessoDisabili = this.tempFilters.AccessoDisabili;
    this.SearchFiltersService.filters.energyClass = this.tempFilters.energyClass;
    this.SearchFiltersService.filters.citta = this.tempFilters.citta;
    this.SearchFiltersService.filters.filtersApplied = true;

  }


  startSearch() {
    console.log("PenesrnelloDiSearch");

    if (this.SearchFiltersService.filters.citta === ''){
      this.SearchFiltersService.filters.citta = null;
    }

    if (this.SearchFiltersService.filters.propertyType === ''){
      this.SearchFiltersService.filters.propertyType = null;
    }

    if (this.SearchFiltersService.filters.minPrice === null && this.SearchFiltersService.filters.maxPrice === null && 
        this.SearchFiltersService.filters.propertyType === null && this.SearchFiltersService.filters.bathrooms === null && 
        this.SearchFiltersService.filters.bedrooms === null && this.SearchFiltersService.filters.areaSize === null && 
        this.SearchFiltersService.filters.energyClass === null && this.SearchFiltersService.filters.citta === null && 
        this.SearchFiltersService.filters.Terrazzo === null && this.SearchFiltersService.filters.Balcone === null && 
        this.SearchFiltersService.filters.Ascensore === null && this.SearchFiltersService.filters.Garage === null && 
        this.SearchFiltersService.filters.Giardino === null && this.SearchFiltersService.filters.PostoAuto === null && 
        this.SearchFiltersService.filters.AccessoDisabili === null) {
          
          this.filtersApplied = false;
        }

    this.immobiliService.getImmobileListFiltri(
      this.SearchFiltersService.filters.filtersApplied,
      this.SearchFiltersService.filters.minPrice,
      this.SearchFiltersService.filters.maxPrice,
      this.SearchFiltersService.filters.propertyType,
      this.SearchFiltersService.filters.bathrooms,
      this.SearchFiltersService.filters.bedrooms,
      this.SearchFiltersService.filters.areaSize,
      this.SearchFiltersService.filters.energyClass,
      this.SearchFiltersService.filters.citta,
      this.SearchFiltersService.filters.Terrazzo,
      this.SearchFiltersService.filters.Balcone,
      this.SearchFiltersService.filters.Ascensore,
      this.SearchFiltersService.filters.Garage,
      this.SearchFiltersService.filters.Giardino,
      this.SearchFiltersService.filters.PostoAuto,
      this.SearchFiltersService.filters.AccessoDisabili)
      .subscribe(immobili => {
        console.log("Immobili trovati:", immobili);
      });
  }

}
