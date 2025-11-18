import { Component, Input } from '@angular/core';
import { Immobile } from '../../../data';
import Instant from 'ts-time/Instant';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-search-result-immobili',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-immobili.component.html',
  styleUrl: './search-result-immobili.component.scss'
})
export class SearchResultImmobiliComponent {
    immobiliArray: Immobile[] = [];

  @Input() immobili: Immobile[] = [];

}
