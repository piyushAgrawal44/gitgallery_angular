import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, firstValueFrom } from 'rxjs';
import { FetchRepoService } from 'src/app/services/fetch-repo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-repo-component',
  templateUrl: './search-repo-component.component.html',
  styleUrls: ['./search-repo-component.component.scss']
})
export class SearchRepoComponentComponent {
  public subscription: Subscription | undefined;
  usernameRef: string; // username query
  query: string = ''; // repos query  
  perPage = 10;
  page = 1;
  repos: any = { total_count: 0, items: [] }; // initial state of repos obj. items contain list of repos
  userDetails: any = {}; // contain user details
  selectedRepo: any = {};
  public_repo_count: number = 0;
  totalPages: number = 0; // by default it is= Math.ceil(public_repo_count/perPage)

  isRepoLoading: boolean = true; // showing skeleton loader for repos
  isUserLoading: boolean = true; // showing skeleton loader in whole screen because when user changed so repos also
  isModalOpen: boolean = false; // by default modal aka popup will be hidden


  constructor(private toastr: ToastrService, private FetchRepoService: FetchRepoService, private location: Location) {

    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);

    // initializing username
    this.usernameRef = urlParams.get('username') ?? "piyushAgrawal44"; // default query name piyushAgrawal44 aka me
  }



  ngOnInit(): void {
    // after initialization
    this.callUserApi(); // i have fetch user api because query blank and repo total count will depend on user public repo 
    // so we will callRepoAPI after user api is completed
  }

  goBack() {
    this.location.back();
  }

  async callUserApi(): Promise<void> {

    try {
      this.isUserLoading = true;
      await this.fetchUserDetails();
    } catch (error) {
      // Handle error if any of the promises fail
      this.handleError(error);
    } finally {
      // Set user loader to false
      this.isUserLoading = false;
    }
  };

  async callRepoAPI(): Promise<void> {

    try {
      this.isRepoLoading = true;
      await this.fetchData();
    } catch (error) {
      // Handle error if any of the promises fail
      this.handleError(error);
    } finally {
      // All data fetching functions have completed
      // Set repo loader to false
      this.isRepoLoading = false;
    }
  }

  // function to change the page
  pageChange(val: number = 1): void {
    this.page = val;
    this.callRepoAPI();
  }

  // function to set per page display user count
  perPageChange(val: number = 10): void {
    this.perPage = val;
    this.page = 1;
    this.callRepoAPI();
  }

  // searching a new user
  searchUser(): void {
   
    this.page = 1; // setting page to initial state
    this.fetchUserDetails();
  }
  // searching a  repo for given repo query
  searchRepoForQuery(): void {
    this.page = 1;
    this.callUserApi();
  }

  // open modal function - this will open the modal
  openModal(repo: any) {
    this.isModalOpen = true;
    this.selectedRepo = repo; // updating selected repo to show the repo details in modal
  }

  // close modal function - this will close the modal
  closeModal() {
    this.isModalOpen = false;
  }


  // fetch user details
  async fetchUserDetails(): Promise<void> {

    // Unsubscribe from previous subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    try {
      const response = await firstValueFrom(this.FetchRepoService.fetchUserDetails(this.usernameRef));
      // Process the response here
      this.userDetails = response;
      this.public_repo_count = response.public_repos;
      this.callRepoAPI(); // Call other functions that depend on this response
    } catch (error) {
      // Handle any errors
      this.handleError(error);
    }
  }

  // fetch all repo list
  async fetchData(): Promise<void> {

    // Unsubscribe from previous subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


    try {
      const response = await firstValueFrom(this.FetchRepoService.fetchRepo(this.usernameRef, this.perPage, this.page, this.query));
      if (!this.query) {
        this.repos.items = response;
   
        // query is blank so calculate total pages from public repo count
        this.repos.total_count = this.public_repo_count;
        this.totalPages = Math.ceil(this.public_repo_count / this.perPage);
      } else {
        this.repos = response;
        this.totalPages = Math.ceil(this.repos.total_count / this.perPage);
      }

      
    } catch (error) {
      this.handleError(error);
    }
  }

  

  // to display errors in front end and logging them
  handleError(error: any): void {

    if (error.status === 404) {
      // User or not found
      this.toastr.error("No data found for given query.", 'Error', {
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
      // here we can also log the error for reviewing it later
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
