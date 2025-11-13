import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'] 
})
export class SearchBarComponent {

  selected: 'compra' | 'affitta' = 'compra';

  homelessBuys() {
    this.selected = 'compra';
  }

  homelessRents() {
    this.selected = 'affitta';
  }


  showFilters = false;

  openFilters() {
    this.showFilters = true;
  }


  closeFilters() {    
    this.showFilters = false;
  }

  startSearch() {

  }


}
