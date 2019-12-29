/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return [...rows];
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     * @type {?}
     */
    const rowToIndexMap = new Map();
    rows.forEach((/**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    (row, index) => rowToIndexMap.set(row, index)));
    /** @type {?} */
    const temp = [...rows];
    /** @type {?} */
    const cols = columns.reduce((/**
     * @param {?} obj
     * @param {?} col
     * @return {?}
     */
    (obj, col) => {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }), {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    /** @type {?} */
    const cachedDirs = dirs.map((/**
     * @param {?} dir
     * @return {?}
     */
    dir => {
        /** @type {?} */
        const prop = dir.prop;
        return {
            prop,
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
        for (const cachedDir of cachedDirs) {
            // Get property and valuegetters for column to be sorted
            const { prop, valueGetter } = cachedDir;
            // Get A and B cell values from rows based on properties of the columns
            /** @type {?} */
            const propA = valueGetter(rowA, prop);
            /** @type {?} */
            const propB = valueGetter(rowB, prop);
            // Compare function gets five parameters:
            // Two cell values to be compared as propA and propB
            // Two rows corresponding to the cells as rowA and rowB
            // Direction of the sort for this column as SortDirection
            // Compare can be a standard JS comparison function (a,b) => -1|0|1
            // as additional parameters are silently ignored. The whole row and sort
            // direction enable more complex sort logic.
            /** @type {?} */
            const comparison = cachedDir.dir !== SortDirection.desc
                ? cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir)
                : -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7Ozs7O0FBSzdELE1BQU0sVUFBVSxXQUFXLENBQUMsUUFBa0IsRUFBRSxPQUFzQjtJQUNwRSxJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2hDLElBQUksT0FBTyxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDakMsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQzNCO2FBQU07WUFDTCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7U0FDMUI7S0FDRjtTQUFNO1FBQ0wsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQztTQUMxQjthQUFNLElBQUksT0FBTyxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDeEMsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtZQUN6QyxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELG1EQUFtRDtRQUNuRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUM7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLENBQU0sRUFBRSxDQUFNO0lBQzlDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxXQUFXO1FBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFD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QUksVUFBVSxFQUFFOztrQkFFNUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsU0FBUzs7O2tCQUVqQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7O2tCQUMvQixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7OztrQkFTL0IsVUFBVSxHQUNkLFNBQVMsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUM5RCxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDO1lBRW5FLGlFQUFpRTtZQUNqRSxJQUFJLFVBQVUsS0FBSyxDQUFDO2dCQUFFLE9BQU8sVUFBVSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEU7O1dBRUc7UUFDSCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcbmltcG9ydCB7IFNvcnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvc29ydC50eXBlJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcbmltcG9ydCB7IFNvcnRQcm9wRGlyIH0gZnJvbSAnLi4vdHlwZXMvc29ydC1wcm9wLWRpci50eXBlJztcbi8qKlxuICogR2V0cyB0aGUgbmV4dCBzb3J0IGRpcmVjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dFNvcnREaXIoc29ydFR5cGU6IFNvcnRUeXBlLCBjdXJyZW50OiBTb3J0RGlyZWN0aW9uKTogU29ydERpcmVjdGlvbiB8IHVuZGVmaW5lZCB7XG4gIGlmIChzb3J0VHlwZSA9PT0gU29ydFR5cGUuc2luZ2xlKSB7XG4gICAgaWYgKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5kZXNjO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5hc2M7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghY3VycmVudCkge1xuICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb24uYXNjO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudCA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcbiAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uLmRlc2M7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50ID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIGF2b2lkIFRTNzAzMDogTm90IGFsbCBjb2RlIHBhdGhzIHJldHVybiBhIHZhbHVlLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGFwdGVkIGZyb20gZnVlbGQtdWkgb24gNi8yMTZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9GdWVsSW50ZXJhY3RpdmUvZnVlbC11aS90cmVlL21hc3Rlci9zcmMvcGlwZXMvT3JkZXJCeVxuICovXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJCeUNvbXBhcmF0b3IoYTogYW55LCBiOiBhbnkpOiBudW1iZXIge1xuICBpZiAoYSA9PT0gbnVsbCB8fCB0eXBlb2YgYSA9PT0gJ3VuZGVmaW5lZCcpIGEgPSAwO1xuICBpZiAoYiA9PT0gbnVsbCB8fCB0eXBlb2YgYiA9PT0gJ3VuZGVmaW5lZCcpIGIgPSAwO1xuICBpZiAoYSBpbnN0YW5jZW9mIERhdGUgJiYgYiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBpZiAoYSA8IGIpIHJldHVybiAtMTtcbiAgICBpZiAoYSA+IGIpIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGlzTmFOKHBhcnNlRmxvYXQoYSkpIHx8ICFpc0Zpbml0ZShhKSB8fCAoaXNOYU4ocGFyc2VGbG9hdChiKSkgfHwgIWlzRmluaXRlKGIpKSkge1xuICAgIC8vIENvbnZlcnQgdG8gc3RyaW5nIGluIGNhc2Ugb2YgYT0wIG9yIGI9MFxuICAgIGEgPSBTdHJpbmcoYSk7XG4gICAgYiA9IFN0cmluZyhiKTtcbiAgICAvLyBJc24ndCBhIG51bWJlciBzbyBsb3dlcmNhc2UgdGhlIHN0cmluZyB0byBwcm9wZXJseSBjb21wYXJlXG4gICAgaWYgKGEudG9Mb3dlckNhc2UoKSA8IGIudG9Mb3dlckNhc2UoKSkgcmV0dXJuIC0xO1xuICAgIGlmIChhLnRvTG93ZXJDYXNlKCkgPiBiLnRvTG93ZXJDYXNlKCkpIHJldHVybiAxO1xuICB9IGVsc2Uge1xuICAgIC8vIFBhcnNlIHN0cmluZ3MgYXMgbnVtYmVycyB0byBjb21wYXJlIHByb3Blcmx5XG4gICAgaWYgKHBhcnNlRmxvYXQoYSkgPCBwYXJzZUZsb2F0KGIpKSByZXR1cm4gLTE7XG4gICAgaWYgKHBhcnNlRmxvYXQoYSkgPiBwYXJzZUZsb2F0KGIpKSByZXR1cm4gMTtcbiAgfVxuXG4gIC8vIGVxdWFsIGVhY2ggb3RoZXJcbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogY3JlYXRlcyBhIHNoYWxsb3cgY29weSBvZiB0aGUgYHJvd3NgIGlucHV0IGFuZCByZXR1cm5zIHRoZSBzb3J0ZWQgY29weS4gdGhpcyBmdW5jdGlvblxuICogZG9lcyBub3Qgc29ydCB0aGUgYHJvd3NgIGFyZ3VtZW50IGluIHBsYWNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0Um93cyhyb3dzOiBhbnlbXSwgY29sdW1uczogYW55W10sIGRpcnM6IFNvcnRQcm9wRGlyW10pOiBhbnlbXSB7XG4gIGlmICghcm93cykgcmV0dXJuIFtdO1xuICBpZiAoIWRpcnMgfHwgIWRpcnMubGVuZ3RoIHx8ICFjb2x1bW5zKSByZXR1cm4gWy4uLnJvd3NdO1xuXG4gIC8qKlxuICAgKiByZWNvcmQgdGhlIHJvdyBvcmRlcmluZyBvZiByZXN1bHRzIGZyb20gcHJpb3Igc29ydCBvcGVyYXRpb25zIChpZiBhcHBsaWNhYmxlKVxuICAgKiB0aGlzIGlzIG5lY2Vzc2FyeSB0byBndWFyYW50ZWUgc3RhYmxlIHNvcnRpbmcgYmVoYXZpb3JcbiAgICovXG4gIGNvbnN0IHJvd1RvSW5kZXhNYXAgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuICByb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHJvd1RvSW5kZXhNYXAuc2V0KHJvdywgaW5kZXgpKTtcblxuICBjb25zdCB0ZW1wID0gWy4uLnJvd3NdO1xuICBjb25zdCBjb2xzID0gY29sdW1ucy5yZWR1Y2UoKG9iaiwgY29sKSA9PiB7XG4gICAgaWYgKGNvbC5jb21wYXJhdG9yICYmIHR5cGVvZiBjb2wuY29tcGFyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2JqW2NvbC5wcm9wXSA9IGNvbC5jb21wYXJhdG9yO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG5cbiAgLy8gY2FjaGUgdmFsdWVHZXR0ZXIgYW5kIGNvbXBhcmVGbiBzbyB0aGF0IHRoZXlcbiAgLy8gZG8gbm90IG5lZWQgdG8gYmUgbG9va2VkLXVwIGluIHRoZSBzb3J0IGZ1bmN0aW9uIGJvZHlcbiAgY29uc3QgY2FjaGVkRGlycyA9IGRpcnMubWFwKGRpciA9PiB7XG4gICAgY29uc3QgcHJvcCA9IGRpci5wcm9wO1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wLFxuICAgICAgZGlyOiBkaXIuZGlyLFxuICAgICAgdmFsdWVHZXR0ZXI6IGdldHRlckZvclByb3AocHJvcCksXG4gICAgICBjb21wYXJlRm46IGNvbHNbcHJvcF0gfHwgb3JkZXJCeUNvbXBhcmF0b3JcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gdGVtcC5zb3J0KGZ1bmN0aW9uKHJvd0E6IGFueSwgcm93QjogYW55KSB7XG4gICAgZm9yIChjb25zdCBjYWNoZWREaXIgb2YgY2FjaGVkRGlycykge1xuICAgICAgLy8gR2V0IHByb3BlcnR5IGFuZCB2YWx1ZWdldHRlcnMgZm9yIGNvbHVtbiB0byBiZSBzb3J0ZWRcbiAgICAgIGNvbnN0IHsgcHJvcCwgdmFsdWVHZXR0ZXIgfSA9IGNhY2hlZERpcjtcbiAgICAgIC8vIEdldCBBIGFuZCBCIGNlbGwgdmFsdWVzIGZyb20gcm93cyBiYXNlZCBvbiBwcm9wZXJ0aWVzIG9mIHRoZSBjb2x1bW5zXG4gICAgICBjb25zdCBwcm9wQSA9IHZhbHVlR2V0dGVyKHJvd0EsIHByb3ApO1xuICAgICAgY29uc3QgcHJvcEIgPSB2YWx1ZUdldHRlcihyb3dCLCBwcm9wKTtcblxuICAgICAgLy8gQ29tcGFyZSBmdW5jdGlvbiBnZXRzIGZpdmUgcGFyYW1ldGVyczpcbiAgICAgIC8vIFR3byBjZWxsIHZhbHVlcyB0byBiZSBjb21wYXJlZCBhcyBwcm9wQSBhbmQgcHJvcEJcbiAgICAgIC8vIFR3byByb3dzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNlbGxzIGFzIHJvd0EgYW5kIHJvd0JcbiAgICAgIC8vIERpcmVjdGlvbiBvZiB0aGUgc29ydCBmb3IgdGhpcyBjb2x1bW4gYXMgU29ydERpcmVjdGlvblxuICAgICAgLy8gQ29tcGFyZSBjYW4gYmUgYSBzdGFuZGFyZCBKUyBjb21wYXJpc29uIGZ1bmN0aW9uIChhLGIpID0+IC0xfDB8MVxuICAgICAgLy8gYXMgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGFyZSBzaWxlbnRseSBpZ25vcmVkLiBUaGUgd2hvbGUgcm93IGFuZCBzb3J0XG4gICAgICAvLyBkaXJlY3Rpb24gZW5hYmxlIG1vcmUgY29tcGxleCBzb3J0IGxvZ2ljLlxuICAgICAgY29uc3QgY29tcGFyaXNvbiA9XG4gICAgICAgIGNhY2hlZERpci5kaXIgIT09IFNvcnREaXJlY3Rpb24uZGVzY1xuICAgICAgICAgID8gY2FjaGVkRGlyLmNvbXBhcmVGbihwcm9wQSwgcHJvcEIsIHJvd0EsIHJvd0IsIGNhY2hlZERpci5kaXIpXG4gICAgICAgICAgOiAtY2FjaGVkRGlyLmNvbXBhcmVGbihwcm9wQSwgcHJvcEIsIHJvd0EsIHJvd0IsIGNhY2hlZERpci5kaXIpO1xuXG4gICAgICAvLyBEb24ndCByZXR1cm4gMCB5ZXQgaW4gY2FzZSBvZiBuZWVkaW5nIHRvIHNvcnQgYnkgbmV4dCBwcm9wZXJ0eVxuICAgICAgaWYgKGNvbXBhcmlzb24gIT09IDApIHJldHVybiBjb21wYXJpc29uO1xuICAgIH1cblxuICAgIGlmICghKHJvd1RvSW5kZXhNYXAuaGFzKHJvd0EpICYmIHJvd1RvSW5kZXhNYXAuaGFzKHJvd0IpKSkgcmV0dXJuIDA7XG5cbiAgICAvKipcbiAgICAgKiBhbGwgZWxzZSBiZWluZyBlcXVhbCwgcHJlc2VydmUgb3JpZ2luYWwgb3JkZXIgb2YgdGhlIHJvd3MgKHN0YWJsZSBzb3J0KVxuICAgICAqL1xuICAgIHJldHVybiByb3dUb0luZGV4TWFwLmdldChyb3dBKSA8IHJvd1RvSW5kZXhNYXAuZ2V0KHJvd0IpID8gLTEgOiAxO1xuICB9KTtcbn1cbiJdfQ==