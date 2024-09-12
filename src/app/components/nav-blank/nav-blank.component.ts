import { WishlistService } from './../../core/services/wishlist.service';
import { Component, computed, ElementRef, HostListener, inject, OnDestroy, OnInit, QueryList, Renderer2, Signal, signal, ViewChild, viewChild, ViewChildren, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxTranslateService } from '../../core/services/ngx-translate.service';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
  animations: [
    trigger('openClose',[
      state('closed',style({maxHeight : '0',})),
      state('open',style({maxHeight : '100vh',})),
      transition('closed => open',[animate('0.5s ease-in-out')]),
      transition('open => closed',[animate('0.2s ease-in-out')])
    ]),
  ]
})
export class NavBlankComponent implements OnInit , OnDestroy{
  readonly _AuthService = inject(AuthService);
  // signOut():void{
  //   this._AuthService.signOut();
  // }
  private readonly _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);
  private readonly _NgxTranslateService = inject(NgxTranslateService);
  readonly _TranslateService = inject(TranslateService);
  private readonly _Renderer2 = inject(Renderer2);

  constructor(private el:ElementRef){} // el => <app-nav-blink></app-nav-blink>

  menuState : 'open' | 'closed' = 'closed';
  dropDownState : 'open' | 'closed' = 'closed';
  socialState : 'open' | 'closed' = 'closed';

  cartCount : Signal<number> = computed(() => this._CartService.cartCount());
  wishListCount : Signal<number> = computed(() => this._WishlistService.wishCount());

  cartListSub ! : Subscription;
  wishListSub ! : Subscription;

  ngOnInit(): void {
    this._AuthService.saveUserData()
    this.cartListSub = this._CartService.getCartList();
    this.wishListSub = this._WishlistService.getWishList();
  }

  ngOnDestroy(): void {
    this.cartListSub?.unsubscribe();
    this.wishListSub?.unsubscribe();
  }

  changeLang(lang:string):void{
    this._NgxTranslateService.changeLang(lang);
  }

  @ViewChild('navMenu') navMenu! : ElementRef;
  @ViewChild('openBtn') openBtn! : ElementRef;
  @ViewChild('closeBtn') closeBtn! : ElementRef;
  // private documentClickListener: Function | null = null;
  onClickMenu():void{
    this.navMenu.nativeElement.classList.toggle("flex");
    this.navMenu.nativeElement.classList.toggle("hidden");
    this.openBtn.nativeElement.classList.toggle("hidden");
    this.closeBtn.nativeElement.classList.toggle("hidden");

    // Remove previous listener if it exists
    // if (this.documentClickListener) {
    //   this.documentClickListener();
    // }

    // this.documentClickListener = this._Renderer2.listen('document','click',(eventInfo : MouseEvent)=>{
    //   if(!this.el.nativeElement.contains(eventInfo.target)){
    //     console.log("ahahha");
    //     this.navMenu.nativeElement.classList.toggle("flex");
    //     this.navMenu.nativeElement.classList.toggle("hidden");
    //     this.openBtn.nativeElement.classList.toggle("hidden");
    //     this.closeBtn.nativeElement.classList.toggle("hidden");

    //     // Remove the listener after it's fired once
    //     if (this.documentClickListener) {
    //       this.documentClickListener();
    //       this.documentClickListener = null;
    //     }
    //   }
    // })
  }


  @ViewChild('darkModeBtn') darkModeBtn ! : ElementRef;
  onDarkMode():void{
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      this._Renderer2.removeClass(html, 'dark');
    } else {
      this._Renderer2.addClass(html, 'dark');
    }
    this.darkModeBtn.nativeElement.classList.toggle("fa-sun");
    this.darkModeBtn.nativeElement.classList.toggle("fa-moon");
  }
}