import { Component, computed, inject, OnDestroy, OnInit, Renderer2, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { IProduct } from '../../core/interfaces/iproduct';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { animateBtn, backInDown } from '../../core/environments/animations';
import { AnimationBuilder } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
  animations:[backInDown]
})
export class WishListComponent implements OnInit , OnDestroy{
  readonly _WishlistService = inject(WishlistService);
  readonly _CartService = inject(CartService);
  private readonly _animationBuilder = inject(AnimationBuilder);
  private readonly _renderer = inject(Renderer2);

  wishListProducts : Signal<IProduct[]> = computed(() => this._WishlistService.wishListProducts());

  wishListSub ! : Subscription;

  ngOnInit(): void {
    this.wishListSub = this._WishlistService.getWishList();
  }

  removeFromWishList(productId:string) : void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if(result.isConfirmed){
        this._WishlistService.removeFromWishList(productId).subscribe({
          next:(res)=>{
            if(res.status === "success"){
              // console.log(res);
              this._WishlistService.getWishList();
              Swal.fire({
                title: "Deleted!",
                text: res.message,
                icon: "success"
              });
            }
          },
        });
      }
    }).catch(error => {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "#f00",
        confirmButtonText: "OK"
      });
    })
  }

  ngOnDestroy(): void {
    this.wishListSub.unsubscribe();
  }

  btnShakeState: string = 'default';

  addProductToCart(id:string, eventInfo:MouseEvent):void{
    this._CartService.addToCart(id);

    // Get the button element
    const button = eventInfo.target as HTMLElement;

    animateBtn(button,this._animationBuilder,this._renderer);
  }
}
