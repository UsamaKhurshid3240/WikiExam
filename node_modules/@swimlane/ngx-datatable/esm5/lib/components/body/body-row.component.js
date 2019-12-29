/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, HostBinding, ElementRef, Output, KeyValueDiffers, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { translateXY } from '../../utils/translate';
var DataTableBodyRowComponent = /** @class */ (function () {
    function DataTableBodyRowComponent(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.treeStatus = 'collapsed';
        this.activate = new EventEmitter();
        this.treeAction = new EventEmitter();
        this._groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        this._element = element.nativeElement;
        this._rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columns;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._columns = val;
            this.recalculateColumns(val);
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._innerWidth;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._columns) {
                /** @type {?} */
                var colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
            }
            this._innerWidth = val;
            this.recalculateColumns();
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "offsetX", {
        get: /**
         * @return {?}
         */
        function () {
            return this._offsetX;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._offsetX = val;
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "cssClass", {
        get: /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var cls = 'datatable-body-row';
            if (this.isSelected) {
                cls += ' active';
            }
            if (this.rowIndex % 2 !== 0) {
                cls += ' datatable-row-odd';
            }
            if (this.rowIndex % 2 === 0) {
                cls += ' datatable-row-even';
            }
            if (this.rowClass) {
                /** @type {?} */
                var res = this.rowClass(this.row);
                if (typeof res === 'string') {
                    cls += " " + res;
                }
                else if (typeof res === 'object') {
                    /** @type {?} */
                    var keys = Object.keys(res);
                    try {
                        for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                            var k = keys_1_1.value;
                            if (res[k] === true) {
                                cls += " " + k;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columnsTotalWidths", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnGroupWidths.total;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    };
    /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.trackByGroups = /**
     * @param {?} index
     * @param {?} colGroup
     * @return {?}
     */
    function (index, colGroup) {
        return colGroup.type;
    };
    /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.columnTrackingFn = /**
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    function (index, column) {
        return column.$$id;
    };
    /**
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.buildStylesByGroup = /**
     * @return {?}
     */
    function () {
        this._groupStyles.left = this.calcStylesByGroup('left');
        this._groupStyles.center = this.calcStylesByGroup('center');
        this._groupStyles.right = this.calcStylesByGroup('right');
        this.cd.markForCheck();
    };
    /**
     * @param {?} group
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.calcStylesByGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var widths = this._columnGroupWidths;
        /** @type {?} */
        var offsetX = this.offsetX;
        /** @type {?} */
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            /** @type {?} */
            var totalDiff = widths.total - bodyWidth;
            /** @type {?} */
            var offsetDiff = totalDiff - offsetX;
            /** @type {?} */
            var offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.onActivate = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var isTargetRow = event.target === this._element;
        /** @type {?} */
        var isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this._element
            });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.onMouseenter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.activate.emit({
            type: 'mouseenter',
            event: event,
            row: this.row,
            rowElement: this._element
        });
    };
    /**
     * @param {?=} val
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.recalculateColumns = /**
     * @param {?=} val
     * @return {?}
     */
    function (val) {
        if (val === void 0) { val = this.columns; }
        this._columns = val;
        /** @type {?} */
        var colsByPin = columnsByPin(this._columns);
        this._columnsByPin = columnsByPinArr(this._columns);
        this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    };
    /**
     * @return {?}
     */
    DataTableBodyRowComponent.prototype.onTreeAction = /**
     * @return {?}
     */
    function () {
        this.treeAction.emit();
    };
    DataTableBodyRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-body-row',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <div\n      *ngFor=\"let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups\"\n      class=\"datatable-row-{{ colGroup.type }} datatable-row-group\"\n      [ngStyle]=\"_groupStyles[colGroup.type]\"\n    >\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [group]=\"group\"\n        [expanded]=\"expanded\"\n        [isSelected]=\"isSelected\"\n        [rowIndex]=\"rowIndex\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        [displayCheck]=\"displayCheck\"\n        [treeStatus]=\"treeStatus\"\n        (activate)=\"onActivate($event, ii)\"\n        (treeAction)=\"onTreeAction()\"\n      >\n      </datatable-body-cell>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    DataTableBodyRowComponent.ctorParameters = function () { return [
        { type: KeyValueDiffers },
        { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    DataTableBodyRowComponent.propDecorators = {
        columns: [{ type: Input }],
        innerWidth: [{ type: Input }],
        expanded: [{ type: Input }],
        rowClass: [{ type: Input }],
        row: [{ type: Input }],
        group: [{ type: Input }],
        isSelected: [{ type: Input }],
        rowIndex: [{ type: Input }],
        displayCheck: [{ type: Input }],
        treeStatus: [{ type: Input }],
        offsetX: [{ type: Input }],
        cssClass: [{ type: HostBinding, args: ['class',] }],
        rowHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
        columnsTotalWidths: [{ type: HostBinding, args: ['style.width.px',] }],
        activate: [{ type: Output }],
        treeAction: [{ type: Output }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onMouseenter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }]
    };
    return DataTableBodyRowComponent;
}());
export { DataTableBodyRowComponent };
if (false) {
    /** @type {?} */
    DataTableBodyRowComponent.prototype.expanded;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowClass;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.row;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.group;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.isSelected;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowIndex;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.displayCheck;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.treeStatus;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.rowHeight;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.activate;
    /** @type {?} */
    DataTableBodyRowComponent.prototype.treeAction;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._element;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columnGroupWidths;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columnsByPin;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._offsetX;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._columns;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._innerWidth;
    /** @type {?} */
    DataTableBodyRowComponent.prototype._groupStyles;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype._rowDiffer;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.scrollbarHelper;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyRowComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsRUFDWCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGVBQWUsRUFFZixZQUFZLEVBQ1osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUFnSUUsbUNBQ1UsT0FBd0IsRUFDWixlQUFnQyxFQUM1QyxFQUFxQixFQUM3QixPQUFtQjtRQUhYLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzVDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdEV0QixlQUFVLEdBQWUsV0FBVyxDQUFDO1FBa0RwQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBUTdELGlCQUFZLEdBQTJCO1lBQ3JDLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFVQSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDdEMsSUFBSSxD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LFdBQVcsU0FBQyxpQkFBaUIsY0FDN0IsS0FBSztxQ0FHTCxXQUFXLFNBQUMsZ0JBQWdCOzJCQUs1QixNQUFNOzZCQUNOLE1BQU07NEJBMEVOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7K0JBeUJsQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQW9CeEMsZ0NBQUM7Q0FBQSxBQXZPRCxJQXVPQztTQTNNWSx5QkFBeUI7OztJQTBCcEMsNkNBQTJCOztJQUMzQiw2Q0FBdUI7O0lBQ3ZCLHdDQUFrQjs7SUFDbEIsMENBQW9COztJQUNwQiwrQ0FBNkI7O0lBQzdCLDZDQUEwQjs7SUFDMUIsaURBQTJCOztJQUMzQiwrQ0FBOEM7O0lBeUM5Qyw4Q0FFa0I7O0lBT2xCLDZDQUEyRDs7SUFDM0QsK0NBQTZEOztJQUU3RCw2Q0FBYzs7SUFDZCx1REFBd0I7O0lBQ3hCLGtEQUFtQjs7SUFDbkIsNkNBQWlCOztJQUNqQiw2Q0FBZ0I7O0lBQ2hCLGdEQUFvQjs7SUFDcEIsaURBSUU7Ozs7O0lBRUYsK0NBQTJDOzs7OztJQUd6Qyw0Q0FBZ0M7Ozs7O0lBQ2hDLG9EQUFvRDs7Ozs7SUFDcEQsdUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRG9DaGVjayxcbiAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRyZWVTdGF0dXMgfSBmcm9tICcuL2JvZHktY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocywgY29sdW1uc0J5UGluQXJyIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sdW1uJztcbmltcG9ydCB7IEtleXMgfSBmcm9tICcuLi8uLi91dGlscy9rZXlzJztcbmltcG9ydCB7IFNjcm9sbGJhckhlbHBlciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Njcm9sbGJhci1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5LXJvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xHcm91cCBvZiBfY29sdW1uc0J5UGluOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5R3JvdXBzXCJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXJvdy17eyBjb2xHcm91cC50eXBlIH19IGRhdGF0YWJsZS1yb3ctZ3JvdXBcIlxuICAgICAgW25nU3R5bGVdPVwiX2dyb3VwU3R5bGVzW2NvbEdyb3VwLnR5cGVdXCJcbiAgICA+XG4gICAgICA8ZGF0YXRhYmxlLWJvZHktY2VsbFxuICAgICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbEdyb3VwLmNvbHVtbnM7IGxldCBpaSA9IGluZGV4OyB0cmFja0J5OiBjb2x1bW5UcmFja2luZ0ZuXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgW2dyb3VwXT1cImdyb3VwXCJcbiAgICAgICAgW2V4cGFuZGVkXT1cImV4cGFuZGVkXCJcbiAgICAgICAgW2lzU2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFwiXG4gICAgICAgIFtyb3dJbmRleF09XCJyb3dJbmRleFwiXG4gICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgW3Jvd0hlaWdodF09XCJyb3dIZWlnaHRcIlxuICAgICAgICBbZGlzcGxheUNoZWNrXT1cImRpc3BsYXlDaGVja1wiXG4gICAgICAgIFt0cmVlU3RhdHVzXT1cInRyZWVTdGF0dXNcIlxuICAgICAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQsIGlpKVwiXG4gICAgICAgICh0cmVlQWN0aW9uKT1cIm9uVHJlZUFjdGlvbigpXCJcbiAgICAgID5cbiAgICAgIDwvZGF0YXRhYmxlLWJvZHktY2VsbD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Um93Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgpIHNldCBjb2x1bW5zKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuICAgIHRoaXMucmVjYWxjdWxhdGVDb2x1bW5zKHZhbCk7XG4gICAgdGhpcy5idWlsZFN0eWxlc0J5R3JvdXAoKTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBpbm5lcldpZHRoKHZhbDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNvbEJ5UGluID0gY29sdW1uc0J5UGluKHRoaXMuX2NvbHVtbnMpO1xuICAgICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xCeVBpbiwgdGhpcy5fY29sdW1ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHZhbDtcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucygpO1xuICAgIHRoaXMuYnVpbGRTdHlsZXNCeUdyb3VwKCk7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbm5lcldpZHRoO1xuICB9XG5cbiAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvd0NsYXNzOiBhbnk7XG4gIEBJbnB1dCgpIHJvdzogYW55O1xuICBASW5wdXQoKSBncm91cDogYW55O1xuICBASW5wdXQoKSBpc1NlbGVjdGVkOiBib29sZWFuO1xuICBASW5wdXQoKSByb3dJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IGFueTtcbiAgQElucHV0KCkgdHJlZVN0YXR1czogVHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXRYKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0WCA9IHZhbDtcbiAgICB0aGlzLmJ1aWxkU3R5bGVzQnlHcm91cCgpO1xuICB9XG4gIGdldCBvZmZzZXRYKCkge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXRYO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjc3NDbGFzcygpIHtcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LXJvdyc7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xuICAgICAgY2xzICs9ICcgYWN0aXZlJztcbiAgICB9XG4gICAgaWYgKHRoaXMucm93SW5kZXggJSAyICE9PSAwKSB7XG4gICAgICBjbHMgKz0gJyBkYXRhdGFibGUtcm93LW9kZCc7XG4gICAgfVxuICAgIGlmICh0aGlzLnJvd0luZGV4ICUgMiA9PT0gMCkge1xuICAgICAgY2xzICs9ICcgZGF0YXRhYmxlLXJvdy1ldmVuJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3dDbGFzcykge1xuICAgICAgY29uc3QgcmVzID0gdGhpcy5yb3dDbGFzcyh0aGlzLnJvdyk7XG4gICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9IGAgJHtyZXN9YDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XG4gICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICAgICAgaWYgKHJlc1trXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNscztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgQElucHV0KClcbiAgcm93SGVpZ2h0OiBudW1iZXI7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCBjb2x1bW5zVG90YWxXaWR0aHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMudG90YWw7XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2VsZW1lbnQ6IGFueTtcbiAgX2NvbHVtbkdyb3VwV2lkdGhzOiBhbnk7XG4gIF9jb2x1bW5zQnlQaW46IGFueTtcbiAgX29mZnNldFg6IG51bWJlcjtcbiAgX2NvbHVtbnM6IGFueVtdO1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfZ3JvdXBTdHlsZXM6IHsgW3Byb3A6IHN0cmluZ106IHt9IH0gPSB7XG4gICAgbGVmdDoge30sXG4gICAgY2VudGVyOiB7fSxcbiAgICByaWdodDoge31cbiAgfTtcblxuICBwcml2YXRlIF9yb3dEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHt9LCB7fT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgQFNraXBTZWxmKCkgcHJpdmF0ZSBzY3JvbGxiYXJIZWxwZXI6IFNjcm9sbGJhckhlbHBlcixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5fcm93RGlmZmVyID0gZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm93RGlmZmVyLmRpZmYodGhpcy5yb3cpKSB7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnlHcm91cHMoaW5kZXg6IG51bWJlciwgY29sR3JvdXA6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbEdyb3VwLnR5cGU7XG4gIH1cblxuICBjb2x1bW5UcmFja2luZ0ZuKGluZGV4OiBudW1iZXIsIGNvbHVtbjogYW55KTogYW55IHtcbiAgICByZXR1cm4gY29sdW1uLiQkaWQ7XG4gIH1cblxuICBidWlsZFN0eWxlc0J5R3JvdXAoKSB7XG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMubGVmdCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ2xlZnQnKTtcbiAgICB0aGlzLl9ncm91cFN0eWxlcy5jZW50ZXIgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdjZW50ZXInKTtcbiAgICB0aGlzLl9ncm91cFN0eWxlcy5yaWdodCA9IHRoaXMuY2FsY1N0eWxlc0J5R3JvdXAoJ3JpZ2h0Jyk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNhbGNTdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpIHtcbiAgICBjb25zdCB3aWR0aHMgPSB0aGlzLl9jb2x1bW5Hcm91cFdpZHRocztcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy5vZmZzZXRYO1xuXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgd2lkdGg6IGAke3dpZHRoc1tncm91cF19cHhgXG4gICAgfTtcblxuICAgIGlmIChncm91cCA9PT0gJ2xlZnQnKSB7XG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldFgsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IGJvZHlXaWR0aCA9IHBhcnNlSW50KHRoaXMuaW5uZXJXaWR0aCArICcnLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIGJvZHlXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldERpZmYgPSB0b3RhbERpZmYgLSBvZmZzZXRYO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gKG9mZnNldERpZmYgKyB0aGlzLnNjcm9sbGJhckhlbHBlci53aWR0aCkgKiAtMTtcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0LCAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbiAgb25BY3RpdmF0ZShldmVudDogYW55LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgZXZlbnQuY2VsbEluZGV4ID0gaW5kZXg7XG4gICAgZXZlbnQucm93RWxlbWVudCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBpc1RhcmdldFJvdyA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5fZWxlbWVudDtcblxuICAgIGNvbnN0IGlzQWN0aW9uID1cbiAgICAgIGtleUNvZGUgPT09IEtleXMucmV0dXJuIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmRvd24gfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMudXAgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMubGVmdCB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yaWdodDtcblxuICAgIGlmIChpc0FjdGlvbiAmJiBpc1RhcmdldFJvdykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgICB0eXBlOiAna2V5ZG93bicsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICByb3dFbGVtZW50OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZWVudGVyKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoe1xuICAgICAgdHlwZTogJ21vdXNlZW50ZXInLFxuICAgICAgZXZlbnQsXG4gICAgICByb3c6IHRoaXMucm93LFxuICAgICAgcm93RWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgIH0pO1xuICB9XG5cbiAgcmVjYWxjdWxhdGVDb2x1bW5zKHZhbDogYW55W10gPSB0aGlzLmNvbHVtbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuICAgIGNvbnN0IGNvbHNCeVBpbiA9IGNvbHVtbnNCeVBpbih0aGlzLl9jb2x1bW5zKTtcbiAgICB0aGlzLl9jb2x1bW5zQnlQaW4gPSBjb2x1bW5zQnlQaW5BcnIodGhpcy5fY29sdW1ucyk7XG4gICAgdGhpcy5fY29sdW1uR3JvdXBXaWR0aHMgPSBjb2x1bW5Hcm91cFdpZHRocyhjb2xzQnlQaW4sIHRoaXMuX2NvbHVtbnMpO1xuICB9XG5cbiAgb25UcmVlQWN0aW9uKCkge1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==