import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ICart } from '../interfaces/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _ToastrService = inject(ToastrService);
  
  cartCount : WritableSignal<number> = signal(0);
  cart : WritableSignal<ICart> = signal({} as ICart);


  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      { // body
        "productId": productId
      }
    );
  }

  addToCart(productId:string):void{
    this.addProductToCart(productId).subscribe({
      next:(res) => {
        console.log(res);
        this._ToastrService.success(res.message,"About Product:");
        this.cartCount.set(res.numOfCartItems);
      },
      error:(err) => {
        console.log(err);
      }
    });
  }


  getUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  getCartList():Subscription{
    return this.getUserCart().subscribe({
      next:(res) =>{
        console.log(res.data);
        this.cartCount.set(res.numOfCartItems);
        this.cart.set(res.data);
      },
      error:(err) =>{
        console.log(err);
      }
    });
  }


  removeCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${productId}`);
  }

  updateProductCount(productId:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": count
      }
    );
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }

}
