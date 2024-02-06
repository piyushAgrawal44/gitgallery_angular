import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class FetchUserService {

  constructor(private http: HttpClient) { }

  fetchUsers(username: string, perPage: number, page: number): Observable<any> {
    return this.http.get(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`);
  }
}
