/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';
/**
 * Sets the column defaults
 * @param {?} columns
 * @return {?}
 */
export function setColumnDefaults(columns) {
    var e_1, _a;
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    /** @type {?} */
    var treeColumnFound = false;
    try {
        for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
            var column = columns_1_1.value;
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
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var e_2, _a, e_3, _b;
    /** @type {?} */
    var result = [];
    try {
        for (var templates_1 = tslib_1.__values(templates), templates_1_1 = templates_1.next(); !templates_1_1.done; templates_1_1 = templates_1.next()) {
            var temp = templates_1_1.value;
            /** @type {?} */
            var col = {};
            /** @type {?} */
            var props = Object.getOwnPropertyNames(temp);
            try {
                for (var props_1 = (e_3 = void 0, tslib_1.__values(props)), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                    var prop = props_1_1.value;
                    col[prop] = temp[prop];
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (props_1_1 && !props_1_1.done && (_b = props_1.return)) _b.call(props_1);
                }
                finally { if (e_3) throw e_3.error; }
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
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2NvbHVtbi1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBT3RELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFzQjs7SUFDdEQsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPOzs7OztRQUtqQixlQUFlLEdBQVksS0FBSzs7UUFFcEMsS0FBcUIsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtZQUF6QixJQUFNLE1BQU0sb0JBQUE7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDaEIsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNwQjtZQUVELHdEQUF3RDtZQUN4RCx5QkFBeUI7WUFDekIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDakQsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRDtZQUVELGlDQUFpQztZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMs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QU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7Ozs7Ozs7OztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbENhc2UsIGRlQ2FtZWxDYXNlIH0gZnJvbSAnLi9jYW1lbC1jYXNlJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi9pZCc7XG5pbXBvcnQgeyBnZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbHVtbiBkZWZhdWx0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29sdW1uRGVmYXVsdHMoY29sdW1uczogVGFibGVDb2x1bW5bXSkge1xuICBpZiAoIWNvbHVtbnMpIHJldHVybjtcblxuICAvLyBPbmx5IG9uZSBjb2x1bW4gc2hvdWxkIGhvbGQgdGhlIHRyZWUgdmlld1xuICAvLyBUaHVzIGlmIG11bHRpcGxlIGNvbHVtbnMgYXJlIHByb3ZpZGVkIHdpdGhcbiAgLy8gaXNUcmVlQ29sdW1uIGFzIHRydWUgd2UgdGFrZSBvbmx5IHRoZSBmaXJzdCBvbmVcbiAgbGV0IHRyZWVDb2x1bW5Gb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICBpZiAoIWNvbHVtbi4kJGlkKSB7XG4gICAgICBjb2x1bW4uJCRpZCA9IGlkKCk7XG4gICAgfVxuXG4gICAgLy8gcHJvcCBjYW4gYmUgbnVtZXJpYzsgemVybyBpcyB2YWxpZCBub3QgYSBtaXNzaW5nIHByb3BcbiAgICAvLyB0cmFuc2xhdGUgbmFtZSA9PiBwcm9wXG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGNvbHVtbi5wcm9wKSAmJiBjb2x1bW4ubmFtZSkge1xuICAgICAgY29sdW1uLnByb3AgPSBjYW1lbENhc2UoY29sdW1uLm5hbWUpO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLiQkdmFsdWVHZXR0ZXIpIHtcbiAgICAgIGNvbHVtbi4kJHZhbHVlR2V0dGVyID0gZ2V0dGVyRm9yUHJvcChjb2x1bW4ucHJvcCk7XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IHByb3BzIGlmIG5vIG5hbWUgcGFzc2VkXG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChjb2x1bW4ucHJvcCkgJiYgaXNOdWxsT3JVbmRlZmluZWQoY29sdW1uLm5hbWUpKSB7XG4gICAgICBjb2x1bW4ubmFtZSA9IGRlQ2FtZWxDYXNlKFN0cmluZyhjb2x1bW4ucHJvcCkpO1xuICAgIH1cblxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChjb2x1bW4ucHJvcCkgJiYgaXNOdWxsT3JVbmRlZmluZWQoY29sdW1uLm5hbWUpKSB7XG4gICAgICBjb2x1bW4ubmFtZSA9ICcnOyAvLyBGaXhlcyBJRSBhbmQgRWRnZSBkaXNwbGF5aW5nIGBudWxsYFxuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdyZXNpemVhYmxlJykpIHtcbiAgICAgIGNvbHVtbi5yZXNpemVhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbHVtbi5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSkge1xuICAgICAgY29sdW1uLnNvcnRhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbHVtbi5oYXNPd25Qcm9wZXJ0eSgnZHJhZ2dhYmxlJykpIHtcbiAgICAgIGNvbHVtbi5kcmFnZ2FibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdjYW5BdXRvUmVzaXplJykpIHtcbiAgICAgIGNvbHVtbi5jYW5BdXRvUmVzaXplID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbHVtbi5oYXNPd25Qcm9wZXJ0eSgnd2lkdGgnKSkge1xuICAgICAgY29sdW1uLndpZHRoID0gMTUwO1xuICAgIH1cblxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdpc1RyZWVDb2x1bW4nKSkge1xuICAgICAgY29sdW1uLmlzVHJlZUNvbHVtbiA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29sdW1uLmlzVHJlZUNvbHVtbiAmJiAhdHJlZUNvbHVtbkZvdW5kKSB7XG4gICAgICAgIC8vIElmIHRoZSBmaXJzdCBjb2x1bW4gd2l0aCBpc1RyZWVDb2x1bW4gaXMgdHJ1ZSBmb3VuZFxuICAgICAgICAvLyB3ZSBtYXJrIHRoYXQgdHJlZUNvdWxtbiBpcyBmb3VuZFxuICAgICAgICB0cmVlQ29sdW1uRm91bmQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWZ0ZXIgdGhhdCBpc1RyZWVDb2x1bW4gcHJvcGVydHkgZm9yIGFueSBvdGhlciBjb2x1bW5cbiAgICAgICAgLy8gd2lsbCBiZSBzZXQgYXMgZmFsc2VcbiAgICAgICAgY29sdW1uLmlzVHJlZUNvbHVtbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQ8VD4odmFsdWU6IFQgfCBudWxsIHwgdW5kZWZpbmVkKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGVtcGxhdGVzIGRlZmluaXRpb25zIHRvIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVRlbXBsYXRlcyh0ZW1wbGF0ZXM6IERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZVtdKTogYW55W10ge1xuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG4gIGZvciAoY29uc3QgdGVtcCBvZiB0ZW1wbGF0ZXMpIHtcbiAgICBjb25zdCBjb2w6IGFueSA9IHt9O1xuXG4gICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZW1wKTtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcHMpIHtcbiAgICAgIGNvbFtwcm9wXSA9IHRlbXBbcHJvcF07XG4gICAgfVxuXG4gICAgaWYgKHRlbXAuaGVhZGVyVGVtcGxhdGUpIHtcbiAgICAgIGNvbC5oZWFkZXJUZW1wbGF0ZSA9IHRlbXAuaGVhZGVyVGVtcGxhdGU7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAuY2VsbFRlbXBsYXRlKSB7XG4gICAgICBjb2wuY2VsbFRlbXBsYXRlID0gdGVtcC5jZWxsVGVtcGxhdGU7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAuc3VtbWFyeUZ1bmMpIHtcbiAgICAgIGNvbC5zdW1tYXJ5RnVuYyA9IHRlbXAuc3VtbWFyeUZ1bmM7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAuc3VtbWFyeVRlbXBsYXRlKSB7XG4gICAgICBjb2wuc3VtbWFyeVRlbXBsYXRlID0gdGVtcC5zdW1tYXJ5VGVtcGxhdGU7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2goY29sKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=