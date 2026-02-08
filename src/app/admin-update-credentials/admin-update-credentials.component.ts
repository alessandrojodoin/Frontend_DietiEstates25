import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthRestService } from '../_services/auth-backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
        this.toastr.error("Please make sure you have filled all of the fields", "Error");
      }
      else{
        this.rest.signup({
          username: this.updateAdminCredentialsForm.value.username as string,
          password: this.updateAdminCredentialsForm.value.password as string,
          email: "" as string,
          nome: "" as string,
          cognome: "" as string,
          numeroTelefonico: "" as string
        }).subscribe({
          error: (error) =>{
            if(error instanceof HttpErrorResponse){
              this.toastr.error(error.error.message);
            }
          },
          next: ()=> {
            this.toastr.success("Cambiamento dati avvenuto con successo!", "Success");
            this.router.navigate(["/"]);
          }
      });
      }
  
  
   }

}
