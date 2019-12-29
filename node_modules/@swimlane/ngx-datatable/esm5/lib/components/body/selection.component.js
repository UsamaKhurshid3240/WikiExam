/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SelectionType } from '../../types/selection.type';
import { selectRowsBetween, selectRows } from '../../utils/selection';
import { Keys } from '../../utils/keys';
/**
 * @record
 */
export function Model() { }
if (false) {
    /** @type {?} */
    Model.prototype.type;
    /** @type {?} */
    Model.prototype.event;
    /** @type {?} */
    Model.prototype.row;
    /** @type {?} */
    Model.prototype.rowElement;
    /** @type {?} */
    Model.prototype.cellElement;
    /** @type {?} */
    Model.prototype.cellIndex;
}
var DataTableSelectionComponent = /** @class */ (function () {
    function DataTableSelectionComponent() {
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    DataTableSelectionComponent.prototype.selectRow = /**
     * @param {?} event
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    function (event, index, row) {
        var _a;
        if (!this.selectEnabled)
            return;
        /** @type {?} */
        var chkbox = this.selectionType === SelectionType.checkbox;
        /** @type {?} */
        var multi = this.selectionType === SelectionType.multi;
        /** @type {?} */
        var multiClick = this.selectionType === SelectionType.multiClick;
        /** @type {?} */
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = selectRows(tslib_1.__spread(this.selected), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, tslib_1.__spread(selected));
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
    };
    /**
     * @param {?} model
     * @param {?} index
     * @return {?}
     */
    DataTableSelectionComponent.prototype.onActivate = /**
     * @param {?} model
     * @param {?} index
     * @return {?}
     */
    function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        /** @type {?} */
        var chkbox = this.selectionType === SelectionType.checkbox;
        /** @type {?} */
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (((/** @type {?} */ (event))).keyCode === Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    /**
     * @param {?} model
     * @return {?}
     */
    DataTableSelectionComponent.prototype.onKeyboardFocus = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        var keyCode = (/** @type {?} */ (model.event)).keyCode;
        /** @type {?} */
        var shouldFocus = keyCode === Keys.up || keyCode === Keys.down || keyCode === Keys.right || keyCode === Keys.left;
        if (shouldFocus) {
            /** @type {?} */
            var isCellSelection = this.selectionType === SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    DataTableSelectionComponent.prototype.focusRow = /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    function (rowElement, keyCode) {
        /** @type {?} */
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    DataTableSelectionComponent.prototype.getPrevNextRow = /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    function (rowElement, keyCode) {
        /** @type {?} */
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            /** @type {?} */
            var focusElement = void 0;
            if (keyCode === Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    /**
     * @param {?} cellElement
     * @param {?} rowElement
     * @param {?} keyCode
     * @param {?} cellIndex
     * @return {?}
     */
    DataTableSelectionComponent.prototype.focusCell = /**
     * @param {?} cellElement
     * @param {?} rowElement
     * @param {?} keyCode
     * @param {?} cellIndex
     * @return {?}
     */
    function (cellElement, rowElement, keyCode, cellIndex) {
        /** @type {?} */
        var nextCellElement;
        if (keyCode === Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === Keys.up || keyCode === Keys.down) {
            /** @type {?} */
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                /** @type {?} */
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DataTableSelectionComponent.prototype.getRowSelected = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    /**
     * @param {?} row
     * @param {?} selected
     * @return {?}
     */
    DataTableSelectionComponent.prototype.getRowSelectedIdx = /**
     * @param {?} row
     * @param {?} selected
     * @return {?}
     */
    function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        /** @type {?} */
        var rowId = this.rowIdentity(row);
        return selected.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var id = _this.rowIdentity(r);
            return id === rowId;
        }));
    };
    DataTableSelectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-selection',
                    template: "\n    <ng-content></ng-content>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    DataTableSelectionComponent.propDecorators = {
        rows: [{ type: Input }],
        selected: [{ type: Input }],
        selectEnabled: [{ type: Input }],
        selectionType: [{ type: Input }],
        rowIdentity: [{ type: Input }],
        selectCheck: [{ type: Input }],
        activate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return DataTableSelectionComponent;
}());
export { DataTableSelectionComponent };
if (false) {
    /** @type {?} */
    DataTableSelectionComponent.prototype.rows;
    /** @type {?} */
    DataTableSelectionComponent.prototype.selected;
    /** @type {?} */
    DataTableSelectionComponent.prototype.selectEnabled;
    /** @type {?} */
    DataTableSelectionComponent.prototype.selectionType;
    /** @type {?} */
    DataTableSelectionComponent.prototype.rowIdentity;
    /** @type {?} */
    DataTableSelectionComponent.prototype.selectCheck;
    /** @type {?} */
    DataTableSelectionComponent.prototype.activate;
    /** @type {?} */
    DataTableSelectionComponent.prototype.select;
    /** @type {?} */
    DataTableSelectionComponent.prototype.prevIndex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUV4QywyQkFPQzs7O0lBTkMscUJBQWE7O0lBQ2Isc0JBQWtDOztJQUNsQyxvQkFBUzs7SUFDVCwyQkFBZ0I7O0lBQ2hCLDRCQUFpQjs7SUFDakIsMEJBQWtCOztBQUdwQjtJQUFBO1FBZVksYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTJIM0QsQ0FBQzs7Ozs7OztJQXZIQywrQ0FBUzs7Ozs7O0lBQVQsVUFBVSxLQUFpQyxFQUFFLEtBQWEsRUFBRSxHQUFROztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPOztZQUUxQixNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsUUFBUTs7WUFDdEQsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLEtBQUs7O1lBQ2xELFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxVQUFVOztZQUM5RCxRQUFRLEdBQVUsRUFBRTtRQUV4QixJQUFJLEtBQUssSUFBSSxNQUFNLElBQUks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O1FBQ25DLE9BQU8sUUFBUSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLENBQUM7O2dCQUNuQixFQUFFLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBMUlGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUscUNBRVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7dUJBRUUsS0FBSzsyQkFDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBRUwsTUFBTTt5QkFDTixNQUFNOztJQTJIVCxrQ0FBQztDQUFBLEFBM0lELElBMklDO1NBcElZLDJCQUEyQjs7O0lBQ3RDLDJDQUFxQjs7SUFDckIsK0NBQXlCOztJQUN6QixvREFBZ0M7O0lBQ2hDLG9EQUFzQzs7SUFDdEMsa0RBQTBCOztJQUMxQixrREFBMEI7O0lBRTFCLCtDQUEyRDs7SUFDM0QsNkNBQXlEOztJQUV6RCxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBzZWxlY3RSb3dzQmV0d2Vlbiwgc2VsZWN0Um93cyB9IGZyb20gJy4uLy4uL3V0aWxzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWwge1xuICB0eXBlOiBzdHJpbmc7XG4gIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgcm93OiBhbnk7XG4gIHJvd0VsZW1lbnQ6IGFueTtcbiAgY2VsbEVsZW1lbnQ6IGFueTtcbiAgY2VsbEluZGV4OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1zZWxlY3Rpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcm93czogYW55W107XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXTtcbiAgQElucHV0KCkgc2VsZWN0RW5hYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6IGFueTtcbiAgQElucHV0KCkgc2VsZWN0Q2hlY2s6IGFueTtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcmV2SW5kZXg6IG51bWJlcjtcblxuICBzZWxlY3RSb3coZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyLCByb3c6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZWxlY3RFbmFibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCBjaGtib3ggPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gICAgY29uc3QgbXVsdGkgPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XG4gICAgY29uc3QgbXVsdGlDbGljayA9IHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aUNsaWNrO1xuICAgIGxldCBzZWxlY3RlZDogYW55W10gPSBbXTtcblxuICAgIGlmIChtdWx0aSB8fCBjaGtib3ggfHwgbXVsdGlDbGljaykge1xuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93c0JldHdlZW4oW10sIHRoaXMucm93cywgaW5kZXgsIHRoaXMucHJldkluZGV4LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkgfHwgbXVsdGlDbGljayB8fCBjaGtib3gpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RSb3dzKFsuLi50aGlzLnNlbGVjdGVkXSwgcm93LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RSb3dzKFtdLCByb3csIHRoaXMuZ2V0Um93U2VsZWN0ZWRJZHguYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93cyhbXSwgcm93LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RDaGVjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5maWx0ZXIodGhpcy5zZWxlY3RDaGVjay5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcblxuICAgIHRoaXMucHJldkluZGV4ID0gaW5kZXg7XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIHNlbGVjdGVkXG4gICAgfSk7XG4gIH1cblxuICBvbkFjdGl2YXRlKG1vZGVsOiBNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgdHlwZSwgZXZlbnQsIHJvdyB9ID0gbW9kZWw7XG4gICAgY29uc3QgY2hrYm94ID0gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xuICAgIGNvbnN0IHNlbGVjdCA9ICghY2hrYm94ICYmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUgPT09ICdkYmxjbGljaycpKSB8fCAoY2hrYm94ICYmIHR5cGUgPT09ICdjaGVja2JveCcpO1xuXG4gICAgaWYgKHNlbGVjdCkge1xuICAgICAgdGhpcy5zZWxlY3RSb3coZXZlbnQsIGluZGV4LCByb3cpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICBpZiAoKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5rZXlDb2RlID09PSBLZXlzLnJldHVybikge1xuICAgICAgICB0aGlzLnNlbGVjdFJvdyhldmVudCwgaW5kZXgsIHJvdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uS2V5Ym9hcmRGb2N1cyhtb2RlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChtb2RlbCk7XG4gIH1cblxuICBvbktleWJvYXJkRm9jdXMobW9kZWw6IE1vZGVsKTogdm9pZCB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSA8S2V5Ym9hcmRFdmVudD5tb2RlbC5ldmVudDtcbiAgICBjb25zdCBzaG91bGRGb2N1cyA9IGtleUNvZGUgPT09IEtleXMudXAgfHwga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8IGtleUNvZGUgPT09IEtleXMucmlnaHQgfHwga2V5Q29kZSA9PT0gS2V5cy5sZWZ0O1xuXG4gICAgaWYgKHNob3VsZEZvY3VzKSB7XG4gICAgICBjb25zdCBpc0NlbGxTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcblxuICAgICAgaWYgKCFtb2RlbC5jZWxsRWxlbWVudCB8fCAhaXNDZWxsU2VsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZm9jdXNSb3cobW9kZWwucm93RWxlbWVudCwga2V5Q29kZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzQ2VsbFNlbGVjdGlvbikge1xuICAgICAgICB0aGlzLmZvY3VzQ2VsbChtb2RlbC5jZWxsRWxlbWVudCwgbW9kZWwucm93RWxlbWVudCwga2V5Q29kZSwgbW9kZWwuY2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c1Jvdyhyb3dFbGVtZW50OiBhbnksIGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG5leHRSb3dFbGVtZW50ID0gdGhpcy5nZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50LCBrZXlDb2RlKTtcbiAgICBpZiAobmV4dFJvd0VsZW1lbnQpIG5leHRSb3dFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBnZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50OiBhbnksIGtleUNvZGU6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHJvd0VsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGlmIChwYXJlbnRFbGVtZW50KSB7XG4gICAgICBsZXQgZm9jdXNFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlzLnVwKSB7XG4gICAgICAgIGZvY3VzRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy5kb3duKSB7XG4gICAgICAgIGZvY3VzRWxlbWVudCA9IHBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9jdXNFbGVtZW50ICYmIGZvY3VzRWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZvY3VzRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c0NlbGwoY2VsbEVsZW1lbnQ6IGFueSwgcm93RWxlbWVudDogYW55LCBrZXlDb2RlOiBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IG5leHRDZWxsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gS2V5cy5sZWZ0KSB7XG4gICAgICBuZXh0Q2VsbEVsZW1lbnQgPSBjZWxsRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy5yaWdodCkge1xuICAgICAgbmV4dENlbGxFbGVtZW50ID0gY2VsbEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy51cCB8fCBrZXlDb2RlID09PSBLZXlzLmRvd24pIHtcbiAgICAgIGNvbnN0IG5leHRSb3dFbGVtZW50ID0gdGhpcy5nZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50LCBrZXlDb2RlKTtcbiAgICAgIGlmIChuZXh0Um93RWxlbWVudCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5leHRSb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGF0YWJsZS1ib2R5LWNlbGwnKTtcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkgbmV4dENlbGxFbGVtZW50ID0gY2hpbGRyZW5bY2VsbEluZGV4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV4dENlbGxFbGVtZW50KSBuZXh0Q2VsbEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGdldFJvd1NlbGVjdGVkKHJvdzogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Um93U2VsZWN0ZWRJZHgocm93LCB0aGlzLnNlbGVjdGVkKSA+IC0xO1xuICB9XG5cbiAgZ2V0Um93U2VsZWN0ZWRJZHgocm93OiBhbnksIHNlbGVjdGVkOiBhbnlbXSk6IG51bWJlciB7XG4gICAgaWYgKCFzZWxlY3RlZCB8fCAhc2VsZWN0ZWQubGVuZ3RoKSByZXR1cm4gLTE7XG5cbiAgICBjb25zdCByb3dJZCA9IHRoaXMucm93SWRlbnRpdHkocm93KTtcbiAgICByZXR1cm4gc2VsZWN0ZWQuZmluZEluZGV4KHIgPT4ge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLnJvd0lkZW50aXR5KHIpO1xuICAgICAgcmV0dXJuIGlkID09PSByb3dJZDtcbiAgICB9KTtcbiAgfVxufVxuIl19