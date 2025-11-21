import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { CreaImmobileService } from '../../_services/crea-immobile.service';

interface TagOption {
  nome: string;
  tipo: 'select' | 'number' | 'textarea';
  opzioni?: string[];
  placeholder?: string;
}

@Component({
  selector: 'app-crea-immobile-page2',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TitleCasePipe],
  templateUrl: './crea-immobile-page2.component.html',
  styleUrls: ['./crea-immobile-page2.component.scss']
})
export class CreaImmobilePage2Component implements OnInit {

  creaImmobileService = inject(CreaImmobileService)
  tagSearch = new FormControl('');
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

  ImmobileForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Generazione dinamica del FormGroup
    const controls: any = {
      NomeImmobile: new FormControl('', [Validators.required, Validators.minLength(1)]),
      Descrizione: new FormControl('', [Validators.required, Validators.minLength(1)]),
      locali: new FormControl('', Validators.required),
      bagni: new FormControl('', Validators.required),
      piano: new FormControl(''),
      classe: new FormControl(''),
      tagAggiuntivi: new FormGroup({})
    };


    // Genera dinamicamente i tag selezionabili
    this.optionalTags.forEach(tag => {
      const tagControls = controls.tagAggiuntivi as FormGroup;
      if (tag.tipo === 'number') {
        tagControls.addControl(tag.nome, new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]));
      } else if (tag.tipo === 'textarea') {
        tagControls.addControl(tag.nome, new FormControl('', [Validators.required, Validators.minLength(10)]));
      } else if (tag.tipo === 'select') {
        tagControls.addControl(tag.nome, new FormControl('', Validators.required));
      }
    });

    this.ImmobileForm = new FormGroup(controls);
  }


  filteredOptionalTags(): TagOption[] {
    if (!this.optionalTags || this.optionalTags.length === 0) {
      return []; // evita rendering prematuro
    }

    const search = this.tagSearch.value?.toLowerCase() ?? "";

    if (!search.trim()) return this.optionalTags;

    return this.optionalTags.filter(tag =>
      tag.nome.toLowerCase().includes(search)
    );
  }



  addTag(tag: TagOption) {
    this.selectedTags.push(tag);
    this.optionalTags = this.optionalTags.filter(t => t !== tag);
  }


  removeTag(tag: TagOption) {
    this.optionalTags.push(tag);
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }


  handleTagSelection(tag: TagOption, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
    tagControls.get(tag.nome)?.setValue(target.value);
  }


  onSubmit(): void {
    if (this.ImmobileForm.valid) {
      console.log('Dati immobile:', this.ImmobileForm.value);
      //this.router.navigate(['/create-immobile-page3']);
      this.goToPage.emit(3);
    }
    
  }


  onAnnulla(): void {
    //this.router.navigate(['/create-immobile-page1']);
    this.goToPage.emit(1);
  }


  @Output() goToPage = new EventEmitter<number>();


}
