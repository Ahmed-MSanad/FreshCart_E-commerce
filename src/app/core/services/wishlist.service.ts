import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { IProduct } from '../interfaces/iproduct';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  wishCount : WritableSignal<number> = signal(0);
  wishListIDs : WritableSignal<string[]> = signal([]); // as the backend returns a list of string ids when remove or add to wish list
  wishListProducts : WritableSignal<IProduct[]> = signal([]);

  addToWishList(productId:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      productId : productId
    }
    );
  }

  removeFromWishList(productId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`);
  }

  getProductsFromWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }


  getWishList():Subscription{
    return this.getProductsFromWishList().subscribe({
      next:(res) => {
        console.log(res);
        if(res.status === "success"){
          let ids:string[] = [];
          for(let product of res.data){
            ids.push(product._id);
          }
          this.wishListIDs.set(ids);
          this.wishCount.set(res.count);
          this.wishListProducts.set(res.data);
        }
      },
      error:(err) => {
        console.log(err);
      }
    });
  }


  addAndRemoveToWishlist(eventInfo:MouseEvent,productId:string):void{
    let heartIcon = eventInfo.target as HTMLElement;
    if(heartIcon.classList.contains("fa-regular")){ // add 
      heartIcon.classList.toggle("fa-solid");
      heartIcon.classList.toggle("fa-regular");
      heartIcon.classList.toggle("hover:text-rose-700");
      this.addToWishList(productId).subscribe({
        next:(res) => {
          // console.log(res);
          if(res.status === "success"){
            this.wishCount.update((previous) => previous + 1);
            this.wishListIDs.set(res.data);
            // Swal.fire({
            //   title: res.message,
            //   position: "center",
            //   iconHtml: '<i class="fa-solid fa-heart"></i>',
            //   iconColor: "#f00",
            //   showConfirmButton: false,
            //   timer: 1200,
            //   timerProgressBar: true,
            //   width: "300px"
            // });
            Swal.fire({
              title: res.message,
              width: "300px",
              color: "#716add",
              timer: 1200,
              timerProgressBar: true,
              showConfirmButton: false,
              backdrop: `
                rgba(0,0,123,0.4)
                url("./assets/images/200-ezgif.com-webp-to-gif-converter.gif")
                center top
                no-repeat
              `,
            });
          }
        }
      });
    }
    else{ // remove
      heartIcon.classList.toggle("fa-solid");
      heartIcon.classList.toggle("fa-regular");
      heartIcon.classList.toggle("hover:text-rose-700");
      this.removeFromWishList(productId).subscribe({
        next:(res) => {
          // console.log(res);
          if(res.status === "success"){
            this.wishCount.update((previous) => previous - 1);
            this.wishListIDs.set(res.data);
            Swal.fire({
              title: res.message,
              position: "center",
              iconHtml: '<i class="fa-solid fa-heart-crack"></i>',
              iconColor: "#f00",
              showConfirmButton: false,
              timer: 1200,
              timerProgressBar: true,
              width: "300px"
            });
          }
        },
      });
    }
  }
}
