import { Component, computed, effect, inject, Input, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { BlankService } from '../../core/services/blank.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../../core/pipes/filter-products.pipe';
import { InitiateWishListPipe } from '../../core/pipes/initiate-wish-list.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe, NgClass, NgStyle, SlicePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SplitTextPipe } from '../../core/pipes/split-text.pipe';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxTranslateService } from '../../core/services/ngx-translate.service';
import { backInDown, fadeIn, fadeInDown, slideRight } from '../../core/environments/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, FilterProductsPipe, InitiateWishListPipe, NgClass, RouterLink, UpperCasePipe, SlicePipe, SplitTextPipe, CurrencyPipe, SalePipe, NgStyle, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  animations:[fadeIn, slideRight, fadeInDown, backInDown]
})
export class ProductsComponent implements OnInit , OnDestroy{
  private readonly _BlankService = inject(BlankService);
  readonly _WishlistService = inject(WishlistService);
  readonly _CartService = inject(CartService);
  readonly _TranslateService = inject(TranslateService);
  readonly _NgxTranslateService = inject(NgxTranslateService);

  @Input() title:string = "All Products";
  @Input() numberOfDisplayedProducts:number = 40;

  productList : WritableSignal<IProduct[]> = signal([]);
  searchTerm : WritableSignal<string> = signal("");
  translations : WritableSignal<any> = signal({});

  getProductsSub ! : Subscription;

  lang : Signal<string|null> = computed(() => this._NgxTranslateService.x());

  constructor(){
    effect(() => {
      if(this.lang() === "ar"){
        this._TranslateService.getTranslation(this.lang()!).subscribe({
          next:(res) => {
            this.translations.set(res.product);
            // console.log(this.translations());
          }
        });
      }
    });
  }
  
  ngOnInit(): void {
    this.getProductsSub = this._BlankService.getProducts().subscribe({
      next:(res) => {
        // console.log(res.data);
        this.productList.set(res.data);
        // this.numberOfDisplayedProducts = this.productList().length;
      }
    });
  }

 

  ngOnDestroy(): void {
    this.getProductsSub?.unsubscribe();
  }
}
