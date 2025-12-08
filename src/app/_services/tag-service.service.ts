import { Injectable } from '@angular/core';

  
export type Tag = {
  name: string,
  type: "Int" | "Float" | "Boolean" | "String"
}



@Injectable({
  providedIn: 'root'
})
export class TagServiceService {

  constructor(){};
  
  TagList = {
    BalconeTag: this.newTag("Numero Balconi", "Int"),
    Superficie: this.newTag("Superficie (m2)", "Float"),
    AriaCondizionata: this.newTag("Aria Condizionata", "Boolean"),
    ClasseEnergetica: this.newTag("Classe Energetica", "String")
    
  }

  newTag(name: string, type: "Int" | "Float" | "Boolean" | "String"){
    return {name: name, type: type};
  }

}
