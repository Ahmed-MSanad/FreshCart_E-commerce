import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  private readonly _TranslateService = inject(TranslateService);

  transform(items:any[], searchTerm:string, translations:any): any[] {
    let lang:string | null = localStorage.getItem("lang");
    let filteredProducts : any[] = [];

    if(lang === 'ar'){
      filteredProducts = items?.filter(item => {
        if(translations)
          return `${translations[item.title.split(" ",2).join(' ')]}`?.includes(searchTerm);
        else
          return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    else{
      filteredProducts = items?.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filteredProducts;
  }

}
