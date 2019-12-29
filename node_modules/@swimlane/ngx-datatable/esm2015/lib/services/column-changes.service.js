/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
export class ColumnChangesService {
    constructor() {
        this.columnInputChanges = new Subject();
    }
    /**
     * @return {?}
     */
    get columnInputChanges$() {
        return this.columnInputChanges.asObservable();
    }
    /**
     * @return {?}
     */
    onInputChange() {
        this.columnInputChanges.next();
    }
}
ColumnChangesService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnChangesService.prototype.columnInputChanges;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWNoYW5nZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFPM0MsTUFBTSxPQUFPLG9CQUFvQjtJQURqQztRQUVVLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7SUFTeEQsQ0FBQzs7OztJQVBDLElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7OztZQVZGLFVBQVU7Ozs7Ozs7SUFFVCxrREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBzZXJ2aWNlIHRvIG1ha2UgRGF0YXRhYmxlQ29tcG9uZW50IGF3YXJlIG9mIGNoYW5nZXMgdG9cbiAqIGlucHV0IGJpbmRpbmdzIG9mIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29sdW1uQ2hhbmdlc1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbHVtbklucHV0Q2hhbmdlcyA9IG5ldyBTdWJqZWN0PHVuZGVmaW5lZD4oKTtcblxuICBnZXQgY29sdW1uSW5wdXRDaGFuZ2VzJCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbklucHV0Q2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5JbnB1dENoYW5nZXMubmV4dCgpO1xuICB9XG59XG4iXX0=