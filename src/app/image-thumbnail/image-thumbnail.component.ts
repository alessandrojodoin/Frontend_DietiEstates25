import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-thumbnail',
  standalone: true,
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent {
  imageSrc: string | null = null;

  @Input()
  set imageSource(file: File) {
    if (!file?.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}