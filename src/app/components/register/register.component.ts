import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _AuthService = inject(AuthService);
  // constructor(private _AuthService:AuthService){}
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  registerSubscribe! : Subscription;

  // registerForm : FormGroup = new FormGroup({ 
  //   name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email : new FormControl(null, [Validators.required, Validators.email]),
  //   password : new FormControl(null, [Validators.required , Validators.pattern(/^.{6,}$/)]),
  //   rePassword : new FormControl(null),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // }, this.confirmPassword);


  // ==> instead of FormGroup and FormControl ==> use FormBuilder ==>
  registerForm : FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required , Validators.pattern(/^.{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: [this.confirmPassword] });


  // custom validation function ==> is given to the whole FormGroup.
  confirmPassword( g:AbstractControl ){
    if(g.get("password")?.value === g.get("rePassword")?.value){
      return null; // ==> which means no errors
    }
    else{
      return {mismatch:true};
    }
  }

  isAccountExistError:string = "";
  isLoading : boolean = false;
  messageSuccess : boolean = false;

  registerFormSubmit():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      this.registerSubscribe = this._AuthService.sendUserRegister(this.registerForm.value).subscribe(
        {
          next:(res) => {
            console.log(res);
            this.isAccountExistError = ""; // in case there is an error in register then register again then the old error must be vanished.
            this.isLoading = false;
            if(res.message == "success"){
              this.messageSuccess = true;
              setTimeout(() => {
                this._router.navigate(['/login']);
              }, 2000);
            }
          },
          error:(err:HttpErrorResponse) => {
            console.log(err);
            this.isAccountExistError = err.error.message;
            this.isLoading = false;
          }
        }
      );
    }
    else{
      this.registerForm.markAllAsTouched();
      this.registerForm.setErrors({mismatch:true});
    }
  }

  ngOnDestroy(): void {
    this.registerSubscribe?.unsubscribe();
  }
}