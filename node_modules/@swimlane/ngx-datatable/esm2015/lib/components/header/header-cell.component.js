/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, EventEmitter, Output, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MouseEvent } from '../../events';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
export class DataTableHeaderCellComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allRowsSelected(value) {
        this._allRowsSelected = value;
        this.cellContext.allRowsSelected = value;
    }
    /**
     * @return {?}
     */
    get allRowsSelected() {
        return this._allRowsSelected;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    set column(column) {
        this._column = column;
        this.cellContext.column = column;
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get column() {
        return this._column;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set sorts(val) {
        this._sorts = val;
        this.sortDir = this.calcSortDir(val);
        this.cellContext.sortDir = this.sortDir;
        this.sortClass = this.calcSortClass(this.sortDir);
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    get sorts() {
        return this._sorts;
    }
    /**
     * @return {?}
     */
    get columnCssClasses() {
        /** @type {?} */
        let cls = 'datatable-header-cell';
        if (this.column.sortable)
            cls += ' sortable';
        if (this.column.resizeable)
            cls += ' resizeable';
        if (this.column.headerClass) {
            if (typeof this.column.headerClass === 'string') {
                cls += ' ' + this.column.headerClass;
            }
            else if (typeof this.column.headerClass === 'function') {
                /** @type {?} */
                const res = this.column.headerClass({
                    column: this.column
                });
                if (typeof res === 'string') {
                    cls += res;
                }
                else if (typeof res === 'object') {
                    /** @type {?} */
                    const keys = Object.keys(res);
                    for (const k of keys) {
                        if (res[k] === true)
                            cls += ` ${k}`;
                    }
                }
            }
        }
        /** @type {?} */
        const sortDir = this.sortDir;
        if (sortDir) {
            cls += ` sort-active sort-${sortDir}`;
        }
        return cls;
    }
    /**
     * @return {?}
     */
    get name() {
        // guaranteed to have a value by setColumnDefaults() in column-helper.ts
        return this.column.headerTemplate === undefined ? this.column.name : undefined;
    }
    /**
     * @return {?}
     */
    get minWidth() {
        return this.column.minWidth;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this.column.maxWidth;
    }
    /**
     * @return {?}
     */
    get width() {
        return this.column.width;
    }
    /**
     * @return {?}
     */
    get isCheckboxable() {
        return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === SelectionType.checkbox;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onContextmenu($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    }
    /**
     * @param {?} sorts
     * @return {?}
     */
    calcSortDir(sorts) {
        if (sorts && this.column) {
            /** @type {?} */
            const sort = sorts.find((/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                return s.prop === this.column.prop;
            }));
            if (sort)
                return sort.dir;
        }
    }
    /**
     * @return {?}
     */
    onSort() {
        if (!this.column.sortable)
            return;
        /** @type {?} */
        const newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue
        });
    }
    /**
     * @param {?} sortDir
     * @return {?}
     */
    calcSortClass(sortDir) {
        if (sortDir === SortDirection.asc) {
            return `sort-btn sort-asc ${this.sortAscendingIcon}`;
        }
        else if (sortDir === SortDirection.desc) {
            return `sort-btn sort-desc ${this.sortDescendingIcon}`;
        }
        else {
            return `sort-btn`;
        }
    }
}
DataTableHeaderCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header-cell',
                template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
                host: {
                    class: 'datatable-header-cell'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DataTableHeaderCellComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableHeaderCellComponent.propDecorators = {
    sortType: [{ type: Input }],
    sortAscendingIcon: [{ type: Input }],
    sortDescendingIcon: [{ type: Input }],
    isTarget: [{ type: Input }],
    targetMarkerTemplate: [{ type: Input }],
    targetMarkerContext: [{ type: Input }],
    allRowsSelected: [{ type: Input }],
    selectionType: [{ type: Input }],
    column: [{ type: Input }],
    headerHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    sorts: [{ type: Input }],
    sort: [{ type: Output }],
    select: [{ type: Output }],
    columnContextmenu: [{ type: Output }],
    columnCssClasses: [{ type: HostBinding, args: ['class',] }],
    name: [{ type: HostBinding, args: ['attr.title',] }],
    minWidth: [{ type: HostBinding, args: ['style.minWidth.px',] }],
    maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px',] }],
    width: [{ type: HostBinding, args: ['style.width.px',] }],
    onContextmenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortAscendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDescendingIcon;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.isTarget;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerTemplate;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.targetMarkerContext;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype._allRowsSelected;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectionType;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.headerHeight;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sort;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.select;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.columnContextmenu;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortClass;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.sortDir;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.selectFn;
    /** @type {?} */
    DataTableHeaderCellComponent.prototype.cellContext;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._column;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype._sorts;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderCellComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWdDaEUsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQTZIdkMsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE5RS9CLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0Msc0JBQWlCLEdBQUcsSUFBSSxZQUFZLENBQXFDLEtBQUssQ0FBQyxDQUFDO1FBNEQxRixXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHaEMsYUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUMsZ0JBQVcsR0FBUTtZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFD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QUFXLFNBQUMsT0FBTzttQkFpQ25CLFdBQVcsU0FBQyxZQUFZO3VCQU14QixXQUFXLFNBQUMsbUJBQW1CO3VCQUsvQixXQUFXLFNBQUMsbUJBQW1CO29CQUsvQixXQUFXLFNBQUMsZ0JBQWdCOzRCQTJCNUIsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQTlIdkMsZ0RBQTRCOztJQUM1Qix5REFBbUM7O0lBQ25DLDBEQUFvQzs7SUFFcEMsZ0RBQTJCOztJQUMzQiw0REFBbUM7O0lBQ25DLDJEQUFrQzs7SUFFbEMsd0RBQTBCOztJQVUxQixxREFBc0M7O0lBWXRDLG9EQUVxQjs7SUFjckIsNENBQXVEOztJQUN2RCw4Q0FBeUQ7O0lBQ3pELHlEQUEwRjs7SUE0RDFGLDhDQUFnQzs7SUFDaEMsaURBQWtCOztJQUNsQiwrQ0FBdUI7O0lBQ3ZCLGdEQUE4Qzs7SUFFOUMsbURBTUU7Ozs7O0lBRUYsK0NBQTZCOzs7OztJQUM3Qiw4Q0FBc0I7Ozs7O0lBRVYsMENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vdXNlRXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudHMnO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgbmV4dFNvcnREaXIgfSBmcm9tICcuLi8uLi91dGlscy9zb3J0JztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXRlbXBsYXRlLXdyYXBcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAqbmdJZj1cImlzVGFyZ2V0XCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwidGFyZ2V0TWFya2VyQ29udGV4dFwiXG4gICAgICA+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGxhYmVsICpuZ0lmPVwiaXNDaGVja2JveGFibGVcIiBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiYWxsUm93c1NlbGVjdGVkXCIgKGNoYW5nZSk9XCJzZWxlY3QuZW1pdCghYWxsUm93c1NlbGVjdGVkKVwiIC8+XG4gICAgICA8L2xhYmVsPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmhlYWRlclRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtd3JhcHBlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbCBkcmFnZ2FibGVcIiAoY2xpY2spPVwib25Tb3J0KClcIiBbaW5uZXJIVE1MXT1cIm5hbWVcIj4gPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcbiAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8c3BhbiAoY2xpY2spPVwib25Tb3J0KClcIiBbY2xhc3NdPVwic29ydENsYXNzXCI+IDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IHN0cmluZztcblxuICBASW5wdXQoKSBpc1RhcmdldDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyQ29udGV4dDogYW55O1xuXG4gIF9hbGxSb3dzU2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2V0IGFsbFJvd3NTZWxlY3RlZCh2YWx1ZSkge1xuICAgIHRoaXMuX2FsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuY2VsbENvbnRleHQuYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsUm93c1NlbGVjdGVkO1xuICB9XG5cbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcblxuICBASW5wdXQoKSBzZXQgY29sdW1uKGNvbHVtbjogVGFibGVDb2x1bW4pIHtcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjb2x1bW4oKTogVGFibGVDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIEBJbnB1dCgpXG4gIGhlYWRlckhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNldCBzb3J0cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XG4gICAgdGhpcy5zb3J0RGlyID0gdGhpcy5jYWxjU29ydERpcih2YWwpO1xuICAgIHRoaXMuY2VsbENvbnRleHQuc29ydERpciA9IHRoaXMuc29ydERpcjtcbiAgICB0aGlzLnNvcnRDbGFzcyA9IHRoaXMuY2FsY1NvcnRDbGFzcyh0aGlzLnNvcnREaXIpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgc29ydHMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9zb3J0cztcbiAgfVxuXG4gIEBPdXRwdXQoKSBzb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2x1bW5Db250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgY29sdW1uOiBhbnkgfT4oZmFsc2UpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY29sdW1uQ3NzQ2xhc3NlcygpOiBhbnkge1xuICAgIGxldCBjbHMgPSAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJztcblxuICAgIGlmICh0aGlzLmNvbHVtbi5zb3J0YWJsZSkgY2xzICs9ICcgc29ydGFibGUnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5yZXNpemVhYmxlKSBjbHMgKz0gJyByZXNpemVhYmxlJztcbiAgICBpZiAodGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNscyArPSAnICcgKyB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuY29sdW1uLmhlYWRlckNsYXNzKHtcbiAgICAgICAgICBjb2x1bW46IHRoaXMuY29sdW1uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNscyArPSByZXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocmVzKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkgY2xzICs9IGAgJHtrfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydERpciA9IHRoaXMuc29ydERpcjtcbiAgICBpZiAoc29ydERpcikge1xuICAgICAgY2xzICs9IGAgc29ydC1hY3RpdmUgc29ydC0ke3NvcnREaXJ9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRpdGxlJylcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAvLyBndWFyYW50ZWVkIHRvIGhhdmUgYSB2YWx1ZSBieSBzZXRDb2x1bW5EZWZhdWx0cygpIGluIGNvbHVtbi1oZWxwZXIudHNcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uaGVhZGVyVGVtcGxhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29sdW1uLm5hbWUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5tYXhXaWR0aC5weCcpXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XG4gIH1cblxuICBnZXQgaXNDaGVja2JveGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLmNoZWNrYm94YWJsZSAmJiB0aGlzLmNvbHVtbi5oZWFkZXJDaGVja2JveGFibGUgJiYgdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xuICB9XG5cbiAgc29ydEZuID0gdGhpcy5vblNvcnQuYmluZCh0aGlzKTtcbiAgc29ydENsYXNzOiBzdHJpbmc7XG4gIHNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gIHNlbGVjdEZuID0gdGhpcy5zZWxlY3QuZW1pdC5iaW5kKHRoaXMuc2VsZWN0KTtcblxuICBjZWxsQ29udGV4dDogYW55ID0ge1xuICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgc29ydERpcjogdGhpcy5zb3J0RGlyLFxuICAgIHNvcnRGbjogdGhpcy5zb3J0Rm4sXG4gICAgYWxsUm93c1NlbGVjdGVkOiB0aGlzLmFsbFJvd3NTZWxlY3RlZCxcbiAgICBzZWxlY3RGbjogdGhpcy5zZWxlY3RGblxuICB9O1xuXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XG4gIHByaXZhdGUgX3NvcnRzOiBhbnlbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gIG9uQ29udGV4dG1lbnUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5Db250ZXh0bWVudS5lbWl0KHsgZXZlbnQ6ICRldmVudCwgY29sdW1uOiB0aGlzLmNvbHVtbiB9KTtcbiAgfVxuXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKHNvcnRzICYmIHRoaXMuY29sdW1uKSB7XG4gICAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcbiAgICB9XG4gIH1cblxuICBvblNvcnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3VmFsdWUgPSBuZXh0U29ydERpcih0aGlzLnNvcnRUeXBlLCB0aGlzLnNvcnREaXIpO1xuICAgIHRoaXMuc29ydC5lbWl0KHtcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICBwcmV2VmFsdWU6IHRoaXMuc29ydERpcixcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjYWxjU29ydENsYXNzKHNvcnREaXI6IFNvcnREaXJlY3Rpb24pOiBzdHJpbmcge1xuICAgIGlmIChzb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmFzYykge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biBzb3J0LWFzYyAke3RoaXMuc29ydEFzY2VuZGluZ0ljb259YDtcbiAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biBzb3J0LWRlc2MgJHt0aGlzLnNvcnREZXNjZW5kaW5nSWNvbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYHNvcnQtYnRuYDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==