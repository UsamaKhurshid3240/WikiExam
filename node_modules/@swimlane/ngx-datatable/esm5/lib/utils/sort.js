/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getterForProp } from './column-prop-getters';
import { SortType } from '../types/sort.type';
import { SortDirection } from '../types/sort-direction.type';
/**
 * Gets the next sort direction
 * @param {?} sortType
 * @param {?} current
 * @return {?}
 */
export function nextSortDir(sortType, current) {
    if (sortType === SortType.single) {
        if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else {
            return SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection.asc;
        }
        else if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else if (current === SortDirection.desc) {
            return undefined;
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
}
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if (isNaN(parseFloat(a)) || !isFinite(a) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 * @param {?} rows
 * @param {?} columns
 * @param {?} dirs
 * @return {?}
 */
export function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return tslib_1.__spread(rows);
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     * @type {?}
     */
    var rowToIndexMap = new Map();
    rows.forEach((/**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) { return rowToIndexMap.set(row, index); }));
    /** @type {?} */
    var temp = tslib_1.__spread(rows);
    /** @type {?} */
    var cols = columns.reduce((/**
     * @param {?} obj
     * @param {?} col
     * @return {?}
     */
    function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }), {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    /** @type {?} */
    var cachedDirs = dirs.map((/**
     * @param {?} dir
     * @return {?}
     */
    function (dir) {
        /** @type {?} */
        var prop = dir.prop;
        return {
            prop: prop,
            dir: dir.dir,
            valueGetter: getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    }));
    return temp.sort((/**
     * @param {?} rowA
     * @param {?} rowB
     * @return {?}
     */
    function (rowA, rowB) {
        var e_1, _a;
        try {
            for (var cachedDirs_1 = tslib_1.__values(cachedDirs), cachedDirs_1_1 = cachedDirs_1.next(); !cachedDirs_1_1.done; cachedDirs_1_1 = cachedDirs_1.next()) {
                var cachedDir = cachedDirs_1_1.value;
                // Get property and valuegetters for column to be sorted
                var prop = cachedDir.prop, valueGetter = cachedDir.valueGetter;
                // Get A and B cell values from rows based on properties of the columns
                /** @type {?} */
                var propA = valueGetter(rowA, prop);
                /** @type {?} */
                var propB = valueGetter(rowB, prop);
                // Compare function gets five parameters:
                // Two cell values to be compared as propA and propB
                // Two rows corresponding to the cells as rowA and rowB
                // Direction of the sort for this column as SortDirection
                // Compare can be a standard JS comparison function (a,b) => -1|0|1
                // as additional parameters are silently ignored. The whole row and sort
                // direction enable more complex sort logic.
                /** @type {?} */
                var comparison = cachedDir.dir !== SortDirection.desc
                    ? cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir)
                    : -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
                // Don't return 0 yet in case of needing to sort by next property
                if (comparison !== 0)
                    return comparison;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cachedDirs_1_1 && !cachedDirs_1_1.done && (_a = cachedDirs_1.return)) _a.call(cachedDirs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7OztBQUs3RCxNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQWtCLEVBQUUsT0FBc0I7SUFDcEUsSUFBSSxRQUFRLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNoQyxJQUFJLE9BQU8sS0FBSyxhQUFhLENBQUMsR0FBRyxFQUFFO1lBQ2pDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztTQUMzQjthQUFNO1lBQ0wsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDO1NBQzFCO0tBQ0Y7U0FBTTtRQUNMLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7U0FDMUI7YUFBTSxJQUFJLE9BQU8sS0FBSyxhQUFhLENBQUMsR0FBRyxFQUFFO1lBQ3hDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztTQUMzQjthQUFNLElBQUksT0FBTyxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDekMsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFDRCxtREFBbUQ7UUFDbkQsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDOzs7Ozs7OztBQU1ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxDQUFNLEVBQUUsQ0FBTTtJQUM5QyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssV0FBVztRQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FB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QUFFO2dCQUEvQixJQUFNLFNBQVMsdUJBQUE7O2dCQUVWLElBQUEscUJBQUksRUFBRSxtQ0FBVzs7O29CQUVuQixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7O29CQUMvQixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7OztvQkFTL0IsVUFBVSxHQUNkLFNBQVMsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLElBQUk7b0JBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO29CQUM5RCxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUVuRSxpRUFBaUU7Z0JBQ2pFLElBQUksVUFBVSxLQUFLLENBQUM7b0JBQUUsT0FBTyxVQUFVLENBQUM7YUFDekM7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBFOztXQUVHO1FBQ0gsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0dGVyRm9yUHJvcCB9IGZyb20gJy4vY29sdW1uLXByb3AtZ2V0dGVycyc7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBTb3J0UHJvcERpciB9IGZyb20gJy4uL3R5cGVzL3NvcnQtcHJvcC1kaXIudHlwZSc7XG4vKipcbiAqIEdldHMgdGhlIG5leHQgc29ydCBkaXJlY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5leHRTb3J0RGlyKHNvcnRUeXBlOiBTb3J0VHlwZSwgY3VycmVudDogU29ydERpcmVjdGlvbik6IFNvcnREaXJlY3Rpb24gfCB1bmRlZmluZWQge1xuICBpZiAoc29ydFR5cGUgPT09IFNvcnRUeXBlLnNpbmdsZSkge1xuICAgIGlmIChjdXJyZW50ID09PSBTb3J0RGlyZWN0aW9uLmFzYykge1xuICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb24uZGVzYztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb24uYXNjO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uLmFzYztcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5kZXNjO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudCA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBhdm9pZCBUUzcwMzA6IE5vdCBhbGwgY29kZSBwYXRocyByZXR1cm4gYSB2YWx1ZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogQWRhcHRlZCBmcm9tIGZ1ZWxkLXVpIG9uIDYvMjE2XG4gKiBodHRwczovL2dpdGh1Yi5jb20vRnVlbEludGVyYWN0aXZlL2Z1ZWwtdWkvdHJlZS9tYXN0ZXIvc3JjL3BpcGVzL09yZGVyQnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyQnlDb21wYXJhdG9yKGE6IGFueSwgYjogYW55KTogbnVtYmVyIHtcbiAgaWYgKGEgPT09IG51bGwgfHwgdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnKSBhID0gMDtcbiAgaWYgKGIgPT09IG51bGwgfHwgdHlwZW9mIGIgPT09ICd1bmRlZmluZWQnKSBiID0gMDtcbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgaWYgKGEgPCBiKSByZXR1cm4gLTE7XG4gICAgaWYgKGEgPiBiKSByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChpc05hTihwYXJzZUZsb2F0KGEpKSB8fCAhaXNGaW5pdGUoYSkgfHwgKGlzTmFOKHBhcnNlRmxvYXQoYikpIHx8ICFpc0Zpbml0ZShiKSkpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZyBpbiBjYXNlIG9mIGE9MCBvciBiPTBcbiAgICBhID0gU3RyaW5nKGEpO1xuICAgIGIgPSBTdHJpbmcoYik7XG4gICAgLy8gSXNuJ3QgYSBudW1iZXIgc28gbG93ZXJjYXNlIHRoZSBzdHJpbmcgdG8gcHJvcGVybHkgY29tcGFyZVxuICAgIGlmIChhLnRvTG93ZXJDYXNlKCkgPCBiLnRvTG93ZXJDYXNlKCkpIHJldHVybiAtMTtcbiAgICBpZiAoYS50b0xvd2VyQ2FzZSgpID4gYi50b0xvd2VyQ2FzZSgpKSByZXR1cm4gMTtcbiAgfSBlbHNlIHtcbiAgICAvLyBQYXJzZSBzdHJpbmdzIGFzIG51bWJlcnMgdG8gY29tcGFyZSBwcm9wZXJseVxuICAgIGlmIChwYXJzZUZsb2F0KGEpIDwgcGFyc2VGbG9hdChiKSkgcmV0dXJuIC0xO1xuICAgIGlmIChwYXJzZUZsb2F0KGEpID4gcGFyc2VGbG9hdChiKSkgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBlcXVhbCBlYWNoIG90aGVyXG4gIHJldHVybiAwO1xufVxuXG4vKipcbiAqIGNyZWF0ZXMgYSBzaGFsbG93IGNvcHkgb2YgdGhlIGByb3dzYCBpbnB1dCBhbmQgcmV0dXJucyB0aGUgc29ydGVkIGNvcHkuIHRoaXMgZnVuY3Rpb25cbiAqIGRvZXMgbm90IHNvcnQgdGhlIGByb3dzYCBhcmd1bWVudCBpbiBwbGFjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc29ydFJvd3Mocm93czogYW55W10sIGNvbHVtbnM6IGFueVtdLCBkaXJzOiBTb3J0UHJvcERpcltdKTogYW55W10ge1xuICBpZiAoIXJvd3MpIHJldHVybiBbXTtcbiAgaWYgKCFkaXJzIHx8ICFkaXJzLmxlbmd0aCB8fCAhY29sdW1ucykgcmV0dXJuIFsuLi5yb3dzXTtcblxuICAvKipcbiAgICogcmVjb3JkIHRoZSByb3cgb3JkZXJpbmcgb2YgcmVzdWx0cyBmcm9tIHByaW9yIHNvcnQgb3BlcmF0aW9ucyAoaWYgYXBwbGljYWJsZSlcbiAgICogdGhpcyBpcyBuZWNlc3NhcnkgdG8gZ3VhcmFudGVlIHN0YWJsZSBzb3J0aW5nIGJlaGF2aW9yXG4gICAqL1xuICBjb25zdCByb3dUb0luZGV4TWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgcm93cy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiByb3dUb0luZGV4TWFwLnNldChyb3csIGluZGV4KSk7XG5cbiAgY29uc3QgdGVtcCA9IFsuLi5yb3dzXTtcbiAgY29uc3QgY29scyA9IGNvbHVtbnMucmVkdWNlKChvYmosIGNvbCkgPT4ge1xuICAgIGlmIChjb2wuY29tcGFyYXRvciAmJiB0eXBlb2YgY29sLmNvbXBhcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9ialtjb2wucHJvcF0gPSBjb2wuY29tcGFyYXRvcjtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xuXG4gIC8vIGNhY2hlIHZhbHVlR2V0dGVyIGFuZCBjb21wYXJlRm4gc28gdGhhdCB0aGV5XG4gIC8vIGRvIG5vdCBuZWVkIHRvIGJlIGxvb2tlZC11cCBpbiB0aGUgc29ydCBmdW5jdGlvbiBib2R5XG4gIGNvbnN0IGNhY2hlZERpcnMgPSBkaXJzLm1hcChkaXIgPT4ge1xuICAgIGNvbnN0IHByb3AgPSBkaXIucHJvcDtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcCxcbiAgICAgIGRpcjogZGlyLmRpcixcbiAgICAgIHZhbHVlR2V0dGVyOiBnZXR0ZXJGb3JQcm9wKHByb3ApLFxuICAgICAgY29tcGFyZUZuOiBjb2xzW3Byb3BdIHx8IG9yZGVyQnlDb21wYXJhdG9yXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRlbXAuc29ydChmdW5jdGlvbihyb3dBOiBhbnksIHJvd0I6IGFueSkge1xuICAgIGZvciAoY29uc3QgY2FjaGVkRGlyIG9mIGNhY2hlZERpcnMpIHtcbiAgICAgIC8vIEdldCBwcm9wZXJ0eSBhbmQgdmFsdWVnZXR0ZXJzIGZvciBjb2x1bW4gdG8gYmUgc29ydGVkXG4gICAgICBjb25zdCB7IHByb3AsIHZhbHVlR2V0dGVyIH0gPSBjYWNoZWREaXI7XG4gICAgICAvLyBHZXQgQSBhbmQgQiBjZWxsIHZhbHVlcyBmcm9tIHJvd3MgYmFzZWQgb24gcHJvcGVydGllcyBvZiB0aGUgY29sdW1uc1xuICAgICAgY29uc3QgcHJvcEEgPSB2YWx1ZUdldHRlcihyb3dBLCBwcm9wKTtcbiAgICAgIGNvbnN0IHByb3BCID0gdmFsdWVHZXR0ZXIocm93QiwgcHJvcCk7XG5cbiAgICAgIC8vIENvbXBhcmUgZnVuY3Rpb24gZ2V0cyBmaXZlIHBhcmFtZXRlcnM6XG4gICAgICAvLyBUd28gY2VsbCB2YWx1ZXMgdG8gYmUgY29tcGFyZWQgYXMgcHJvcEEgYW5kIHByb3BCXG4gICAgICAvLyBUd28gcm93cyBjb3JyZXNwb25kaW5nIHRvIHRoZSBjZWxscyBhcyByb3dBIGFuZCByb3dCXG4gICAgICAvLyBEaXJlY3Rpb24gb2YgdGhlIHNvcnQgZm9yIHRoaXMgY29sdW1uIGFzIFNvcnREaXJlY3Rpb25cbiAgICAgIC8vIENvbXBhcmUgY2FuIGJlIGEgc3RhbmRhcmQgSlMgY29tcGFyaXNvbiBmdW5jdGlvbiAoYSxiKSA9PiAtMXwwfDFcbiAgICAgIC8vIGFzIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBhcmUgc2lsZW50bHkgaWdub3JlZC4gVGhlIHdob2xlIHJvdyBhbmQgc29ydFxuICAgICAgLy8gZGlyZWN0aW9uIGVuYWJsZSBtb3JlIGNvbXBsZXggc29ydCBsb2dpYy5cbiAgICAgIGNvbnN0IGNvbXBhcmlzb24gPVxuICAgICAgICBjYWNoZWREaXIuZGlyICE9PSBTb3J0RGlyZWN0aW9uLmRlc2NcbiAgICAgICAgICA/IGNhY2hlZERpci5jb21wYXJlRm4ocHJvcEEsIHByb3BCLCByb3dBLCByb3dCLCBjYWNoZWREaXIuZGlyKVxuICAgICAgICAgIDogLWNhY2hlZERpci5jb21wYXJlRm4ocHJvcEEsIHByb3BCLCByb3dBLCByb3dCLCBjYWNoZWREaXIuZGlyKTtcblxuICAgICAgLy8gRG9uJ3QgcmV0dXJuIDAgeWV0IGluIGNhc2Ugb2YgbmVlZGluZyB0byBzb3J0IGJ5IG5leHQgcHJvcGVydHlcbiAgICAgIGlmIChjb21wYXJpc29uICE9PSAwKSByZXR1cm4gY29tcGFyaXNvbjtcbiAgICB9XG5cbiAgICBpZiAoIShyb3dUb0luZGV4TWFwLmhhcyhyb3dBKSAmJiByb3dUb0luZGV4TWFwLmhhcyhyb3dCKSkpIHJldHVybiAwO1xuXG4gICAgLyoqXG4gICAgICogYWxsIGVsc2UgYmVpbmcgZXF1YWwsIHByZXNlcnZlIG9yaWdpbmFsIG9yZGVyIG9mIHRoZSByb3dzIChzdGFibGUgc29ydClcbiAgICAgKi9cbiAgICByZXR1cm4gcm93VG9JbmRleE1hcC5nZXQocm93QSkgPCByb3dUb0luZGV4TWFwLmdldChyb3dCKSA/IC0xIDogMTtcbiAgfSk7XG59XG4iXX0=