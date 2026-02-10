import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthRestService } from '../../_services/auth-backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-admin-update-credentials',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-update-credentials.component.html',
  styleUrl: './admin-update-credentials.component.scss'
})
export class AdminUpdateCredentialsComponent {

    private rest = inject(AuthRestService);
    private toastr = inject(ToastrService);
    private auth = inject(AuthService);
    private router = inject(Router);

    updateAdminCredentialsForm = new FormGroup({
      username: new FormControl('',
        [Validators.required,
          Validators.minLength(1)]
      ),
      password: new FormControl('',
        [Validators.required,
          Validators.minLength(1)]
      ),
    })



  onSubmit(){
      
      if(this.updateAdminCredentialsForm.invalid){
        this.toastr.error("Please make sure you have filled all of the fields", "Error", { positionClass: 'toast-center-center'});
      }
      else{
        this.rest.modificaAmministratore(
          this.auth.getUsername(),
          this.updateAdminCredentialsForm.value.username as string,
          this.updateAdminCredentialsForm.value.password as string,
          this.auth.getAuthHeadersTextResponse()
        ).subscribe({
          error: (error: HttpErrorResponse) =>{
             const msg = error?.error || "Operazione non riuscita";
              this.toastr.error(msg, "Errore", { positionClass: 'toast-center-center'});
          },
          next: ()=> {

            this.auth.login({username: this.updateAdminCredentialsForm.value.username as string,
                            password: this.updateAdminCredentialsForm.value.password as string});
            this.toastr.success("Cambiamento dati avvenuto con successo!", "Success", { positionClass: 'toast-center-center'});
            this.router.navigate(["/"]);
          }
      });
      }
  
  
   }

}


