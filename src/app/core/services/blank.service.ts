import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlankService {

  private readonly _HttpClient = inject(HttpClient);
  constructor() { }

  getProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(pId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${pId}`);
  }

  // filterProducts(productList:IProduct[],searchTerm:string):Observable<IProduct[]>{
  //   return new Observable(()=>{
  //     productList.filter((product) => product.subcategory[0].name.toLowerCase().includes(searchTerm.toLowerCase()));
  //   });
  // }
}
