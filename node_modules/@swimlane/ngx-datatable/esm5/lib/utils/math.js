/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { columnsByPin, columnsTotalWidth } from './column';
/**
 * Calculates the Total Flex Grow
 * @param {?} columns
 * @return {?}
 */
export function getTotalFlexGrow(columns) {
    var e_1, _a;
    /** @type {?} */
    var totalFlexGrow = 0;
    try {
        for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
            var c = columns_1_1.value;
            totalFlexGrow += c.flexGrow || 0;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {?} allColumns
 * @param {?} expectedWidth
 * @return {?}
 */
export function adjustColumnWidths(allColumns, expectedWidth) {
    /** @type {?} */
    var columnsWidth = columnsTotalWidth(allColumns);
    /** @type {?} */
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    /** @type {?} */
    var colsByGroup = columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {?} colsByGroup
 * @param {?} maxWidth
 * @param {?} totalFlexGrow
 * @return {?}
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    var e_2, _a, e_3, _b;
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        try {
            for (var _c = (e_2 = void 0, tslib_1.__values(colsByGroup[attr])), _d = _c.next(); !_d.done; _d = _c.next()) {
                var column = _d.value;
                if (!column.canAutoResize) {
                    maxWidth -= column.width;
                    totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
                }
                else {
                    column.width = 0;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    /** @type {?} */
    var hasMinWidth = {};
    /** @type {?} */
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        /** @type {?} */
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            try {
                for (var _e = (e_3 = void 0, tslib_1.__values(colsByGroup[attr])), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var column = _f.value;
                    // if the column can be resize and it hasn't reached its minimum width yet
                    if (column.canAutoResize && !hasMinWidth[column.prop]) {
                        /** @type {?} */
                        var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                        if (column.minWidth !== undefined && newWidth < column.minWidth) {
                            remainingWidth += newWidth - column.minWidth;
                            column.width = column.minWidth;
                            hasMinWidth[column.prop] = true;
                        }
                        else {
                            column.width = newWidth;
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 * @param {?} allColumns
 * @param {?} expectedWidth
 * @param {?} startIdx
 * @param {?} allowBleed
 * @param {?=} defaultColWidth
 * @return {?}
 */
export function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth) {
    var e_4, _a, e_5, _b;
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    /** @type {?} */
    var columnsToResize = allColumns.slice(startIdx + 1, allColumns.length).filter((/**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return c.canAutoResize !== false;
    }));
    try {
        for (var columnsToResize_1 = tslib_1.__values(columnsToResize), columnsToResize_1_1 = columnsToResize_1.next(); !columnsToResize_1_1.done; columnsToResize_1_1 = columnsToResize_1.next()) {
            var column = columnsToResize_1_1.value;
            if (!column.$$oldWidth) {
                column.$$oldWidth = column.width;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (columnsToResize_1_1 && !columnsToResize_1_1.done && (_a = columnsToResize_1.return)) _a.call(columnsToResize_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    /** @type {?} */
    var additionWidthPerColumn = 0;
    /** @type {?} */
    var exceedsWindow = false;
    /** @type {?} */
    var contentWidth = getContentWidth(allColumns, defaultColWidth);
    /** @type {?} */
    var remainingWidth = expectedWidth - contentWidth;
    /** @type {?} */
    var columnsProcessed = [];
    /** @type {?} */
    var remainingWidthLimit = 1;
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        try {
            for (var columnsToResize_2 = (e_5 = void 0, tslib_1.__values(columnsToResize)), columnsToResize_2_1 = columnsToResize_2.next(); !columnsToResize_2_1.done; columnsToResize_2_1 = columnsToResize_2.next()) {
                var column = columnsToResize_2_1.value;
                if (exceedsWindow && allowBleed) {
                    column.width = column.$$oldWidth || column.width || defaultColWidth;
                }
                else {
                    /** @type {?} */
                    var newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                    if (column.minWidth && newSize < column.minWidth) {
                        column.width = column.minWidth;
                        columnsProcessed.push(column);
                    }
                    else if (column.maxWidth && newSize > column.maxWidth) {
                        column.width = column.maxWidth;
                        columnsProcessed.push(column);
                    }
                    else {
                        column.width = newSize;
                    }
                }
                column.width = Math.max(0, column.width);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (columnsToResize_2_1 && !columnsToResize_2_1.done && (_b = columnsToResize_2.return)) _b.call(columnsToResize_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > remainingWidthLimit && columnsToResize.length !== 0);
}
/**
 * Remove the processed columns from the current active columns.
 * @param {?} columnsToResize
 * @param {?} columnsProcessed
 * @return {?}
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    var e_6, _a;
    try {
        for (var columnsProcessed_1 = tslib_1.__values(columnsProcessed), columnsProcessed_1_1 = columnsProcessed_1.next(); !columnsProcessed_1_1.done; columnsProcessed_1_1 = columnsProcessed_1.next()) {
            var column = columnsProcessed_1_1.value;
            /** @type {?} */
            var index = columnsToResize.indexOf(column);
            columnsToResize.splice(index, 1);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (columnsProcessed_1_1 && !columnsProcessed_1_1.done && (_a = columnsProcessed_1.return)) _a.call(columnsProcessed_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
}
/**
 * Gets the width of the columns
 * @param {?} allColumns
 * @param {?=} defaultColWidth
 * @return {?}
 */
function getContentWidth(allColumns, defaultColWidth) {
    var e_7, _a;
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    /** @type {?} */
    var contentWidth = 0;
    try {
        for (var allColumns_1 = tslib_1.__values(allColumns), allColumns_1_1 = allColumns_1.next(); !allColumns_1_1.done; allColumns_1_1 = allColumns_1.next()) {
            var column = allColumns_1_1.value;
            contentWidth += column.width || defaultColWidth;
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (allColumns_1_1 && !allColumns_1_1.done && (_a = allColumns_1.return)) _a.call(allColumns_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return contentWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFLM0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQWM7OztRQUN6QyxhQUFhLEdBQUcsQ0FBQzs7UUFFckIsS0FBZ0IsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtZQUFwQixJQUFNLENBQUMsb0JBQUE7WUFDVixhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7U0FDbEM7Ozs7Ozs7OztJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFVBQWUsRUFBRSxhQUFrQjs7UUFDOUQsWUFBWSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQzs7UUFDNUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7UUFDNUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7SUFFNUMsSUFBSSxZQUFZLEtBQUssYUFBYSxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQ3pEO0FBQ0gsQ0FBQzs7Ozs7Ozs7QUFLRCxTQUFTLFlBQVksQ0FBQyxXQUFnQixFQUFFLFFBQWEsRUFBRSxhQUFrQjs7SUFDdkUsNkVBQTZFO0lBQzdFLEtBQUssSUFBTSxJQUFJLElBQUksV0FBVyxFQUFFOztZQUM5QixLQUFxQixJQUFBLG9CQUFBLGlCQUFBLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLGdCQUFBLDRCQUFFO2dCQUFuQyxJQUFNLE1BQU0sV0FBQTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtvQkFDekIsUUFBUSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3pCLGFBQWEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjthQUNGOzs7Ozs7Ozs7S0FDRjs7UUFFSyxXQUFXLEdBQUcsRUFBRTs7UUFDbEIsY0FBYyxHQUFHLFFBQVE7SUFFN0IsMERBQTBEO0lBQzFELEdBQUc7O1lBQ0ssaUJBQWlCLEdBQUcsY0FBYyxHQUFHLGFBQWE7UUFDeEQsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixLQUFLLElBQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTs7Z0JBQzlCLEtBQXFCLElBQUEsb0JBQUEsaUJBQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUEsZ0JBQUEsNEJBQUU7b0JBQW5DLElBQU0sTUFBTSxXQUFBO29CQUNmLDBFQUEwRTtvQkFDMUUsSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTs7NEJBQy9DLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsaUJBQWlCO3dCQUNuRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFOzRCQUMvRCxjQUFjLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7NEJBQzdDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDL0IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7eUJBQ2pDOzZCQUFNOzRCQUNMLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO3lCQUN6QjtxQkFDRjtpQkFDRjs7Ozs7Ozs7O1NBQ0Y7S0FDRixRQUFRLGNBQWMsS0FBSyxDQUFDLEVBQUU7QUFDakMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxVQUFpQixFQUNqQixhQUFxQixFQUNyQixRQUFnQixFQUNoQixVQUFtQixFQUNuQixlQUE2Qjs7SUFBN0IsZ0NBQUEsRUFBQSxxQkFBNkI7O1FBRXZCLGVBQWUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07Ozs7SUFBQyxVQUFBLENBQUM7UUFDaEYsT0FBTyxDQUFDLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQztJQUNuQyxDQUFDLEVBQUM7O1FBRUYsS0FBcUIsSUFBQSxvQkFBQSxpQkFBQSxlQUFlLENBQUEsZ0RBQUEsNkVBQUU7WUFBakMsSUFBTSxNQUFNLDRCQUFBO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNsQztTQUNGOzs7Ozs7Ozs7O1FBRUcsc0JBQXNCLEdBQUcsQ0FBQzs7UUFDMUIsYUFBYSxHQUFHLEtBQUs7O1FBQ3JCLFlBQVksR0FBRyxlQUFlLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQzs7UUFDM0QsY0FBYyxHQUFHLGFBQWEsR0FBRyxZQUFZOztRQUMzQyxnQkFBZ0IsR0FBVSxFQUFFOztRQUM1QixtQkFBbUIsR0FBRyxDQUFDO0lBRTdCLDhCQUE4QjtJQUM5QixHQUFHO1FBQ0Qsc0JBQXNCLEdBQUcsY0FBYyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDakUsYUFBYSxHQUFHLFlBQVksSUFBSSxhQUFhLENBQUM7O1lBRTlDLEtBQXFCLElBQUEsbUNBQUEsaUJBQUEsZUFBZSxDQUFBLENBQUEsZ0RBQUEsNkVBQUU7Z0JBQWpDLElBQU0sTUFBTSw0QkFBQTtnQkFDZixJQUFJLGFBQWEsSUFBSSxVQUFVLEVBQUU7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLGVBQWUsQ0FBQztpQkFDckU7cUJBQU07O3dCQUNDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDLEdBQUcsc0JBQXNCO29CQUUxRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQ2hELE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUMvQjt5QkFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7d0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzt3QkFDL0IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUMvQjt5QkFBTTt3QkFDTCxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztxQkFDeEI7aUJBQ0Y7Z0JBRUQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUM7Ozs7Ozs7OztRQUVELFlBQVksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsY0FBYyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDOUMsc0JBQXNCLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7S0FDM0QsUUFBUSxjQUFjLEdBQUcsbUJBQW1CLElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDakYsQ0FBQzs7Ozs7OztBQUtELFNBQVMsc0JBQXNCLENBQUMsZUFBc0IsRUFBRSxnQkFBdUI7OztRQUM3RSxLQUFxQixJQUFBLHFCQUFBLGlCQUFBLGdCQUFnQixDQUFBLGtEQUFBLGdGQUFFO1lBQWxDLElBQU0sTUFBTSw2QkFBQTs7Z0JBQ1QsS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzdDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xDOzs7Ozs7Ozs7QUFDSCxDQUFDOzs7Ozs7O0FBS0QsU0FBUyxlQUFlLENBQUMsVUFBZSxFQUFFLGVBQTZCOztJQUE3QixnQ0FBQSxFQUFBLHFCQUE2Qjs7UUFDakUsWUFBWSxHQUFHLENBQUM7O1FBRXBCLEtBQXFCLElBQUEsZUFBQSxpQkFBQSxVQUFVLENBQUEsc0NBQUEsOERBQUU7WUFBNUIsSUFBTSxNQUFNLHVCQUFBO1lBQ2YsWUFBWSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDO1NBQ2pEOzs7Ozs7Ozs7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5zVG90YWxXaWR0aCB9IGZyb20gJy4vY29sdW1uJztcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBUb3RhbCBGbGV4IEdyb3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdGFsRmxleEdyb3coY29sdW1uczogYW55W10pIHtcbiAgbGV0IHRvdGFsRmxleEdyb3cgPSAwO1xuXG4gIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgdG90YWxGbGV4R3JvdyArPSBjLmZsZXhHcm93IHx8IDA7XG4gIH1cblxuICByZXR1cm4gdG90YWxGbGV4R3Jvdztcbn1cblxuLyoqXG4gKiBBZGp1c3RzIHRoZSBjb2x1bW4gd2lkdGhzLlxuICogSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9maXhlZC1kYXRhLXRhYmxlL2Jsb2IvbWFzdGVyL3NyYy9GaXhlZERhdGFUYWJsZVdpZHRoSGVscGVyLmpzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RDb2x1bW5XaWR0aHMoYWxsQ29sdW1uczogYW55LCBleHBlY3RlZFdpZHRoOiBhbnkpIHtcbiAgY29uc3QgY29sdW1uc1dpZHRoID0gY29sdW1uc1RvdGFsV2lkdGgoYWxsQ29sdW1ucyk7XG4gIGNvbnN0IHRvdGFsRmxleEdyb3cgPSBnZXRUb3RhbEZsZXhHcm93KGFsbENvbHVtbnMpO1xuICBjb25zdCBjb2xzQnlHcm91cCA9IGNvbHVtbnNCeVBpbihhbGxDb2x1bW5zKTtcblxuICBpZiAoY29sdW1uc1dpZHRoICE9PSBleHBlY3RlZFdpZHRoKSB7XG4gICAgc2NhbGVDb2x1bW5zKGNvbHNCeUdyb3VwLCBleHBlY3RlZFdpZHRoLCB0b3RhbEZsZXhHcm93KTtcbiAgfVxufVxuXG4vKipcbiAqIFJlc2l6ZXMgY29sdW1ucyBiYXNlZCBvbiB0aGUgZmxleEdyb3cgcHJvcGVydHksIHdoaWxlIHJlc3BlY3RpbmcgbWFudWFsbHkgc2V0IHdpZHRoc1xuICovXG5mdW5jdGlvbiBzY2FsZUNvbHVtbnMoY29sc0J5R3JvdXA6IGFueSwgbWF4V2lkdGg6IGFueSwgdG90YWxGbGV4R3JvdzogYW55KSB7XG4gIC8vIGNhbGN1bGF0ZSB0b3RhbCB3aWR0aCBhbmQgZmxleGdyb3cgcG9pbnRzIGZvciBjb3VsdW1ucyB0aGF0IGNhbiBiZSByZXNpemVkXG4gIGZvciAoY29uc3QgYXR0ciBpbiBjb2xzQnlHcm91cCkge1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHNCeUdyb3VwW2F0dHJdKSB7XG4gICAgICBpZiAoIWNvbHVtbi5jYW5BdXRvUmVzaXplKSB7XG4gICAgICAgIG1heFdpZHRoIC09IGNvbHVtbi53aWR0aDtcbiAgICAgICAgdG90YWxGbGV4R3JvdyAtPSBjb2x1bW4uZmxleEdyb3cgPyBjb2x1bW4uZmxleEdyb3cgOiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uLndpZHRoID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBoYXNNaW5XaWR0aCA9IHt9O1xuICBsZXQgcmVtYWluaW5nV2lkdGggPSBtYXhXaWR0aDtcblxuICAvLyByZXNpemUgY29sdW1ucyB1bnRpbCBubyB3aWR0aCBpcyBsZWZ0IHRvIGJlIGRpc3RyaWJ1dGVkXG4gIGRvIHtcbiAgICBjb25zdCB3aWR0aFBlckZsZXhQb2ludCA9IHJlbWFpbmluZ1dpZHRoIC8gdG90YWxGbGV4R3JvdztcbiAgICByZW1haW5pbmdXaWR0aCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGF0dHIgaW4gY29sc0J5R3JvdXApIHtcbiAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHNCeUdyb3VwW2F0dHJdKSB7XG4gICAgICAgIC8vIGlmIHRoZSBjb2x1bW4gY2FuIGJlIHJlc2l6ZSBhbmQgaXQgaGFzbid0IHJlYWNoZWQgaXRzIG1pbmltdW0gd2lkdGggeWV0XG4gICAgICAgIGlmIChjb2x1bW4uY2FuQXV0b1Jlc2l6ZSAmJiAhaGFzTWluV2lkdGhbY29sdW1uLnByb3BdKSB7XG4gICAgICAgICAgY29uc3QgbmV3V2lkdGggPSBjb2x1bW4ud2lkdGggKyBjb2x1bW4uZmxleEdyb3cgKiB3aWR0aFBlckZsZXhQb2ludDtcbiAgICAgICAgICBpZiAoY29sdW1uLm1pbldpZHRoICE9PSB1bmRlZmluZWQgJiYgbmV3V2lkdGggPCBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoICs9IG5ld1dpZHRoIC0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICAgICAgaGFzTWluV2lkdGhbY29sdW1uLnByb3BdID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLndpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IHdoaWxlIChyZW1haW5pbmdXaWR0aCAhPT0gMCk7XG59XG5cbi8qKlxuICogRm9yY2VzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1ucyB0b1xuICogZGlzdHJpYnV0ZSBlcXVhbGx5IGJ1dCBvdmVyZmxvd2luZyB3aGVuIG5lY2Vzc2FyeVxuICpcbiAqIFJ1bGVzOlxuICpcbiAqICAtIElmIGNvbWJpbmVkIHdpdGhzIGFyZSBsZXNzIHRoYW4gdGhlIHRvdGFsIHdpZHRoIG9mIHRoZSBncmlkLFxuICogICAgcHJvcG9ydGlvbiB0aGUgd2lkdGhzIGdpdmVuIHRoZSBtaW4gLyBtYXggLyBub3JtYWwgd2lkdGhzIHRvIGZpbGwgdGhlIHdpZHRoLlxuICpcbiAqICAtIElmIHRoZSBjb21iaW5lZCB3aWR0aHMsIGV4Y2VlZCB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGdyaWQsXG4gKiAgICB1c2UgdGhlIHN0YW5kYXJkIHdpZHRocy5cbiAqXG4gKiAgLSBJZiBhIGNvbHVtbiBpcyByZXNpemVkLCBpdCBzaG91bGQgYWx3YXlzIHVzZSB0aGF0IHdpZHRoXG4gKlxuICogIC0gVGhlIHByb3BvcnRpb25hbCB3aWR0aHMgc2hvdWxkIG5ldmVyIGZhbGwgYmVsb3cgbWluIHNpemUgaWYgc3BlY2lmaWVkLlxuICpcbiAqICAtIElmIHRoZSBncmlkIHN0YXJ0cyBvZmYgc21hbGwgYnV0IHRoZW4gYmVjb21lcyBncmVhdGVyIHRoYW4gdGhlIHNpemUgKCArIC8gLSApXG4gKiAgICB0aGUgd2lkdGggc2hvdWxkIHVzZSB0aGUgb3JpZ2luYWwgd2lkdGg7IG5vdCB0aGUgbmV3bHkgcHJvcG9ydGlvbmVkIHdpZHRocy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcmNlRmlsbENvbHVtbldpZHRocyhcbiAgYWxsQ29sdW1uczogYW55W10sXG4gIGV4cGVjdGVkV2lkdGg6IG51bWJlcixcbiAgc3RhcnRJZHg6IG51bWJlcixcbiAgYWxsb3dCbGVlZDogYm9vbGVhbixcbiAgZGVmYXVsdENvbFdpZHRoOiBudW1iZXIgPSAzMDBcbikge1xuICBjb25zdCBjb2x1bW5zVG9SZXNpemUgPSBhbGxDb2x1bW5zLnNsaWNlKHN0YXJ0SWR4ICsgMSwgYWxsQ29sdW1ucy5sZW5ndGgpLmZpbHRlcihjID0+IHtcbiAgICByZXR1cm4gYy5jYW5BdXRvUmVzaXplICE9PSBmYWxzZTtcbiAgfSk7XG5cbiAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uc1RvUmVzaXplKSB7XG4gICAgaWYgKCFjb2x1bW4uJCRvbGRXaWR0aCkge1xuICAgICAgY29sdW1uLiQkb2xkV2lkdGggPSBjb2x1bW4ud2lkdGg7XG4gICAgfVxuICB9XG5cbiAgbGV0IGFkZGl0aW9uV2lkdGhQZXJDb2x1bW4gPSAwO1xuICBsZXQgZXhjZWVkc1dpbmRvdyA9IGZhbHNlO1xuICBsZXQgY29udGVudFdpZHRoID0gZ2V0Q29udGVudFdpZHRoKGFsbENvbHVtbnMsIGRlZmF1bHRDb2xXaWR0aCk7XG4gIGxldCByZW1haW5pbmdXaWR0aCA9IGV4cGVjdGVkV2lkdGggLSBjb250ZW50V2lkdGg7XG4gIGNvbnN0IGNvbHVtbnNQcm9jZXNzZWQ6IGFueVtdID0gW107XG4gIGNvbnN0IHJlbWFpbmluZ1dpZHRoTGltaXQgPSAxOyAvLyB3aGVuIHRvIHN0b3BcblxuICAvLyBUaGlzIGxvb3AgdGFrZXMgY2FyZSBvZiB0aGVcbiAgZG8ge1xuICAgIGFkZGl0aW9uV2lkdGhQZXJDb2x1bW4gPSByZW1haW5pbmdXaWR0aCAvIGNvbHVtbnNUb1Jlc2l6ZS5sZW5ndGg7XG4gICAgZXhjZWVkc1dpbmRvdyA9IGNvbnRlbnRXaWR0aCA+PSBleHBlY3RlZFdpZHRoO1xuXG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uc1RvUmVzaXplKSB7XG4gICAgICBpZiAoZXhjZWVkc1dpbmRvdyAmJiBhbGxvd0JsZWVkKSB7XG4gICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi4kJG9sZFdpZHRoIHx8IGNvbHVtbi53aWR0aCB8fCBkZWZhdWx0Q29sV2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdTaXplID0gKGNvbHVtbi53aWR0aCB8fCBkZWZhdWx0Q29sV2lkdGgpICsgYWRkaXRpb25XaWR0aFBlckNvbHVtbjtcblxuICAgICAgICBpZiAoY29sdW1uLm1pbldpZHRoICYmIG5ld1NpemUgPCBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgICAgICAgY29sdW1uc1Byb2Nlc3NlZC5wdXNoKGNvbHVtbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLm1heFdpZHRoICYmIG5ld1NpemUgPiBjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgICAgICAgY29sdW1uc1Byb2Nlc3NlZC5wdXNoKGNvbHVtbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uLndpZHRoID0gbmV3U2l6ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb2x1bW4ud2lkdGggPSBNYXRoLm1heCgwLCBjb2x1bW4ud2lkdGgpO1xuICAgIH1cblxuICAgIGNvbnRlbnRXaWR0aCA9IGdldENvbnRlbnRXaWR0aChhbGxDb2x1bW5zKTtcbiAgICByZW1haW5pbmdXaWR0aCA9IGV4cGVjdGVkV2lkdGggLSBjb250ZW50V2lkdGg7XG4gICAgcmVtb3ZlUHJvY2Vzc2VkQ29sdW1ucyhjb2x1bW5zVG9SZXNpemUsIGNvbHVtbnNQcm9jZXNzZWQpO1xuICB9IHdoaWxlIChyZW1haW5pbmdXaWR0aCA+IHJlbWFpbmluZ1dpZHRoTGltaXQgJiYgY29sdW1uc1RvUmVzaXplLmxlbmd0aCAhPT0gMCk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBwcm9jZXNzZWQgY29sdW1ucyBmcm9tIHRoZSBjdXJyZW50IGFjdGl2ZSBjb2x1bW5zLlxuICovXG5mdW5jdGlvbiByZW1vdmVQcm9jZXNzZWRDb2x1bW5zKGNvbHVtbnNUb1Jlc2l6ZTogYW55W10sIGNvbHVtbnNQcm9jZXNzZWQ6IGFueVtdKSB7XG4gIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnNQcm9jZXNzZWQpIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbHVtbnNUb1Jlc2l6ZS5pbmRleE9mKGNvbHVtbik7XG4gICAgY29sdW1uc1RvUmVzaXplLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uc1xuICovXG5mdW5jdGlvbiBnZXRDb250ZW50V2lkdGgoYWxsQ29sdW1uczogYW55LCBkZWZhdWx0Q29sV2lkdGg6IG51bWJlciA9IDMwMCk6IG51bWJlciB7XG4gIGxldCBjb250ZW50V2lkdGggPSAwO1xuXG4gIGZvciAoY29uc3QgY29sdW1uIG9mIGFsbENvbHVtbnMpIHtcbiAgICBjb250ZW50V2lkdGggKz0gY29sdW1uLndpZHRoIHx8IGRlZmF1bHRDb2xXaWR0aDtcbiAgfVxuXG4gIHJldHVybiBjb250ZW50V2lkdGg7XG59XG4iXX0=