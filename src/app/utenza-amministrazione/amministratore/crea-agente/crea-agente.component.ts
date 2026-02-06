import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthRestService } from '../../../_services/auth-backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crea-agente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crea-agente.component.html',
  styleUrl: './crea-agente.component.scss'
})
export class CreaAgenteComponent {

  private rest = inject(AuthRestService);
  private toastr = inject(ToastrService);
  private router = inject(Router);


  signupAgenteForm = new FormGroup({
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
      agenzia: new FormControl('',
        [Validators.required,
          Validators.minLength(1)]
      ),

    })
  
    onSubmit(){
      
      if(this.signupAgenteForm.invalid){
        this.toastr.error("Please make sure you have filled all of the fields", "Error");
      }
      else{
        this.rest.signupAgente({
           username: this.signupAgenteForm.value.username as string,
          email: this.signupAgenteForm.value.email as string,
          nome: this.signupAgenteForm.value.nome as string,
          cognome: this.signupAgenteForm.value.cognome as string,
          password: this.signupAgenteForm.value.password as string,
          numeroTelefonico: this.signupAgenteForm.value.numeroTelefonico as string,
          agenziaImmobiliare: "AGENZIA PROVVISORIA" as string
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
