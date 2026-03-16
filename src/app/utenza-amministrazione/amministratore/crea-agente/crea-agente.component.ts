import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthRestService } from '../../../_services/auth-backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../_services/auth.service';

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
  private authService = inject(AuthService);


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

    })
  
    onSubmit(){
      
      if(this.signupAgenteForm.invalid){
        this.toastr.error("Assicurati di aver riempito tutti i campi.", "Error", { positionClass: 'toast-center-center'});
      }
      else{
        this.rest.signupAgente({
            username: this.signupAgenteForm.value.username as string,
            email: this.signupAgenteForm.value.email as string,
            nome: this.signupAgenteForm.value.nome as string,
            cognome: this.signupAgenteForm.value.cognome as string,
            password: this.signupAgenteForm.value.password as string,
            numeroTelefonico: this.signupAgenteForm.value.numeroTelefonico as string,
            agenziaImmobiliare:  this.authService.authState.agenziaImmobiliare as string
        }).subscribe({
          error: (error) =>{
            if(error.status == 500){
            this.toastr.error("Lo username o l'e-mail inserite potrebbero già essere in utilizzo.", "Username o E-Mail non disponibili", { positionClass: 'toast-center-center'});
          }
          else if (error instanceof HttpErrorResponse) {
            this.toastr.error("Non è stato possibile raggiungere il server.", "Error", { positionClass: 'toast-center-center'});
          } else {
          this.toastr.error("Unexpected error", "Error", { positionClass: 'toast-center-center'});
        }
          },
          next: ()=> {
            this.toastr.success("Signed up successfully!", "Success", { positionClass: 'toast-center-center'});
            this.router.navigate(["/"]);
          }
      });
      }
    }
  
   
}
