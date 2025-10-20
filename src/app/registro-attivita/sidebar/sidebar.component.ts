import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { skip } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  private router = inject(Router);
  sidebar: String = 'Immobili';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      console.log('Fragment is:', fragment);

      if (fragment === 'Immobili') {
        this.onImmobiliVisuClick();
      } else if (fragment === 'Offerte') {
        this.offerteFatte();
      } else if (fragment === 'Prenotazioni') {
        this.prenotazioniEffettuate();
      }
    });
  }
 
  onImmobiliVisuClick() {
    this.sidebar = 'Immobili';
  }

  offerteFatte() {
    this.sidebar = 'Offerte';
  }

  prenotazioniEffettuate() {
    this.sidebar = 'Prenotazioni';
  }

}
