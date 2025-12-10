import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  // Stato dei filtri temporaneo
  tempFilters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    propertyType: '',
    bathrooms: null as number | null,
    bedrooms: null as number | null,
    areaSize: null as number | null,
    extraFeatures: ''
  };

  // Stato dei filtri effettivi applicati
  appliedFilters = { ...this.tempFilters };

  homelessBuys() { this.selected = 'compra'; }
  homelessRents() { this.selected = 'affitta'; }

  openFilters() { this.showFilters = true; }
  closeFilters() { this.showFilters = false; }

  // Salva i filtri selezionati
  applyFilters() {
    this.filtersApplied = true;
    this.appliedFilters = { ...this.tempFilters };
    this.closeFilters();
    console.log('Filtri applicati:', this.appliedFilters);
  }

  startSearch() {
    console.log('Ricerca avviata con filtri:', this.appliedFilters, 'e tipo:', this.selected);
    // qui puoi inserire la logica per la ricerca reale
  }

}
