import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { AuthService } from "../_services/auth.service";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dropdownOpen = false;
  auth = inject(AuthService);

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}



}
