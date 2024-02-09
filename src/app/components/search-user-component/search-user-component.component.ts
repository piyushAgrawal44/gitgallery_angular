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

  usernameRef: string = 'piyush agrawal';
  perPage = 10;
  page = 1;
  totalPages: number = 0;
  users: any = { total_count: 0, items: [] };
  isPageLoading: boolean = true;
  private fetchDataSubscription: Subscription | undefined;

  constructor(private toastr: ToastrService, private FetchUserService: FetchUserService) {
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription when the component is destroyed
    if (this.fetchDataSubscription) {
      this.fetchDataSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.fetchData();
  }

  pageChange(val: number = 1): void {
    this.page = val;
    this.isPageLoading = true;
    this.fetchData();
  }

  perPageChange(val: number = 10): void {
    this.perPage = val;
    console.log(val, 'perpage');
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
            this.users.total_count = 1000; // limited by github
          }

          this.totalPages = Math.ceil(this.users.total_count / this.perPage);
          // usersReference = users;
        },
        (error) => {
          this.isPageLoading = false;
          this.toastr.error("Internal server error.", 'Error', {
            timeOut: 3000 ,
            positionClass: 'toast-top-right',
            toastClass: 'fixed max-w-[90%] bg-red-600 text-gray-50 top-1 right-[20px] z-20 p-2 rounded-[12px]'
          });
          // Handle error
        }
      );
  }


  searchUser(): void {
    this.page = 1;
    this.isPageLoading = true;
    this.fetchData();
  }

}
