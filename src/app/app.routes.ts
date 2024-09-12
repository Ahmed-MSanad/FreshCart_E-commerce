import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {path:'', loadComponent:() => import("./layouts/auth-layout/auth-layout.component").then((c) => c.AuthLayoutComponent), canActivate:[loginGuard] ,children:[
        {path:"",redirectTo:'register',pathMatch:'full'},
        {path:'register', loadComponent:() => import('./components/register/register.component').then((c)=>c.RegisterComponent)},
        {path:'login', loadComponent:() => import('./components/login/login.component').then((c)=>c.LoginComponent)},
        {path:'forgetPassword', loadComponent:() => import('./components/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent)}
    ]},
    {path:'', loadComponent:() => import("./layouts/blank-layout/blank-layout.component").then((c) => c.BlankLayoutComponent), canActivate:[authGuard],children:[
        {path:"",redirectTo:'home',pathMatch:'full'},   
        {path:"home",loadComponent:() => import('./components/home/home.component').then((c) => c.HomeComponent)},
        {path:"cart",loadComponent:() => import("./components/cart/cart.component").then((c) => c.CartComponent)},
        {path:"products",loadComponent:() => import("./components/products/products.component").then((c) => c.ProductsComponent)},
        {path:"categories",loadComponent:() => import("./components/categories/categories.component").then((c) => c.CategoriesComponent)},
        {path:"brands",loadComponent:() => import("./components/brands/brands.component").then((c) => c.BrandsComponent)},
        {path:"productDetails/:productId", loadComponent:() => import("./components/product-details/product-details.component").then((c) => c.ProductDetailsComponent)},
        {path:"allorders", loadComponent:() => import("./components/allorders/allorders.component").then((c) => c.AllordersComponent)},
        {path:"order/:cartId", loadComponent:() => import("./components/buy-cart/buy-cart.component").then((c) => c.BuyCartComponent)},
        {path:"wishlist", loadComponent:() => import("./components/wish-list/wish-list.component").then((c) => c.WishListComponent)},
        {path:"categoryDetails/:categoryId", loadComponent:() => import('./components/category-details/category-details.component').then((c) => c.CategoryDetailsComponent)},
        {path:"brandDetails/:brandId", loadComponent:() => import('./components/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent)},
    ]},
    {path:"**",loadComponent:() => import("./components/not-found/not-found.component").then((c) => c.NotFoundComponent)}
];
