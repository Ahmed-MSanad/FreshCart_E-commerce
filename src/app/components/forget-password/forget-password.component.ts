import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  isLoading : boolean = false;
  errorMessage : string = "";
  successMessage : string = "";
  formNumber : number = 1;

  
  
  forgetPasswordForm : FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  
  forgetPassword():void{
    if(this.forgetPasswordForm.valid){
      this.successMessage = "";
      this.errorMessage = "";
      this.resetPasswordForm.get("email")?.patchValue(
        this.forgetPasswordForm.get("email")?.value
      );
      this.isLoading = true;
      this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next : (res) => {
          console.log(res);
          this.isLoading = false;
          this.successMessage = res.message;
          if(res.statusMsg == "success"){
            this.formNumber = 2;
            this.errorMessage = "";
          }
        },
        error:(err:HttpErrorResponse) => {
          console.log(err);
          this.successMessage = "";
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      });
    }
    else{
      this.forgetPasswordForm.markAllAsTouched();
    }
  }



  verifyPasswordForm : FormGroup = this._FormBuilder.group({
    resetCode : [null, [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  verifyPassword():void{
    this.successMessage = "";
    this.errorMessage = "";
    if(this.verifyPasswordForm.valid){
      this.isLoading = true;
      this._AuthService.verifyResetCode(this.verifyPasswordForm.value).subscribe({
        next : (res) => {
          console.log(res);
          this.isLoading = false;
          if(res.status == "Success"){
            this.formNumber = 3;
          }
        },
        error:(err:HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        }
      });
    }
    else{
      this.verifyPasswordForm.markAllAsTouched();
    }
  }




  resetPasswordForm:FormGroup = this._FormBuilder.group({
    email : [null, [Validators.required ,Validators.email]],
    newPassword : [null, [Validators.required ,Validators.pattern(/^.{6,}$/)]]
  });

  resetPassword():void{
    if(this.resetPasswordForm.valid){
      this.isLoading = true;
      this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
        next : (res) => {
          console.log(res);
          localStorage.setItem("userToken", res.token);
          this._AuthService.saveUserData();
          this.isLoading = false;
          this._Router.navigate(["/home"]);
        },
        error:(err:HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
        }
      });
    }
    else{
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}

