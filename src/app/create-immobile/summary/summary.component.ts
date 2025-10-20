import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from "../success-popup/success-popup.component";
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SuccessPopupComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  modalInstance!: Modal;
  constructor(private router: Router){}

  onAnnulla(){
      this.router.navigate(['/create-immobile-page4']); /*potrebbe tornare alle home ma magari si è semplicemente accorto 
       da appunto il riepilogo, che ha sbagliato a digitare qualcosa, perciò meglio tornare alla pag precedente*/
  }


  openModal(): void {
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
