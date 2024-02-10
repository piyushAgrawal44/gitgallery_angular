import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class FetchUserService {

  constructor(private http: HttpClient) { }

  fetchUsers(username: string, perPage: number, page: number): Observable<any> {
    // this service search all the public users available on github for a given query 
    // username is the query user name. page and perPage is responsible for pagination 
    return this.http.get(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`);
  }
}
