/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
/**
 * @record
 */
export function ISummaryColumn() { }
if (false) {
    /** @type {?|undefined} */
    ISummaryColumn.prototype.summaryFunc;
    /** @type {?|undefined} */
    ISummaryColumn.prototype.summaryTemplate;
    /** @type {?} */
    ISummaryColumn.prototype.prop;
    /** @type {?|undefined} */
    ISummaryColumn.prototype.pipe;
}
/**
 * @param {?} cells
 * @return {?}
 */
function defaultSumFunc(cells) {
    /** @type {?} */
    const cellsWithValues = cells.filter((/**
     * @param {?} cell
     * @return {?}
     */
    cell => !!cell));
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some((/**
     * @param {?} cell
     * @return {?}
     */
    cell => typeof cell !== 'number'))) {
        return null;
    }
    return cellsWithValues.reduce((/**
     * @param {?} res
     * @param {?} cell
     * @return {?}
     */
    (res, cell) => res + cell));
}
/**
 * @param {?} cells
 * @return {?}
 */
function noopSumFunc(cells) {
    return null;
}
export class DataTableSummaryRowComponent {
    constructor() {
        this.summaryRow = {};
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    }
    /**
     * @private
     * @return {?}
     */
    updateInternalColumns() {
        this._internalColumns = this.columns.map((/**
         * @param {?} col
         * @return {?}
         */
        col => (Object.assign({}, col, { cellTemplate: col.summaryTemplate }))));
    }
    /**
     * @private
     * @return {?}
     */
    updateValues() {
        this.summaryRow = {};
        this.columns
            .filter((/**
         * @param {?} col
         * @return {?}
         */
        col => !col.summaryTemplate))
            .forEach((/**
         * @param {?} col
         * @return {?}
         */
        col => {
            /** @type {?} */
            const cellsFromSingleColumn = this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            row => row[col.prop]));
            /** @type {?} */
            const sumFunc = this.getSummaryFunction(col);
            this.summaryRow[col.prop] = col.pipe
                ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
                : sumFunc(cellsFromSingleColumn);
        }));
    }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    getSummaryFunction(column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    }
}
DataTableSummaryRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-summary-row',
                template: `
    <datatable-body-row
      *ngIf="summaryRow && _internalColumns"
      tabindex="-1"
      [innerWidth]="innerWidth"
      [offsetX]="offsetX"
      [columns]="_internalColumns"
      [rowHeight]="rowHeight"
      [row]="summaryRow"
      [rowIndex]="-1"
    >
    </datatable-body-row>
  `,
                host: {
                    class: 'datatable-summary-row'
                }
            }] }
];
DataTableSummaryRowComponent.propDecorators = {
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    rowHeight: [{ type: Input }],
    offsetX: [{ type: Input }],
    innerWidth: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.rows;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.columns;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.rowHeight;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.offsetX;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.innerWidth;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype._internalColumns;
    /** @type {?} */
    DataTableSummaryRowComponent.prototype.summaryRow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L3N1bW1hcnkvc3VtbWFyeS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBeUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFFeEYsb0NBTUM7OztJQUxDLHFDQUFvQzs7SUFDcEMseUNBQW1DOztJQUVuQyw4QkFBYTs7SUFDYiw4QkFBcUI7Ozs7OztBQUd2QixTQUFTLGNBQWMsQ0FBQyxLQUFZOztVQUM1QixlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUM7SUFFcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksZUFBZSxDQUFDLElBQUk7Ozs7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBQyxFQUFFO1FBQzFELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLGVBQWUsQ0FBQyxNQUFNOzs7OztJQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksRUFBQyxDQUFDO0FBQzNELENBQUM7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBWTtJQUMvQixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFxQkQsTUFBTSxPQUFPLDRCQUE0QjtJQW5CekM7UUE0QkUsZUFBVSxHQUFRLEVBQUUsQ0FBQztJQXlDdkIsQ0FBQzs7OztJQXZDQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFDM0MsR0FBRyxJQUNOLFlBQVksRUFBRSxHQUFHLENBQUMsZUFBZSxJQUNqQyxFQUFDLENBQUM7SUFDTixDQUFDOzs7OztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLE9BQU87YUFDVCxNQUFNOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUM7YUFDbkMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFOztrQkFDUCxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUM7O2tCQUMzRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztZQUU1QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtnQkFDbEMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxNQUFzQjtRQUMvQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUN0QyxPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7O1lBcEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsdUJBQXVCO2lCQUMvQjthQUNGOzs7bUJBRUUsS0FBSztzQkFDTCxLQUFLO3dCQUVMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzs7O0lBTE4sNENBQXFCOztJQUNyQiwrQ0FBbUM7O0lBRW5DLGlEQUEyQjs7SUFDM0IsK0NBQXlCOztJQUN6QixrREFBNEI7O0lBRTVCLHdEQUFtQzs7SUFDbkMsa0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBQaXBlVHJhbnNmb3JtLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdW1tYXJ5Q29sdW1uIHtcbiAgc3VtbWFyeUZ1bmM/OiAoY2VsbHM6IGFueVtdKSA9PiBhbnk7XG4gIHN1bW1hcnlUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHJvcDogc3RyaW5nO1xuICBwaXBlPzogUGlwZVRyYW5zZm9ybTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFN1bUZ1bmMoY2VsbHM6IGFueVtdKTogYW55IHtcbiAgY29uc3QgY2VsbHNXaXRoVmFsdWVzID0gY2VsbHMuZmlsdGVyKGNlbGwgPT4gISFjZWxsKTtcblxuICBpZiAoIWNlbGxzV2l0aFZhbHVlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoY2VsbHNXaXRoVmFsdWVzLnNvbWUoY2VsbCA9PiB0eXBlb2YgY2VsbCAhPT0gJ251bWJlcicpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gY2VsbHNXaXRoVmFsdWVzLnJlZHVjZSgocmVzLCBjZWxsKSA9PiByZXMgKyBjZWxsKTtcbn1cblxuZnVuY3Rpb24gbm9vcFN1bUZ1bmMoY2VsbHM6IGFueVtdKTogdm9pZCB7XG4gIHJldHVybiBudWxsO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtc3VtbWFyeS1yb3cnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkYXRhdGFibGUtYm9keS1yb3dcbiAgICAgICpuZ0lmPVwic3VtbWFyeVJvdyAmJiBfaW50ZXJuYWxDb2x1bW5zXCJcbiAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXG4gICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcbiAgICAgIFtjb2x1bW5zXT1cIl9pbnRlcm5hbENvbHVtbnNcIlxuICAgICAgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIlxuICAgICAgW3Jvd109XCJzdW1tYXJ5Um93XCJcbiAgICAgIFtyb3dJbmRleF09XCItMVwiXG4gICAgPlxuICAgIDwvZGF0YXRhYmxlLWJvZHktcm93PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtc3VtbWFyeS1yb3cnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlU3VtbWFyeVJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHJvd3M6IGFueVtdO1xuICBASW5wdXQoKSBjb2x1bW5zOiBJU3VtbWFyeUNvbHVtbltdO1xuXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSBvZmZzZXRYOiBudW1iZXI7XG4gIEBJbnB1dCgpIGlubmVyV2lkdGg6IG51bWJlcjtcblxuICBfaW50ZXJuYWxDb2x1bW5zOiBJU3VtbWFyeUNvbHVtbltdO1xuICBzdW1tYXJ5Um93OiBhbnkgPSB7fTtcblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuY29sdW1ucyB8fCAhdGhpcy5yb3dzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXBkYXRlSW50ZXJuYWxDb2x1bW5zKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW50ZXJuYWxDb2x1bW5zKCkge1xuICAgIHRoaXMuX2ludGVybmFsQ29sdW1ucyA9IHRoaXMuY29sdW1ucy5tYXAoY29sID0+ICh7XG4gICAgICAuLi5jb2wsXG4gICAgICBjZWxsVGVtcGxhdGU6IGNvbC5zdW1tYXJ5VGVtcGxhdGVcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlcygpIHtcbiAgICB0aGlzLnN1bW1hcnlSb3cgPSB7fTtcblxuICAgIHRoaXMuY29sdW1uc1xuICAgICAgLmZpbHRlcihjb2wgPT4gIWNvbC5zdW1tYXJ5VGVtcGxhdGUpXG4gICAgICAuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICBjb25zdCBjZWxsc0Zyb21TaW5nbGVDb2x1bW4gPSB0aGlzLnJvd3MubWFwKHJvdyA9PiByb3dbY29sLnByb3BdKTtcbiAgICAgICAgY29uc3Qgc3VtRnVuYyA9IHRoaXMuZ2V0U3VtbWFyeUZ1bmN0aW9uKGNvbCk7XG5cbiAgICAgICAgdGhpcy5zdW1tYXJ5Um93W2NvbC5wcm9wXSA9IGNvbC5waXBlXG4gICAgICAgICAgPyBjb2wucGlwZS50cmFuc2Zvcm0oc3VtRnVuYyhjZWxsc0Zyb21TaW5nbGVDb2x1bW4pKVxuICAgICAgICAgIDogc3VtRnVuYyhjZWxsc0Zyb21TaW5nbGVDb2x1bW4pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFN1bW1hcnlGdW5jdGlvbihjb2x1bW46IElTdW1tYXJ5Q29sdW1uKTogKGE6IGFueVtdKSA9PiBhbnkge1xuICAgIGlmIChjb2x1bW4uc3VtbWFyeUZ1bmMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRTdW1GdW5jO1xuICAgIH0gZWxzZSBpZiAoY29sdW1uLnN1bW1hcnlGdW5jID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbm9vcFN1bUZ1bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb2x1bW4uc3VtbWFyeUZ1bmM7XG4gICAgfVxuICB9XG59XG4iXX0=