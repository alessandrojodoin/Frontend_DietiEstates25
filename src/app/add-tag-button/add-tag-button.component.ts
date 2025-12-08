import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../_services/tag-service.service';

@Component({
  selector: 'app-add-tag-button',
  standalone: true,
  imports: [],
  templateUrl: './add-tag-button.component.html',
  styleUrl: './add-tag-button.component.scss'
})
export class AddTagButtonComponent {
  @Input() tag: {name: string, type: "Int" | "Float" | "Boolean" | "String"} | undefined = undefined;

  @Output() addTagButtonClicked = new EventEmitter<Tag>();
  
  addTag(){
    this.addTagButtonClicked.emit(this.tag);
  }
}
