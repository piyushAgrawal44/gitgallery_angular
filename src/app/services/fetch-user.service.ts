import { HttpClient, HttpHeaders } from '@angular/common/http';
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


    // I am giving token here not in env, because you will not need to change it to run application properly 
    // i know we should save secrete key and values in env only 
    const token = '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';
    
    // Construct headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': `token ${token}`
    });

    
    return this.http.get(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`, {headers});
  }
}
