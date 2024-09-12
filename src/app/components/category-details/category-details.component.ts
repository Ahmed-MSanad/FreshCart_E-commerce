import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit , OnDestroy{

  private readonly _CategoryService = inject(CategoryService);
  categoryServiceSub ! : Subscription;

  private readonly _ActivatedRoute = inject(ActivatedRoute);

  theCategory : WritableSignal<ICategory> = signal({} as ICategory);

  ngOnInit(): void {
    let categoryId : string|null = "";
    this._ActivatedRoute.paramMap.subscribe({
      next:(paramList) => {
        categoryId = paramList.get("categoryId");
      }
    });

      this.categoryServiceSub = this._CategoryService.getSpecificCategory(categoryId).subscribe({
        next:(res) => {
          this.theCategory.set(res.data);
          console.log(this.theCategory());
        }
      });
  }

  ngOnDestroy(): void {
    this.categoryServiceSub?.unsubscribe();
  }
}
