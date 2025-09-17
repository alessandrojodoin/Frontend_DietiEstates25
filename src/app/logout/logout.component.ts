import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  private location = inject(Location);
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(){
    this.auth.logout();
    setTimeout(() => {
      if(this.location.path() === "/logout"){
        this.router.navigate([""]);
      }

    }, 4000);
  }
}