import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFiltersService {

  constructor() { }


  filters = {
    filtersApplied: false as boolean,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    propertyType: '' as string | null,
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





}
