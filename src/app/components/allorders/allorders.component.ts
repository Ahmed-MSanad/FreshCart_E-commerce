import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IOrders } from '../../core/interfaces/iorders';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);

  userId : string = "";
  allOrders! : IOrders;

  ngOnInit(): void {
    this._AuthService.saveUserData();
    console.log(this._AuthService.userData);
    this.userId = this._AuthService.userData.id;
    this._OrdersService.getUserOrders(this.userId).subscribe({
      next:(res) => {
        this.allOrders = res[0];
        console.log(res);
      },
    });
  }
}
