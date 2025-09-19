import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-thumbnail',
  standalone: true,
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent {
  imageSrc: string | undefined = undefined;
  _image: Object | undefined = undefined;

  @Input()
  set image(image: any) {
    this._image = image;
    const file = image.file;
    if (!file?.type.startsWith('image/')) return;


    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result as string;
    };
    reader.readAsDataURL(file);

  }

  @Output() imageDeleted = new EventEmitter<Object>();

  deleteImage(){
    this.imageDeleted.emit(this._image);
  }

}

