import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FetchUserService {

  // http=inject(HttpClient);
  constructor(private http: HttpClient) { }

  fetchUsers(username: string, perPage: number, page: number): Observable<any> {
    
    // this service search all the public users available on github for a given query 
    // username is the query user name. page and perPage is responsible for pagination 

    // auth token github
    const headers = new HttpHeaders({
      'Authorization': `token ${environment.github_token ?? ""}`
    });

    // check the environment if it is production then use auth token other wise fetch data with auth toke.
    // this way it will work if you do not set env correctly
    if( environment.production===true){
      return this.http.get(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`, {headers});
    }
    else{
      return this.http.get(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`);
    }
  }
}
