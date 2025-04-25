import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function LoggingInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  console.log('%c[HTTP Request]', 'color: blue;', req.method, req.urlWithParams, req);

  return next(req).pipe(
    tap({
      next: (event) => {
        console.log('%c[HTTP Response]', 'color: green;', req.urlWithParams, event);
      },
      error: (error) => {
        console.error('%c[HTTP Error]', 'color: red;', req.urlWithParams, error);
      }
    })
  );
}
