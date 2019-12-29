/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class DataTableSelectionComponent {
    constructor() {
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
    }
    /**
     * @param {?} event
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    selectRow(event, index, row) {
        if (!this.selectEnabled)
            return;
        /** @type {?} */
        const chkbox = this.selectionType === SelectionType.checkbox;
        /** @type {?} */
        const multi = this.selectionType === SelectionType.multi;
        /** @type {?} */
        const multiClick = this.selectionType === SelectionType.multiClick;
        /** @type {?} */
        let selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
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
        this.selected.push(...selected);
        this.prevIndex = index;
        this.select.emit({
            selected
        });
    }
    /**
     * @param {?} model
     * @param {?} index
     * @return {?}
     */
    onActivate(model, index) {
        const { type, event, row } = model;
        /** @type {?} */
        const chkbox = this.selectionType === SelectionType.checkbox;
        /** @type {?} */
        const select = (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');
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
    }
    /**
     * @param {?} model
     * @return {?}
     */
    onKeyboardFocus(model) {
        const { keyCode } = (/** @type {?} */ (model.event));
        /** @type {?} */
        const shouldFocus = keyCode === Keys.up || keyCode === Keys.down || keyCode === Keys.right || keyCode === Keys.left;
        if (shouldFocus) {
            /** @type {?} */
            const isCellSelection = this.selectionType === SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    }
    /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    focusRow(rowElement, keyCode) {
        /** @type {?} */
        const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    }
    /**
     * @param {?} rowElement
     * @param {?} keyCode
     * @return {?}
     */
    getPrevNextRow(rowElement, keyCode) {
        /** @type {?} */
        const parentElement = rowElement.parentElement;
        if (parentElement) {
            /** @type {?} */
            let focusElement;
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
    }
    /**
     * @param {?} cellElement
     * @param {?} rowElement
     * @param {?} keyCode
     * @param {?} cellIndex
     * @return {?}
     */
    focusCell(cellElement, rowElement, keyCode, cellIndex) {
        /** @type {?} */
        let nextCellElement;
        if (keyCode === Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === Keys.up || keyCode === Keys.down) {
            /** @type {?} */
            const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                /** @type {?} */
                const children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    getRowSelected(row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    }
    /**
     * @param {?} row
     * @param {?} selected
     * @return {?}
     */
    getRowSelectedIdx(row, selected) {
        if (!selected || !selected.length)
            return -1;
        /** @type {?} */
        const rowId = this.rowIdentity(row);
        return selected.findIndex((/**
         * @param {?} r
         * @return {?}
         */
        r => {
            /** @type {?} */
            const id = this.rowIdentity(r);
            return id === rowId;
        }));
    }
}
DataTableSelectionComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-selection',
                template: `
    <ng-content></ng-content>
  `,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRXhDLDJCQU9DOzs7SUFOQyxxQkFBYTs7SUFDYixzQkFBa0M7O0lBQ2xDLG9CQUFTOztJQUNULDJCQUFnQjs7SUFDaEIsNEJBQWlCOztJQUNqQiwwQkFBa0I7O0FBVXBCLE1BQU0sT0FBTywyQkFBMkI7SUFQeEM7UUFlWSxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBMkgzRCxDQUFDOzs7Ozs7O0lBdkhDLFNBQVMsQ0FBQyxLQUFpQyxFQUFFLEtBQWEsRUFBRSxHQUFRO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU87O2NBRTFCLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGFBQWEsQ0FBQyxRQUFROztjQUN0RCxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsS0FBSyxhQUFhLENBQUMsS0FBSzs7Y0FDbEQsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEtBQUssYUFBYSxDQUFDLFVBQVU7O1lBQzlELFFBQVEsR0FBVSxFQUFFO1FBRXhCLElBQUksS0FBSyxJQUFJLE1BQU0s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UUFBQyxDQUFDLENBQUMsRUFBRTs7a0JBQ3RCLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM5QixPQUFPLEVBQUUsS0FBSyxLQUFLLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUExSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7R0FFVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O21CQUVFLEtBQUs7dUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUVMLE1BQU07cUJBQ04sTUFBTTs7OztJQVJQLDJDQUFxQjs7SUFDckIsK0NBQXlCOztJQUN6QixvREFBZ0M7O0lBQ2hDLG9EQUFzQzs7SUFDdEMsa0RBQTBCOztJQUMxQixrREFBMEI7O0lBRTFCLCtDQUEyRDs7SUFDM0QsNkNBQXlEOztJQUV6RCxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBzZWxlY3RSb3dzQmV0d2Vlbiwgc2VsZWN0Um93cyB9IGZyb20gJy4uLy4uL3V0aWxzL3NlbGVjdGlvbic7XG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kZWwge1xuICB0eXBlOiBzdHJpbmc7XG4gIGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcbiAgcm93OiBhbnk7XG4gIHJvd0VsZW1lbnQ6IGFueTtcbiAgY2VsbEVsZW1lbnQ6IGFueTtcbiAgY2VsbEluZGV4OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1zZWxlY3Rpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlU2VsZWN0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcm93czogYW55W107XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBhbnlbXTtcbiAgQElucHV0KCkgc2VsZWN0RW5hYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6IGFueTtcbiAgQElucHV0KCkgc2VsZWN0Q2hlY2s6IGFueTtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcmV2SW5kZXg6IG51bWJlcjtcblxuICBzZWxlY3RSb3coZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyLCByb3c6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZWxlY3RFbmFibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCBjaGtib3ggPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gICAgY29uc3QgbXVsdGkgPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUubXVsdGk7XG4gICAgY29uc3QgbXVsdGlDbGljayA9IHRoaXMuc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uVHlwZS5tdWx0aUNsaWNrO1xuICAgIGxldCBzZWxlY3RlZDogYW55W10gPSBbXTtcblxuICAgIGlmIChtdWx0aSB8fCBjaGtib3ggfHwgbXVsdGlDbGljaykge1xuICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93c0JldHdlZW4oW10sIHRoaXMucm93cywgaW5kZXgsIHRoaXMucHJldkluZGV4LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkgfHwgbXVsdGlDbGljayB8fCBjaGtib3gpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RSb3dzKFsuLi50aGlzLnNlbGVjdGVkXSwgcm93LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RSb3dzKFtdLCByb3csIHRoaXMuZ2V0Um93U2VsZWN0ZWRJZHguYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0Um93cyhbXSwgcm93LCB0aGlzLmdldFJvd1NlbGVjdGVkSWR4LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RDaGVjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5maWx0ZXIodGhpcy5zZWxlY3RDaGVjay5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcblxuICAgIHRoaXMucHJldkluZGV4ID0gaW5kZXg7XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHtcbiAgICAgIHNlbGVjdGVkXG4gICAgfSk7XG4gIH1cblxuICBvbkFjdGl2YXRlKG1vZGVsOiBNb2RlbCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgdHlwZSwgZXZlbnQsIHJvdyB9ID0gbW9kZWw7XG4gICAgY29uc3QgY2hrYm94ID0gdGhpcy5zZWxlY3Rpb25UeXBlID09PSBTZWxlY3Rpb25UeXBlLmNoZWNrYm94O1xuICAgIGNvbnN0IHNlbGVjdCA9ICghY2hrYm94ICYmICh0eXBlID09PSAnY2xpY2snIHx8IHR5cGUgPT09ICdkYmxjbGljaycpKSB8fCAoY2hrYm94ICYmIHR5cGUgPT09ICdjaGVja2JveCcpO1xuXG4gICAgaWYgKHNlbGVjdCkge1xuICAgICAgdGhpcy5zZWxlY3RSb3coZXZlbnQsIGluZGV4LCByb3cpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICBpZiAoKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5rZXlDb2RlID09PSBLZXlzLnJldHVybikge1xuICAgICAgICB0aGlzLnNlbGVjdFJvdyhldmVudCwgaW5kZXgsIHJvdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uS2V5Ym9hcmRGb2N1cyhtb2RlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChtb2RlbCk7XG4gIH1cblxuICBvbktleWJvYXJkRm9jdXMobW9kZWw6IE1vZGVsKTogdm9pZCB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSA8S2V5Ym9hcmRFdmVudD5tb2RlbC5ldmVudDtcbiAgICBjb25zdCBzaG91bGRGb2N1cyA9IGtleUNvZGUgPT09IEtleXMudXAgfHwga2V5Q29kZSA9PT0gS2V5cy5kb3duIHx8IGtleUNvZGUgPT09IEtleXMucmlnaHQgfHwga2V5Q29kZSA9PT0gS2V5cy5sZWZ0O1xuXG4gICAgaWYgKHNob3VsZEZvY3VzKSB7XG4gICAgICBjb25zdCBpc0NlbGxTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2VsbDtcblxuICAgICAgaWYgKCFtb2RlbC5jZWxsRWxlbWVudCB8fCAhaXNDZWxsU2VsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZm9jdXNSb3cobW9kZWwucm93RWxlbWVudCwga2V5Q29kZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzQ2VsbFNlbGVjdGlvbikge1xuICAgICAgICB0aGlzLmZvY3VzQ2VsbChtb2RlbC5jZWxsRWxlbWVudCwgbW9kZWwucm93RWxlbWVudCwga2V5Q29kZSwgbW9kZWwuY2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c1Jvdyhyb3dFbGVtZW50OiBhbnksIGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG5leHRSb3dFbGVtZW50ID0gdGhpcy5nZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50LCBrZXlDb2RlKTtcbiAgICBpZiAobmV4dFJvd0VsZW1lbnQpIG5leHRSb3dFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBnZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50OiBhbnksIGtleUNvZGU6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHJvd0VsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGlmIChwYXJlbnRFbGVtZW50KSB7XG4gICAgICBsZXQgZm9jdXNFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlzLnVwKSB7XG4gICAgICAgIGZvY3VzRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy5kb3duKSB7XG4gICAgICAgIGZvY3VzRWxlbWVudCA9IHBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9jdXNFbGVtZW50ICYmIGZvY3VzRWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZvY3VzRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1c0NlbGwoY2VsbEVsZW1lbnQ6IGFueSwgcm93RWxlbWVudDogYW55LCBrZXlDb2RlOiBudW1iZXIsIGNlbGxJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IG5leHRDZWxsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gS2V5cy5sZWZ0KSB7XG4gICAgICBuZXh0Q2VsbEVsZW1lbnQgPSBjZWxsRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy5yaWdodCkge1xuICAgICAgbmV4dENlbGxFbGVtZW50ID0gY2VsbEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gS2V5cy51cCB8fCBrZXlDb2RlID09PSBLZXlzLmRvd24pIHtcbiAgICAgIGNvbnN0IG5leHRSb3dFbGVtZW50ID0gdGhpcy5nZXRQcmV2TmV4dFJvdyhyb3dFbGVtZW50LCBrZXlDb2RlKTtcbiAgICAgIGlmIChuZXh0Um93RWxlbWVudCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5leHRSb3dFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGF0YWJsZS1ib2R5LWNlbGwnKTtcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkgbmV4dENlbGxFbGVtZW50ID0gY2hpbGRyZW5bY2VsbEluZGV4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV4dENlbGxFbGVtZW50KSBuZXh0Q2VsbEVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGdldFJvd1NlbGVjdGVkKHJvdzogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Um93U2VsZWN0ZWRJZHgocm93LCB0aGlzLnNlbGVjdGVkKSA+IC0xO1xuICB9XG5cbiAgZ2V0Um93U2VsZWN0ZWRJZHgocm93OiBhbnksIHNlbGVjdGVkOiBhbnlbXSk6IG51bWJlciB7XG4gICAgaWYgKCFzZWxlY3RlZCB8fCAhc2VsZWN0ZWQubGVuZ3RoKSByZXR1cm4gLTE7XG5cbiAgICBjb25zdCByb3dJZCA9IHRoaXMucm93SWRlbnRpdHkocm93KTtcbiAgICByZXR1cm4gc2VsZWN0ZWQuZmluZEluZGV4KHIgPT4ge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLnJvd0lkZW50aXR5KHIpO1xuICAgICAgcmV0dXJuIGlkID09PSByb3dJZDtcbiAgICB9KTtcbiAgfVxufVxuIl19