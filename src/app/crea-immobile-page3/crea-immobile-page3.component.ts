import { Component } from '@angular/core';
import { ImageThumbnailComponent } from "../image-thumbnail/image-thumbnail.component";

@Component({
  selector: 'app-crea-immobile-page3',
  standalone: true,
  imports: [ImageThumbnailComponent],
  templateUrl: './crea-immobile-page3.component.html',
  styleUrl: './crea-immobile-page3.component.scss'
})
export class CreaImmobilePage3Component {

 /* handleFiles(files: any) {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const img = document.createElement("app-image-thumbnail") as any;
      document.body.appendChild(img); 

    }
  }*/
  files: any[] = [];

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
          this.files = this.files.concat(Array.from(caricaFile.files));
        }
      },
      false,
    );



  }

  deleteImage(file: any){

    const fileIndex = this.files.indexOf(file);
    if(fileIndex > -1){
      this.files.splice(fileIndex, 1);
    }
    else{
      console.log("Immagine non trovata");
    }
  }

}
