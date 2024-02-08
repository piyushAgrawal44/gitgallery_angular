import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchRepoComponentComponent } from './search-repo-component.component';
import { FetchRepoService } from 'src/app/services/fetch-repo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SearchRepoComponentComponent', () => {
  let component: SearchRepoComponentComponent;
  let fixture: ComponentFixture<SearchRepoComponentComponent>;
  let fetchRepoService: FetchRepoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRepoComponentComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [FetchRepoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRepoComponentComponent);
    component = fixture.componentInstance;
    fetchRepoService = TestBed.inject(FetchRepoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on ngOnInit', () => {
    const userDetails = { name: 'Test User', public_repos: 10, followers: 100 };
    spyOn(fetchRepoService, 'fetchUserDetails').and.returnValue(of(userDetails));

    component.ngOnInit();

    expect(component.userDetails).toEqual(userDetails);
    expect(component.repos.total_count).toEqual(userDetails.public_repos);
    expect(component.totalPages).toEqual(Math.ceil(userDetails.public_repos / component.perPage));
  });

  it('should fetch total repositories on fetchTotalRepo', () => {
    const totalRepoResponse = { total_count: 50 };
    spyOn(fetchRepoService, 'totalRepo').and.returnValue(of(totalRepoResponse));

    component.fetchTotalRepo();

    expect(component.repos.total_count).toEqual(totalRepoResponse.total_count);
    expect(component.totalPages).toEqual(Math.ceil(totalRepoResponse.total_count / component.perPage));
  });

  it('should fetch repository data on fetchData', () => {
    const repoData = { items: [{ name: 'repo1' }, { name: 'repo2' }] };
    spyOn(fetchRepoService, 'fetchRepo').and.returnValue(of(repoData));

    component.fetchData();

    expect(component.repos.items).toEqual(repoData.items);
    expect(component.isRepoLoading).toBeFalsy();
    expect(component.isImageLoading).toBeFalsy();
  });

  it('should reset page and fetch data on searchUser', () => {
    spyOn(component, 'fetchUserDetails');
    spyOn(component, 'fetchData');
    spyOn(component, 'fetchTotalRepo');

    component.searchUser();

    expect(component.page).toEqual(1);
    expect(component.fetchUserDetails).toHaveBeenCalled();
    expect(component.fetchData).toHaveBeenCalled();
    expect(component.fetchTotalRepo).toHaveBeenCalled();
  });

  it('should reset page and fetch data on searchRepoForQuery', () => {
    spyOn(component, 'fetchData');
    spyOn(component, 'fetchTotalRepo');

    component.searchRepoForQuery();

    expect(component.page).toEqual(1);
    expect(component.fetchData).toHaveBeenCalled();
    expect(component.fetchTotalRepo).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    if (component.subscription) {
        spyOn(component.subscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.subscription.unsubscribe).toHaveBeenCalled();
    }
});

});
