import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NgxTranslateService {

  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null,null);
  defaultLang:string = "en";

  x : WritableSignal<string> = signal(this.defaultLang);

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      
      this._TranslateService.setDefaultLang(this.defaultLang);
  
      this.setLang();
    }
  }

  setLang(): void{
    // 1- Handling Words 🙂
    let savedLang = localStorage.getItem("lang")!;
    if(savedLang){
      this.defaultLang = savedLang;
    }
    this._TranslateService.use(this.defaultLang); // go to HttpLoaderFactory function to load the translation file in i18n folder ==> for ex: "en.json", "ar.json" ==> avoid the "null.json" using the above if to check the return of the local storage

    // 2- Handling Language Direction 🙃
    if(this.defaultLang === "en"){ // ltr
      this._Renderer2.setAttribute(document.documentElement,'dir','ltr');
      this._Renderer2.setAttribute(document.documentElement,'lang','en');
    }
    else if(this.defaultLang === "ar"){ // rtl
      this._Renderer2.setAttribute(document.documentElement,'dir','rtl');
      this._Renderer2.setAttribute(document.documentElement,'lang','ar');
    }

    this.x.set(this.defaultLang);
    console.log(this.x());
  }

  changeLang(newLang:string):void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.defaultLang = newLang;
      localStorage.setItem("lang",this.defaultLang);
      this.setLang();
    }
  }
}
