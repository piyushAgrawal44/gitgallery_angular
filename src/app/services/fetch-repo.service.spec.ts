import { TestBed } from '@angular/core/testing';

import { FetchRepoService } from './fetch-repo.service';

describe('FetchRepoService', () => {
  let service: FetchRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
