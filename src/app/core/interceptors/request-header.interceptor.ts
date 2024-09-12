import { HttpInterceptorFn } from '@angular/common/http';

export const requestHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem("userToken") !== null){
      if(req.url.includes("cart") || req.url.includes("wishlist") || req.url.includes("order")){
        req = req.clone({
          setHeaders:{token: localStorage.getItem("userToken")!},
        });
      }
    }
  }
  return next(req);
};
