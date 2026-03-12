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

  selected: 'vendita' | 'affitto' = 'vendita';
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
    terrazzo: null as number | null,
    balcone: null as number | null,
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

  ngOnInit(){
    if(this.SearchFiltersService.haveFiltersBeenSelected){
      this.selected = this.SearchFiltersService.lastSelectedContractType;

      this.tempFilters.minPrice = this.SearchFiltersService.filters.minPrice;
      this.tempFilters.maxPrice = this.SearchFiltersService.filters.maxPrice;
      this.tempFilters.accessoDisabili = this.SearchFiltersService.filters.accessoDisabili
      this.tempFilters.areaSize = this.SearchFiltersService.filters.areaSize
      this.tempFilters.ascensore = this.SearchFiltersService.filters.ascensore
      this.tempFilters.balcone = this.SearchFiltersService.filters.balcone
      this.tempFilters.bathrooms = this.SearchFiltersService.filters.bathrooms
      this.tempFilters.bedrooms = this.SearchFiltersService.filters.bedrooms
      this.tempFilters.citta = this.SearchFiltersService.filters.citta
      this.tempFilters.energyClass = this.SearchFiltersService.filters.energyClass
      this.tempFilters.filtersApplied = this.SearchFiltersService.filters.filtersApplied
      this.tempFilters.garage = this.SearchFiltersService.filters.garage
      this.tempFilters.giardino = this.SearchFiltersService.filters.giardino
      this.tempFilters.postoAuto = this.SearchFiltersService.filters.postoAuto
      this.tempFilters.terrazzo = this.SearchFiltersService.filters.terrazzo

    }
  }

  cliccaPulsanteVendita() { this.selected = 'vendita'; }
  cliccaPulsanteAffitta() { this.selected = 'affitto'; }


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
    this.SearchFiltersService.filters.ascensore = this.tempFilters.ascensore ? true : null;
    this.SearchFiltersService.filters.garage = this.tempFilters.garage ? true : null;
    this.SearchFiltersService.filters.giardino = this.tempFilters.giardino ? true : null;
    this.SearchFiltersService.filters.postoAuto = this.tempFilters.postoAuto ? true : null;
    this.SearchFiltersService.filters.accessoDisabili = this.tempFilters.accessoDisabili ? true : null;
    this.SearchFiltersService.filters.energyClass = this.tempFilters.energyClass;
    this.SearchFiltersService.filters.citta = this.tempFilters.citta;
    this.SearchFiltersService.filters.filtersApplied = true;

    this.SearchFiltersService.haveFiltersBeenSelected = true;

  }


  startSearch() {
    console.log("Search Started...");
    this.SearchFiltersService.haveFiltersBeenSelected = true;
    this.SearchFiltersService.lastSelectedContractType = this.selected;



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
        this.SearchFiltersService.ricercaFatta = true;
        this.SearchFiltersService.arrayImmobili = immobili;
        localStorage.setItem('immobili', JSON.stringify(immobili));
        this.router.navigate(['/search-result'], { queryParams: { type: this.selected.toLowerCase() }});
      });
  }


}
