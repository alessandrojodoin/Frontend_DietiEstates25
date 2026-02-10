import { Component, inject } from '@angular/core';
import { AuthRestService } from '../_services/auth-backend.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../environment';

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
    client_id: environment.GOOGLE_CLIENT_ID,
    callback: (response: any) => this.handleCredentialResponse(response)
  });

  google.accounts.id.prompt(); 
}

handleCredentialResponse(response: any) {
  const idToken = response.credential;
  console.log("Google response:", response);
console.log("JWT in AuthService:", this.auth.getToken());
  console.log("Google ID token:", response.credential);

  this.rest.linkGoogleAccount(idToken, this.auth.getAuthHeadersTextResponse()).subscribe({
  next: (newJwt: string) => {
    this.auth.updateTokenAfterGoogleLogin(newJwt); // Aggiorna token e googleLinked
    this.linking = false;
    this.toastr.success("Account Google collegato con successo!", "Success", { positionClass: 'toast-center-center'});
    this.router.navigate(['/']); 
  },
  error: (err) => {
    console.error("Errore durante il collegamento con Google:", err);
    this.linking = false;
    this.toastr.error("Errore durante il collegamento con Google", "Error", { positionClass: 'toast-center-center'});
  }
});

}



}
