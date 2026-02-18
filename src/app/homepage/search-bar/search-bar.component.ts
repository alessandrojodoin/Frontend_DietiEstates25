import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchFiltersService } from '../../_services/search-filters.service';
import { ImmobiliService } from '../../_services/immobili.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  selected: 'Compra' | 'Affitto' = 'Compra';
  filtersApplied = false;
  showFilters = false;
  SearchFiltersService = inject(SearchFiltersService);
  immobiliService = inject(ImmobiliService);
  router = inject(Router);

  // Stato dei filtri temporaneo
  tempFilters = {
    filtersApplied: false as boolean,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    
    bathrooms: null as number | null,
    bedrooms: null as number | null,
    areaSize: null as number | null,
    terrazzo: null as boolean | null,
    balcone: null as boolean | null,
    ascensore: null as boolean | null,
    garage: null as boolean | null,
    giardino: null as boolean | null,
    postoAuto: null as boolean | null,
    accessoDisabili: null as boolean | null,
    energyClass: null as string | null,
    citta: '' as string | null,

  };

  cityForm = new FormGroup({
    citta: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    )
  });


  homelessBuys() { this.selected = 'Compra'; }
  homelessRents() { this.selected = 'Affitto'; }


  openFilters() { this.showFilters = true; }
  closeFilters() { this.showFilters = false; }


  // Salva i filtri selezionati
  applyFilters() {

    this.showFilters = false;

    this.SearchFiltersService.filters.minPrice = this.tempFilters.minPrice;
    this.SearchFiltersService.filters.maxPrice = this.tempFilters.maxPrice;
    
    this.SearchFiltersService.filters.bathrooms = this.tempFilters.bathrooms;
    this.SearchFiltersService.filters.bedrooms = this.tempFilters.bedrooms;
    this.SearchFiltersService.filters.areaSize = this.tempFilters.areaSize;
    this.SearchFiltersService.filters.terrazzo = this.tempFilters.terrazzo;
    this.SearchFiltersService.filters.balcone = this.tempFilters.balcone;
    this.SearchFiltersService.filters.ascensore = this.tempFilters.ascensore;
    this.SearchFiltersService.filters.garage = this.tempFilters.garage;
    this.SearchFiltersService.filters.giardino = this.tempFilters.giardino;
    this.SearchFiltersService.filters.postoAuto = this.tempFilters.postoAuto;
    this.SearchFiltersService.filters.accessoDisabili = this.tempFilters.accessoDisabili;
    this.SearchFiltersService.filters.energyClass = this.tempFilters.energyClass;
    this.SearchFiltersService.filters.citta = this.tempFilters.citta;
    this.SearchFiltersService.filters.filtersApplied = true;

  }


  startSearch() {
    console.log("Search Started...");



    if (this.SearchFiltersService.filters.minPrice === null && this.SearchFiltersService.filters.maxPrice === null && 
        
        this.SearchFiltersService.filters.bedrooms === null && this.SearchFiltersService.filters.areaSize === null && 
        this.SearchFiltersService.filters.energyClass === null && this.SearchFiltersService.filters.citta === null && 
        this.SearchFiltersService.filters.terrazzo === null && this.SearchFiltersService.filters.balcone === null && 
        this.SearchFiltersService.filters.ascensore === null && this.SearchFiltersService.filters.garage === null && 
        this.SearchFiltersService.filters.giardino === null && this.SearchFiltersService.filters.postoAuto === null && 
        this.SearchFiltersService.filters.accessoDisabili === null) {
          
          this.filtersApplied = false;
        }

    this.immobiliService.getImmobileListFiltri(
      this.SearchFiltersService.filters.filtersApplied,
      this.SearchFiltersService.filters.minPrice,
      this.SearchFiltersService.filters.maxPrice,
      
      this.SearchFiltersService.filters.bathrooms,
      this.SearchFiltersService.filters.bedrooms,
      this.SearchFiltersService.filters.areaSize,
      this.SearchFiltersService.filters.energyClass,
      this.cityForm.value.citta as string,
      this.SearchFiltersService.filters.terrazzo,
      this.SearchFiltersService.filters.balcone,
      this.SearchFiltersService.filters.ascensore,
      this.SearchFiltersService.filters.garage,
      this.SearchFiltersService.filters.giardino,
      this.SearchFiltersService.filters.postoAuto,
      this.SearchFiltersService.filters.accessoDisabili,
      this.selected)
      .subscribe(immobili => {
        console.log("Immobili trovati:", immobili);
        this.SearchFiltersService.arrayImmobili = immobili;
        this.router.navigate(['/search-result'], { queryParams: { type: this.selected.toLowerCase() }});
      });
  }


}
