import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { FetchUserService } from 'src/app/services/fetch-user.service';

@Component({
  selector: 'app-search-user-component',
  templateUrl: './search-user-component.component.html',

  styleUrls: ['./search-user-component.component.scss']
})
export class SearchUserComponentComponent implements OnInit {

  usernameRef: string = 'piyush agrawal'; // default query username
  perPage = 10; // display 10 users by default
  page = 1; // display 1 by default
  totalPages: number = 0; // total pages for pagination
  users: any = { total_count: 0, items: [] }; // initial state for users obj, items array will contain users list
  isPageLoading: boolean = true; // skeleton loader is based on this variable

  private fetchDataSubscription: Subscription | undefined;

  constructor(private toastr: ToastrService, private FetchUserService: FetchUserService) {
  }


  ngOnInit(): void {
    this.fetchData(); // fetch initial data
  }

  // function to change the page
  pageChange(val: number = 1): void {
    this.page = val;
    this.isPageLoading = true;
    this.fetchData();
  }

  // function to set per page display user count
  perPageChange(val: number = 10): void {
    this.perPage = val;
    this.page = 1;
    this.isPageLoading = true;
    this.fetchData();
  }

  // search users for a new query
  searchUser(): void {
    this.page = 1;
    this.isPageLoading = true;
    this.fetchData();
  }


  fetchData(): void {

    // Unsubscribe from previous subscription to avoid memory leaks
    if (this.fetchDataSubscription) {
      this.fetchDataSubscription.unsubscribe();
    }

    this.fetchDataSubscription = this.FetchUserService.fetchUsers(this.usernameRef, this.perPage, this.page)
      .subscribe(
        async (response) => {

          
          this.users = response;

          this.isPageLoading = false;
          if (this.users.total_count > 1000) {
            this.users.total_count = 1000; // limited by github. Github shows first 1000 users or repos only
          }

          this.totalPages = Math.ceil(this.users.total_count / this.perPage);
        },
        (error) => {
          this.isPageLoading = false;
          if (error.status === 404) {
            // User not found
            this.toastr.error("User not found.", 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              toastClass: 'fixed max-w-[90%] bg-red-600 text-gray-50 top-1 right-[20px] z-20 p-2 rounded-[12px]'
            });
          } else if (error.status === 403) {
            // Rate limit exceeded
            this.toastr.error("API rate limit exceeded. Please try again later.", 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              toastClass: 'fixed max-w-[90%] bg-red-600 text-gray-50 top-1 right-[20px] z-20 p-2 rounded-[12px]'
            });
          } else {
            // Default error message for other cases
            this.toastr.error("Internal server error.", 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              toastClass: 'fixed max-w-[90%] bg-red-600 text-gray-50 top-1 right-[20px] z-20 p-2 rounded-[12px]'
            });
          }
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.fetchDataSubscription) {
      this.fetchDataSubscription.unsubscribe();
    }
  }

}
