import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { RouterLink } from '@angular/router';
import { slideRight } from '../../core/environments/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  animations: [slideRight]
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService = inject(BrandsService);

  brandsList : WritableSignal<IBrand[]> = signal([]);

  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next:(res) => {
        this.brandsList.set(res.data);
        // console.log(this.brandsList());
      }
    });
  }
}
