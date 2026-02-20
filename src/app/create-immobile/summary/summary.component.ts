import { Component, inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { CreaImmobileService } from '../../_services/crea-immobile.service';
import { CommonModule } from '@angular/common';
import { getSuperficie } from '../../../../data';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  imports: [CommonModule]
})
export class SummaryComponent implements OnDestroy {

  private creaImmobileService = inject(CreaImmobileService);
  private router = inject(Router);

  @Output() goToPage = new EventEmitter<number>();

  immobile = this.creaImmobileService.immobile;
  riepilogoTags = this.creaImmobileService.getRiepilogoTags();
    superficie: any;


  modalInstance?: Modal;
  submitSub?: Subscription;

  isSubmitting = false;
  error?: string;

  ngOnInit() {
    this.superficie= getSuperficie(this.immobile);
  }

  onAnnulla() {
    this.goToPage.emit(4);
  }

  conferma() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.error = undefined;

    this.submitSub = this.creaImmobileService.passaDatiImmobile()
      .subscribe({
        next: (id) => {
          // upload immagini
          
          this.creaImmobileService['immobiliService']
            .caricaFoto(this.immobile.immagini, Number(id));

          this.openModal();
          this.isSubmitting = false;
        },
        error: () => {
          this.error = 'Errore durante la creazione dell’immobile';
          this.isSubmitting = false;
        }
      });
  }

  openModal() {
    const modalElement = document.getElementById('successModal');
    if (!modalElement) return;

    this.modalInstance = new Modal(modalElement);
    this.modalInstance.show();

    modalElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this.creaImmobileService.reset?.();
        this.router.navigate(['/']);
      },
      { once: true }
    );
  }

  ngOnDestroy() {
    this.submitSub?.unsubscribe();
    this.modalInstance?.dispose();
  }
}
