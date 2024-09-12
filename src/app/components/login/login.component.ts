import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginSubscribe! : Subscription;

  loginForm : FormGroup = this._FormBuilder.group({
    email : [null, [Validators.required, Validators.email]],
    password : [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
  });

  isLoading : boolean = false;
  loginErrorMessage : string = "";
  isLoginSuccess : boolean = false;

  submitLogin():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.loginSubscribe = this._AuthService.sendUserLogin(this.loginForm.value).subscribe({
        next:(res) => {
          this.isLoading = false;
          if(res.message == "success"){
            this.loginErrorMessage = "";
            this.isLoginSuccess = true;
            setTimeout(() => {
              localStorage.setItem("userToken", res.token);
              this._AuthService.saveUserData(); // ==> decode the user token, and save in global location(auth.service.ts)
              console.log(this._AuthService.userData);
              this._Router.navigate(["/home"]);
            }, 2000);
          }
        },
        error:(err:HttpErrorResponse) => {
          this.loginErrorMessage = err.error.message;
          this.isLoading = false;
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(){
    this.loginSubscribe?.unsubscribe();
  }
}
