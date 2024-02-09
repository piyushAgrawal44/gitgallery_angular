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

});
