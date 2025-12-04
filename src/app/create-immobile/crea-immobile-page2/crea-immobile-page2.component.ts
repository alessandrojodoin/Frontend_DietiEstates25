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
      superficie: new FormControl('', Validators.required),
      classe: new FormControl(''),
      tagAggiuntivi: new FormGroup({})
    };


    // Genera dinamicamente i tag selezionabili
    /*
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
*/
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

    const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;

    let validators:any = [];
    if (tag.tipo === 'number') validators = [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')];
    if (tag.tipo === 'textarea') validators = [Validators.required, Validators.minLength(1)];
    if (tag.tipo === 'select') validators = [Validators.required];

    const defaultValue = tag.tipo === 'select' ? tag.opzioni![0] : '';

    tagControls.addControl(tag.nome, new FormControl(defaultValue, validators));

    console.log(this.ImmobileForm);
  }


  removeTag(tag: TagOption) {
    const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
    tagControls.removeControl(tag.nome);

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

  updateImmobile(){
    //this.creaImmobileService.immobile.nome;
    this.creaImmobileService.immobile.descrizione= this.ImmobileForm.value.descrizione;
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "locali", valore: this.ImmobileForm.value.locali, tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "bagni", valore: this.ImmobileForm.value.bagni, tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "piano", valore: this.ImmobileForm.value.piano, tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "superficie", valore: this.ImmobileForm.value.superficie, tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "classe", valore: this.ImmobileForm.value.classe, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "aria condizionata", valore: this.ImmobileForm.value["aria condizionata"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "camino", valore: this.ImmobileForm.value.camino, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "wifi", valore: this.ImmobileForm.value.wifi, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "impianto d’allarme", valore: this.ImmobileForm.value["impianto d’allarme"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "videosorveglianza", valore: this.ImmobileForm.value.videosorveglianza, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "numero di balconi", valore: this.ImmobileForm.value["numero di balconi"], tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "numero di terrazzi", valore: this.ImmobileForm.value["numero di terrazzi"], tipo: "number"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "giardino", valore: this.ImmobileForm.value.giardino, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "veranda / portico", valore: this.ImmobileForm.value["veranda / portico"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "posto auto", valore: this.ImmobileForm.value["posto auto"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "garage", valore: this.ImmobileForm.value.garage, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "collocazione", valore: this.ImmobileForm.value.collocazione, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "arredata", valore: this.ImmobileForm.value.arredata, tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "cucina a vista", valore: this.ImmobileForm.value["cucina a vista"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "vicinanza a mezzi pubblici", valore: this.ImmobileForm.value["vicinanza a mezzi pubblici"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "ascensore", valore: this.ImmobileForm.value["ascensore"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "accesso disabili", valore: this.ImmobileForm.value["accesso disabili"], tipo: "string"});
    this.creaImmobileService.immobile.tagDescrizione?.push({nome: "animali ammessi", valore: this.ImmobileForm.value["animali ammessi"], tipo: "string"});

    
  }

}
