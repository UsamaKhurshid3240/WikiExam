/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
var DataTablePagerComponent = /** @class */ (function () {
    function DataTablePagerComponent() {
        this.change = new EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    Object.defineProperty(DataTablePagerComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._size = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () {
            return this._count;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () {
            return this._page;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTablePagerComponent.prototype.canPrevious = /**
     * @return {?}
     */
    function () {
        return this.page > 1;
    };
    /**
     * @return {?}
     */
    DataTablePagerComponent.prototype.canNext = /**
     * @return {?}
     */
    function () {
        return this.page < this.totalPages;
    };
    /**
     * @return {?}
     */
    DataTablePagerComponent.prototype.prevPage = /**
     * @return {?}
     */
    function () {
        this.selectPage(this.page - 1);
    };
    /**
     * @return {?}
     */
    DataTablePagerComponent.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.selectPage(this.page + 1);
    };
    /**
     * @param {?} page
     * @return {?}
     */
    DataTablePagerComponent.prototype.selectPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page: page
            });
        }
    };
    /**
     * @param {?=} page
     * @return {?}
     */
    DataTablePagerComponent.prototype.calcPages = /**
     * @param {?=} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var pages = [];
        /** @type {?} */
        var startPage = 1;
        /** @type {?} */
        var endPage = this.totalPages;
        /** @type {?} */
        var maxSize = 5;
        /** @type {?} */
        var isMaxSized = maxSize < this.totalPages;
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
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: (/** @type {?} */ (((/** @type {?} */ (num)))))
            });
        }
        return pages;
    };
    DataTablePagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-pager',
                    template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a role=\"button\" aria-label=\"go to first page\" href=\"javascript:void(0)\" (click)=\"selectPage(1)\">\n          <i class=\"{{ pagerPreviousIcon }}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a role=\"button\" aria-label=\"go to previous page\" href=\"javascript:void(0)\" (click)=\"prevPage()\">\n          <i class=\"{{ pagerLeftArrowIcon }}\"></i>\n        </a>\n      </li>\n      <li\n        role=\"button\"\n        [attr.aria-label]=\"'page ' + pg.number\"\n        class=\"pages\"\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\"\n      >\n        <a href=\"javascript:void(0)\" (click)=\"selectPage(pg.number)\">\n          {{ pg.text }}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a role=\"button\" aria-label=\"go to next page\" href=\"javascript:void(0)\" (click)=\"nextPage()\">\n          <i class=\"{{ pagerRightArrowIcon }}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a role=\"button\" aria-label=\"go to last page\" href=\"javascript:void(0)\" (click)=\"selectPage(totalPages)\">\n          <i class=\"{{ pagerNextIcon }}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
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
    return DataTablePagerComponent;
}());
export { DataTablePagerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHO0lBQUE7UUFtRlksV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBNERwQixDQUFDO0lBbkdDLHNCQUNJLHlDQUFJOzs7O1FBS1I7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7Ozs7UUFSRCxVQUNTLEdBQVc7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFNRCxzQkFDSSwwQ0FBSzs7OztRQUtUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBUkQsVUFDVSxHQUFXO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBTUQsc0JBQ0kseUNBQUk7Ozs7UUFLUjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQVJELFVBQ1MsR0FBVztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJLCtDQUFVOzs7O1FBQWQ7O2dCQUNRLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNuRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTs7OztJQVNELDZDQUFXOzs7SUFBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELHlDQUFPOzs7SUFBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELDBDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELDRDQUFVOzs7O0lBQVYsVUFBVyxJQUFZO1FBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZixJQUFJLE1BQUE7YUFDTCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBRUQsMkNBQVM7Ozs7SUFBVCxVQUFVLElBQWE7O1lBQ2YsS0FBSyxHQUFHLEVBQUU7O1lBQ1osU0FBUyxHQUFHLENBQUM7O1lBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVOztZQUN2QixPQUFPLEdBQUcsQ0FBQzs7WUFDWCxVQUFVLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVO1FBRTVDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUV6QixJQUFJLFVBQVUsRUFBRTtZQUNkLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDM0I7U0FDRjtRQUVELEtBQUssSUFBSSxHQUFHLEdBQUcsU0FBUyxFQUFFLEdBQUcsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVCxNQUFNLEVBQUUsR0FBRztnQkFDWCxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxtQkFBSyxHQUFHLEVBQUEsQ0FBQyxFQUFBO2FBQ3pCLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkFsSkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSw2ekNBa0NUO29CQUNELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3FCQUN6QjtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OztxQ0FFRSxLQUFLO3NDQUNMLEtBQUs7b0NBQ0wsS0FBSztnQ0FDTCxLQUFLO3VCQUVMLEtBQUs7d0JBVUwsS0FBSzt1QkFVTCxLQUFLO3lCQWVMLE1BQU07O0lBZ0VULDhCQUFDO0NBQUEsQUFuSkQsSUFtSkM7U0F6R1ksdUJBQXVCOzs7SUFDbEMscURBQW9DOztJQUNwQyxzREFBcUM7O0lBQ3JDLG9EQUFtQzs7SUFDbkMsZ0RBQStCOztJQXFDL0IseUNBQXlEOztJQUV6RCx5Q0FBbUI7O0lBQ25CLHdDQUFrQjs7SUFDbEIsd0NBQWtCOztJQUNsQix3Q0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtcGFnZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bCBjbGFzcz1cInBhZ2VyXCI+XG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5QcmV2aW91cygpXCI+XG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gZmlyc3QgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwic2VsZWN0UGFnZSgxKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJQcmV2aW91c0ljb24gfX1cIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5QcmV2aW91cygpXCI+XG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gcHJldmlvdXMgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwicHJldlBhZ2UoKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJMZWZ0QXJyb3dJY29uIH19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpXG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidwYWdlICcgKyBwZy5udW1iZXJcIlxuICAgICAgICBjbGFzcz1cInBhZ2VzXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHBnIG9mIHBhZ2VzXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwZy5udW1iZXIgPT09IHBhZ2VcIlxuICAgICAgPlxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGcubnVtYmVyKVwiPlxuICAgICAgICAgIHt7IHBnLnRleHQgfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbk5leHQoKVwiPlxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIG5leHQgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwibmV4dFBhZ2UoKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJSaWdodEFycm93SWNvbiB9fVwiPjwvaT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbk5leHQoKVwiPlxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIGxhc3QgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwic2VsZWN0UGFnZSh0b3RhbFBhZ2VzKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwie3sgcGFnZXJOZXh0SWNvbiB9fVwiPjwvaT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtcGFnZXInXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcGFnZXJMZWZ0QXJyb3dJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhZ2VyUmlnaHRBcnJvd0ljb246IHN0cmluZztcbiAgQElucHV0KCkgcGFnZXJQcmV2aW91c0ljb246IHN0cmluZztcbiAgQElucHV0KCkgcGFnZXJOZXh0SWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzaXplKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2l6ZSA9IHZhbDtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY291bnQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jb3VudCA9IHZhbDtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcbiAgfVxuXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBwYWdlKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcGFnZSA9IHZhbDtcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5zaXplIDwgMSA/IDEgOiBNYXRoLmNlaWwodGhpcy5jb3VudCAvIHRoaXMuc2l6ZSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KGNvdW50IHx8IDAsIDEpO1xuICB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2NvdW50OiBudW1iZXIgPSAwO1xuICBfcGFnZTogbnVtYmVyID0gMTtcbiAgX3NpemU6IG51bWJlciA9IDA7XG4gIHBhZ2VzOiBhbnk7XG5cbiAgY2FuUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA+IDE7XG4gIH1cblxuICBjYW5OZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cblxuICBwcmV2UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdFBhZ2UodGhpcy5wYWdlIC0gMSk7XG4gIH1cblxuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdFBhZ2UodGhpcy5wYWdlICsgMSk7XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwYWdlID4gMCAmJiBwYWdlIDw9IHRoaXMudG90YWxQYWdlcyAmJiBwYWdlICE9PSB0aGlzLnBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG5cbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xuICAgICAgICBwYWdlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjYWxjUGFnZXMocGFnZT86IG51bWJlcik6IGFueVtdIHtcbiAgICBjb25zdCBwYWdlcyA9IFtdO1xuICAgIGxldCBzdGFydFBhZ2UgPSAxO1xuICAgIGxldCBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xuICAgIGNvbnN0IG1heFNpemUgPSA1O1xuICAgIGNvbnN0IGlzTWF4U2l6ZWQgPSBtYXhTaXplIDwgdGhpcy50b3RhbFBhZ2VzO1xuXG4gICAgcGFnZSA9IHBhZ2UgfHwgdGhpcy5wYWdlO1xuXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIHN0YXJ0UGFnZSA9IHBhZ2UgLSBNYXRoLmZsb29yKG1heFNpemUgLyAyKTtcbiAgICAgIGVuZFBhZ2UgPSBwYWdlICsgTWF0aC5mbG9vcihtYXhTaXplIC8gMik7XG5cbiAgICAgIGlmIChzdGFydFBhZ2UgPCAxKSB7XG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XG4gICAgICAgIGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBtYXhTaXplIC0gMSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgICAgIH0gZWxzZSBpZiAoZW5kUGFnZSA+IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heCh0aGlzLnRvdGFsUGFnZXMgLSBtYXhTaXplICsgMSwgMSk7XG4gICAgICAgIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbnVtID0gc3RhcnRQYWdlOyBudW0gPD0gZW5kUGFnZTsgbnVtKyspIHtcbiAgICAgIHBhZ2VzLnB1c2goe1xuICAgICAgICBudW1iZXI6IG51bSxcbiAgICAgICAgdGV4dDogPHN0cmluZz4oPGFueT5udW0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cbn1cbiJdfQ==