import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentPage, totalPages, and perPage with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(0);
    expect(component.perPage).toBe(0);
  });


  it('should initialize pagesArray on ngOnChanges', () => {
    const totalPages = 3;
    const currentPage = 1;
    component.totalPages = totalPages;
    component.currentPage = currentPage;

    component.ngOnChanges();

    expect(component.pagesArray.length).toBe(totalPages);
    // You can add more assertions to verify the content of pagesArray
  });

  it('should generate pagesArray correctly for totalPages <= 5', () => {
    const totalPages = 5;
    component.totalPages = totalPages;
    component.currentPage = 1;

    component.generatePagesArray();

    expect(component.pagesArray.length).toBe(totalPages);
    // You can add more assertions to verify the content of pagesArray
  });

  it('should generate pagesArray correctly for totalPages > 5', () => {
    const totalPages = 10;
    const currentPage = 3;
    component.totalPages = totalPages;
    component.currentPage = currentPage;

    component.generatePagesArray();

    // for this array will be [ 1, 2, 3, 4, 0, 10 ]
    expect(component.pagesArray.length).toBe(6);
  });

  it('should emit perPageChange event with correct value when setPerPage method is called', () => {
    spyOn(component.perPageChange, 'emit');
    const perPageValue = 20;

    component.setPerPage(perPageValue);

    expect(component.perPage).toBe(perPageValue);
    expect(component.perPageChange.emit).toHaveBeenCalledWith(perPageValue);
  });

  it('should emit pageChange event with correct value when setPage method is called', () => {
    spyOn(component.pageChange, 'emit');
    const pageNumber = 2;

    component.setPage(pageNumber);

    expect(component.pageChange.emit).toHaveBeenCalledWith(pageNumber);
  });

  it('should emit pageChange event with correct value when prevPage method is called', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 3;

    component.prevPage();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit pageChange event with correct value when nextPage method is called', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 3;
    component.totalPages = 5;

    component.nextPage();

    expect(component.pageChange.emit).toHaveBeenCalledWith(4);
  });

  it('should not emit pageChange event when prevPage method is called and currentPage is 1', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 1;

    component.prevPage();

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should not emit pageChange event when nextPage method is called and currentPage is equal to totalPages', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 5;
    component.totalPages = 5;

    component.nextPage();

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });


  // Testing .html file
  it('should display Prev and Next buttons in mobile view', () => {

    // Set the viewport to a mobile size (e.g., iPhone X)
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));

    // Find the Prev button and assert its presence
    const prevButton = fixture.debugElement.query(By.css('[data-mobile-id="prev_btn"]'));
    expect(prevButton).toBeTruthy();

    // Find the Next button and assert its presence
    const perPageSelector = fixture.debugElement.query(By.css('[data-mobile-id="per_page_selector"]'));
    expect(perPageSelector).toBeTruthy();

    // Find the Next button and assert its presence
    const nextButton = fixture.debugElement.query(By.css('[data-mobile-id="next_btn"]'));
    expect(nextButton).toBeTruthy();
  });

  it('should display Prev and Next buttons in desktop view', () => {

    // Set the viewport to a desktop size 
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));

    // Find the Prev button and assert its presence
    const prevButton = fixture.debugElement.query(By.css('[data-desktop-id="prev_btn"]'));
    expect(prevButton).toBeTruthy();

    // Find the Next button and assert its presence
    const perPageSelector = fixture.debugElement.query(By.css('[data-desktop-id="per_page_selector"]'));
    expect(perPageSelector).toBeTruthy();

    // Find the Next button and assert its presence
    const nextButton = fixture.debugElement.query(By.css('[data-desktop-id="next_btn"]'));
    expect(nextButton).toBeTruthy();
  });

  it('should render buttons and dots based on pagesArray', () => {
    component.pagesArray = [1, 0, 2, 3, 0, 5]; 
    // Query all button elements
    const buttons = fixture.debugElement.queryAll(By.css('[data-desktop-id="pagination_btn"] button'));
    expect(buttons.length).toBe(4); // There are 4 buttons in the example data

    // Query all dot elements
    const dots = fixture.debugElement.queryAll(By.css('[data-desktop-id="pagination_btn"] span'));
    expect(dots.length).toBe(2); // There are 2 dots in the example data
  });

  it('should call setPage method with correct page number when a button is clicked', () => {
    spyOn(component, 'setPage'); // Spy on the setPage method

    // Find and click the first button (page 1)
    const firstButton = fixture.debugElement.query(By.css('[data-desktop-id="pagination_btn"] button'));
    firstButton.triggerEventHandler('click', null);

    // Assert that the setPage method is called with the correct page number
    expect(component.setPage).toHaveBeenCalledWith(1);
  });
});
