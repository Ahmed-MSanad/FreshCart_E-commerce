import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {

  transform(text:string): string {
    return `onSale ${text}`;
  }

}
