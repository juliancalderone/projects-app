import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `https://67ace5053f5a4e1477dc3ad7.mockapi.io/${req.url}`,
  });
  return next(apiReq);
};
