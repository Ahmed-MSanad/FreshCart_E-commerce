import { Component, inject, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/services/category.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { zoomIn } from '../../core/environments/animations';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, RouterLink, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  animations: [zoomIn]
})
export class CategoriesComponent implements OnInit, OnDestroy{
  private readonly _CategoryService = inject(CategoryService);

  @Input() isSlider : boolean = false;

  categoryList : WritableSignal<ICategory[]> = signal([]);

  categoryCustomOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true, // ==> play dynamically without clicking 
    autoplayTimeout: 2000, // ==> related with the ==> autoplay
    autoplayHoverPause: true, // ==> stop autoplay when hover
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  getCategoriesSub ! : Subscription;

  ngOnInit(): void {
    this.getCategoriesSub = this._CategoryService.getCategories().subscribe({
      next:(res) => {
        this.categoryList.set(res.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.getCategoriesSub?.unsubscribe();
  }
}
