import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit , OnDestroy{

  private readonly _BrandsService = inject(BrandsService);
  brandServiceSub ! : Subscription;

  private readonly _ActivatedRoute = inject(ActivatedRoute);

  theBrand : WritableSignal<IBrand> = signal({} as IBrand);

  ngOnInit(): void {
    let brandId : string|null = "";
    this._ActivatedRoute.paramMap.subscribe({
      next:(paramList) => {
        brandId = paramList.get("brandId");
      }
    });

      this.brandServiceSub = this._BrandsService.getSpecificBrand(brandId).subscribe({
        next:(res) => {
          this.theBrand.set(res.data);
          // console.log(this.theBrand());
        }
      });
  }

  ngOnDestroy(): void {
    this.brandServiceSub?.unsubscribe();
  }
}