import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchRepoService } from './fetch-repo.service';

describe('FetchRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchRepoService]
    });
  });

  it('should be created', () => {
    const service: FetchRepoService = TestBed.inject(FetchRepoService);
    expect(service).toBeTruthy();
  });

  it('should fetch repositories without query', inject([HttpTestingController, FetchRepoService],
    (httpMock: HttpTestingController, service: FetchRepoService) => {
      const username = 'testuser';
      const perPage = 10;
      const page = 1;
      service.fetchRepo(username, perPage, page, '').subscribe((data: any) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
      expect(req.request.method).toEqual('GET');
      req.flush({}); // You can flush your desired response here
      httpMock.verify();
    }));

  it('should fetch repositories with query', inject([HttpTestingController, FetchRepoService],
    (httpMock: HttpTestingController, service: FetchRepoService) => {
      const username = 'testuser';
      const perPage = 10;
      const page = 1;
      const query = 'angular';
      service.fetchRepo(username, perPage, page, query).subscribe((data: any) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}&per_page=${perPage}&page=${page}`);
      expect(req.request.method).toEqual('GET');
      req.flush({}); // You can flush your desired response here
      httpMock.verify();
    }));

  it('should fetch total repositories without query', inject([HttpTestingController, FetchRepoService],
    (httpMock: HttpTestingController, service: FetchRepoService) => {
      const username = 'testuser';
      service.totalRepo(username, '').subscribe((data: any) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos`);
      expect(req.request.method).toEqual('GET');
      req.flush({}); // You can flush your desired response here
      httpMock.verify();
    }));

  it('should fetch total repositories with query', inject([HttpTestingController, FetchRepoService],
    (httpMock: HttpTestingController, service: FetchRepoService) => {
      const username = 'testuser';
      const query = 'angular';
      service.totalRepo(username, query).subscribe((data: any) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${username}`);
      expect(req.request.method).toEqual('GET');
      req.flush({}); // You can flush your desired response here
      httpMock.verify();
    }));

  it('should fetch user details', inject([HttpTestingController, FetchRepoService],
    (httpMock: HttpTestingController, service: FetchRepoService) => {
      const username = 'testuser';
      service.fetchUserDetails(username).subscribe((data: any) => {
        expect(data).toBeTruthy();
      });
      const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
      expect(req.request.method).toEqual('GET');
      req.flush({}); // You can flush your desired response here
      httpMock.verify();
    }));
});
