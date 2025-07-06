import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthRestService } from '../_services/rest-backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signupCliente.component.html',
  styleUrl: './signupCliente.component.scss'
})
export class SignupClienteComponent {
  private rest = inject(AuthRestService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  signupForm = new FormGroup({
    username: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    nome: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    cognome: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    email: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    numeroTelefonico: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    password: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
  })

  onSubmit(){
    
    if(this.signupForm.invalid){
      this.toastr.error("Please make sure you have filled all of the fields", "Error");
    }
    else{
      this.rest.signup({
        username: this.signupForm.value.username as string,
        password: this.signupForm.value.password as string,
        email: this.signupForm.value.email as string,
        nome: this.signupForm.value.nome as string,
        cognome: this.signupForm.value.cognome as string,
        numeroTelefonico: this.signupForm.value.numeroTelefonico as string
      }).subscribe({
        error: (error) =>{
          if(error instanceof HttpErrorResponse){
            this.toastr.error(error.error.message);
          }
        },
        next: ()=> {
          this.toastr.success("Signed up successfully!", "Success");
          this.router.navigate(["/login"]);
        }
    });
    }


 }
}
