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

    this.ImmobileForm = new FormGroup(controls);



    this.ImmobileForm.value.NomeImmobile = this.creaImmobileService.immobile.indirizzo?.nome; //NOME QUI È UN INDIRIZZO. DA CAMBIARE
    this.ImmobileForm.value.descrizione = this.creaImmobileService.immobile.descrizione;
    this.ImmobileForm.value.locali = this.creaImmobileService.findTag("locali")?.valore;
    this.ImmobileForm.value.bagni = this.creaImmobileService.findTag("bagni")?.valore;
    this.ImmobileForm.value.piano = this.creaImmobileService.findTag("piano")?.valore;
    this.ImmobileForm.value.superficie = this.creaImmobileService.findTag("superficie")?.valore;
    this.ImmobileForm.value.classe = this.creaImmobileService.findTag("classe")?.valore;


    this.ImmobileForm.patchValue({
      NomeImmobile: this.creaImmobileService.immobile.indirizzo?.nome,  //DA CAMBIARE NOME
      Descrizione: this.creaImmobileService.immobile.descrizione,
      locali: this.creaImmobileService.findTag("locali")?.valore ?? "",
      bagni: this.creaImmobileService.findTag("bagni")?.valore ?? "",
      piano: this.creaImmobileService.findTag("piano")?.valore ?? "",
      superficie: this.creaImmobileService.findTag("superficie")?.valore ?? "",
      classe: this.creaImmobileService.findTag("classe")?.valore ?? "",
    })

    
  
    const savedTags = this.creaImmobileService.immobile.tagDescrizione ?? [];

    savedTags.forEach(tag => {
      const opt = this.optionalTags.find(t => t.nome === tag.nome);
      if (opt) {
        this.selectedTags.push(opt);
        this.optionalTags = this.optionalTags.filter(t => t.nome !== opt.nome);

        const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;
        let validators: any[] = [];
        if (opt.tipo === 'number') validators = [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')];
        if (opt.tipo === 'textarea') validators = [Validators.required, Validators.minLength(1)];
        if (opt.tipo === 'select') validators = [Validators.required];

        const defaultValue = tag.valore;
        tagControls.addControl(opt.nome, new FormControl(tag.valore ?? defaultValue, validators));


        
      }



    });

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



  addTag(tag: TagOption, valoreSalvato?: any) {
  this.selectedTags.push(tag);
  this.optionalTags = this.optionalTags.filter(t => t !== tag);

  const tagControls = this.ImmobileForm.get('tagAggiuntivi') as FormGroup;

  let validators: any = [];
  if (tag.tipo === 'number') validators = [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')];
  if (tag.tipo === 'textarea') validators = [Validators.required, Validators.minLength(1)];
  if (tag.tipo === 'select') validators = [Validators.required];

  const defaultValue = tag.tipo === 'select' ? tag.opzioni![0] : '';

  tagControls.addControl(
    tag.nome,
    new FormControl(valoreSalvato ?? defaultValue, validators)
  );
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
      this.updateImmobile();
      //this.router.navigate(['/create-immobile-page3']);
      this.goToPage.emit(3);
    }
    
  }


  onAnnulla(): void {
    this.updateImmobile();
    //this.router.navigate(['/create-immobile-page1']);
    this.goToPage.emit(1);
  }


  @Output() goToPage = new EventEmitter<number>();

  updateImmobile(){
    //this.creaImmobileService.immobile.nome;
    this.creaImmobileService.immobile.descrizione= this.ImmobileForm.value.Descrizione;
    this.creaImmobileService.immobile.nome = this.ImmobileForm.value.NomeImmobile;
     const fixedTags = [
    { nome: "locali", valore: this.ImmobileForm.value.locali, tipo: "number" },
    { nome: "bagni", valore: this.ImmobileForm.value.bagni, tipo: "number" },
    { nome: "piano", valore: this.ImmobileForm.value.piano, tipo: "number" },
    { nome: "superficie", valore: this.ImmobileForm.value.superficie, tipo: "number" },
    { nome: "classe", valore: this.ImmobileForm.value.classe, tipo: "string" }
  ];

  fixedTags.forEach(tag => {
    let tipoTag: "string" | "number";
      if(tag.tipo == "textarea" || tag.tipo == "select")
          tipoTag = "string";
      else
          tipoTag= "number";
    const existing = this.creaImmobileService.findTag(tag.nome);
    if (existing) {
      existing.valore = tag.valore;
      existing.tipo = tipoTag;
    } else {
      this.creaImmobileService.immobile.tagDescrizione?.push({nome: tag.nome, valore: tag.valore, tipo: tipoTag});
    }
  });
    this.selectedTags.forEach(element => {
      let tipoTag: "string" | "number";
      if(element.tipo == "textarea" || element.tipo == "select")
          tipoTag = "string";
      else
          tipoTag= "number";
      const existingTag = this.creaImmobileService.findTag(element.nome);

  if (existingTag) {
    // Aggiorna il valore e il tipo se già esiste
    existingTag.valore = (this.ImmobileForm.get('tagAggiuntivi') as FormGroup).get(element.nome)?.value;
    existingTag.tipo = tipoTag;
  } else {
    // Se non esiste, lo aggiungi
    this.creaImmobileService.immobile.tagDescrizione?.push({
      nome: element.nome,
      valore: (this.ImmobileForm.get('tagAggiuntivi') as FormGroup).get(element.nome)?.value,
      tipo: tipoTag
    });
  }
      
    });
    console.log(this.creaImmobileService.immobile);
    
  }

}
