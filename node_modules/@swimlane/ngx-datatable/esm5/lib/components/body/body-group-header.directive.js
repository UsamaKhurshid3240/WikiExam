/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
var DatatableGroupHeaderDirective = /** @class */ (function () {
    function DatatableGroupHeaderDirective() {
        /**
         * Row height is required when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Track toggling of group visibility
         */
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(DatatableGroupHeaderDirective.prototype, "template", {
        get: /**
         * @return {?}
         */
        function () {
            return this._templateInput || this._templateQuery;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the expansion of a group
     */
    /**
     * Toggle the expansion of a group
     * @param {?} group
     * @return {?}
     */
    DatatableGroupHeaderDirective.prototype.toggleExpandGroup = /**
     * Toggle the expansion of a group
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    };
    /**
     * Expand all groups
     */
    /**
     * Expand all groups
     * @return {?}
     */
    DatatableGroupHeaderDirective.prototype.expandAllGroups = /**
     * Expand all groups
     * @return {?}
     */
    function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all groups
     */
    /**
     * Collapse all groups
     * @return {?}
     */
    DatatableGroupHeaderDirective.prototype.collapseAllGroups = /**
     * Collapse all groups
     * @return {?}
     */
    function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    DatatableGroupHeaderDirective.decorators = [
        { type: Directive, args: [{ selector: 'ngx-datatable-group-header' },] }
    ];
    DatatableGroupHeaderDirective.propDecorators = {
        rowHeight: [{ type: Input }],
        _templateInput: [{ type: Input, args: ['template',] }],
        _templateQuery: [{ type: ContentChild, args: [DatatableGroupHeaderTemplateDirective, { read: TemplateRef, static: true },] }],
        toggle: [{ type: Output }]
    };
    return DatatableGroupHeaderDirective;
}());
export { DatatableGroupHeaderDirective };
if (false) {
    /**
     * Row height is required when virtual scroll is enabled.
     * @type {?}
     */
    DatatableGroupHeaderDirective.prototype.rowHeight;
    /** @type {?} */
    DatatableGroupHeaderDirective.prototype._templateInput;
    /** @type {?} */
    DatatableGroupHeaderDirective.prototype._templateQuery;
    /**
     * Track toggling of group visibility
     * @type {?}
     */
    DatatableGroupHeaderDirective.prototype.toggle;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L2JvZHktZ3JvdXAtaGVhZGVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRS9GO0lBQUE7Ozs7UUFLVyxjQUFTLEdBQXVELENBQUMsQ0FBQzs7OztRQWVqRSxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUErQjNELENBQUM7SUF0Q0Msc0JBQUksbURBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBT0Q7O09BRUc7Ozs7OztJQUNILHlEQUFpQjs7Ozs7SUFBakIsVUFBa0IsS0FBVTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdURBQWU7Ozs7SUFBZjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5REFBaUI7Ozs7SUFBakI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFsREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFOzs7NEJBS2xELEtBQUs7aUNBRUwsS0FBSyxTQUFDLFVBQVU7aUNBR2hCLFlBQVksU0FBQyxxQ0FBcUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt5QkFVdkYsTUFBTTs7SUErQlQsb0NBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQWxEWSw2QkFBNkI7Ozs7OztJQUl4QyxrREFBMkU7O0lBRTNFLHVEQUNpQzs7SUFFakMsdURBQ2lDOzs7OztJQVNqQywrQ0FBeUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vYm9keS1ncm91cC1oZWFkZXItdGVtcGxhdGUuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmd4LWRhdGF0YWJsZS1ncm91cC1oZWFkZXInIH0pXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUge1xuICAvKipcbiAgICogUm93IGhlaWdodCBpcyByZXF1aXJlZCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICgoZ3JvdXA/OiBhbnksIGluZGV4PzogbnVtYmVyKSA9PiBudW1iZXIpID0gMDtcblxuICBASW5wdXQoJ3RlbXBsYXRlJylcbiAgX3RlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgX3RlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUlucHV0IHx8IHRoaXMuX3RlbXBsYXRlUXVlcnk7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgdG9nZ2xpbmcgb2YgZ3JvdXAgdmlzaWJpbGl0eVxuICAgKi9cbiAgQE91dHB1dCgpIHRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgZXhwYW5zaW9uIG9mIGEgZ3JvdXBcbiAgICovXG4gIHRvZ2dsZUV4cGFuZEdyb3VwKGdyb3VwOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICB2YWx1ZTogZ3JvdXBcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmQgYWxsIGdyb3Vwc1xuICAgKi9cbiAgZXhwYW5kQWxsR3JvdXBzKCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xuICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlIGFsbCBncm91cHNcbiAgICovXG4gIGNvbGxhcHNlQWxsR3JvdXBzKCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xuICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTtcbiAgfVxufVxuIl19