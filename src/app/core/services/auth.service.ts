import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData !: any;
  private readonly _Router = inject(Router);
  private readonly _HttpClient = inject(HttpClient);
  // constructor(private _HttpClient:HttpClient) { }


  sendUserRegister(userData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  sendUserLogin(userData:object):Observable<any>{ // variable of type object ==> can't access what is inside ==> so we do it of type interface or any if we are forced
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,userData);
  }

  saveUserData():void{
    if(localStorage.getItem("userToken") !== null){
      this.userData = jwtDecode(localStorage.getItem("userToken")!);
    }
  }

  signOut():void{
    this._Router.navigate(["/login"]);
    localStorage.removeItem("userToken");
    this.userData = null;
    // sometimes in some APIs ==> to remove the token ==> we must call the API concerned with this to remove the token stored at the backend
  }

  forgetPassword(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }

  verifyResetCode(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }

  resetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
  }
  // put ==> does update 
}


