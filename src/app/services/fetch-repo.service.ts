import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FetchRepoService {

  constructor(private http: HttpClient) { }

  fetchRepo(username: string, perPage: number, page: number, query: string): Observable<any> {
    
    if (!query) {
      return this.http.get(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
    }
    else {
      return this.http.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}&per_page=${perPage}&page=${page}`);

    }

  }

  totalRepo(username: string,  query: string): Observable<any> {
    
    console.log(!query,"tete")
    if (!query) {
      return this.http.get(`https://api.github.com/users/${username}/repos`);
    }
    else {
      return this.http.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}`);

    }

  }


  fetchUserDetails(username: string,): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`);
  }
}
