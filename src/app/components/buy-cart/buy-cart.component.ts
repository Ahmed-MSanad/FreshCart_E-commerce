import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-buy-cart',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buy-cart.component.html',
  styleUrl: './buy-cart.component.scss'
})
export class BuyCartComponent implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  // private readonly _Router = inject(Router);

  isLoading:boolean = false;

  shippingForm : FormGroup = this._FormBuilder.group({
    details : [null, [Validators.required]],
    phone : [null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]],
    city : [null, [Validators.required]]
  });

  cart_id : string | null = "";

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) => {
        this.cart_id = params.get("cartId");
      }
    });
  }

  orderSubmit():void{
    this._OrdersService.checkOut(this.cart_id,this.shippingForm.value).subscribe({
      next:(res) => {
        console.log(res);
        if(res.status === "success"){
          // location.href = res.session.url;
          // location.replace(res.session.url);
          window.open(res.session.url,"_self");
        }
      },
    });
  }
}
