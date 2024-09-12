import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'initiateWishList',
  standalone: true
})
export class InitiateWishListPipe implements PipeTransform {

  transform(productList:IProduct[],wishListIDs:string[]): IProduct[] {
    let newProductList : IProduct[] = [];
    if(productList && wishListIDs){
      for(let product of productList){
        let wishFlag = false;
        for(let wishProductID of wishListIDs){
          if(wishProductID === product._id){wishFlag = true;break;}
        }
        if(wishFlag){product.wishProduct = true;}
        else{product.wishProduct = false;}
        newProductList.push(product);
      }
    }
    return newProductList;
  }

}
