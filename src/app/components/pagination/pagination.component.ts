import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  Array(arg0: number) {
    throw new Error('Method not implemented.');
  }
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() perPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();
  pagesArray: number[] = [];

  ngOnChanges() {
    this.generatePagesArray();
  }

  generatePagesArray() {

    let index = 1;
    let tempArr = [];
    let dotCnt1 = 0;
    let dotCnt2 = 0;
    while (index <= this.totalPages) {
      const isCurrentPage = this.currentPage === index;
      const isWithinRange1 = (index < (this.currentPage - 1)) && index > 1;
      const isWithinRange2 = (index > (this.currentPage + 1)) && index < this.totalPages;
      
      if (isCurrentPage) {
        tempArr.push(index);
      }
      else if (this.totalPages > 5) {
        if (isWithinRange1) {
          if (dotCnt1 < 1) {
            tempArr.push(0);
            dotCnt1++;
          }
        }
        else if (isWithinRange2) {
          if (dotCnt2 < 1) {
            tempArr.push(0);
            dotCnt2++;
          }
        }
        else {
          tempArr.push(index);
        }
      }
      else{
        tempArr.push(index);
      }

      index++;
    }

    this.pagesArray=tempArr;

  }

  setPerPage(event: any) {
    this.perPage = event;
    console.log(event)
    this.perPageChange.emit(event);
    // Do something with the selected value
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
