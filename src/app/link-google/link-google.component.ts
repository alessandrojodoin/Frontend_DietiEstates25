import { Component, inject } from '@angular/core';
import { AuthRestService } from '../_services/auth-backend.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-link-google',
  standalone: true,
  imports: [],
  templateUrl: './link-google.component.html',
  styleUrls: ['./link-google.component.scss']
})
export class LinkGoogleComponent {

  private rest = inject(AuthRestService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  linking: boolean = false; 

  linkWithGoogle() {
  this.linking = true;

  // Mostra il popup di login di Google
  google.accounts.id.initialize({
    client_id: '365947512424-ge1lhump541oahtkc8bqtjs0r2ledgd2.apps.googleusercontent.com',
    callback: (response: any) => this.handleCredentialResponse(response)
  });

  google.accounts.id.prompt(); 
}

handleCredentialResponse(response: any) {
  const idToken = response.credential;

  this.rest.linkGoogleAccount(idToken).subscribe({
    next: (resp: any) => {
      console.log("Collegamento Google avvenuto con successo!");
      this.auth.authState.googleLinked = true;
      this.linking = false;
      this.toastr.success("Logged in successfully!", "Success", { positionClass: 'toast-center-center'});
      this.router.navigate(["/"]);
    },
    error: (err) => {
      console.error("Errore durante il collegamento con Google:", err);
      this.linking = false;
    }
  });
}


}
