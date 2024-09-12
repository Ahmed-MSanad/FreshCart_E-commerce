import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { ProductsComponent } from '../products/products.component';
import { CategoriesComponent } from '../categories/categories.component';
import { fadeIn, fadeInDownUp, fadeInUp } from '../../core/environments/animations';
import { AuthService } from '../../core/services/auth.service';
registerLocaleData(localeAr, 'ar');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CarouselModule, RouterLink, DatePipe, ProductsComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeIn, fadeInDownUp, fadeInUp]
})
export class HomeComponent implements OnInit, OnDestroy{

  readonly _AuthService = inject(AuthService);

  mainCustomOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  todayDate : Date = new Date();
  timeStop : any;

  ngOnInit(): void {
    this.timeStop = setInterval(()=>{
      this.todayDate = new Date();
    },1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeStop);
  }

  // showDetails(pid:string):void{
  //   this._BlankService.getSpecificProduct(pid).subscribe({
  //     next:(res) => {
  //       console.log(res.data);
  //     }
  //   });
  // }

}


