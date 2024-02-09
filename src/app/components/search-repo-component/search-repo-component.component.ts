import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FetchRepoService } from 'src/app/services/fetch-repo.service';
@Component({
  selector: 'app-search-repo-component',
  templateUrl: './search-repo-component.component.html',
  styleUrls: ['./search-repo-component.component.scss']
})
export class SearchRepoComponentComponent {
  public subscription: Subscription | undefined;
  usernameRef: string = 'piyushAgrawal44';
  query: string = '';
  perPage = 10;
  page = 1;
  repos: any = { total_count: 0, items: [] };
  totalPages: number = 0;
  userDetails: any = {};
  selectedModal: any = {};
  public_repo_count: number = 0;
  queryUsername: string = "piyushAgrawal44";
  isRepoLoading: boolean = true;
  isUserLoading: boolean = true;

  constructor(private toastr: ToastrService, private FetchRepoService: FetchRepoService) {

    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);
    this.queryUsername = urlParams.get('username') ?? "piyushAgrawal44";
    if (this.queryUsername != null && this.queryUsername != "") {
      this.usernameRef = this.queryUsername.trim();
    }
  }
  isModalOpen: boolean = false;


  ngOnInit(): void {
    this.fetchUserDetails();
  }

  pageChange(val: number = 1): void {
    this.page = val;
    this.isRepoLoading = true;
    this.fetchData();
  }

  perPageChange(val: number = 10): void {
    this.perPage = val;
    this.page = 1;
    this.isRepoLoading = true;
    this.fetchData();
  }

  openModal(repo: any) {

    this.isModalOpen = true;
    this.selectedModal = repo;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  fetchUserDetails(): void {

    // Unsubscribe from previous subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


    this.subscription = this.FetchRepoService.fetchUserDetails(this.usernameRef)
      .subscribe(
        async (response) => {

          this.userDetails = response;
          this.fetchData();
        },
        (error) => {

          this.isRepoLoading = false;
          this.isUserLoading = false;
          this.handleFetchError(error);

        }
      );
  }

  fetchTotalRepo(): void {
    if (!this.query) {
      this.repos.total_count = this.public_repo_count;
    }
    else {
      this.subscription = this.FetchRepoService.totalRepo(this.usernameRef, this.query)
        .subscribe(
          async (response) => {
            this.repos.total_count = response.total_count;

            this.isRepoLoading = false;
            this.isUserLoading = false;
          },
          (error) => {
            this.isRepoLoading = false;
            this.isUserLoading = false;
            this.handleFetchError(error);
          }
        );
    }
    this.totalPages = Math.ceil(this.repos.total_count / this.perPage);

  }

  fetchData(): void {

    this.subscription = this.FetchRepoService.fetchRepo(this.usernameRef, this.perPage, this.page, this.query)
      .subscribe(
        async (response) => {

          if (!this.query) {
            this.repos.items = response;
          }
          else {
            this.repos.items = response.items;
          }

          if (!this.query) {
            // query is blank
            this.repos.total_count = this.userDetails.public_repos;
            this.public_repo_count = this.userDetails.public_repos;
            this.totalPages = Math.ceil(this.repos.total_count / this.perPage);


            this.isRepoLoading = false;
            this.isUserLoading = false;
          }
          else {
            this.fetchTotalRepo();
          }
        },
        (error) => {

          this.isRepoLoading = false;
          this.isUserLoading = false;
          this.handleFetchError(error);
        }
      );


  }


  searchUser(): void {
    this.isUserLoading = true;
    this.page = 1;
    this.fetchUserDetails();
  }

  searchRepoForQuery(): void {
    this.isRepoLoading = true;
    this.page = 1;
    this.fetchData();
  }

  handleFetchError(error: any): void {

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

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }
}
