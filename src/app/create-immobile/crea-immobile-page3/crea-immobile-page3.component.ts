import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ImageThumbnailComponent } from "../image-thumbnail/image-thumbnail.component";
import { Router } from '@angular/router';
import { CreaImmobileService } from '../../_services/crea-immobile.service';

@Component({
  selector: 'app-crea-immobile-page3',
  standalone: true,
  imports: [ImageThumbnailComponent],
  templateUrl: './crea-immobile-page3.component.html',
  styleUrl: './crea-immobile-page3.component.scss'
})
export class CreaImmobilePage3Component {

  creaImmobileService = inject(CreaImmobileService);
 /* handleFiles(files: any) {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const img = document.createElement("app-image-thumbnail") as any;
      document.body.appendChild(img); 

    }
  }*/
  
  images: {file: any}[] = [];

  ngOnInit(){

    const caricaFile: any = document.getElementById("caricaFile");
    const caricaFotoButton = document.getElementById("caricaFotoButton");
    if(caricaFotoButton != null)
      caricaFotoButton.addEventListener(
       "click",
      (e) => {
        if (caricaFile) {
          caricaFile.click();

        }
      },
      false,
    );

    if(caricaFile != null)
    caricaFile.addEventListener(
       "change",
      (e: any) => {
        if (caricaFile) {
          Array.from(caricaFile.files).forEach((file) => {
            this.images.push({file: file});
            e.target.value = null

          })
        }
      },
      false,
    );

    this.images = this.creaImmobileService.immobile.immagini;

  }

  deleteImage(image: any){

    const fileIndex = this.images.indexOf(image);
    if(fileIndex > -1){
      this.images.splice(fileIndex, 1);
    }
    else{
      console.log("Immagine non trovata");
    }
  }


  constructor(private router: Router){}
  onSubmit(){
    //this.router.navigate(['/create-immobile-page4']);
    this.updateImmobile();
    this.goToPage.emit(4);
  }


  onAnnulla(){
        //this.router.navigate(['/create-immobile-page2']);
        this.updateImmobile();
        this.goToPage.emit(2);
  }


    @Output() goToPage = new EventEmitter<number>();


  updateImmobile(){
      this.creaImmobileService.immobile.immagini = this.images;
  }



  }
