import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FetchRepoService {

  constructor(private http: HttpClient) { }

  // I am giving token here not in env, because you will not need to change it to run application properly 
  // i know we should save secrete key and values in env only 
  token: string = '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';

  // Construct headers with the authorization token


  fetchRepo(username: string, perPage: number, page: number, query: string): Observable<any> {
    // this service fetch all repos for a given query name and username
    // username is the user under which we have to find the repo containing query

    const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    if (!query) {
      return this.http.get(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`, { headers });
    }
    else {
      return this.http.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}&per_page=${perPage}&page=${page}`, { headers });

    }

  }

  totalRepo(username: string, query: string): Observable<any> {
    // this service fetch total repos count for given repo query

    // if query is blank then https://api.github.com/search/repositories?q this api will give error so I am using `https://api.github.com/users/${username}/repos for blank query
    // but https://api.github.com/users/${username}/repos this also return max 30 items at a time so I have not called this service for fetching total repo for a blank query
    // instead I have used total public repo count fetched from fetchUserDetails service (https://api.github.com/users/${username})


    const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    if (!query) {
      return this.http.get(`https://api.github.com/users/${username}/repos`, { headers });
    }
    else {
      return this.http.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}`, { headers });

    }

  }


  fetchUserDetails(username: string,): Observable<any> {
    // this service fetch user details for a correct username
    // if username is not valid then it give 404 error

    const headers = new HttpHeaders({
      'Authorization': `token ${this.token}`
    });
    return this.http.get(`https://api.github.com/users/${username}`, { headers });
  }
}
