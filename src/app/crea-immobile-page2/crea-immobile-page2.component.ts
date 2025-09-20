import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crea-immobile-page2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crea-immobile-page2.component.html',
  styleUrl: './crea-immobile-page2.component.scss'
})
export class CreaImmobilePage2Component{

   ImmobileForm = new FormGroup({
         NomeImmobile: new FormControl('',
           [Validators.required,
           Validators.minLength(1)]
         ),
         Descrizione: new FormControl('',
           [Validators.required,
           Validators.minLength(1)]
         ),
       })


       onSubmit(): void{

       }

}
