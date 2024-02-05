import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserComponentComponent } from './search-user-component.component';

describe('SearchUserComponentComponent', () => {
  let component: SearchUserComponentComponent;
  let fixture: ComponentFixture<SearchUserComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUserComponentComponent]
    });
    fixture = TestBed.createComponent(SearchUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
