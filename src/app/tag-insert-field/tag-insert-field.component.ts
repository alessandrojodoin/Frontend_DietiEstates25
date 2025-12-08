import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-insert-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag-insert-field.component.html',
  styleUrl: './tag-insert-field.component.scss'
})
export class TagInsertFieldComponent {
   @Input() tag: {name: string, type: "Int" | "Float" | "Boolean" | "String"} | undefined = undefined;

   @Input() formControlName: string | number = "";
   @Input() set formControlFromParent(formControl: AbstractControl){
    this._formControl = formControl as FormControl;
   }

   _formControl: FormControl | undefined = undefined;

}
