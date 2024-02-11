import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheServiceService } from '../services/cache-service.service'; // Import your cache service here

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private CacheServiceService: CacheServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      // Only cache GET requests
      return next.handle(request);
    }

    const cachedResponse = this.CacheServiceService.get(request.url);
    if (cachedResponse) {
      // Serve cached response if available
      return of(new HttpResponse({ body: cachedResponse }));
    }

    // Forward the request to the next handler and cache the response
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.CacheServiceService.set(request.url, event.body);
        }
      })
    );
  }
}
