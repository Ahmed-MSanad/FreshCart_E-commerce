import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitText',
  standalone: true
})
export class SplitTextPipe implements PipeTransform {

  transform(text:string, pieces:number): string {
    return text.split(" ",pieces).join(" ");
  }

}
