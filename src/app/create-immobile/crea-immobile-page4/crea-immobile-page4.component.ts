import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea-immobile-page4',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crea-immobile-page4.component.html',
  styleUrl: './crea-immobile-page4.component.scss'
})
export class CreaImmobilePage4Component {
  ContrattoForm = new FormGroup({
         NomeImmobile: new FormControl('',
           [Validators.required,
           Validators.minLength(1)]
         ),
         Descrizione: new FormControl('',
           [Validators.required,
           Validators.minLength(1)]
         ),
       })

       constructor(private router: Router){}
       onSubmit(): void{

       }
       onAnnulla(){
        this.router.navigate(['/create-immobile-page3']);
      }
}
