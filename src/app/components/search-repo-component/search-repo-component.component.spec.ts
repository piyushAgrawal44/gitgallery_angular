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

});
