import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { CreaImmobileService } from '../../_services/crea-immobile.service';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private ilMioPisello = inject(CreaImmobileService)
  modalInstance!: Modal;
  constructor(private router: Router){}

  onAnnulla(){
    this.goToPage.emit(4);
  }

  @Output() goToPage = new EventEmitter<number>();


  openModal(): void {
    this.ilMioPisello.passaDatiImmobile();
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();

      //Ascolta quando la modale viene chiusa
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.router.navigate(['/']);
      }, { once: true }); //Solo una volta
    
    }  
  }

}
