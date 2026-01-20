import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  auth = inject(AuthService);
}
