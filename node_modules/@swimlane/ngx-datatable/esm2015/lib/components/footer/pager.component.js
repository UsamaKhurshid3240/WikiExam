/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export class DataTablePagerComponent {
    constructor() {
        this.change = new EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set size(val) {
        this._size = val;
        this.pages = this.calcPages();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set count(val) {
        this._count = val;
        this.pages = this.calcPages();
    }
    /**
     * @return {?}
     */
    get count() {
        return this._count;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set page(val) {
        this._page = val;
        this.pages = this.calcPages();
    }
    /**
     * @return {?}
     */
    get page() {
        return this._page;
    }
    /**
     * @return {?}
     */
    get totalPages() {
        /** @type {?} */
        const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
        return Math.max(count || 0, 1);
    }
    /**
     * @return {?}
     */
    canPrevious() {
        return this.page > 1;
    }
    /**
     * @return {?}
     */
    canNext() {
        return this.page < this.totalPages;
    }
    /**
     * @return {?}
     */
    prevPage() {
        this.selectPage(this.page - 1);
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.selectPage(this.page + 1);
    }
    /**
     * @param {?} page
     * @return {?}
     */
    selectPage(page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page
            });
        }
    }
    /**
     * @param {?=} page
     * @return {?}
     */
    calcPages(page) {
        /** @type {?} */
        const pages = [];
        /** @type {?} */
        let startPage = 1;
        /** @type {?} */
        let endPage = this.totalPages;
        /** @type {?} */
        const maxSize = 5;
        /** @type {?} */
        const isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (let num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: (/** @type {?} */ (((/** @type {?} */ (num)))))
            });
        }
        return pages;
    }
}
DataTablePagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-pager',
                template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `,
                host: {
                    class: 'datatable-pager'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
DataTablePagerComponent.propDecorators = {
    pagerLeftArrowIcon: [{ type: Input }],
    pagerRightArrowIcon: [{ type: Input }],
    pagerPreviousIcon: [{ type: Input }],
    pagerNextIcon: [{ type: Input }],
    size: [{ type: Input }],
    count: [{ type: Input }],
    page: [{ type: Input }],
    change: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DataTablePagerComponent.prototype.pagerLeftArrowIcon;
    /** @type {?} */
    DataTablePagerComponent.prototype.pagerRightArrowIcon;
    /** @type {?} */
    DataTablePagerComponent.prototype.pagerPreviousIcon;
    /** @type {?} */
    DataTablePagerComponent.prototype.pagerNextIcon;
    /** @type {?} */
    DataTablePagerComponent.prototype.change;
    /** @type {?} */
    DataTablePagerComponent.prototype._count;
    /** @type {?} */
    DataTablePagerComponent.prototype._page;
    /** @type {?} */
    DataTablePagerComponent.prototype._size;
    /** @type {?} */
    DataTablePagerComponent.prototype.pages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBNENoRyxNQUFNLE9BQU8sdUJBQXVCO0lBMUNwQztRQW1GWSxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBVyxDQUFDLENBQUM7SUE0RHBCLENBQUM7Ozs7O0lBbkdDLElBQ0ksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELElBQ0ksS0FBSyxDQUFDLEdBQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQ0ksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFD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QUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQkFBaUI7aUJBQ3pCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7aUNBRUUsS0FBSztrQ0FDTCxLQUFLO2dDQUNMLEtBQUs7NEJBQ0wsS0FBSzttQkFFTCxLQUFLO29CQVVMLEtBQUs7bUJBVUwsS0FBSztxQkFlTCxNQUFNOzs7O0lBeENQLHFEQUFvQzs7SUFDcEMsc0RBQXFDOztJQUNyQyxvREFBbUM7O0lBQ25DLGdEQUErQjs7SUFxQy9CLHlDQUF5RDs7SUFFekQseUNBQW1COztJQUNuQix3Q0FBa0I7O0lBQ2xCLHdDQUFrQjs7SUFDbEIsd0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXBhZ2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgY2xhc3M9XCJwYWdlclwiPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIGZpcnN0IHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UoMSlcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUHJldmlvdXNJY29uIH19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIHByZXZpb3VzIHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInByZXZQYWdlKClcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyTGVmdEFycm93SWNvbiB9fVwiPjwvaT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCIncGFnZSAnICsgcGcubnVtYmVyXCJcbiAgICAgICAgY2xhc3M9XCJwYWdlc1wiXG4gICAgICAgICpuZ0Zvcj1cImxldCBwZyBvZiBwYWdlc1wiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwicGcubnVtYmVyID09PSBwYWdlXCJcbiAgICAgID5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlcilcIj5cbiAgICAgICAgICB7eyBwZy50ZXh0IH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5OZXh0KClcIj5cbiAgICAgICAgPGEgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJnbyB0byBuZXh0IHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cIm5leHRQYWdlKClcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUmlnaHRBcnJvd0ljb24gfX1cIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5OZXh0KClcIj5cbiAgICAgICAgPGEgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJnbyB0byBsYXN0IHBhZ2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UodG90YWxQYWdlcylcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyTmV4dEljb24gfX1cIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXBhZ2VyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVQYWdlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBhZ2VyTGVmdEFycm93SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBwYWdlclJpZ2h0QXJyb3dJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZ2VyUHJldmlvdXNJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZ2VyTmV4dEljb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3NpemUgPSB2YWw7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XG4gIH1cblxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvdW50KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY291bnQgPSB2YWw7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XG4gIH1cblxuICBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcGFnZSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2UgPSB2YWw7XG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XG4gIH1cblxuICBnZXQgcGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlO1xuICB9XG5cbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuc2l6ZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMuY291bnQgLyB0aGlzLnNpemUpO1xuICAgIHJldHVybiBNYXRoLm1heChjb3VudCB8fCAwLCAxKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9jb3VudDogbnVtYmVyID0gMDtcbiAgX3BhZ2U6IG51bWJlciA9IDE7XG4gIF9zaXplOiBudW1iZXIgPSAwO1xuICBwYWdlczogYW55O1xuXG4gIGNhblByZXZpb3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPiAxO1xuICB9XG5cbiAgY2FuTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlIDwgdGhpcy50b3RhbFBhZ2VzO1xuICB9XG5cbiAgcHJldlBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSAtIDEpO1xuICB9XG5cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSArIDEpO1xuICB9XG5cbiAgc2VsZWN0UGFnZShwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA+IDAgJiYgcGFnZSA8PSB0aGlzLnRvdGFsUGFnZXMgJiYgcGFnZSAhPT0gdGhpcy5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHtcbiAgICAgICAgcGFnZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2FsY1BhZ2VzKHBhZ2U/OiBudW1iZXIpOiBhbnlbXSB7XG4gICAgY29uc3QgcGFnZXMgPSBbXTtcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRoaXMudG90YWxQYWdlcztcbiAgICBjb25zdCBtYXhTaXplID0gNTtcbiAgICBjb25zdCBpc01heFNpemVkID0gbWF4U2l6ZSA8IHRoaXMudG90YWxQYWdlcztcblxuICAgIHBhZ2UgPSBwYWdlIHx8IHRoaXMucGFnZTtcblxuICAgIGlmIChpc01heFNpemVkKSB7XG4gICAgICBzdGFydFBhZ2UgPSBwYWdlIC0gTWF0aC5mbG9vcihtYXhTaXplIC8gMik7XG4gICAgICBlbmRQYWdlID0gcGFnZSArIE1hdGguZmxvb3IobWF4U2l6ZSAvIDIpO1xuXG4gICAgICBpZiAoc3RhcnRQYWdlIDwgMSkge1xuICAgICAgICBzdGFydFBhZ2UgPSAxO1xuICAgICAgICBlbmRQYWdlID0gTWF0aC5taW4oc3RhcnRQYWdlICsgbWF4U2l6ZSAtIDEsIHRoaXMudG90YWxQYWdlcyk7XG4gICAgICB9IGVsc2UgaWYgKGVuZFBhZ2UgPiB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgodGhpcy50b3RhbFBhZ2VzIC0gbWF4U2l6ZSArIDEsIDEpO1xuICAgICAgICBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IG51bSA9IHN0YXJ0UGFnZTsgbnVtIDw9IGVuZFBhZ2U7IG51bSsrKSB7XG4gICAgICBwYWdlcy5wdXNoKHtcbiAgICAgICAgbnVtYmVyOiBudW0sXG4gICAgICAgIHRleHQ6IDxzdHJpbmc+KDxhbnk+bnVtKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG59XG4iXX0=