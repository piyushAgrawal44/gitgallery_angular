import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRepoComponentComponent } from './search-repo-component.component';

describe('SearchRepoComponentComponent', () => {
  let component: SearchRepoComponentComponent;
  let fixture: ComponentFixture<SearchRepoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRepoComponentComponent]
    });
    fixture = TestBed.createComponent(SearchRepoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
