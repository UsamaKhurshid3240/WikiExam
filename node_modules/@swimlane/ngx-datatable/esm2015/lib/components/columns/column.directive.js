/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
export class DataTableColumnDirective {
    /**
     * @param {?} columnChangesService
     */
    constructor(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    /**
     * @return {?}
     */
    get cellTemplate() {
        return this._cellTemplateInput || this._cellTemplateQuery;
    }
    /**
     * @return {?}
     */
    get headerTemplate() {
        return this._headerTemplateInput || this._headerTemplateQuery;
    }
    /**
     * @return {?}
     */
    get treeToggleTemplate() {
        return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    }
}
DataTableColumnDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-column' },] }
];
/** @nocollapse */
DataTableColumnDirective.ctorParameters = () => [
    { type: ColumnChangesService }
];
DataTableColumnDirective.propDecorators = {
    name: [{ type: Input }],
    prop: [{ type: Input }],
    frozenLeft: [{ type: Input }],
    frozenRight: [{ type: Input }],
    flexGrow: [{ type: Input }],
    resizeable: [{ type: Input }],
    comparator: [{ type: Input }],
    pipe: [{ type: Input }],
    sortable: [{ type: Input }],
    draggable: [{ type: Input }],
    canAutoResize: [{ type: Input }],
    minWidth: [{ type: Input }],
    width: [{ type: Input }],
    maxWidth: [{ type: Input }],
    checkboxable: [{ type: Input }],
    headerCheckboxable: [{ type: Input }],
    headerClass: [{ type: Input }],
    cellClass: [{ type: Input }],
    isTreeColumn: [{ type: Input }],
    treeLevelIndent: [{ type: Input }],
    summaryFunc: [{ type: Input }],
    summaryTemplate: [{ type: Input }],
    _cellTemplateInput: [{ type: Input, args: ['cellTemplate',] }],
    _cellTemplateQuery: [{ type: ContentChild, args: [DataTableColumnCellDirective, { read: TemplateRef, static: true },] }],
    _headerTemplateInput: [{ type: Input, args: ['headerTemplate',] }],
    _headerTemplateQuery: [{ type: ContentChild, args: [DataTableColumnHeaderDirective, { read: TemplateRef, static: true },] }],
    _treeToggleTemplateInput: [{ type: Input, args: ['treeToggleTemplate',] }],
    _treeToggleTemplateQuery: [{ type: ContentChild, args: [DataTableColumnCellTreeToggle, { read: TemplateRef, static: true },] }]
};
if (false) {
    /** @type {?} */
    DataTableColumnDirective.prototype.name;
    /** @type {?} */
    DataTableColumnDirective.prototype.prop;
    /** @type {?} */
    DataTableColumnDirective.prototype.frozenLeft;
    /** @type {?} */
    DataTableColumnDirective.prototype.frozenRight;
    /** @type {?} */
    DataTableColumnDirective.prototype.flexGrow;
    /** @type {?} */
    DataTableColumnDirective.prototype.resizeable;
    /** @type {?} */
    DataTableColumnDirective.prototype.comparator;
    /** @type {?} */
    DataTableColumnDirective.prototype.pipe;
    /** @type {?} */
    DataTableColumnDirective.prototype.sortable;
    /** @type {?} */
    DataTableColumnDirective.prototype.draggable;
    /** @type {?} */
    DataTableColumnDirective.prototype.canAutoResize;
    /** @type {?} */
    DataTableColumnDirective.prototype.minWidth;
    /** @type {?} */
    DataTableColumnDirective.prototype.width;
    /** @type {?} */
    DataTableColumnDirective.prototype.maxWidth;
    /** @type {?} */
    DataTableColumnDirective.prototype.checkboxable;
    /** @type {?} */
    DataTableColumnDirective.prototype.headerCheckboxable;
    /** @type {?} */
    DataTableColumnDirective.prototype.headerClass;
    /** @type {?} */
    DataTableColumnDirective.prototype.cellClass;
    /** @type {?} */
    DataTableColumnDirective.prototype.isTreeColumn;
    /** @type {?} */
    DataTableColumnDirective.prototype.treeLevelIndent;
    /** @type {?} */
    DataTableColumnDirective.prototype.summaryFunc;
    /** @type {?} */
    DataTableColumnDirective.prototype.summaryTemplate;
    /** @type {?} */
    DataTableColumnDirective.prototype._cellTemplateInput;
    /** @type {?} */
    DataTableColumnDirective.prototype._cellTemplateQuery;
    /** @type {?} */
    DataTableColumnDirective.prototype._headerTemplateInput;
    /** @type {?} */
    DataTableColumnDirective.prototype._headerTemplateQuery;
    /** @type {?} */
    DataTableColumnDirective.prototype._treeToggleTemplateInput;
    /** @type {?} */
    DataTableColumnDirective.prototype._treeToggleTemplateQuery;
    /**
     * @type {?}
     * @private
     */
    DataTableColumnDirective.prototype.isFirstChange;
    /**
     * @type {?}
     * @private
     */
    DataTableColumnDirective.prototype.columnChangesService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUk3RSxNQUFNLE9BQU8sd0JBQXdCOzs7O0lBd0RuQyxZQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUZ0RCxrQkFBYSxHQUFHLElBQUksQ0FBQztJQUVvQyxDQUFDOzs7O0lBMUJsRSxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDNUQsQ0FBQzs7OztJQVFELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDaEUsQ0FBQzs7OztJQVFELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN4RSxDQUFDOzs7O0lBTUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztZQUh0QyxvQkFBb0I7OzttQkFLMUIsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FFTCxLQUFLLFNBQUMsY0FBYztpQ0FHcEIsWUFBWSxTQUFDLDRCQUE0QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO21DQU85RSxLQUFLLFNBQUMsZ0JBQWdCO21DQUd0QixZQUFZLFNBQUMsOEJBQThCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7dUNBT2hGLEtBQUssU0FBQyxvQkFBb0I7dUNBRzFCLFlBQVksU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7OztJQTlDaEYsd0NBQXNCOztJQUN0Qix3Q0FBK0I7O0lBQy9CLDhDQUF5Qjs7SUFDekIsK0NBQTBCOztJQUMxQiw0Q0FBMEI7O0lBQzFCLDhDQUE2Qjs7SUFDN0IsOENBQXlCOztJQUN6Qix3Q0FBbUI7O0lBQ25CLDRDQUEyQjs7SUFDM0IsNkNBQTRCOztJQUM1QixpREFBZ0M7O0lBQ2hDLDRDQUEwQjs7SUFDMUIseUNBQXVCOztJQUN2Qiw0Q0FBMEI7O0lBQzFCLGdEQUErQjs7SUFDL0Isc0RBQXFDOztJQUNyQywrQ0FBNkQ7O0lBQzdELDZDQUEyRDs7SUFDM0QsZ0RBQStCOztJQUMvQixtREFBaUM7O0lBQ2pDLCtDQUE0Qzs7SUFDNUMsbURBQTJDOztJQUUzQyxzREFDcUM7O0lBRXJDLHNEQUNxQzs7SUFNckMsd0RBQ3VDOztJQUV2Qyx3REFDdUM7O0lBTXZDLDREQUMyQzs7SUFFM0MsNERBQzJDOzs7OztJQU0zQyxpREFBNkI7Ozs7O0lBRWpCLHdEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4taGVhZGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tY2VsbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbFRyZWVUb2dnbGUgfSBmcm9tICcuL3RyZWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sdW1uLWNoYW5nZXMuc2VydmljZSc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUtY29sdW1uJyB9KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgcHJvcDogVGFibGVDb2x1bW5Qcm9wO1xuICBASW5wdXQoKSBmcm96ZW5MZWZ0OiBhbnk7XG4gIEBJbnB1dCgpIGZyb3plblJpZ2h0OiBhbnk7XG4gIEBJbnB1dCgpIGZsZXhHcm93OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJlc2l6ZWFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbXBhcmF0b3I6IGFueTtcbiAgQElucHV0KCkgcGlwZTogYW55O1xuICBASW5wdXQoKSBzb3J0YWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJhZ2dhYmxlOiBib29sZWFuO1xuICBASW5wdXQoKSBjYW5BdXRvUmVzaXplOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW5XaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBjaGVja2JveGFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhlYWRlckNoZWNrYm94YWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgaGVhZGVyQ2xhc3M6IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xuICBASW5wdXQoKSBjZWxsQ2xhc3M6IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xuICBASW5wdXQoKSBpc1RyZWVDb2x1bW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRyZWVMZXZlbEluZGVudDogbnVtYmVyO1xuICBASW5wdXQoKSBzdW1tYXJ5RnVuYzogKGNlbGxzOiBhbnlbXSkgPT4gYW55O1xuICBASW5wdXQoKSBzdW1tYXJ5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCdjZWxsVGVtcGxhdGUnKVxuICBfY2VsbFRlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgX2NlbGxUZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGdldCBjZWxsVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NlbGxUZW1wbGF0ZUlucHV0IHx8IHRoaXMuX2NlbGxUZW1wbGF0ZVF1ZXJ5O1xuICB9XG5cbiAgQElucHV0KCdoZWFkZXJUZW1wbGF0ZScpXG4gIF9oZWFkZXJUZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgX2hlYWRlclRlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZ2V0IGhlYWRlclRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJUZW1wbGF0ZUlucHV0IHx8IHRoaXMuX2hlYWRlclRlbXBsYXRlUXVlcnk7XG4gIH1cblxuICBASW5wdXQoJ3RyZWVUb2dnbGVUZW1wbGF0ZScpXG4gIF90cmVlVG9nZ2xlVGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgX3RyZWVUb2dnbGVUZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGdldCB0cmVlVG9nZ2xlVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3RyZWVUb2dnbGVUZW1wbGF0ZUlucHV0IHx8IHRoaXMuX3RyZWVUb2dnbGVUZW1wbGF0ZVF1ZXJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpcnN0Q2hhbmdlID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbkNoYW5nZXNTZXJ2aWNlOiBDb2x1bW5DaGFuZ2VzU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5pc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmlzRmlyc3RDaGFuZ2UgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2x1bW5DaGFuZ2VzU2VydmljZS5vbklucHV0Q2hhbmdlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=