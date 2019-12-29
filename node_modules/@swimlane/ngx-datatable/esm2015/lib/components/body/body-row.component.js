/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ElementRef, Output, KeyValueDiffers, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, SkipSelf } from '@angular/core';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../utils/column';
import { Keys } from '../../utils/keys';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { translateXY } from '../../utils/translate';
export class DataTableBodyRowComponent {
    /**
     * @param {?} differs
     * @param {?} scrollbarHelper
     * @param {?} cd
     * @param {?} element
     */
    constructor(differs, scrollbarHelper, cd, element) {
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
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        this.recalculateColumns(val);
        this.buildStylesByGroup();
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
    set innerWidth(val) {
        if (this._columns) {
            /** @type {?} */
            const colByPin = columnsByPin(this._columns);
            this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        }
        this._innerWidth = val;
        this.recalculateColumns();
        this.buildStylesByGroup();
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
    set offsetX(val) {
        this._offsetX = val;
        this.buildStylesByGroup();
    }
    /**
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @return {?}
     */
    get cssClass() {
        /** @type {?} */
        let cls = 'datatable-body-row';
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
            const res = this.rowClass(this.row);
            if (typeof res === 'string') {
                cls += ` ${res}`;
            }
            else if (typeof res === 'object') {
                /** @type {?} */
                const keys = Object.keys(res);
                for (const k of keys) {
                    if (res[k] === true) {
                        cls += ` ${k}`;
                    }
                }
            }
        }
        return cls;
    }
    /**
     * @return {?}
     */
    get columnsTotalWidths() {
        return this._columnGroupWidths.total;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
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
     * @return {?}
     */
    buildStylesByGroup() {
        this._groupStyles.left = this.calcStylesByGroup('left');
        this._groupStyles.center = this.calcStylesByGroup('center');
        this._groupStyles.right = this.calcStylesByGroup('right');
        this.cd.markForCheck();
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
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            /** @type {?} */
            const bodyWidth = parseInt(this.innerWidth + '', 0);
            /** @type {?} */
            const totalDiff = widths.total - bodyWidth;
            /** @type {?} */
            const offsetDiff = totalDiff - offsetX;
            /** @type {?} */
            const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onActivate(event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const isTargetRow = event.target === this._element;
        /** @type {?} */
        const isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event,
                row: this.row,
                rowElement: this._element
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseenter(event) {
        this.activate.emit({
            type: 'mouseenter',
            event,
            row: this.row,
            rowElement: this._element
        });
    }
    /**
     * @param {?=} val
     * @return {?}
     */
    recalculateColumns(val = this.columns) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(this._columns);
        this._columnsByPin = columnsByPinArr(this._columns);
        this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    }
    /**
     * @return {?}
     */
    onTreeAction() {
        this.treeAction.emit();
    }
}
DataTableBodyRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body-row',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div
      *ngFor="let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups"
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [ngStyle]="_groupStyles[colGroup.type]"
    >
      <datatable-body-cell
        *ngFor="let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [treeStatus]="treeStatus"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
    </div>
  `
            }] }
];
/** @nocollapse */
DataTableBodyRowComponent.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: ScrollbarHelper, decorators: [{ type: SkipSelf }] },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUVqQixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQThCcEQsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7OztJQW9HcEMsWUFDVSxPQUF3QixFQUNaLGVBQWdDLEVBQzVDLEVBQXFCLEVBQzdCLE9BQW1CO1FBSFgsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDNUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF0RXRCLGVBQVUsR0FBZSxXQUFXLENBQUM7UUFrRHBDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRN0QsaUJBQVksR0FBMkI7WUFDckMsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQVVBLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFD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LDZDQUEyQjs7SUFDM0IsNkNBQXVCOztJQUN2Qix3Q0FBa0I7O0lBQ2xCLDBDQUFvQjs7SUFDcEIsK0NBQTZCOztJQUM3Qiw2Q0FBMEI7O0lBQzFCLGlEQUEyQjs7SUFDM0IsK0NBQThDOztJQXlDOUMsOENBRWtCOztJQU9sQiw2Q0FBMkQ7O0lBQzNELCtDQUE2RDs7SUFFN0QsNkNBQWM7O0lBQ2QsdURBQXdCOztJQUN4QixrREFBbUI7O0lBQ25CLDZDQUFpQjs7SUFDakIsNkNBQWdCOztJQUNoQixnREFBb0I7O0lBQ3BCLGlEQUlFOzs7OztJQUVGLCtDQUEyQzs7Ozs7SUFHekMsNENBQWdDOzs7OztJQUNoQyxvREFBb0Q7Ozs7O0lBQ3BELHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBFbGVtZW50UmVmLFxuICBPdXRwdXQsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERvQ2hlY2ssXG4gIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUcmVlU3RhdHVzIH0gZnJvbSAnLi9ib2R5LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uR3JvdXBXaWR0aHMsIGNvbHVtbnNCeVBpbkFyciB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5pbXBvcnQgeyBTY3JvbGxiYXJIZWxwZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zY3JvbGxiYXItaGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgdHJhbnNsYXRlWFkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keS1yb3cnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdGb3I9XCJsZXQgY29sR3JvdXAgb2YgX2NvbHVtbnNCeVBpbjsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeUdyb3Vwc1wiXG4gICAgICBjbGFzcz1cImRhdGF0YWJsZS1yb3cte3sgY29sR3JvdXAudHlwZSB9fSBkYXRhdGFibGUtcm93LWdyb3VwXCJcbiAgICAgIFtuZ1N0eWxlXT1cIl9ncm91cFN0eWxlc1tjb2xHcm91cC50eXBlXVwiXG4gICAgPlxuICAgICAgPGRhdGF0YWJsZS1ib2R5LWNlbGxcbiAgICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2xHcm91cC5jb2x1bW5zOyBsZXQgaWkgPSBpbmRleDsgdHJhY2tCeTogY29sdW1uVHJhY2tpbmdGblwiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICBbcm93XT1cInJvd1wiXG4gICAgICAgIFtncm91cF09XCJncm91cFwiXG4gICAgICAgIFtleHBhbmRlZF09XCJleHBhbmRlZFwiXG4gICAgICAgIFtpc1NlbGVjdGVkXT1cImlzU2VsZWN0ZWRcIlxuICAgICAgICBbcm93SW5kZXhdPVwicm93SW5kZXhcIlxuICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgIFtyb3dIZWlnaHRdPVwicm93SGVpZ2h0XCJcbiAgICAgICAgW2Rpc3BsYXlDaGVja109XCJkaXNwbGF5Q2hlY2tcIlxuICAgICAgICBbdHJlZVN0YXR1c109XCJ0cmVlU3RhdHVzXCJcbiAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50LCBpaSlcIlxuICAgICAgICAodHJlZUFjdGlvbik9XCJvblRyZWVBY3Rpb24oKVwiXG4gICAgICA+XG4gICAgICA8L2RhdGF0YWJsZS1ib2R5LWNlbGw+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQm9keVJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgICB0aGlzLnJlY2FsY3VsYXRlQ29sdW1ucyh2YWwpO1xuICAgIHRoaXMuYnVpbGRTdHlsZXNCeUdyb3VwKCk7XG4gIH1cblxuICBnZXQgY29sdW1ucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgaW5uZXJXaWR0aCh2YWw6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9jb2x1bW5zKSB7XG4gICAgICBjb25zdCBjb2xCeVBpbiA9IGNvbHVtbnNCeVBpbih0aGlzLl9jb2x1bW5zKTtcbiAgICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sQnlQaW4sIHRoaXMuX2NvbHVtbnMpO1xuICAgIH1cblxuICAgIHRoaXMuX2lubmVyV2lkdGggPSB2YWw7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZUNvbHVtbnMoKTtcbiAgICB0aGlzLmJ1aWxkU3R5bGVzQnlHcm91cCgpO1xuICB9XG5cbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW5uZXJXaWR0aDtcbiAgfVxuXG4gIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuO1xuICBASW5wdXQoKSByb3dDbGFzczogYW55O1xuICBASW5wdXQoKSByb3c6IGFueTtcbiAgQElucHV0KCkgZ3JvdXA6IGFueTtcbiAgQElucHV0KCkgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgcm93SW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiBhbnk7XG4gIEBJbnB1dCgpIHRyZWVTdGF0dXM6IFRyZWVTdGF0dXMgPSAnY29sbGFwc2VkJztcblxuICBASW5wdXQoKVxuICBzZXQgb2Zmc2V0WCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX29mZnNldFggPSB2YWw7XG4gICAgdGhpcy5idWlsZFN0eWxlc0J5R3JvdXAoKTtcbiAgfVxuICBnZXQgb2Zmc2V0WCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0WDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgY3NzQ2xhc3MoKSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtYm9keS1yb3cnO1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcbiAgICAgIGNscyArPSAnIGFjdGl2ZSc7XG4gICAgfVxuICAgIGlmICh0aGlzLnJvd0luZGV4ICUgMiAhPT0gMCkge1xuICAgICAgY2xzICs9ICcgZGF0YXRhYmxlLXJvdy1vZGQnO1xuICAgIH1cbiAgICBpZiAodGhpcy5yb3dJbmRleCAlIDIgPT09IDApIHtcbiAgICAgIGNscyArPSAnIGRhdGF0YWJsZS1yb3ctZXZlbic7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm93Q2xhc3MpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMucm93Q2xhc3ModGhpcy5yb3cpO1xuICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNscyArPSBgICR7cmVzfWA7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xuICAgICAgICAgIGlmIChyZXNba10gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNscyArPSBgICR7a31gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbHM7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIEBJbnB1dCgpXG4gIHJvd0hlaWdodDogbnVtYmVyO1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICBnZXQgY29sdW1uc1RvdGFsV2lkdGhzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzLnRvdGFsO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHRyZWVBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9lbGVtZW50OiBhbnk7XG4gIF9jb2x1bW5Hcm91cFdpZHRoczogYW55O1xuICBfY29sdW1uc0J5UGluOiBhbnk7XG4gIF9vZmZzZXRYOiBudW1iZXI7XG4gIF9jb2x1bW5zOiBhbnlbXTtcbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgX2dyb3VwU3R5bGVzOiB7IFtwcm9wOiBzdHJpbmddOiB7fSB9ID0ge1xuICAgIGxlZnQ6IHt9LFxuICAgIGNlbnRlcjoge30sXG4gICAgcmlnaHQ6IHt9XG4gIH07XG5cbiAgcHJpdmF0ZSBfcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIEBTa2lwU2VsZigpIHByaXZhdGUgc2Nyb2xsYmFySGVscGVyOiBTY3JvbGxiYXJIZWxwZXIsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgZWxlbWVudDogRWxlbWVudFJlZlxuICApIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX3Jvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jvd0RpZmZlci5kaWZmKHRoaXMucm93KSkge1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5R3JvdXBzKGluZGV4OiBudW1iZXIsIGNvbEdyb3VwOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBjb2xHcm91cC50eXBlO1xuICB9XG5cbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xuICB9XG5cbiAgYnVpbGRTdHlsZXNCeUdyb3VwKCkge1xuICAgIHRoaXMuX2dyb3VwU3R5bGVzLmxlZnQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdsZWZ0Jyk7XG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMuY2VudGVyID0gdGhpcy5jYWxjU3R5bGVzQnlHcm91cCgnY2VudGVyJyk7XG4gICAgdGhpcy5fZ3JvdXBTdHlsZXMucmlnaHQgPSB0aGlzLmNhbGNTdHlsZXNCeUdyb3VwKCdyaWdodCcpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBjYWxjU3R5bGVzQnlHcm91cChncm91cDogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5fY29sdW1uR3JvdXBXaWR0aHM7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0WDtcblxuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgIHdpZHRoOiBgJHt3aWR0aHNbZ3JvdXBdfXB4YFxuICAgIH07XG5cbiAgICBpZiAoZ3JvdXAgPT09ICdsZWZ0Jykge1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXRYLCAwKTtcbiAgICB9IGVsc2UgaWYgKGdyb3VwID09PSAncmlnaHQnKSB7XG4gICAgICBjb25zdCBib2R5V2lkdGggPSBwYXJzZUludCh0aGlzLmlubmVyV2lkdGggKyAnJywgMCk7XG4gICAgICBjb25zdCB0b3RhbERpZmYgPSB3aWR0aHMudG90YWwgLSBib2R5V2lkdGg7XG4gICAgICBjb25zdCBvZmZzZXREaWZmID0gdG90YWxEaWZmIC0gb2Zmc2V0WDtcbiAgICAgIGNvbnN0IG9mZnNldCA9IChvZmZzZXREaWZmICsgdGhpcy5zY3JvbGxiYXJIZWxwZXIud2lkdGgpICogLTE7XG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIG9uQWN0aXZhdGUoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGV2ZW50LmNlbGxJbmRleCA9IGluZGV4O1xuICAgIGV2ZW50LnJvd0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgaXNUYXJnZXRSb3cgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XG5cbiAgICBjb25zdCBpc0FjdGlvbiA9XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLnVwIHx8XG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcbiAgICAgIGtleUNvZGUgPT09IEtleXMucmlnaHQ7XG5cbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRSb3cpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgICAgdHlwZTogJ2tleWRvd24nLFxuICAgICAgICBldmVudCxcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgcm93RWxlbWVudDogdGhpcy5fZWxlbWVudFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uTW91c2VlbnRlcihldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcbiAgICAgIHR5cGU6ICdtb3VzZWVudGVyJyxcbiAgICAgIGV2ZW50LFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIHJvd0VsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9KTtcbiAgfVxuXG4gIHJlY2FsY3VsYXRlQ29sdW1ucyh2YWw6IGFueVtdID0gdGhpcy5jb2x1bW5zKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odGhpcy5fY29sdW1ucyk7XG4gICAgdGhpcy5fY29sdW1uc0J5UGluID0gY29sdW1uc0J5UGluQXJyKHRoaXMuX2NvbHVtbnMpO1xuICAgIHRoaXMuX2NvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sc0J5UGluLCB0aGlzLl9jb2x1bW5zKTtcbiAgfVxuXG4gIG9uVHJlZUFjdGlvbigpIHtcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCgpO1xuICB9XG59XG4iXX0=