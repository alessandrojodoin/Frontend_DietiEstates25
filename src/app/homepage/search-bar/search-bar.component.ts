import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
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

}
