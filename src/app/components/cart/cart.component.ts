import { Component, computed, inject, OnDestroy, OnInit, Renderer2, Signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../core/interfaces/icart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { animateBtn, slideRight } from '../../core/environments/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [slideRight]
})
export class CartComponent implements OnInit, OnDestroy{

  readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _animationBuilder = inject(AnimationBuilder);
  private readonly _renderer = inject(Renderer2);

  isCartEmpty : Signal<boolean> = computed(() => this._CartService.cartCount() === 0);


  // iconHtml: string = '<i class="fa-solid fa-triangle-exclamation"></i>';

  cartListSub!: Subscription;

  ngOnInit(): void {
    this.cartListSub = this._CartService.getCartList();
  }

  ngOnDestroy(): void {
    this.cartListSub.unsubscribe();
  }

  removeProduct(willRemove:boolean,productId:string){
    if(willRemove){
      this._CartService.removeCartItem(productId).subscribe({
        next:(res) => {
          console.log(res);
          this._CartService.cart.set(res.data);
          this._CartService.cartCount.set(res.numOfCartItems);
          Swal.fire({
            title: "Deleted!",
            text: "The Product has been deleted.",
            icon: "success"
          });
        }
      })
    }
  }

  changeProductCount(productId:string,count:number):void{
    if(count > 0){
      this._CartService.updateProductCount(productId,count).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success("Success","FreshCart",{
            progressBar: true,
          });
          this._CartService.cart.set(res.data);
          // this._CartService.cartCount.next(res.numOfCartItems);
        }
      });
    }
  }

  clearAllCart(eventInfo:MouseEvent):void{
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
        this._CartService.clearCart().subscribe({
          next:(res)=>{
            console.log(res);
            if(res.message == "success"){
              const button = eventInfo.target as HTMLElement;
              animateBtn(button,this._animationBuilder,this._renderer);
              Swal.fire({
                title: "Deleted!",
                text: "Your cart has been deleted.",
                icon: "success"
              });
              this._CartService.cart.set({} as ICart);
              this._CartService.cartCount.set(0);
            }
          }
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


}
