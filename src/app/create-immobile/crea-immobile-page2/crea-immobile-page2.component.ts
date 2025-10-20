import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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


       constructor(private router: Router){}

       onSubmit(): void{
          this.router.navigate(['/create-immobile-page3']);
       }

       onAnnulla(){
        this.router.navigate(['/create-immobile-page1']);
      }

}
