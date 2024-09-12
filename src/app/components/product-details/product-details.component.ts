import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { BlankService } from '../../core/services/blank.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, NgClass, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{
  private readonly _BlankService = inject(BlankService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  readonly _WishlistService = inject(WishlistService)

  productUnsubscribe! : Subscription;

  theProduct : IProduct | null = null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['prev', 'next'],
    items: 1,
    nav: true,
    rtl: true,
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this._ActivatedRoute.paramMap.subscribe({
        next:(data_parameters)=>{
          let id = data_parameters.get("productId");
          this.productUnsubscribe = this._BlankService.getSpecificProduct(id!).subscribe({
            next:(res) => {
              this.theProduct = res.data;
              console.log(this._WishlistService.wishListIDs());
              this.theProduct!.wishProduct = this._WishlistService.wishListIDs().some((id) => id === this.theProduct?._id);
            },
          });
        }
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    this.productUnsubscribe?.unsubscribe();
  }
}

