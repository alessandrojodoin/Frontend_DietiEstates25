import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFiltersService {

  constructor() { }


  filters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    propertyType: '',
    bathrooms: null as number | null,
    bedrooms: null as number | null,
    areaSize: null as number | null,
    extraFeatures: ''
  };





}
