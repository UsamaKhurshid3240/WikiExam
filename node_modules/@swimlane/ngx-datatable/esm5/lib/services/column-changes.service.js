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
var ColumnChangesService = /** @class */ (function () {
    function ColumnChangesService() {
        this.columnInputChanges = new Subject();
    }
    Object.defineProperty(ColumnChangesService.prototype, "columnInputChanges$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnInputChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ColumnChangesService.prototype.onInputChange = /**
     * @return {?}
     */
    function () {
        this.columnInputChanges.next();
    };
    ColumnChangesService.decorators = [
        { type: Injectable }
    ];
    return ColumnChangesService;
}());
export { ColumnChangesService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnChangesService.prototype.columnInputChanges;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWNoYW5nZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFNM0M7SUFBQTtRQUVVLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7SUFTeEQsQ0FBQztJQVBDLHNCQUFJLHFEQUFtQjs7OztRQUF2QjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hELENBQUM7OztPQUFBOzs7O0lBRUQsNENBQWE7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7O2dCQVZGLFVBQVU7O0lBV1gsMkJBQUM7Q0FBQSxBQVhELElBV0M7U0FWWSxvQkFBb0I7Ozs7OztJQUMvQixrREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBzZXJ2aWNlIHRvIG1ha2UgRGF0YXRhYmxlQ29tcG9uZW50IGF3YXJlIG9mIGNoYW5nZXMgdG9cbiAqIGlucHV0IGJpbmRpbmdzIG9mIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29sdW1uQ2hhbmdlc1NlcnZpY2Uge1xuICBwcml2YXRlIGNvbHVtbklucHV0Q2hhbmdlcyA9IG5ldyBTdWJqZWN0PHVuZGVmaW5lZD4oKTtcblxuICBnZXQgY29sdW1uSW5wdXRDaGFuZ2VzJCgpOiBPYnNlcnZhYmxlPHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbklucHV0Q2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uSW5wdXRDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5JbnB1dENoYW5nZXMubmV4dCgpO1xuICB9XG59XG4iXX0=