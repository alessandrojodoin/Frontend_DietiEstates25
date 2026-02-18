import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFiltersService {

  constructor() { }


  filters = {
    filtersApplied: true as boolean,
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


arrayImmobili: any[] = [];




}
