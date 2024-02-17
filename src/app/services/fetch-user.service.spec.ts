import { TestBed } from '@angular/core/testing';
import { FetchUserService } from './fetch-user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';


describe('FetchUserService', () => {

  let service: FetchUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [FetchUserService] 
    });
    service = TestBed.inject(FetchUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // checking service created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // testing service for a blank query
  it('should give error from the GitHub API for blank query', () => {
    const username = '';
    const perPage = 2;
    const page = 1;

    // Mock response data
    const mockResponse = {
      message: "Validation Failed",
      errors: [
        {
          resource: "Search",
          field: "q",
          code: "missing"
        }
      ],
      documentation_url: "https://docs.github.com/v3/search"
    }


    // Call the service method
    service.fetchUsers(username, perPage, page).subscribe(users => {
      expect(users).toEqual(mockResponse);
    });

    // Expect a single request to the GitHub API with the correct URL
    const req = httpMock.expectOne(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockResponse);
  });

  // testing service for a query
  it('should fetch users from the GitHub API', () => {
    const username = 'piyush';
    const perPage = 2;
    const page = 1;

    // Mock response data
    const mockResponse = {
      items: [
        {
          login: 'piyush',
          id: 45903,
          node_id: 'MDQ6VXNlcjQ1OTAz',
          avatar_url: 'https://avatars.githubusercontent.com/u/45903?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/piyush',
          html_url: 'https://github.com/piyush',
          followers_url: 'https://api.github.com/users/piyush/followers',
          following_url: 'https://api.github.com/users/piyush/following{/other_user}',
          gists_url: 'https://api.github.com/users/piyush/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/piyush/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/piyush/subscriptions',
          organizations_url: 'https://api.github.com/users/piyush/orgs',
          repos_url: 'https://api.github.com/users/piyush/repos',
          events_url: 'https://api.github.com/users/piyush/events{/privacy}',
          received_events_url: 'https://api.github.com/users/piyush/received_events',
          type: 'User',
          site_admin: false,
          score: 1
        },
        {
          login: 'piyushgarg-dev',
          id: 44976328,
          node_id: 'MDQ6VXNlcjQ0OTc2MzI4',
          avatar_url: 'https://avatars.githubusercontent.com/u/44976328?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/piyushgarg-dev',
          html_url: 'https://github.com/piyushgarg-dev',
          followers_url: 'https://api.github.com/users/piyushgarg-dev/followers',
          following_url: 'https://api.github.com/users/piyushgarg-dev/following{/other_user}',
          gists_url: 'https://api.github.com/users/piyushgarg-dev/gists{/gist_id}',
          starred_url: 'https://api.github.com/users/piyushgarg-dev/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/piyushgarg-dev/subscriptions',
          organizations_url: 'https://api.github.com/users/piyushgarg-dev/orgs',
          repos_url: 'https://api.github.com/users/piyushgarg-dev/repos',
          events_url: 'https://api.github.com/users/piyushgarg-dev/events{/privacy}',
          received_events_url: 'https://api.github.com/users/piyushgarg-dev/received_events',
          type: 'User',
          site_admin: false,
          score: 1
        }
        // Add more user objects if needed
      ]
    };


    // Call the service method
    service.fetchUsers(username, perPage, page).subscribe(users => {
      expect(users).toEqual(mockResponse);
    });

    // Expect a single request to the GitHub API with the correct URL
    const req = httpMock.expectOne(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=${perPage}&page=${page}`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockResponse);
  });
});
