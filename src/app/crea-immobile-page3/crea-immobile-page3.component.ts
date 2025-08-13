import { Component } from '@angular/core';

@Component({
  selector: 'app-crea-immobile-page3',
  standalone: true,
  imports: [],
  templateUrl: './crea-immobile-page3.component.html',
  styleUrl: './crea-immobile-page3.component.scss'
})
export class CreaImmobilePage3Component {

  handleFiles(files: any) {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const img = document.createElement("img") as any;
      img.classList.add("obj");
      img.file = file;
      document.body.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target != null)
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit(){

    const caricaFile = document.getElementById("caricaFile");
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


  }

}
