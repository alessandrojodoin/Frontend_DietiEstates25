import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthRestService } from '../../_services/auth-backend.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-amministratore-supporto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './amministratore-supporto.component.html',
  styleUrl: './amministratore-supporto.component.scss'
})
export class AmministratoreSupportoComponent {

  private rest = inject(AuthRestService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);


  signupAmministratoreForm = new FormGroup({
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
      
      if(this.signupAmministratoreForm.invalid){
        this.toastr.error("Please make sure you have filled all of the fields", "Error");
      }
      else{
        this.rest.signupAmministratore({
          username: this.signupAmministratoreForm.value.username as string,
          password: this.signupAmministratoreForm.value.password as string,
          email: this.signupAmministratoreForm.value.email as string,
          nome: this.signupAmministratoreForm.value.nome as string,
          cognome: this.signupAmministratoreForm.value.cognome as string,
          numeroTelefonico: this.signupAmministratoreForm.value.numeroTelefonico as string,
          agenziaImmobiliare: this.authService.authState.agenziaImmobiliare as string
        }).subscribe({
          error: (error) =>{
            if(error instanceof HttpErrorResponse){
              this.toastr.error(error.error.message);
            }
          },
          next: ()=> {
            this.toastr.success("Signed up successfully!", "Success");
            this.router.navigate(["/"]);
          }
      });
      }
  
  
   }
}
