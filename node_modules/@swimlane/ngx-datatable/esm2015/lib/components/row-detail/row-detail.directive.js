/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
export class DatatableRowDetailDirective {
    constructor() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         */
        this.toggle = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get template() {
        return this._templateInput || this._templateQuery;
    }
    /**
     * Toggle the expansion of the row
     * @param {?} row
     * @return {?}
     */
    toggleExpandRow(row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    }
    /**
     * API method to expand all the rows.
     * @return {?}
     */
    expandAllRows() {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    }
    /**
     * API method to collapse all the rows.
     * @return {?}
     */
    collapseAllRows() {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    }
}
DatatableRowDetailDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-row-detail' },] }
];
DatatableRowDetailDirective.propDecorators = {
    rowHeight: [{ type: Input }],
    _templateInput: [{ type: Input, args: ['template',] }],
    _templateQuery: [{ type: ContentChild, args: [DatatableRowDetailTemplateDirective, { read: TemplateRef, static: true },] }],
    toggle: [{ type: Output }]
};
if (false) {
    /**
     * The detail row height is required especially
     * when virtual scroll is enabled.
     * @type {?}
     */
    DatatableRowDetailDirective.prototype.rowHeight;
    /** @type {?} */
    DatatableRowDetailDirective.prototype._templateInput;
    /** @type {?} */
    DatatableRowDetailDirective.prototype._templateQuery;
    /**
     * Row detail row visbility was toggled.
     * @type {?}
     */
    DatatableRowDetailDirective.prototype.toggle;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWRldGFpbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3Jvdy1kZXRhaWwvcm93LWRldGFpbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd0RixNQUFNLE9BQU8sMkJBQTJCO0lBRHhDOzs7OztRQU1XLGNBQVMsR0FBcUQsQ0FBQyxDQUFDOzs7O1FBZS9ELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQStCM0QsQ0FBQzs7OztJQXRDQyxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFVRCxlQUFlLENBQUMsR0FBUTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUtELGFBQWE7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUtELGVBQWU7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7d0JBTWhELEtBQUs7NkJBRUwsS0FBSyxTQUFDLFVBQVU7NkJBR2hCLFlBQVksU0FBQyxtQ0FBbUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFVckYsTUFBTTs7Ozs7Ozs7SUFmUCxnREFBeUU7O0lBRXpFLHFEQUNpQzs7SUFFakMscURBQ2lDOzs7OztJQVNqQyw2Q0FBeUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL3Jvdy1kZXRhaWwtdGVtcGxhdGUuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnbmd4LWRhdGF0YWJsZS1yb3ctZGV0YWlsJyB9KVxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZVJvd0RldGFpbERpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBUaGUgZGV0YWlsIHJvdyBoZWlnaHQgaXMgcmVxdWlyZWQgZXNwZWNpYWxseVxuICAgKiB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICgocm93PzogYW55LCBpbmRleD86IG51bWJlcikgPT4gbnVtYmVyKSA9IDA7XG5cbiAgQElucHV0KCd0ZW1wbGF0ZScpXG4gIF90ZW1wbGF0ZUlucHV0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfdGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBnZXQgdGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlSW5wdXQgfHwgdGhpcy5fdGVtcGxhdGVRdWVyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3cgZGV0YWlsIHJvdyB2aXNiaWxpdHkgd2FzIHRvZ2dsZWQuXG4gICAqL1xuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBleHBhbnNpb24gb2YgdGhlIHJvd1xuICAgKi9cbiAgdG9nZ2xlRXhwYW5kUm93KHJvdzogYW55KTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGUuZW1pdCh7XG4gICAgICB0eXBlOiAncm93JyxcbiAgICAgIHZhbHVlOiByb3dcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBUEkgbWV0aG9kIHRvIGV4cGFuZCBhbGwgdGhlIHJvd3MuXG4gICAqL1xuICBleHBhbmRBbGxSb3dzKCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xuICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFQSSBtZXRob2QgdG8gY29sbGFwc2UgYWxsIHRoZSByb3dzLlxuICAgKi9cbiAgY29sbGFwc2VBbGxSb3dzKCk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xuICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTtcbiAgfVxufVxuIl19