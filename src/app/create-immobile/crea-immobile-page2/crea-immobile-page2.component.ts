import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';

interface TagOption {
  nome: string;
  tipo: 'select' | 'number' | 'textarea';
  opzioni?: string[]; // solo per i select
  placeholder?: string; // solo per number/textarea
}

@Component({
  selector: 'app-crea-immobile-page2',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, CommonModule],
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
         //DA AGGIUNGERE I TAG
    })

   selectedTags: TagOption[] = [];
   optionalTags: TagOption[] = [
    { nome: 'aria condizionata', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'camino', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'wifi', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'impianto d’allarme', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'videosorveglianza', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'numero di balconi', tipo: 'number', placeholder: 'Es. 2' },
    { nome: 'numero di terrazzi', tipo: 'number', placeholder: 'Es. 1' },
    { nome: 'giardino', tipo: 'select', opzioni: ['Assente', 'Condominiale', 'Privato'] },
    { nome: 'veranda / portico', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'posto auto', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'garage', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'collocazione', tipo: 'textarea', placeholder: 'Es. Vicino al centro città...' },
    { nome: 'arredata', tipo: 'select', opzioni: ['No', 'Sì', 'Parzialmente'] },
    { nome: 'cucina a vista', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'vicinanza a mezzi pubblici', tipo: 'textarea', placeholder: 'Es. Fermata autobus a 100m...' },
    { nome: 'ascensore', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'accesso disabili', tipo: 'select', opzioni: ['No', 'Sì'] },
    { nome: 'animali ammessi', tipo: 'select', opzioni: ['No', 'Sì'] },
  ];

  addTag(tag: TagOption) {
    // Sposta il tag tra i selezionati
    this.selectedTags.push(tag);
    this.optionalTags = this.optionalTags.filter(t => t !== tag);
  }

  handleTagSelection(tag: TagOption, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    console.log(`${tag.nome} = ${target.value}`);
  }

  removeTag(tag: TagOption) {
    // Sposta di nuovo tra gli opzionali
    this.optionalTags.push(tag);
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }


  constructor(private router: Router){}

  onSubmit(): void{
    this.router.navigate(['/create-immobile-page3']);
  }

  onAnnulla(){
    this.router.navigate(['/create-immobile-page1']);
  }

}
