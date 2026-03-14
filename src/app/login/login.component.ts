import { Component, inject, Injector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRestService } from '../_services/auth-backend.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  loginForm = new FormGroup({
    username: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(1)]
    ),
  })

  onSubmit() {
  if (this.loginForm.invalid) {
    this.toastr.error("Assicurati di aver riempito tutti i campi", "Error", { positionClass: 'toast-center-center'});
    return;
  }

  const username = this.loginForm.value.username as string;
  const password = this.loginForm.value.password as string;

  this.authService.login({ username, password })
    .then(() => {
      this.toastr.success("Logged in successfully!", "Success", { positionClass: 'toast-center-center'});  
      
        this.router.navigate(['/']); 
      
    })
    .catch((error) => {
      if(error.status === 401){
        this.toastr.error("Le credenziali inserite potrebbero non essere corrette.", "Credenziali Errate", { positionClass: 'toast-center-center'});
      }
      else if (error instanceof HttpErrorResponse) {
        this.toastr.error("Non è stato possibile raggiungere il server.", "Error", { positionClass: 'toast-center-center'});
      } else {
        this.toastr.error("Unexpected error", "Error", { positionClass: 'toast-center-center'});
      }
    });
  }

  

googleAccess() {
  this.router.navigate(['/link-google']);
}
  


    /* else{

      this.authService.login({
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      })
      .then( () =>{
        this.toastr.success("Logged in succesfully!", "Success", { positionClass: 'toast-center-center'});
         this.router.navigate(["/"]);
      })
      .catch((error) => {
        if(error instanceof HttpErrorResponse){
            this.toastr.error(error.error.message, "Error", { positionClass: 'toast-center-center'});
        }
      })
    }*/



  
}

