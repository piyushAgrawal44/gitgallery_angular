import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() perPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();

  pagesArray: number[] = [];

  ngOnChanges() {
    // we are doing on change because totalpages will be calculated on after API call 
    this.generatePagesArray();
  }

  generatePagesArray() {
   
    let index = 1;
    let tempArr = [];
    let dotCnt1 = 0;
    let dotCnt2 = 0;

    while (index <= this.totalPages) {
      const isWithinRange1 = (index < (this.currentPage - 1)) && index > 1;
      const isWithinRange2 = (index > (this.currentPage + 1)) && index < this.totalPages;


      if (this.totalPages <= 5) {
        tempArr.push(index);
      }
      else {

        if (isWithinRange1) {
          if (dotCnt1 < 1) {
            // display dot
            tempArr.push(0);
            dotCnt1++;
          }
        }
        else if (isWithinRange2) {
          if (dotCnt2 < 1) {
            // display dot
            tempArr.push(0);
            dotCnt2++;
          }
        }
        else {
          tempArr.push(index);
        }

      }

      index++;
    }

    this.pagesArray = tempArr;

  }

  setPerPage(event: any) {
    this.perPage = event;
    this.perPageChange.emit(event);
  }

  setPage(val: number) {
    if (this.currentPage !== val && val > 0 && val < this.totalPages + 1) {
      this.pageChange.emit(val);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
