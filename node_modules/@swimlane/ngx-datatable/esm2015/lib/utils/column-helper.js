/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';
/**
 * Sets the column defaults
 * @param {?} columns
 * @return {?}
 */
export function setColumnDefaults(columns) {
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    /** @type {?} */
    let treeColumnFound = false;
    for (const column of columns) {
        if (!column.$$id) {
            column.$$id = id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (isNullOrUndefined(column.prop) && column.name) {
            column.prop = camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = getterForProp(column.prop);
        }
        // format props if no name passed
        if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = deCamelCase(String(column.prop));
        }
        if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = ''; // Fixes IE and Edge displaying `null`
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
        if (!column.hasOwnProperty('isTreeColumn')) {
            column.isTreeColumn = false;
        }
        else {
            if (column.isTreeColumn && !treeColumnFound) {
                // If the first column with isTreeColumn is true found
                // we mark that treeCoulmn is found
                treeColumnFound = true;
            }
            else {
                // After that isTreeColumn property for any other column
                // will be set as false
                column.isTreeColumn = false;
            }
        }
    }
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/**
 * Translates templates definitions to objects
 * @param {?} templates
 * @return {?}
 */
export function translateTemplates(templates) {
    /** @type {?} */
    const result = [];
    for (const temp of templates) {
        /** @type {?} */
        const col = {};
        /** @type {?} */
        const props = Object.getOwnPropertyNames(temp);
        for (const prop of props) {
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        if (temp.summaryFunc) {
            col.summaryFunc = temp.summaryFunc;
        }
        if (temp.summaryTemplate) {
            col.summaryTemplate = temp.summaryTemplate;
        }
        result.push(col);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2NvbHVtbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7QUFPdEQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQXNCO0lBQ3RELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTzs7Ozs7UUFLakIsZUFBZSxHQUFZLEtBQUs7SUFFcEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUNwQjtRQUVELHdEQUF3RDtRQUN4RCx5QkFBeUI7UUFDekIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNqRCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN6QixNQUFNLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckUsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsc0NBQXNDO1NBQ3pEO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDeEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzNDLHNEQUFzRDtnQkFDdEQsbUNBQW1DO2dCQUNuQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNMLHdEQUF3RDtnQkFDeEQsdUJBQXVCO2dCQUN2QixNQUFNLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUM3QjtTQUNGO0tBQ0Y7QUFDSCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUksS0FBMkI7SUFDOUQsT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7QUFDL0MsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFNBQXFDOztVQUNoRSxNQUFNLEdBQVUsRUFBRTtJQUN4QixLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTs7Y0FDdEIsR0FBRyxHQUFRLEVBQUU7O2NBRWIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDOUMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDNUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbWVsQ2FzZSwgZGVDYW1lbENhc2UgfSBmcm9tICcuL2NhbWVsLWNhc2UnO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuL2lkJztcbmltcG9ydCB7IGdldHRlckZvclByb3AgfSBmcm9tICcuL2NvbHVtbi1wcm9wLWdldHRlcnMnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW4gfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogU2V0cyB0aGUgY29sdW1uIGRlZmF1bHRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDb2x1bW5EZWZhdWx0cyhjb2x1bW5zOiBUYWJsZUNvbHVtbltdKSB7XG4gIGlmICghY29sdW1ucykgcmV0dXJuO1xuXG4gIC8vIE9ubHkgb25lIGNvbHVtbiBzaG91bGQgaG9sZCB0aGUgdHJlZSB2aWV3XG4gIC8vIFRodXMgaWYgbXVsdGlwbGUgY29sdW1ucyBhcmUgcHJvdmlkZWQgd2l0aFxuICAvLyBpc1RyZWVDb2x1bW4gYXMgdHJ1ZSB3ZSB0YWtlIG9ubHkgdGhlIGZpcnN0IG9uZVxuICBsZXQgdHJlZUNvbHVtbkZvdW5kOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xuICAgIGlmICghY29sdW1uLiQkaWQpIHtcbiAgICAgIGNvbHVtbi4kJGlkID0gaWQoKTtcbiAgICB9XG5cbiAgICAvLyBwcm9wIGNhbiBiZSBudW1lcmljOyB6ZXJvIGlzIHZhbGlkIG5vdCBhIG1pc3NpbmcgcHJvcFxuICAgIC8vIHRyYW5zbGF0ZSBuYW1lID0+IHByb3BcbiAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoY29sdW1uLnByb3ApICYmIGNvbHVtbi5uYW1lKSB7XG4gICAgICBjb2x1bW4ucHJvcCA9IGNhbWVsQ2FzZShjb2x1bW4ubmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKCFjb2x1bW4uJCR2YWx1ZUdldHRlcikge1xuICAgICAgY29sdW1uLiQkdmFsdWVHZXR0ZXIgPSBnZXR0ZXJGb3JQcm9wKGNvbHVtbi5wcm9wKTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgcHJvcHMgaWYgbm8gbmFtZSBwYXNzZWRcbiAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGNvbHVtbi5wcm9wKSAmJiBpc051bGxPclVuZGVmaW5lZChjb2x1bW4ubmFtZSkpIHtcbiAgICAgIGNvbHVtbi5uYW1lID0gZGVDYW1lbENhc2UoU3RyaW5nKGNvbHVtbi5wcm9wKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGNvbHVtbi5wcm9wKSAmJiBpc051bGxPclVuZGVmaW5lZChjb2x1bW4ubmFtZSkpIHtcbiAgICAgIGNvbHVtbi5uYW1lID0gJyc7IC8vIEZpeGVzIElFIGFuZCBFZGdlIGRpc3BsYXlpbmcgYG51bGxgXG4gICAgfVxuXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ3Jlc2l6ZWFibGUnKSkge1xuICAgICAgY29sdW1uLnJlc2l6ZWFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpKSB7XG4gICAgICBjb2x1bW4uc29ydGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdkcmFnZ2FibGUnKSkge1xuICAgICAgY29sdW1uLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ2NhbkF1dG9SZXNpemUnKSkge1xuICAgICAgY29sdW1uLmNhbkF1dG9SZXNpemUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCd3aWR0aCcpKSB7XG4gICAgICBjb2x1bW4ud2lkdGggPSAxNTA7XG4gICAgfVxuXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ2lzVHJlZUNvbHVtbicpKSB7XG4gICAgICBjb2x1bW4uaXNUcmVlQ29sdW1uID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb2x1bW4uaXNUcmVlQ29sdW1uICYmICF0cmVlQ29sdW1uRm91bmQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGNvbHVtbiB3aXRoIGlzVHJlZUNvbHVtbiBpcyB0cnVlIGZvdW5kXG4gICAgICAgIC8vIHdlIG1hcmsgdGhhdCB0cmVlQ291bG1uIGlzIGZvdW5kXG4gICAgICAgIHRyZWVDb2x1bW5Gb3VuZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZnRlciB0aGF0IGlzVHJlZUNvbHVtbiBwcm9wZXJ0eSBmb3IgYW55IG90aGVyIGNvbHVtblxuICAgICAgICAvLyB3aWxsIGJlIHNldCBhcyBmYWxzZVxuICAgICAgICBjb2x1bW4uaXNUcmVlQ29sdW1uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZDxUPih2YWx1ZTogVCB8IG51bGwgfCB1bmRlZmluZWQpOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlcyB0ZW1wbGF0ZXMgZGVmaW5pdGlvbnMgdG8gb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlVGVtcGxhdGVzKHRlbXBsYXRlczogRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlW10pOiBhbnlbXSB7XG4gIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgZm9yIChjb25zdCB0ZW1wIG9mIHRlbXBsYXRlcykge1xuICAgIGNvbnN0IGNvbDogYW55ID0ge307XG5cbiAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlbXApO1xuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wcykge1xuICAgICAgY29sW3Byb3BdID0gdGVtcFtwcm9wXTtcbiAgICB9XG5cbiAgICBpZiAodGVtcC5oZWFkZXJUZW1wbGF0ZSkge1xuICAgICAgY29sLmhlYWRlclRlbXBsYXRlID0gdGVtcC5oZWFkZXJUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodGVtcC5jZWxsVGVtcGxhdGUpIHtcbiAgICAgIGNvbC5jZWxsVGVtcGxhdGUgPSB0ZW1wLmNlbGxUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBpZiAodGVtcC5zdW1tYXJ5RnVuYykge1xuICAgICAgY29sLnN1bW1hcnlGdW5jID0gdGVtcC5zdW1tYXJ5RnVuYztcbiAgICB9XG5cbiAgICBpZiAodGVtcC5zdW1tYXJ5VGVtcGxhdGUpIHtcbiAgICAgIGNvbC5zdW1tYXJ5VGVtcGxhdGUgPSB0ZW1wLnN1bW1hcnlUZW1wbGF0ZTtcbiAgICB9XG5cbiAgICByZXN1bHQucHVzaChjb2wpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==