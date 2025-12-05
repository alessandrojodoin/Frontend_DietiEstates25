import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreaImmobileService } from '../../_services/crea-immobile.service';

@Component({
  selector: 'app-crea-immobile-page4',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crea-immobile-page4.component.html',
  styleUrl: './crea-immobile-page4.component.scss'
})
export class CreaImmobilePage4Component {
  creaImmobileService = inject(CreaImmobileService);

  ContrattoForm = new FormGroup({
    Prezzo: new FormControl('', [Validators.required]),
    SpeseAggiuntive: new FormControl('', [Validators.required]),
    TipologiaContratto: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  ngOnInit(){
    this.ContrattoForm.value.Prezzo= this.creaImmobileService.immobile?.prezzo?.toString();
    this.ContrattoForm.value.SpeseAggiuntive = this.creaImmobileService.immobile?.speseCondominiali?.toString();
    this.ContrattoForm.value.TipologiaContratto = this.creaImmobileService.immobile?.tipologiaContratto;

    this.ContrattoForm.patchValue({
      Prezzo: this.creaImmobileService.immobile?.prezzo?.toString() ?? '',
      SpeseAggiuntive: this.creaImmobileService.immobile?.speseCondominiali?.toString() ?? '',
      TipologiaContratto: this.creaImmobileService.immobile?.tipologiaContratto ?? ''
    })

   console.log(this.creaImmobileService.immobile); 
  }

  onSubmit(): void {
    if (this.ContrattoForm.valid) {
      console.log(this.ContrattoForm.value);
      this.updateImmobile();
      this.router.navigate(['/summary']);
    }
  }

  onAnnulla(){
    //this.router.navigate(['/create-immobile-page3']);
    this.updateImmobile();
    this.goToPage.emit(3);
  }


  @Output() goToPage = new EventEmitter<number>();

  updateImmobile() {
    const prezzo = Number(this.ContrattoForm.value.Prezzo);
    const SpeseAggiuntive = Number(this.ContrattoForm.value.SpeseAggiuntive);

    this.creaImmobileService.immobile.prezzo = Number.isNaN(prezzo) ? undefined : prezzo;
    this.creaImmobileService.immobile.speseCondominiali = Number.isNaN(SpeseAggiuntive) ? undefined : SpeseAggiuntive;
    this.creaImmobileService.immobile.tipologiaContratto = this.ContrattoForm.value.TipologiaContratto!;
  }


}
