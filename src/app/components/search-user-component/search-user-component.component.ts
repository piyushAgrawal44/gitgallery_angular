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
  totalPages: number = 0;
  users: any = { total_count: 0, items: [] };
  constructor(private FetchUserService: FetchUserService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  pageChange(val: number = 1): void {
    this.page = val;
    this.fetchData();
  }

  perPageChange(val: number = 10): void {
    this.perPage = val;
    console.log(val,'perpage');
    this.page = 1;

    this.fetchData();
  }

  fetchData(): void {

    this.FetchUserService.fetchUsers(this.usernameRef, this.perPage, this.page)
      .subscribe(
        async (response) => {
          console.log(response);
          this.users = response;


          if (this.users.total_count > 1000) {
            this.users.total_count = 1000; // limited by github
          }

          this.totalPages = Math.ceil(this.users.total_count / this.perPage);
          // usersReference = users;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }


  searchUser(): void {
    this.page = 1;


    this.FetchUserService.fetchUsers(this.usernameRef, this.perPage, this.page)
      .subscribe(
        async (response) => {
          console.log(response);
          this.users = response;


          if (this.users.total_count > 1000) {
            this.users.total_count = 1000; // limited by github
          }

          this.totalPages = Math.ceil(this.users.total_count / this.perPage);
          // usersReference = users;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }



}
