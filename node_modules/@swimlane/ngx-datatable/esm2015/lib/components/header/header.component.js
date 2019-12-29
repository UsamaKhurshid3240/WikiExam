/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { translateXY } from '../../utils/translate';
export class DataTableHeaderComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.reorder = new EventEmitter();
        this.resize = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this._columnGroupWidths = {
            total: 100
        };
        this._styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set innerWidth(val) {
        this._innerWidth = val;
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this._columns) {
                /** @type {?} */
                const colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
                this.setStylesByGroup();
            }
        }));
    }
    /**
     * @return {?}
     */
    get innerWidth() {
        return this._innerWidth;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set headerHeight(val) {
        if (val !== 'auto') {
            this._headerHeight = `${val}px`;
        }
        else {
            this._headerHeight = val;
        }
    }
    /**
     * @return {?}
     */
    get headerHeight() {
        return this._headerHeight;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(val);
        this._columnsByPin = columnsByPinArr(val);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._columnGroupWidths = columnGroupWidths(colsByPin, val);
            this.setStylesByGroup();
        }));
    }
    /**
     * @return {?}
     */
    get columns() {
        return this._columns;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set offsetX(val) {
        this._offsetX = val;
        this.setStylesByGroup();
    }
    /**
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onLongPressStart({ event, model }) {
        model.dragging = true;
        this.dragEventTarget = event;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onLongPressEnd({ event, model }) {
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout((/**
         * @return {?}
         */
        () => {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            /** @type {?} */
            const column = this._columns.find((/**
             * @param {?} c
             * @return {?}
             */
            c => c.$$id === model.$$id));
            if (column) {
                column.dragging = false;
            }
        }), 5);
    }
    /**
     * @return {?}
     */
    get headerWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        return '100%';
    }
    /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    trackByGroups(index, colGroup) {
        return colGroup.type;
    }
    /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * @param {?} width
     * @param {?} column
     * @return {?}
     */
    onColumnResized(width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column,
            prevValue: column.width,
            newValue: width
        });
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onColumnReordered({ prevIndex, newIndex, model }) {
        /** @type {?} */
        const column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onTargetChanged({ prevIndex, newIndex, initialIndex }) {
        if (prevIndex || prevIndex === 0) {
            /** @type {?} */
            const oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            /** @type {?} */
            const newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = {
                    class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')
                };
            }
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getColumn(index) {
        /** @type {?} */
        const leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        /** @type {?} */
        const centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    onSort({ column, prevValue, newValue }) {
        // if we are dragging don't sort!
        if (column.dragging) {
            return;
        }
        /** @type {?} */
        const sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts,
            column,
            prevValue,
            newValue
        });
    }
    /**
     * @param {?} column
     * @param {?} prevValue
     * @param {?} newValue
     * @return {?}
     */
    calcNewSorts(column, prevValue, newValue) {
        /** @type {?} */
        let idx = 0;
        if (!this.sorts) {
            this.sorts = [];
        }
        /** @type {?} */
        const sorts = this.sorts.map((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        (s, i) => {
            s = Object.assign({}, s);
            if (s.prop === column.prop) {
                idx = i;
            }
            return s;
        }));
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    }
    /**
     * @return {?}
     */
    setStylesByGroup() {
        this._styleByGroup.left = this.calcStylesByGroup('left');
        this._styleByGroup.center = this.calcStylesByGroup('center');
        this._styleByGroup.right = this.calcStylesByGroup('right');
        this.cd.detectChanges();
    }
    /**
     * @param {?} group
     * @return {?}
     */
    calcStylesByGroup(group) {
        /** @type {?} */
        const widths = this._columnGroupWidths;
        /** @type {?} */
        const offsetX = this.offsetX;
        /** @type {?} */
        const styles = {
            width: `${widths[group]}px`
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            const totalDiff = widths.total - this.innerWidth;
            /** @type {?} */
            const offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
}
DataTableHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-header',
                template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
    >
      <div
        *ngFor="let colGroup of _columnsByPin; trackBy: trackByGroups"
        [class]="'datatable-row-' + colGroup.type"
        [ngStyle]="_styleByGroup[colGroup.type]"
      >
        <datatable-header-cell
          *ngFor="let column of colGroup.columns; trackBy: columnTrackingFn"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [isTarget]="column.isTarget"
          [targetMarkerTemplate]="targetMarkerTemplate"
          [targetMarkerContext]="column.targetMarkerContext"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [allRowsSelected]="allRowsSelected"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
      </div>
    </div>
  `,
                host: {
                    class: 'datatable-header'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DataTableHeaderComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableHeaderComponent.propDecorators = {
    sortAscendingIcon: [{ type: Input }],
    sortDescendingIcon: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    dealsWithGroup: [{ type: Input }],
    targetMarkerTemplate: [{ type: Input }],
    innerWidth: [{ type: Input }],
    sorts: [{ type: Input }],
    sortType: [{ type: Input }],
    allRowsSelected: [{ type: Input }],
    selectionType: [{ type: Input }],
    reorderable: [{ type: Input }],
    headerHeight: [{ type: HostBinding, args: ['style.height',] }, { type: Input }],
    columns: [{ type: Input }],
    offsetX: [{ type: Input }],
    sort: [{ type: Output }],
    reorder: [{ type: Output }],
    resize: [{ type: Output }],
    select: [{ type: Output }],
    columnContextmenu: [{ type: Output }],
    headerWidth: [{ type: HostBinding, args: ['style.width',] }]
};
if (false) {
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortAscendingIcon;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortDescendingIcon;
    /** @type {?} */
    DataTableHeaderComponent.prototype.scrollbarH;
    /** @type {?} */
    DataTableHeaderComponent.prototype.dealsWithGroup;
    /** @type {?} */
    DataTableHeaderComponent.prototype.targetMarkerTemplate;
    /** @type {?} */
    DataTableHeaderComponent.prototype.targetMarkerContext;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sorts;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sortType;
    /** @type {?} */
    DataTableHeaderComponent.prototype.allRowsSelected;
    /** @type {?} */
    DataTableHeaderComponent.prototype.selectionType;
    /** @type {?} */
    DataTableHeaderComponent.prototype.reorderable;
    /** @type {?} */
    DataTableHeaderComponent.prototype.dragEventTarget;
    /** @type {?} */
    DataTableHeaderComponent.prototype.sort;
    /** @type {?} */
    DataTableHeaderComponent.prototype.reorder;
    /** @type {?} */
    DataTableHeaderComponent.prototype.resize;
    /** @type {?} */
    DataTableHeaderComponent.prototype.select;
    /** @type {?} */
    DataTableHeaderComponent.prototype.columnContextmenu;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columnsByPin;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columnGroupWidths;
    /** @type {?} */
    DataTableHeaderComponent.prototype._innerWidth;
    /** @type {?} */
    DataTableHeaderComponent.prototype._offsetX;
    /** @type {?} */
    DataTableHeaderComponent.prototype._columns;
    /** @type {?} */
    DataTableHeaderComponent.prototype._headerHeight;
    /** @type {?} */
    DataTableHeaderComponent.prototype._styleByGroup;
    /**
     * @type {?}
     * @private
     */
    DataTableHeaderComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXdEcEQsTUFBTSxPQUFPLHdCQUF3Qjs7OztJQTBGbkMsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFwQi9CLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksQ0FBcUMsS0FBSyxDQUFDLENBQUM7UUFHMUYsdUJBQWtCLEdBQVE7WUFDeEIsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDO1FBS0Ysa0JBQWEsR0FBMkI7WUFDdEMsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztJQUUwQyxDQUFDOzs7OztJQWpGN0Ms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QUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQS9EQyxpQkFBaUI7OztnQ0FpRWhCLEtBQUs7aUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7bUNBQ0wsS0FBSzt5QkFJTCxLQUFLO29CQWVMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFJTCxXQUFXLFNBQUMsY0FBYyxjQUMxQixLQUFLO3NCQWFMLEtBQUs7c0JBZUwsS0FBSzttQkFTTCxNQUFNO3NCQUNOLE1BQU07cUJBQ04sTUFBTTtxQkFDTixNQUFNO2dDQUNOLE1BQU07MEJBc0NOLFdBQVcsU0FBQyxhQUFhOzs7O0lBL0cxQixxREFBZ0M7O0lBQ2hDLHNEQUFpQzs7SUFDakMsOENBQTZCOztJQUM3QixrREFBaUM7O0lBQ2pDLHdEQUFtQzs7SUFFbkMsdURBQXlCOztJQWlCekIseUNBQXNCOztJQUN0Qiw0Q0FBNEI7O0lBQzVCLG1EQUFrQzs7SUFDbEMsaURBQXNDOztJQUN0QywrQ0FBOEI7O0lBRTlCLG1EQUFxQjs7SUF3Q3JCLHdDQUF1RDs7SUFDdkQsMkNBQTBEOztJQUMxRCwwQ0FBeUQ7O0lBQ3pELDBDQUF5RDs7SUFDekQscURBQTBGOztJQUUxRixpREFBbUI7O0lBQ25CLHNEQUVFOztJQUNGLCtDQUFvQjs7SUFDcEIsNENBQWlCOztJQUNqQiw0Q0FBZ0I7O0lBQ2hCLGlEQUFzQjs7SUFDdEIsaURBSUU7Ozs7O0lBRVUsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uR3JvdXBXaWR0aHMsIGNvbHVtbnNCeVBpbkFyciB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IHRyYW5zbGF0ZVhZIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHJhbnNsYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgb3JkZXJhYmxlXG4gICAgICAocmVvcmRlcik9XCJvbkNvbHVtblJlb3JkZXJlZCgkZXZlbnQpXCJcbiAgICAgICh0YXJnZXRDaGFuZ2VkKT1cIm9uVGFyZ2V0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJfY29sdW1uR3JvdXBXaWR0aHMudG90YWxcIlxuICAgICAgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWlubmVyXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcbiAgICAgICAgW2NsYXNzXT1cIidkYXRhdGFibGUtcm93LScgKyBjb2xHcm91cC50eXBlXCJcbiAgICAgICAgW25nU3R5bGVdPVwiX3N0eWxlQnlHcm91cFtjb2xHcm91cC50eXBlXVwiXG4gICAgICA+XG4gICAgICAgIDxkYXRhdGFibGUtaGVhZGVyLWNlbGxcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IHRyYWNrQnk6IGNvbHVtblRyYWNraW5nRm5cIlxuICAgICAgICAgIHJlc2l6ZWFibGVcbiAgICAgICAgICBbcmVzaXplRW5hYmxlZF09XCJjb2x1bW4ucmVzaXplYWJsZVwiXG4gICAgICAgICAgKHJlc2l6ZSk9XCJvbkNvbHVtblJlc2l6ZWQoJGV2ZW50LCBjb2x1bW4pXCJcbiAgICAgICAgICBsb25nLXByZXNzXG4gICAgICAgICAgW3ByZXNzTW9kZWxdPVwiY29sdW1uXCJcbiAgICAgICAgICBbcHJlc3NFbmFibGVkXT1cInJlb3JkZXJhYmxlICYmIGNvbHVtbi5kcmFnZ2FibGVcIlxuICAgICAgICAgIChsb25nUHJlc3NTdGFydCk9XCJvbkxvbmdQcmVzc1N0YXJ0KCRldmVudClcIlxuICAgICAgICAgIChsb25nUHJlc3NFbmQpPVwib25Mb25nUHJlc3NFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgW2RyYWdYXT1cInJlb3JkZXJhYmxlICYmIGNvbHVtbi5kcmFnZ2FibGUgJiYgY29sdW1uLmRyYWdnaW5nXCJcbiAgICAgICAgICBbZHJhZ1ldPVwiZmFsc2VcIlxuICAgICAgICAgIFtkcmFnTW9kZWxdPVwiY29sdW1uXCJcbiAgICAgICAgICBbZHJhZ0V2ZW50VGFyZ2V0XT1cImRyYWdFdmVudFRhcmdldFwiXG4gICAgICAgICAgW2hlYWRlckhlaWdodF09XCJoZWFkZXJIZWlnaHRcIlxuICAgICAgICAgIFtpc1RhcmdldF09XCJjb2x1bW4uaXNUYXJnZXRcIlxuICAgICAgICAgIFt0YXJnZXRNYXJrZXJUZW1wbGF0ZV09XCJ0YXJnZXRNYXJrZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgW3RhcmdldE1hcmtlckNvbnRleHRdPVwiY29sdW1uLnRhcmdldE1hcmtlckNvbnRleHRcIlxuICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICBbc29ydFR5cGVdPVwic29ydFR5cGVcIlxuICAgICAgICAgIFtzb3J0c109XCJzb3J0c1wiXG4gICAgICAgICAgW3NlbGVjdGlvblR5cGVdPVwic2VsZWN0aW9uVHlwZVwiXG4gICAgICAgICAgW3NvcnRBc2NlbmRpbmdJY29uXT1cInNvcnRBc2NlbmRpbmdJY29uXCJcbiAgICAgICAgICBbc29ydERlc2NlbmRpbmdJY29uXT1cInNvcnREZXNjZW5kaW5nSWNvblwiXG4gICAgICAgICAgW2FsbFJvd3NTZWxlY3RlZF09XCJhbGxSb3dzU2VsZWN0ZWRcIlxuICAgICAgICAgIChzb3J0KT1cIm9uU29ydCgkZXZlbnQpXCJcbiAgICAgICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgICAgICAgIChjb2x1bW5Db250ZXh0bWVudSk9XCJjb2x1bW5Db250ZXh0bWVudS5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgIDwvZGF0YXRhYmxlLWhlYWRlci1jZWxsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1oZWFkZXInXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNvcnRBc2NlbmRpbmdJY29uOiBhbnk7XG4gIEBJbnB1dCgpIHNvcnREZXNjZW5kaW5nSWNvbjogYW55O1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xuICBASW5wdXQoKSBkZWFsc1dpdGhHcm91cDogYm9vbGVhbjtcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcblxuICB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgQElucHV0KCkgc2V0IGlubmVyV2lkdGgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdmFsO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgY29sQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XG4gICAgICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sQnlQaW4sIHRoaXMuX2NvbHVtbnMpO1xuICAgICAgICB0aGlzLnNldFN0eWxlc0J5R3JvdXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpbm5lcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2lubmVyV2lkdGg7XG4gIH1cblxuICBASW5wdXQoKSBzb3J0czogYW55W107XG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcbiAgQElucHV0KCkgYWxsUm93c1NlbGVjdGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuICBASW5wdXQoKSByZW9yZGVyYWJsZTogYm9vbGVhbjtcblxuICBkcmFnRXZlbnRUYXJnZXQ6IGFueTtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXG4gIEBJbnB1dCgpXG4gIHNldCBoZWFkZXJIZWlnaHQodmFsOiBhbnkpIHtcbiAgICBpZiAodmFsICE9PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IGAke3ZhbH1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYWRlckhlaWdodCA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVhZGVySGVpZ2h0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckhlaWdodDtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuXG4gICAgY29uc3QgY29sc0J5UGluID0gY29sdW1uc0J5UGluKHZhbCk7XG4gICAgdGhpcy5fY29sdW1uc0J5UGluID0gY29sdW1uc0J5UGluQXJyKHZhbCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcbiAgICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG9mZnNldFgodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXRYID0gdmFsO1xuICAgIHRoaXMuc2V0U3R5bGVzQnlHcm91cCgpO1xuICB9XG4gIGdldCBvZmZzZXRYKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xuICB9XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XG5cbiAgX2NvbHVtbnNCeVBpbjogYW55O1xuICBfY29sdW1uR3JvdXBXaWR0aHM6IGFueSA9IHtcbiAgICB0b3RhbDogMTAwXG4gIH07XG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XG4gIF9vZmZzZXRYOiBudW1iZXI7XG4gIF9jb2x1bW5zOiBhbnlbXTtcbiAgX2hlYWRlckhlaWdodDogc3RyaW5nO1xuICBfc3R5bGVCeUdyb3VwOiB7IFtwcm9wOiBzdHJpbmddOiB7fSB9ID0ge1xuICAgIGxlZnQ6IHt9LFxuICAgIGNlbnRlcjoge30sXG4gICAgcmlnaHQ6IHt9XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgb25Mb25nUHJlc3NTdGFydCh7IGV2ZW50LCBtb2RlbCB9OiB7IGV2ZW50OiBhbnk7IG1vZGVsOiBhbnkgfSkge1xuICAgIG1vZGVsLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmRyYWdFdmVudFRhcmdldCA9IGV2ZW50O1xuICB9XG5cbiAgb25Mb25nUHJlc3NFbmQoeyBldmVudCwgbW9kZWwgfTogeyBldmVudDogYW55OyBtb2RlbDogYW55IH0pIHtcbiAgICB0aGlzLmRyYWdFdmVudFRhcmdldCA9IGV2ZW50O1xuXG4gICAgLy8gZGVsYXkgcmVzZXR0aW5nIHNvIHNvcnQgY2FuIGJlXG4gICAgLy8gcHJldmVudGVkIGlmIHdlIHdlcmUgZHJhZ2dpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGRhdGF0YWJsZSBjb21wb25lbnQgY3JlYXRlcyBjb3BpZXMgZnJvbSBjb2x1bW5zIG9uIHJlb3JkZXJcbiAgICAgIC8vIHNldCBkcmFnZ2luZyB0byBmYWxzZSBvbiBuZXcgb2JqZWN0c1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fY29sdW1ucy5maW5kKGMgPT4gYy4kJGlkID09PSBtb2RlbC4kJGlkKTtcbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgY29sdW1uLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgNSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IGhlYWRlcldpZHRoKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFySCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJXaWR0aCArICdweCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcxMDAlJztcbiAgfVxuXG4gIHRyYWNrQnlHcm91cHMoaW5kZXg6IG51bWJlciwgY29sR3JvdXA6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbEdyb3VwLnR5cGU7XG4gIH1cblxuICBjb2x1bW5UcmFja2luZ0ZuKGluZGV4OiBudW1iZXIsIGNvbHVtbjogYW55KTogYW55IHtcbiAgICByZXR1cm4gY29sdW1uLiQkaWQ7XG4gIH1cblxuICBvbkNvbHVtblJlc2l6ZWQod2lkdGg6IG51bWJlciwgY29sdW1uOiBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBpZiAod2lkdGggPD0gY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICB3aWR0aCA9IGNvbHVtbi5taW5XaWR0aDtcbiAgICB9IGVsc2UgaWYgKHdpZHRoID49IGNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgd2lkdGggPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNpemUuZW1pdCh7XG4gICAgICBjb2x1bW4sXG4gICAgICBwcmV2VmFsdWU6IGNvbHVtbi53aWR0aCxcbiAgICAgIG5ld1ZhbHVlOiB3aWR0aFxuICAgIH0pO1xuICB9XG5cbiAgb25Db2x1bW5SZW9yZGVyZWQoeyBwcmV2SW5kZXgsIG5ld0luZGV4LCBtb2RlbCB9OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdldENvbHVtbihuZXdJbmRleCk7XG4gICAgY29sdW1uLmlzVGFyZ2V0ID0gZmFsc2U7XG4gICAgY29sdW1uLnRhcmdldE1hcmtlckNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZW9yZGVyLmVtaXQoe1xuICAgICAgY29sdW1uOiBtb2RlbCxcbiAgICAgIHByZXZWYWx1ZTogcHJldkluZGV4LFxuICAgICAgbmV3VmFsdWU6IG5ld0luZGV4XG4gICAgfSk7XG4gIH1cblxuICBvblRhcmdldENoYW5nZWQoeyBwcmV2SW5kZXgsIG5ld0luZGV4LCBpbml0aWFsSW5kZXggfTogYW55KTogdm9pZCB7XG4gICAgaWYgKHByZXZJbmRleCB8fCBwcmV2SW5kZXggPT09IDApIHtcbiAgICAgIGNvbnN0IG9sZENvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKHByZXZJbmRleCk7XG4gICAgICBvbGRDb2x1bW4uaXNUYXJnZXQgPSBmYWxzZTtcbiAgICAgIG9sZENvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAobmV3SW5kZXggfHwgbmV3SW5kZXggPT09IDApIHtcbiAgICAgIGNvbnN0IG5ld0NvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKG5ld0luZGV4KTtcbiAgICAgIG5ld0NvbHVtbi5pc1RhcmdldCA9IHRydWU7XG5cbiAgICAgIGlmIChpbml0aWFsSW5kZXggIT09IG5ld0luZGV4KSB7XG4gICAgICAgIG5ld0NvbHVtbi50YXJnZXRNYXJrZXJDb250ZXh0ID0ge1xuICAgICAgICAgIGNsYXNzOiAndGFyZ2V0TWFya2VyICcuY29uY2F0KGluaXRpYWxJbmRleCA+IG5ld0luZGV4ID8gJ2RyYWdGcm9tUmlnaHQnIDogJ2RyYWdGcm9tTGVmdCcpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29sdW1uKGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IGxlZnRDb2x1bW5Db3VudCA9IHRoaXMuX2NvbHVtbnNCeVBpblswXS5jb2x1bW5zLmxlbmd0aDtcbiAgICBpZiAoaW5kZXggPCBsZWZ0Q29sdW1uQ291bnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMF0uY29sdW1uc1tpbmRleF07XG4gICAgfVxuXG4gICAgY29uc3QgY2VudGVyQ29sdW1uQ291bnQgPSB0aGlzLl9jb2x1bW5zQnlQaW5bMV0uY29sdW1ucy5sZW5ndGg7XG4gICAgaWYgKGluZGV4IDwgbGVmdENvbHVtbkNvdW50ICsgY2VudGVyQ29sdW1uQ291bnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zQnlQaW5bMV0uY29sdW1uc1tpbmRleCAtIGxlZnRDb2x1bW5Db3VudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnNCeVBpblsyXS5jb2x1bW5zW2luZGV4IC0gbGVmdENvbHVtbkNvdW50IC0gY2VudGVyQ29sdW1uQ291bnRdO1xuICB9XG5cbiAgb25Tb3J0KHsgY29sdW1uLCBwcmV2VmFsdWUsIG5ld1ZhbHVlIH06IGFueSk6IHZvaWQge1xuICAgIC8vIGlmIHdlIGFyZSBkcmFnZ2luZyBkb24ndCBzb3J0IVxuICAgIGlmIChjb2x1bW4uZHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0cyA9IHRoaXMuY2FsY05ld1NvcnRzKGNvbHVtbiwgcHJldlZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgdGhpcy5zb3J0LmVtaXQoe1xuICAgICAgc29ydHMsXG4gICAgICBjb2x1bW4sXG4gICAgICBwcmV2VmFsdWUsXG4gICAgICBuZXdWYWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY05ld1NvcnRzKGNvbHVtbjogYW55LCBwcmV2VmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcik6IGFueVtdIHtcbiAgICBsZXQgaWR4ID0gMDtcblxuICAgIGlmICghdGhpcy5zb3J0cykge1xuICAgICAgdGhpcy5zb3J0cyA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHNvcnRzID0gdGhpcy5zb3J0cy5tYXAoKHMsIGkpID0+IHtcbiAgICAgIHMgPSB7IC4uLnMgfTtcbiAgICAgIGlmIChzLnByb3AgPT09IGNvbHVtbi5wcm9wKSB7XG4gICAgICAgIGlkeCA9IGk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcztcbiAgICB9KTtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzb3J0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9IGVsc2UgaWYgKHByZXZWYWx1ZSkge1xuICAgICAgc29ydHNbaWR4XS5kaXIgPSBuZXdWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuc29ydFR5cGUgPT09IFNvcnRUeXBlLnNpbmdsZSkge1xuICAgICAgICBzb3J0cy5zcGxpY2UoMCwgdGhpcy5zb3J0cy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBzb3J0cy5wdXNoKHsgZGlyOiBuZXdWYWx1ZSwgcHJvcDogY29sdW1uLnByb3AgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvcnRzO1xuICB9XG5cbiAgc2V0U3R5bGVzQnlHcm91cCgpIHtcbiAgICB0aGlzLl9zdHlsZUJ5R3JvdXAubGVmdCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2xlZnQnKTtcbiAgICB0aGlzLl9zdHlsZUJ5R3JvdXAuY2VudGVyID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnY2VudGVyJyk7XG4gICAgdGhpcy5fc3R5bGVCeUdyb3VwLnJpZ2h0ID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgncmlnaHQnKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHdpZHRocyA9IHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwID09PSAnY2VudGVyJykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYICogLTEsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIHRoaXMuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRvdGFsRGlmZiAqIC0xO1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbn1cbiJdfQ==