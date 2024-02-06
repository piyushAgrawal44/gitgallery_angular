import { Component, OnInit } from '@angular/core';
import { FetchUserService } from 'src/app/fetch-user.service';

@Component({
  selector: 'app-search-user-component',
  templateUrl: './search-user-component.component.html',

  styleUrls: ['./search-user-component.component.scss']
})
export class SearchUserComponentComponent implements OnInit {

  usernameRef: string = 'piyush agrawal';
  perPage = 10;
  page = 1;
  users : any={};
  constructor(private FetchUserService: FetchUserService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {

    this.FetchUserService.fetchUsers(this.usernameRef, this.perPage, this.page)
      .subscribe(
        async (response) => {
          console.log(response);
          this.users = response;

          console.log(this.users)
          if (this.users.total_count > 1000) {
            this.users.total_count = 1000; // limited by github
          }
          // usersReference = users;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }

  

}
