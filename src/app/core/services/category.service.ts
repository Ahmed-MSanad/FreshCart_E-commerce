import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient : HttpClient) { }

  getCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(categoryId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}`);
  }
}
