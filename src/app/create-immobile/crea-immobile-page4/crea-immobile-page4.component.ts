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
    Prezzo: new FormControl('', [Validators.required]),
    SpeseAggiuntive: new FormControl('', [Validators.required]),
    TipologiaContratto: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.ContrattoForm.valid) {
      console.log(this.ContrattoForm.value);
      this.router.navigate(['/summary']);
    }
  }
       onAnnulla(){
        this.router.navigate(['/create-immobile-page3']);
      }
}
