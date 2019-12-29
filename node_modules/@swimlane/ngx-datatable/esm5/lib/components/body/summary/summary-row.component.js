/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    var cellsWithValues = cells.filter((/**
     * @param {?} cell
     * @return {?}
     */
    function (cell) { return !!cell; }));
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some((/**
     * @param {?} cell
     * @return {?}
     */
    function (cell) { return typeof cell !== 'number'; }))) {
        return null;
    }
    return cellsWithValues.reduce((/**
     * @param {?} res
     * @param {?} cell
     * @return {?}
     */
    function (res, cell) { return res + cell; }));
}
/**
 * @param {?} cells
 * @return {?}
 */
function noopSumFunc(cells) {
    return null;
}
var DataTableSummaryRowComponent = /** @class */ (function () {
    function DataTableSummaryRowComponent() {
        this.summaryRow = {};
    }
    /**
     * @return {?}
     */
    DataTableSummaryRowComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    };
    /**
     * @private
     * @return {?}
     */
    DataTableSummaryRowComponent.prototype.updateInternalColumns = /**
     * @private
     * @return {?}
     */
    function () {
        this._internalColumns = this.columns.map((/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return (tslib_1.__assign({}, col, { cellTemplate: col.summaryTemplate })); }));
    };
    /**
     * @private
     * @return {?}
     */
    DataTableSummaryRowComponent.prototype.updateValues = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.summaryRow = {};
        this.columns
            .filter((/**
         * @param {?} col
         * @return {?}
         */
        function (col) { return !col.summaryTemplate; }))
            .forEach((/**
         * @param {?} col
         * @return {?}
         */
        function (col) {
            /** @type {?} */
            var cellsFromSingleColumn = _this.rows.map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row[col.prop]; }));
            /** @type {?} */
            var sumFunc = _this.getSummaryFunction(col);
            _this.summaryRow[col.prop] = col.pipe
                ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
                : sumFunc(cellsFromSingleColumn);
        }));
    };
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    DataTableSummaryRowComponent.prototype.getSummaryFunction = /**
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    };
    DataTableSummaryRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-summary-row',
                    template: "\n    <datatable-body-row\n      *ngIf=\"summaryRow && _internalColumns\"\n      tabindex=\"-1\"\n      [innerWidth]=\"innerWidth\"\n      [offsetX]=\"offsetX\"\n      [columns]=\"_internalColumns\"\n      [rowHeight]=\"rowHeight\"\n      [row]=\"summaryRow\"\n      [rowIndex]=\"-1\"\n    >\n    </datatable-body-row>\n  ",
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
    return DataTableSummaryRowComponent;
}());
export { DataTableSummaryRowComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L3N1bW1hcnkvc3VtbWFyeS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXlDLE1BQU0sZUFBZSxDQUFDOzs7O0FBRXhGLG9DQU1DOzs7SUFMQyxxQ0FBb0M7O0lBQ3BDLHlDQUFtQzs7SUFFbkMsOEJBQWE7O0lBQ2IsOEJBQXFCOzs7Ozs7QUFHdkIsU0FBUyxjQUFjLENBQUMsS0FBWTs7UUFDNUIsZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O0lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sRUFBQztJQUVwRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtRQUMzQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxlQUFlLENBQUMsSUFBSTs7OztJQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxJQUFJLEtBQUssUUFBUSxFQUF4QixDQUF3QixFQUFDLEVBQUU7UUFDMUQsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sZUFBZSxDQUFDLE1BQU07Ozs7O0lBQUMsVUFBQyxHQUFHLEVBQUUsSUFBSSxJQUFLLE9BQUEsR0FBRyxHQUFHLElBQUksRUFBVixDQUFVLEVBQUMsQ0FBQztBQUMzRCxDQUFDOzs7OztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQVk7SUFDL0IsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7SUFBQTtRQTRCRSxlQUFVLEdBQVEsRUFBRSxDQUFDO0lBeUN2QixDQUFDOzs7O0lBdkNDLGtEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUMvQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTyw0REFBcUI7Ozs7SUFBN0I7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxzQkFDM0MsR0FBRyxJQUNOLFlBQVksRUFBRSxHQUFHLENBQUMsZUFBZSxJQUNqQyxFQUg4QyxDQUc5QyxFQUFDLENBQUM7SUFDTixDQUFDOzs7OztJQUVPLG1EQUFZOzs7O0lBQXBCO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsT0FBTzthQUNULE1BQU07Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBcEIsQ0FBb0IsRUFBQzthQUNuQyxPQUFPOzs7O1FBQUMsVUFBQSxHQUFHOztnQkFDSixxQkFBcUIsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxFQUFDOztnQkFDM0QsT0FBTyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7WUFFNUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUk7Z0JBQ2xDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8seURBQWtCOzs7OztJQUExQixVQUEyQixNQUFzQjtRQUMvQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUN0QyxPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Z0JBcEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsb1VBWVQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx1QkFBdUI7cUJBQy9CO2lCQUNGOzs7dUJBRUUsS0FBSzswQkFDTCxLQUFLOzRCQUVMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOztJQTRDUixtQ0FBQztDQUFBLEFBckVELElBcUVDO1NBbERZLDRCQUE0Qjs7O0lBQ3ZDLDRDQUFxQjs7SUFDckIsK0NBQW1DOztJQUVuQyxpREFBMkI7O0lBQzNCLCtDQUF5Qjs7SUFDekIsa0RBQTRCOztJQUU1Qix3REFBbUM7O0lBQ25DLGtEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgUGlwZVRyYW5zZm9ybSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3VtbWFyeUNvbHVtbiB7XG4gIHN1bW1hcnlGdW5jPzogKGNlbGxzOiBhbnlbXSkgPT4gYW55O1xuICBzdW1tYXJ5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHByb3A6IHN0cmluZztcbiAgcGlwZT86IFBpcGVUcmFuc2Zvcm07XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdW1GdW5jKGNlbGxzOiBhbnlbXSk6IGFueSB7XG4gIGNvbnN0IGNlbGxzV2l0aFZhbHVlcyA9IGNlbGxzLmZpbHRlcihjZWxsID0+ICEhY2VsbCk7XG5cbiAgaWYgKCFjZWxsc1dpdGhWYWx1ZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGNlbGxzV2l0aFZhbHVlcy5zb21lKGNlbGwgPT4gdHlwZW9mIGNlbGwgIT09ICdudW1iZXInKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGNlbGxzV2l0aFZhbHVlcy5yZWR1Y2UoKHJlcywgY2VsbCkgPT4gcmVzICsgY2VsbCk7XG59XG5cbmZ1bmN0aW9uIG5vb3BTdW1GdW5jKGNlbGxzOiBhbnlbXSk6IHZvaWQge1xuICByZXR1cm4gbnVsbDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXN1bW1hcnktcm93JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGF0YXRhYmxlLWJvZHktcm93XG4gICAgICAqbmdJZj1cInN1bW1hcnlSb3cgJiYgX2ludGVybmFsQ29sdW1uc1wiXG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxuICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXG4gICAgICBbY29sdW1uc109XCJfaW50ZXJuYWxDb2x1bW5zXCJcbiAgICAgIFtyb3dIZWlnaHRdPVwicm93SGVpZ2h0XCJcbiAgICAgIFtyb3ddPVwic3VtbWFyeVJvd1wiXG4gICAgICBbcm93SW5kZXhdPVwiLTFcIlxuICAgID5cbiAgICA8L2RhdGF0YWJsZS1ib2R5LXJvdz5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXN1bW1hcnktcm93J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSByb3dzOiBhbnlbXTtcbiAgQElucHV0KCkgY29sdW1uczogSVN1bW1hcnlDb2x1bW5bXTtcblxuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyO1xuICBASW5wdXQoKSBpbm5lcldpZHRoOiBudW1iZXI7XG5cbiAgX2ludGVybmFsQ29sdW1uczogSVN1bW1hcnlDb2x1bW5bXTtcbiAgc3VtbWFyeVJvdzogYW55ID0ge307XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbnMgfHwgIXRoaXMucm93cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUludGVybmFsQ29sdW1ucygpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVzKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUludGVybmFsQ29sdW1ucygpIHtcbiAgICB0aGlzLl9pbnRlcm5hbENvbHVtbnMgPSB0aGlzLmNvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgLi4uY29sLFxuICAgICAgY2VsbFRlbXBsYXRlOiBjb2wuc3VtbWFyeVRlbXBsYXRlXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZXMoKSB7XG4gICAgdGhpcy5zdW1tYXJ5Um93ID0ge307XG5cbiAgICB0aGlzLmNvbHVtbnNcbiAgICAgIC5maWx0ZXIoY29sID0+ICFjb2wuc3VtbWFyeVRlbXBsYXRlKVxuICAgICAgLmZvckVhY2goY29sID0+IHtcbiAgICAgICAgY29uc3QgY2VsbHNGcm9tU2luZ2xlQ29sdW1uID0gdGhpcy5yb3dzLm1hcChyb3cgPT4gcm93W2NvbC5wcm9wXSk7XG4gICAgICAgIGNvbnN0IHN1bUZ1bmMgPSB0aGlzLmdldFN1bW1hcnlGdW5jdGlvbihjb2wpO1xuXG4gICAgICAgIHRoaXMuc3VtbWFyeVJvd1tjb2wucHJvcF0gPSBjb2wucGlwZVxuICAgICAgICAgID8gY29sLnBpcGUudHJhbnNmb3JtKHN1bUZ1bmMoY2VsbHNGcm9tU2luZ2xlQ29sdW1uKSlcbiAgICAgICAgICA6IHN1bUZ1bmMoY2VsbHNGcm9tU2luZ2xlQ29sdW1uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdW1tYXJ5RnVuY3Rpb24oY29sdW1uOiBJU3VtbWFyeUNvbHVtbik6IChhOiBhbnlbXSkgPT4gYW55IHtcbiAgICBpZiAoY29sdW1uLnN1bW1hcnlGdW5jID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0U3VtRnVuYztcbiAgICB9IGVsc2UgaWYgKGNvbHVtbi5zdW1tYXJ5RnVuYyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5vb3BTdW1GdW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29sdW1uLnN1bW1hcnlGdW5jO1xuICAgIH1cbiAgfVxufVxuIl19