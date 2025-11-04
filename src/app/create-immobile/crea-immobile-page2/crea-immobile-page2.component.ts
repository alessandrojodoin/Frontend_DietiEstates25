import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule  } from '@angular/forms';
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
  imports: [ReactiveFormsModule, TitleCasePipe, CommonModule, FormsModule],
  templateUrl: './crea-immobile-page2.component.html',
  styleUrl: './crea-immobile-page2.component.scss'
})
export class CreaImmobilePage2Component{
  tagSearch: string = '';

filteredOptionalTags(): TagOption[] {
  const search = this.tagSearch.trim().toLowerCase();

  // Se non si è digitato nulla → mostra tutti i tag opzionali
  if (!search) {
    return this.optionalTags;
  }

  // Altrimenti mostra solo quelli che contengono il testo (case-insensitive)
  return this.optionalTags.filter(tag =>
    tag.nome.toLowerCase().includes(search)
  );
}


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
         locali: new FormControl('', Validators.required),
         bagni: new FormControl('', Validators.required),
         piano: new FormControl(''),
         classe: new FormControl(''),
         tagAggiuntivi: new FormGroup({})
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

    // aggiungi dinamicamente un controllo nel form
  const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
  tagControls.addControl(tag.nome, new FormControl(''));
  }

  handleTagSelection(tag: TagOption, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    //console.log(`${tag.nome} = ${target.value}`);
    const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
  tagControls.get(tag.nome)?.setValue(target.value);
  }

  removeTag(tag: TagOption) {
    // Sposta di nuovo tra gli opzionali
    this.optionalTags.push(tag);
    this.selectedTags = this.selectedTags.filter(t => t !== tag);

    // rimuovi il controllo dal form
  const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
  tagControls.removeControl(tag.nome);
  }


  constructor(private router: Router){}

  onSubmit(): void{
    if (this.ImmobileForm.valid) {
      console.log('Dati immobile:', this.ImmobileForm.value);
      this.router.navigate(['/create-immobile-page3']);
    }
  }

  onAnnulla(){
    this.router.navigate(['/create-immobile-page1']);
  }

}
