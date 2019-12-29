/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
var DataTableColumnDirective = /** @class */ (function () {
    function DataTableColumnDirective(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    Object.defineProperty(DataTableColumnDirective.prototype, "cellTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cellTemplateInput || this._cellTemplateQuery;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "headerTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._headerTemplateInput || this._headerTemplateQuery;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "treeToggleTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTableColumnDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    };
    DataTableColumnDirective.decorators = [
        { type: Directive, args: [{ selector: 'ngx-datatable-column' },] }
    ];
    /** @nocollapse */
    DataTableColumnDirective.ctorParameters = function () { return [
        { type: ColumnChangesService }
    ]; };
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
    return DataTableColumnDirective;
}());
export { DataTableColumnDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUc3RTtJQXlERSxrQ0FBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFGdEQsa0JBQWEsR0FBRyxJQUFJLENBQUM7SUFFb0MsQ0FBQztJQTFCbEUsc0JBQUksa0RBQVk7Ozs7UUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxvREFBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQVFELHNCQUFJLHdEQUFrQjs7OztRQUF0QjtZQUNFLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUN4RSxDQUFDOzs7T0FBQTs7OztJQU1ELDhDQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7Z0JBakVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztnQkFIdEMsb0JBQW9COzs7dUJBSzFCLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLO3FDQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7a0NBQ0wsS0FBSzs4QkFDTCxLQUFLO2tDQUNMLEtBQUs7cUNBRUwsS0FBSyxTQUFDLGNBQWM7cUNBR3BCLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt1Q0FPOUUsS0FBSyxTQUFDLGdCQUFnQjt1Q0FHdEIsWUFBWSxTQUFDLDhCQUE4QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzJDQU9oRixLQUFLLFNBQUMsb0JBQW9COzJDQUcxQixZQUFZLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0lBa0JsRiwrQkFBQztDQUFBLEFBbEVELElBa0VDO1NBakVZLHdCQUF3Qjs7O0lBQ25DLHdDQUFzQjs7SUFDdEIsd0NBQStCOztJQUMvQiw4Q0FBeUI7O0lBQ3pCLCtDQUEwQjs7SUFDMUIsNENBQTBCOztJQUMxQiw4Q0FBNkI7O0lBQzdCLDhDQUF5Qjs7SUFDekIsd0NBQW1COztJQUNuQiw0Q0FBMkI7O0lBQzNCLDZDQUE0Qjs7SUFDNUIsaURBQWdDOztJQUNoQyw0Q0FBMEI7O0lBQzFCLHlDQUF1Qjs7SUFDdkIsNENBQTBCOztJQUMxQixnREFBK0I7O0lBQy9CLHNEQUFxQzs7SUFDckMsK0NBQTZEOztJQUM3RCw2Q0FBMkQ7O0lBQzNELGdEQUErQjs7SUFDL0IsbURBQWlDOztJQUNqQywrQ0FBNEM7O0lBQzVDLG1EQUEyQzs7SUFFM0Msc0RBQ3FDOztJQUVyQyxzREFDcUM7O0lBTXJDLHdEQUN1Qzs7SUFFdkMsd0RBQ3VDOztJQU12Qyw0REFDMkM7O0lBRTNDLDREQUMyQzs7Ozs7SUFNM0MsaURBQTZCOzs7OztJQUVqQix3REFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLWNlbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlIH0gZnJvbSAnLi90cmVlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb2x1bW5DaGFuZ2VzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGFibGVDb2x1bW5Qcm9wIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlLWNvbHVtbicgfSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHByb3A6IFRhYmxlQ29sdW1uUHJvcDtcbiAgQElucHV0KCkgZnJvemVuTGVmdDogYW55O1xuICBASW5wdXQoKSBmcm96ZW5SaWdodDogYW55O1xuICBASW5wdXQoKSBmbGV4R3JvdzogbnVtYmVyO1xuICBASW5wdXQoKSByZXNpemVhYmxlOiBib29sZWFuO1xuICBASW5wdXQoKSBjb21wYXJhdG9yOiBhbnk7XG4gIEBJbnB1dCgpIHBpcGU6IGFueTtcbiAgQElucHV0KCkgc29ydGFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgY2FuQXV0b1Jlc2l6ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgY2hlY2tib3hhYmxlOiBib29sZWFuO1xuICBASW5wdXQoKSBoZWFkZXJDaGVja2JveGFibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhlYWRlckNsYXNzOiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcbiAgQElucHV0KCkgY2VsbENsYXNzOiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcbiAgQElucHV0KCkgaXNUcmVlQ29sdW1uOiBib29sZWFuO1xuICBASW5wdXQoKSB0cmVlTGV2ZWxJbmRlbnQ6IG51bWJlcjtcbiAgQElucHV0KCkgc3VtbWFyeUZ1bmM6IChjZWxsczogYW55W10pID0+IGFueTtcbiAgQElucHV0KCkgc3VtbWFyeVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgnY2VsbFRlbXBsYXRlJylcbiAgX2NlbGxUZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGF0YVRhYmxlQ29sdW1uQ2VsbERpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9jZWxsVGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBnZXQgY2VsbFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jZWxsVGVtcGxhdGVJbnB1dCB8fCB0aGlzLl9jZWxsVGVtcGxhdGVRdWVyeTtcbiAgfVxuXG4gIEBJbnB1dCgnaGVhZGVyVGVtcGxhdGUnKVxuICBfaGVhZGVyVGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9oZWFkZXJUZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGdldCBoZWFkZXJUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyVGVtcGxhdGVJbnB1dCB8fCB0aGlzLl9oZWFkZXJUZW1wbGF0ZVF1ZXJ5O1xuICB9XG5cbiAgQElucHV0KCd0cmVlVG9nZ2xlVGVtcGxhdGUnKVxuICBfdHJlZVRvZ2dsZVRlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF90cmVlVG9nZ2xlVGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBnZXQgdHJlZVRvZ2dsZVRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl90cmVlVG9nZ2xlVGVtcGxhdGVJbnB1dCB8fCB0aGlzLl90cmVlVG9nZ2xlVGVtcGxhdGVRdWVyeTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGaXJzdENoYW5nZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5DaGFuZ2VzU2VydmljZTogQ29sdW1uQ2hhbmdlc1NlcnZpY2UpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuaXNGaXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5pc0ZpcnN0Q2hhbmdlID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2Uub25JbnB1dENoYW5nZSgpO1xuICAgIH1cbiAgfVxufVxuIl19