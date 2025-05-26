import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
})
export class ImagePathPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return 'img/default.png';
    }
    return 'img/' + value;
  }
}
