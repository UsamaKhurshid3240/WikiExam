/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ScrollerComponent } from './scroller.component';
import { SelectionType } from '../../types/selection.type';
import { columnsByPin, columnGroupWidths } from '../../utils/column';
import { RowHeightCache } from '../../utils/row-height-cache';
import { translateXY } from '../../utils/translate';
export class DataTableBodyComponent {
    /**
     * Creates an instance of DataTableBodyComponent.
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.selected = [];
        this.scroll = new EventEmitter();
        this.page = new EventEmitter();
        this.activate = new EventEmitter();
        this.select = new EventEmitter();
        this.detailToggle = new EventEmitter();
        this.rowContextmenu = new EventEmitter(false);
        this.treeAction = new EventEmitter();
        this.rowHeightsCache = new RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = new Map();
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = (/**
         * @param {?=} row
         * @param {?=} index
         * @return {?}
         */
        (row, index) => {
            if (!this.rowDetail) {
                return 0;
            }
            /** @type {?} */
            const rowHeight = this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : ((/** @type {?} */ (rowHeight)));
        });
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = (/**
         * @param {?} index
         * @param {?} row
         * @return {?}
         */
        (index, row) => {
            /** @type {?} */
            const idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return row[this.trackByProp];
            }
            else {
                return idx;
            }
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pageSize(val) {
        this._pageSize = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get pageSize() {
        return this._pageSize;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rows(val) {
        this._rows = val;
        this.rowExpansions.clear();
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set columns(val) {
        this._columns = val;
        /** @type {?} */
        const colsByPin = columnsByPin(val);
        this.columnGroupWidths = columnGroupWidths(colsByPin, val);
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
    set offset(val) {
        this._offset = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get offset() {
        return this._offset;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set rowCount(val) {
        this._rowCount = val;
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get rowCount() {
        return this._rowCount;
    }
    /**
     * @return {?}
     */
    get bodyWidth() {
        if (this.scrollbarH) {
            return this.innerWidth + 'px';
        }
        else {
            return '100%';
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set bodyHeight(val) {
        if (this.scrollbarV) {
            this._bodyHeight = val + 'px';
        }
        else {
            this._bodyHeight = 'auto';
        }
        this.recalcLayout();
    }
    /**
     * @return {?}
     */
    get bodyHeight() {
        return this._bodyHeight;
    }
    /**
     * Returns if selection is enabled.
     * @return {?}
     */
    get selectEnabled() {
        return !!this.selectionType;
    }
    /**
     * Property that would calculate the height of scroll bar
     * based on the row heights cache for virtual scroll and virtualization. Other scenarios
     * calculate scroll height automatically (as height will be undefined).
     * @return {?}
     */
    get scrollHeight() {
        if (this.scrollbarV && this.virtualization && this.rowCount) {
            return this.rowHeightsCache.query(this.rowCount - 1);
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
    /**
     * Called after the constructor, initializing input properties
     * @return {?}
     */
    ngOnInit() {
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type, value }) => {
                if (type === 'row') {
                    this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            }));
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ({ type, value }) => {
                if (type === 'group') {
                    this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                this.updateIndexes();
                this.updateRows();
                this.cd.markForCheck();
            }));
        }
    }
    /**
     * Called once, before the instance is destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this.rowDetail || this.groupHeader) {
            this.listener.unsubscribe();
        }
    }
    /**
     * Updates the Y offset given a new offset.
     * @param {?=} offset
     * @return {?}
     */
    updateOffsetY(offset) {
        // scroller is missing on empty table
        if (!this.scroller) {
            return;
        }
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            /** @type {?} */
            const rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    }
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     * @param {?} event
     * @return {?}
     */
    onBodyScroll(event) {
        /** @type {?} */
        const scrollYPos = event.scrollYPos;
        /** @type {?} */
        const scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(event.direction);
        this.updateRows();
    }
    /**
     * Updates the page given a direction.
     * @param {?} direction
     * @return {?}
     */
    updatePage(direction) {
        /** @type {?} */
        let offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset });
        }
    }
    /**
     * Updates the rows in the view port
     * @return {?}
     */
    updateRows() {
        const { first, last } = this.indexes;
        /** @type {?} */
        let rowIndex = first;
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        const temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            /** @type {?} */
            let maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                /** @type {?} */
                const group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                /** @type {?} */
                const row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    }
    /**
     * Get the row height
     * @param {?} row
     * @return {?}
     */
    getRowHeight(row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return (/** @type {?} */ (this.rowHeight));
    }
    /**
     * @param {?} group the group with all rows
     * @return {?}
     */
    getGroupHeight(group) {
        /** @type {?} */
        let rowHeight = 0;
        if (group.value) {
            for (let index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    }
    /**
     * Calculate row height based on the expanded state of the row.
     * @param {?} row
     * @return {?}
     */
    getRowAndDetailHeight(row) {
        /** @type {?} */
        let rowHeight = this.getRowHeight(row);
        /** @type {?} */
        const expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    }
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * \@memberOf DataTableBodyComponent
     * @param {?} rows the row that needs to be placed in the 2D space.
     * @return {?} the CSS3 style to be applied
     *
     */
    getRowsStyles(rows) {
        /** @type {?} */
        const styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles.width = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            let idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                /** @type {?} */
                const row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            /** @type {?} */
            const pos = this.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    }
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * \@memberOf DataTableBodyComponent
     * @return {?} the CSS3 style to be applied
     *
     */
    getBottomSummaryRowStyles() {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        /** @type {?} */
        const styles = { position: 'absolute' };
        /** @type {?} */
        const pos = this.rowHeightsCache.query(this.rows.length - 1);
        translateXY(styles, 0, pos);
        return styles;
    }
    /**
     * Hides the loading indicator
     * @return {?}
     */
    hideIndicator() {
        setTimeout((/**
         * @return {?}
         */
        () => (this.loadingIndicator = false)), 500);
    }
    /**
     * Updates the index of the rows in the viewport
     * @return {?}
     */
    updateIndexes() {
        /** @type {?} */
        let first = 0;
        /** @type {?} */
        let last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                /** @type {?} */
                const height = parseInt(this.bodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min(first + this.pageSize, this.rowCount);
        }
        this.indexes = { first, last };
    }
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     * @return {?}
     */
    refreshRowHeightCache() {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) {
            return;
        }
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: this.rowExpansions
            });
        }
    }
    /**
     * Gets the index for the view port
     * @return {?}
     */
    getAdjustedViewPortIndex() {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        /** @type {?} */
        const viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    }
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     * @param {?} row
     * @return {?}
     */
    toggleRowExpansion(row) {
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        /** @type {?} */
        let expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            /** @type {?} */
            const idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    }
    /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param {?} expanded
     * @return {?}
     */
    toggleAllRows(expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        /** @type {?} */
        const rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (const row of this.rows) {
            this.rowExpansions.set(row, rowExpanded);
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    }
    /**
     * Recalculates the table
     * @return {?}
     */
    recalcLayout() {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    }
    /**
     * Tracks the column
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    columnTrackingFn(index, column) {
        return column.$$id;
    }
    /**
     * Gets the row pinning group styles
     * @param {?} group
     * @return {?}
     */
    stylesByGroup(group) {
        /** @type {?} */
        const widths = this.columnGroupWidths;
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
            const offset = offsetDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    }
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     * @param {?} row
     * @return {?}
     */
    getRowExpanded(row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (const group of this.groupedRows) {
                this.rowExpansions.set(group, 1);
            }
        }
        /** @type {?} */
        const expanded = this.rowExpansions.get(row);
        return expanded === 1;
    }
    /**
     * Gets the row index given a row
     * @param {?} row
     * @return {?}
     */
    getRowIndex(row) {
        return this.rowIndexes.get(row) || 0;
    }
    /**
     * @param {?} row
     * @return {?}
     */
    onTreeAction(row) {
        this.treeAction.emit({ row });
    }
}
DataTableBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-body',
                template: `
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
    >
      <datatable-progress *ngIf="loadingIndicator"> </datatable-progress>
      <datatable-scroller
        *ngIf="rows?.length"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight"
        [scrollWidth]="columnGroupWidths?.total"
        (scroll)="onBodyScroll($event)"
      >
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'top'"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns"
        >
        </datatable-summary-row>
        <datatable-row-wrapper
          [groupedRows]="groupedRows"
          *ngFor="let group of temp; let i = index; trackBy: rowTrackingFn"
          [innerWidth]="innerWidth"
          [ngStyle]="getRowsStyles(group)"
          [rowDetail]="rowDetail"
          [groupHeader]="groupHeader"
          [offsetX]="offsetX"
          [detailRowHeight]="getDetailRowHeight(group[i], i)"
          [row]="group"
          [expanded]="getRowExpanded(group)"
          [rowIndex]="getRowIndex(group[i])"
          (rowContextmenu)="rowContextmenu.emit($event)"
        >
          <datatable-body-row
            *ngIf="!groupedRows; else groupedRowsTemplate"
            tabindex="-1"
            [isSelected]="selector.getRowSelected(group)"
            [innerWidth]="innerWidth"
            [offsetX]="offsetX"
            [columns]="columns"
            [rowHeight]="getRowHeight(group)"
            [row]="group"
            [rowIndex]="getRowIndex(group)"
            [expanded]="getRowExpanded(group)"
            [rowClass]="rowClass"
            [displayCheck]="displayCheck"
            [treeStatus]="group.treeStatus"
            (treeAction)="onTreeAction(group)"
            (activate)="selector.onActivate($event, indexes.first + i)"
          >
          </datatable-body-row>
          <ng-template #groupedRowsTemplate>
            <datatable-body-row
              *ngFor="let row of group.value; let i = index; trackBy: rowTrackingFn"
              tabindex="-1"
              [isSelected]="selector.getRowSelected(row)"
              [innerWidth]="innerWidth"
              [offsetX]="offsetX"
              [columns]="columns"
              [rowHeight]="getRowHeight(row)"
              [row]="row"
              [group]="group.value"
              [rowIndex]="getRowIndex(row)"
              [expanded]="getRowExpanded(row)"
              [rowClass]="rowClass"
              (activate)="selector.onActivate($event, i)"
            >
            </datatable-body-row>
          </ng-template>
        </datatable-row-wrapper>
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'bottom'"
          [ngStyle]="getBottomSummaryRowStyles()"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns"
        >
        </datatable-summary-row>
      </datatable-scroller>
      <div class="empty-row" *ngIf="!rows?.length && !loadingIndicator" [innerHTML]="emptyMessage"></div>
    </datatable-selection>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'datatable-body'
                }
            }] }
];
/** @nocollapse */
DataTableBodyComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableBodyComponent.propDecorators = {
    scrollbarV: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    loadingIndicator: [{ type: Input }],
    externalPaging: [{ type: Input }],
    rowHeight: [{ type: Input }],
    offsetX: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    selectionType: [{ type: Input }],
    selected: [{ type: Input }],
    rowIdentity: [{ type: Input }],
    rowDetail: [{ type: Input }],
    groupHeader: [{ type: Input }],
    selectCheck: [{ type: Input }],
    displayCheck: [{ type: Input }],
    trackByProp: [{ type: Input }],
    rowClass: [{ type: Input }],
    groupedRows: [{ type: Input }],
    groupExpansionDefault: [{ type: Input }],
    innerWidth: [{ type: Input }],
    groupRowsBy: [{ type: Input }],
    virtualization: [{ type: Input }],
    summaryRow: [{ type: Input }],
    summaryPosition: [{ type: Input }],
    summaryHeight: [{ type: Input }],
    pageSize: [{ type: Input }],
    rows: [{ type: Input }],
    columns: [{ type: Input }],
    offset: [{ type: Input }],
    rowCount: [{ type: Input }],
    bodyWidth: [{ type: HostBinding, args: ['style.width',] }],
    bodyHeight: [{ type: Input }, { type: HostBinding, args: ['style.height',] }],
    scroll: [{ type: Output }],
    page: [{ type: Output }],
    activate: [{ type: Output }],
    select: [{ type: Output }],
    detailToggle: [{ type: Output }],
    rowContextmenu: [{ type: Output }],
    treeAction: [{ type: Output }],
    scroller: [{ type: ViewChild, args: [ScrollerComponent, { static: false },] }]
};
if (false) {
    /** @type {?} */
    DataTableBodyComponent.prototype.scrollbarV;
    /** @type {?} */
    DataTableBodyComponent.prototype.scrollbarH;
    /** @type {?} */
    DataTableBodyComponent.prototype.loadingIndicator;
    /** @type {?} */
    DataTableBodyComponent.prototype.externalPaging;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype.offsetX;
    /** @type {?} */
    DataTableBodyComponent.prototype.emptyMessage;
    /** @type {?} */
    DataTableBodyComponent.prototype.selectionType;
    /** @type {?} */
    DataTableBodyComponent.prototype.selected;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowIdentity;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowDetail;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupHeader;
    /** @type {?} */
    DataTableBodyComponent.prototype.selectCheck;
    /** @type {?} */
    DataTableBodyComponent.prototype.displayCheck;
    /** @type {?} */
    DataTableBodyComponent.prototype.trackByProp;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowClass;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupedRows;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupExpansionDefault;
    /** @type {?} */
    DataTableBodyComponent.prototype.innerWidth;
    /** @type {?} */
    DataTableBodyComponent.prototype.groupRowsBy;
    /** @type {?} */
    DataTableBodyComponent.prototype.virtualization;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryRow;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryPosition;
    /** @type {?} */
    DataTableBodyComponent.prototype.summaryHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype.scroll;
    /** @type {?} */
    DataTableBodyComponent.prototype.page;
    /** @type {?} */
    DataTableBodyComponent.prototype.activate;
    /** @type {?} */
    DataTableBodyComponent.prototype.select;
    /** @type {?} */
    DataTableBodyComponent.prototype.detailToggle;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowContextmenu;
    /** @type {?} */
    DataTableBodyComponent.prototype.treeAction;
    /** @type {?} */
    DataTableBodyComponent.prototype.scroller;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowHeightsCache;
    /** @type {?} */
    DataTableBodyComponent.prototype.temp;
    /** @type {?} */
    DataTableBodyComponent.prototype.offsetY;
    /** @type {?} */
    DataTableBodyComponent.prototype.indexes;
    /** @type {?} */
    DataTableBodyComponent.prototype.columnGroupWidths;
    /** @type {?} */
    DataTableBodyComponent.prototype.columnGroupWidthsWithoutGroup;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowTrackingFn;
    /** @type {?} */
    DataTableBodyComponent.prototype.listener;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowIndexes;
    /** @type {?} */
    DataTableBodyComponent.prototype.rowExpansions;
    /** @type {?} */
    DataTableBodyComponent.prototype._rows;
    /** @type {?} */
    DataTableBodyComponent.prototype._bodyHeight;
    /** @type {?} */
    DataTableBodyComponent.prototype._columns;
    /** @type {?} */
    DataTableBodyComponent.prototype._rowCount;
    /** @type {?} */
    DataTableBodyComponent.prototype._offset;
    /** @type {?} */
    DataTableBodyComponent.prototype._pageSize;
    /**
     * Get the height of the detail row.
     * @type {?}
     */
    DataTableBodyComponent.prototype.getDetailRowHeight;
    /**
     * @type {?}
     * @private
     */
    DataTableBodyComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQXdHcEQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFxSmpDLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBNUloQyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBeUZwQixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFrQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUF3QjdELG9CQUFlLEdBQW1C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OztJQUN4Qiw2Q0FBMEI7O0lBQzFCLDZDQUEwQjs7SUFDMUIsOENBQTJCOztJQUMzQiw2Q0FBNkI7O0lBQzdCLDBDQUF1Qjs7SUFDdkIsNkNBQTBCOztJQUMxQix1REFBd0M7O0lBQ3hDLDRDQUE0Qjs7SUFDNUIsNkNBQTZCOztJQUM3QixnREFBaUM7O0lBQ2pDLDRDQUE2Qjs7SUFDN0IsaURBQWlDOztJQUNqQywrQ0FBK0I7O0lBMEUvQix3Q0FBeUQ7O0lBQ3pELHNDQUF1RDs7SUFDdkQsMENBQTJEOztJQUMzRCx3Q0FBeUQ7O0lBQ3pELDhDQUErRDs7SUFDL0QsZ0RBQW9GOztJQUNwRiw0Q0FBNkQ7O0lBRTdELDBDQUE2RTs7SUFzQjdFLGlEQUF1RDs7SUFDdkQsc0NBQWlCOztJQUNqQix5Q0FBWTs7SUFDWix5Q0FBa0I7O0lBQ2xCLG1EQUF1Qjs7SUFDdkIsK0RBQW1DOztJQUNuQywrQ0FBbUI7O0lBQ25CLDBDQUFjOztJQUNkLDRDQUE0Qjs7SUFDNUIsK0NBQStCOztJQUUvQix1Q0FBYTs7SUFDYiw2Q0FBaUI7O0lBQ2pCLDBDQUFnQjs7SUFDaEIsMkNBQWtCOztJQUNsQix5Q0FBZ0I7O0lBQ2hCLDJDQUFrQjs7Ozs7SUE0TmxCLG9EQU1FOzs7OztJQTdOVSxvQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3Q2hpbGQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcm9sbGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zY3JvbGxlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvc2VsZWN0aW9uLnR5cGUnO1xuaW1wb3J0IHsgY29sdW1uc0J5UGluLCBjb2x1bW5Hcm91cFdpZHRocyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbHVtbic7XG5pbXBvcnQgeyBSb3dIZWlnaHRDYWNoZSB9IGZyb20gJy4uLy4uL3V0aWxzL3Jvdy1oZWlnaHQtY2FjaGUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlWFkgfSBmcm9tICcuLi8uLi91dGlscy90cmFuc2xhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtYm9keScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRhdGF0YWJsZS1zZWxlY3Rpb25cbiAgICAgICNzZWxlY3RvclxuICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgIFtyb3dzXT1cInJvd3NcIlxuICAgICAgW3NlbGVjdENoZWNrXT1cInNlbGVjdENoZWNrXCJcbiAgICAgIFtzZWxlY3RFbmFibGVkXT1cInNlbGVjdEVuYWJsZWRcIlxuICAgICAgW3NlbGVjdGlvblR5cGVdPVwic2VsZWN0aW9uVHlwZVwiXG4gICAgICBbcm93SWRlbnRpdHldPVwicm93SWRlbnRpdHlcIlxuICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCJcbiAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgID5cbiAgICAgIDxkYXRhdGFibGUtcHJvZ3Jlc3MgKm5nSWY9XCJsb2FkaW5nSW5kaWNhdG9yXCI+IDwvZGF0YXRhYmxlLXByb2dyZXNzPlxuICAgICAgPGRhdGF0YWJsZS1zY3JvbGxlclxuICAgICAgICAqbmdJZj1cInJvd3M/Lmxlbmd0aFwiXG4gICAgICAgIFtzY3JvbGxiYXJWXT1cInNjcm9sbGJhclZcIlxuICAgICAgICBbc2Nyb2xsYmFySF09XCJzY3JvbGxiYXJIXCJcbiAgICAgICAgW3Njcm9sbEhlaWdodF09XCJzY3JvbGxIZWlnaHRcIlxuICAgICAgICBbc2Nyb2xsV2lkdGhdPVwiY29sdW1uR3JvdXBXaWR0aHM/LnRvdGFsXCJcbiAgICAgICAgKHNjcm9sbCk9XCJvbkJvZHlTY3JvbGwoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxkYXRhdGFibGUtc3VtbWFyeS1yb3dcbiAgICAgICAgICAqbmdJZj1cInN1bW1hcnlSb3cgJiYgc3VtbWFyeVBvc2l0aW9uID09PSAndG9wJ1wiXG4gICAgICAgICAgW3Jvd0hlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcbiAgICAgICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcbiAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcbiAgICAgICAgICBbcm93c109XCJyb3dzXCJcbiAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcbiAgICAgICAgPlxuICAgICAgICA8L2RhdGF0YWJsZS1zdW1tYXJ5LXJvdz5cbiAgICAgICAgPGRhdGF0YWJsZS1yb3ctd3JhcHBlclxuICAgICAgICAgIFtncm91cGVkUm93c109XCJncm91cGVkUm93c1wiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGdyb3VwIG9mIHRlbXA7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHJvd1RyYWNraW5nRm5cIlxuICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cImdldFJvd3NTdHlsZXMoZ3JvdXApXCJcbiAgICAgICAgICBbcm93RGV0YWlsXT1cInJvd0RldGFpbFwiXG4gICAgICAgICAgW2dyb3VwSGVhZGVyXT1cImdyb3VwSGVhZGVyXCJcbiAgICAgICAgICBbb2Zmc2V0WF09XCJvZmZzZXRYXCJcbiAgICAgICAgICBbZGV0YWlsUm93SGVpZ2h0XT1cImdldERldGFpbFJvd0hlaWdodChncm91cFtpXSwgaSlcIlxuICAgICAgICAgIFtyb3ddPVwiZ3JvdXBcIlxuICAgICAgICAgIFtleHBhbmRlZF09XCJnZXRSb3dFeHBhbmRlZChncm91cClcIlxuICAgICAgICAgIFtyb3dJbmRleF09XCJnZXRSb3dJbmRleChncm91cFtpXSlcIlxuICAgICAgICAgIChyb3dDb250ZXh0bWVudSk9XCJyb3dDb250ZXh0bWVudS5lbWl0KCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRhdGF0YWJsZS1ib2R5LXJvd1xuICAgICAgICAgICAgKm5nSWY9XCIhZ3JvdXBlZFJvd3M7IGVsc2UgZ3JvdXBlZFJvd3NUZW1wbGF0ZVwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgIFtpc1NlbGVjdGVkXT1cInNlbGVjdG9yLmdldFJvd1NlbGVjdGVkKGdyb3VwKVwiXG4gICAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcbiAgICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgICAgICAgICAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXG4gICAgICAgICAgICBbcm93SGVpZ2h0XT1cImdldFJvd0hlaWdodChncm91cClcIlxuICAgICAgICAgICAgW3Jvd109XCJncm91cFwiXG4gICAgICAgICAgICBbcm93SW5kZXhdPVwiZ2V0Um93SW5kZXgoZ3JvdXApXCJcbiAgICAgICAgICAgIFtleHBhbmRlZF09XCJnZXRSb3dFeHBhbmRlZChncm91cClcIlxuICAgICAgICAgICAgW3Jvd0NsYXNzXT1cInJvd0NsYXNzXCJcbiAgICAgICAgICAgIFtkaXNwbGF5Q2hlY2tdPVwiZGlzcGxheUNoZWNrXCJcbiAgICAgICAgICAgIFt0cmVlU3RhdHVzXT1cImdyb3VwLnRyZWVTdGF0dXNcIlxuICAgICAgICAgICAgKHRyZWVBY3Rpb24pPVwib25UcmVlQWN0aW9uKGdyb3VwKVwiXG4gICAgICAgICAgICAoYWN0aXZhdGUpPVwic2VsZWN0b3Iub25BY3RpdmF0ZSgkZXZlbnQsIGluZGV4ZXMuZmlyc3QgKyBpKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvZGF0YXRhYmxlLWJvZHktcm93PlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBlZFJvd3NUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkYXRhdGFibGUtYm9keS1yb3dcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiBncm91cC52YWx1ZTsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogcm93VHJhY2tpbmdGblwiXG4gICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICBbaXNTZWxlY3RlZF09XCJzZWxlY3Rvci5nZXRSb3dTZWxlY3RlZChyb3cpXCJcbiAgICAgICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXG4gICAgICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgICAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcbiAgICAgICAgICAgICAgW3Jvd0hlaWdodF09XCJnZXRSb3dIZWlnaHQocm93KVwiXG4gICAgICAgICAgICAgIFtyb3ddPVwicm93XCJcbiAgICAgICAgICAgICAgW2dyb3VwXT1cImdyb3VwLnZhbHVlXCJcbiAgICAgICAgICAgICAgW3Jvd0luZGV4XT1cImdldFJvd0luZGV4KHJvdylcIlxuICAgICAgICAgICAgICBbZXhwYW5kZWRdPVwiZ2V0Um93RXhwYW5kZWQocm93KVwiXG4gICAgICAgICAgICAgIFtyb3dDbGFzc109XCJyb3dDbGFzc1wiXG4gICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJzZWxlY3Rvci5vbkFjdGl2YXRlKCRldmVudCwgaSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9kYXRhdGFibGUtYm9keS1yb3c+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kYXRhdGFibGUtcm93LXdyYXBwZXI+XG4gICAgICAgIDxkYXRhdGFibGUtc3VtbWFyeS1yb3dcbiAgICAgICAgICAqbmdJZj1cInN1bW1hcnlSb3cgJiYgc3VtbWFyeVBvc2l0aW9uID09PSAnYm90dG9tJ1wiXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0Qm90dG9tU3VtbWFyeVJvd1N0eWxlcygpXCJcbiAgICAgICAgICBbcm93SGVpZ2h0XT1cInN1bW1hcnlIZWlnaHRcIlxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxuICAgICAgICAgIFtyb3dzXT1cInJvd3NcIlxuICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxuICAgICAgICA+XG4gICAgICAgIDwvZGF0YXRhYmxlLXN1bW1hcnktcm93PlxuICAgICAgPC9kYXRhdGFibGUtc2Nyb2xsZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktcm93XCIgKm5nSWY9XCIhcm93cz8ubGVuZ3RoICYmICFsb2FkaW5nSW5kaWNhdG9yXCIgW2lubmVySFRNTF09XCJlbXB0eU1lc3NhZ2VcIj48L2Rpdj5cbiAgICA8L2RhdGF0YWJsZS1zZWxlY3Rpb24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkYXRhdGFibGUtYm9keSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXJIOiBib29sZWFuO1xuICBASW5wdXQoKSBsb2FkaW5nSW5kaWNhdG9yOiBib29sZWFuO1xuICBASW5wdXQoKSBleHRlcm5hbFBhZ2luZzogYm9vbGVhbjtcbiAgQElucHV0KCkgcm93SGVpZ2h0OiBudW1iZXIgfCAnYXV0bycgfCAoKHJvdz86IGFueSkgPT4gbnVtYmVyKTtcbiAgQElucHV0KCkgb2Zmc2V0WDogbnVtYmVyO1xuICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KCkgc2VsZWN0aW9uVHlwZTogU2VsZWN0aW9uVHlwZTtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHJvd0lkZW50aXR5OiBhbnk7XG4gIEBJbnB1dCgpIHJvd0RldGFpbDogYW55O1xuICBASW5wdXQoKSBncm91cEhlYWRlcjogYW55O1xuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xuICBASW5wdXQoKSBkaXNwbGF5Q2hlY2s6IGFueTtcbiAgQElucHV0KCkgdHJhY2tCeVByb3A6IHN0cmluZztcbiAgQElucHV0KCkgcm93Q2xhc3M6IGFueTtcbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueTtcbiAgQElucHV0KCkgZ3JvdXBFeHBhbnNpb25EZWZhdWx0OiBib29sZWFuO1xuICBASW5wdXQoKSBpbm5lcldpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGdyb3VwUm93c0J5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZpcnR1YWxpemF0aW9uOiBib29sZWFuO1xuICBASW5wdXQoKSBzdW1tYXJ5Um93OiBib29sZWFuO1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZztcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNldCBwYWdlU2l6ZSh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX3BhZ2VTaXplID0gdmFsO1xuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XG4gIH1cblxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93cyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fcm93cyA9IHZhbDtcbiAgICB0aGlzLnJvd0V4cGFuc2lvbnMuY2xlYXIoKTtcbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xuICB9XG5cbiAgZ2V0IHJvd3MoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGNvbHVtbnModmFsOiBhbnlbXSkge1xuICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XG4gICAgY29uc3QgY29sc0J5UGluID0gY29sdW1uc0J5UGluKHZhbCk7XG4gICAgdGhpcy5jb2x1bW5Hcm91cFdpZHRocyA9IGNvbHVtbkdyb3VwV2lkdGhzKGNvbHNCeVBpbiwgdmFsKTtcbiAgfVxuXG4gIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBvZmZzZXQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSB2YWw7XG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcbiAgfVxuXG4gIGdldCBvZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICB9XG5cbiAgQElucHV0KCkgc2V0IHJvd0NvdW50KHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm93Q291bnQgPSB2YWw7XG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcbiAgfVxuXG4gIGdldCByb3dDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9yb3dDb3VudDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgYm9keVdpZHRoKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFySCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJXaWR0aCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnMTAwJSc7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKVxuICBzZXQgYm9keUhlaWdodCh2YWwpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICB0aGlzLl9ib2R5SGVpZ2h0ID0gdmFsICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm9keUhlaWdodCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xuICB9XG5cbiAgZ2V0IGJvZHlIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JvZHlIZWlnaHQ7XG4gIH1cblxuICBAT3V0cHV0KCkgc2Nyb2xsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRldGFpbFRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByb3dDb250ZXh0bWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogTW91c2VFdmVudDsgcm93OiBhbnkgfT4oZmFsc2UpO1xuICBAT3V0cHV0KCkgdHJlZUFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZChTY3JvbGxlckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNjcm9sbGVyOiBTY3JvbGxlckNvbXBvbmVudDtcblxuICAvKipcbiAgICogUmV0dXJucyBpZiBzZWxlY3Rpb24gaXMgZW5hYmxlZC5cbiAgICovXG4gIGdldCBzZWxlY3RFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc2VsZWN0aW9uVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9wZXJ0eSB0aGF0IHdvdWxkIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHNjcm9sbCBiYXJcbiAgICogYmFzZWQgb24gdGhlIHJvdyBoZWlnaHRzIGNhY2hlIGZvciB2aXJ0dWFsIHNjcm9sbCBhbmQgdmlydHVhbGl6YXRpb24uIE90aGVyIHNjZW5hcmlvc1xuICAgKiBjYWxjdWxhdGUgc2Nyb2xsIGhlaWdodCBhdXRvbWF0aWNhbGx5IChhcyBoZWlnaHQgd2lsbCBiZSB1bmRlZmluZWQpLlxuICAgKi9cbiAgZ2V0IHNjcm9sbEhlaWdodCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbiAmJiB0aGlzLnJvd0NvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkodGhpcy5yb3dDb3VudCAtIDEpO1xuICAgIH1cbiAgICAvLyBhdm9pZCBUUzcwMzA6IE5vdCBhbGwgY29kZSBwYXRocyByZXR1cm4gYSB2YWx1ZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcm93SGVpZ2h0c0NhY2hlOiBSb3dIZWlnaHRDYWNoZSA9IG5ldyBSb3dIZWlnaHRDYWNoZSgpO1xuICB0ZW1wOiBhbnlbXSA9IFtdO1xuICBvZmZzZXRZID0gMDtcbiAgaW5kZXhlczogYW55ID0ge307XG4gIGNvbHVtbkdyb3VwV2lkdGhzOiBhbnk7XG4gIGNvbHVtbkdyb3VwV2lkdGhzV2l0aG91dEdyb3VwOiBhbnk7XG4gIHJvd1RyYWNraW5nRm46IGFueTtcbiAgbGlzdGVuZXI6IGFueTtcbiAgcm93SW5kZXhlczogYW55ID0gbmV3IE1hcCgpO1xuICByb3dFeHBhbnNpb25zOiBhbnkgPSBuZXcgTWFwKCk7XG5cbiAgX3Jvd3M6IGFueVtdO1xuICBfYm9keUhlaWdodDogYW55O1xuICBfY29sdW1uczogYW55W107XG4gIF9yb3dDb3VudDogbnVtYmVyO1xuICBfb2Zmc2V0OiBudW1iZXI7XG4gIF9wYWdlU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIERhdGFUYWJsZUJvZHlDb21wb25lbnQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIC8vIGRlY2xhcmUgZm4gaGVyZSBzbyB3ZSBjYW4gZ2V0IGFjY2VzcyB0byB0aGUgYHRoaXNgIHByb3BlcnR5XG4gICAgdGhpcy5yb3dUcmFja2luZ0ZuID0gKGluZGV4OiBudW1iZXIsIHJvdzogYW55KTogYW55ID0+IHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93KTtcbiAgICAgIGlmICh0aGlzLnRyYWNrQnlQcm9wKSB7XG4gICAgICAgIHJldHVybiByb3dbdGhpcy50cmFja0J5UHJvcF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgaW5pdGlhbGl6aW5nIGlucHV0IHByb3BlcnRpZXNcbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvd0RldGFpbCkge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHRoaXMucm93RGV0YWlsLnRvZ2dsZS5zdWJzY3JpYmUoKHsgdHlwZSwgdmFsdWUgfTogeyB0eXBlOiBzdHJpbmc7IHZhbHVlOiBhbnkgfSkgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3JvdycpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVJvd0V4cGFuc2lvbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVBbGxSb3dzKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZnJlc2ggcm93cyBhZnRlciB0b2dnbGVcbiAgICAgICAgLy8gRml4ZXMgIzg4M1xuICAgICAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVSb3dzKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ncm91cEhlYWRlcikge1xuICAgICAgdGhpcy5saXN0ZW5lciA9IHRoaXMuZ3JvdXBIZWFkZXIudG9nZ2xlLnN1YnNjcmliZSgoeyB0eXBlLCB2YWx1ZSB9OiB7IHR5cGU6IHN0cmluZzsgdmFsdWU6IGFueSB9KSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVSb3dFeHBhbnNpb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgICAgIHRoaXMudG9nZ2xlQWxsUm93cyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZWZyZXNoIHJvd3MgYWZ0ZXIgdG9nZ2xlXG4gICAgICAgIC8vIEZpeGVzICM4ODNcbiAgICAgICAgdGhpcy51cGRhdGVJbmRleGVzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUm93cygpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBvbmNlLCBiZWZvcmUgdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvd0RldGFpbCB8fCB0aGlzLmdyb3VwSGVhZGVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFkgb2Zmc2V0IGdpdmVuIGEgbmV3IG9mZnNldC5cbiAgICovXG4gIHVwZGF0ZU9mZnNldFkob2Zmc2V0PzogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gc2Nyb2xsZXIgaXMgbWlzc2luZyBvbiBlbXB0eSB0YWJsZVxuICAgIGlmICghdGhpcy5zY3JvbGxlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbiAmJiBvZmZzZXQpIHtcbiAgICAgIC8vIEZpcnN0IGdldCB0aGUgcm93IEluZGV4IHRoYXQgd2UgbmVlZCB0byBtb3ZlIHRvLlxuICAgICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLnBhZ2VTaXplICogb2Zmc2V0O1xuICAgICAgb2Zmc2V0ID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkocm93SW5kZXggLSAxKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiAhdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbGVyLnNldE9mZnNldChvZmZzZXQgfHwgMCk7XG4gIH1cblxuICAvKipcbiAgICogQm9keSB3YXMgc2Nyb2xsZWQsIHRoaXMgaXMgbWFpbmx5IHVzZWZ1bCBmb3JcbiAgICogd2hlbiBhIHVzZXIgaXMgc2VydmVyLXNpZGUgcGFnaW5hdGlvbiB2aWEgdmlydHVhbCBzY3JvbGwuXG4gICAqL1xuICBvbkJvZHlTY3JvbGwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFlQb3M6IG51bWJlciA9IGV2ZW50LnNjcm9sbFlQb3M7XG4gICAgY29uc3Qgc2Nyb2xsWFBvczogbnVtYmVyID0gZXZlbnQuc2Nyb2xsWFBvcztcblxuICAgIC8vIGlmIHNjcm9sbCBjaGFuZ2UsIHRyaWdnZXIgdXBkYXRlXG4gICAgLy8gdGhpcyBpcyBtYWlubHkgdXNlZCBmb3IgaGVhZGVyIGNlbGwgcG9zaXRpb25zXG4gICAgaWYgKHRoaXMub2Zmc2V0WSAhPT0gc2Nyb2xsWVBvcyB8fCB0aGlzLm9mZnNldFggIT09IHNjcm9sbFhQb3MpIHtcbiAgICAgIHRoaXMuc2Nyb2xsLmVtaXQoe1xuICAgICAgICBvZmZzZXRZOiBzY3JvbGxZUG9zLFxuICAgICAgICBvZmZzZXRYOiBzY3JvbGxYUG9zXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldFkgPSBzY3JvbGxZUG9zO1xuICAgIHRoaXMub2Zmc2V0WCA9IHNjcm9sbFhQb3M7XG5cbiAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2UoZXZlbnQuZGlyZWN0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZVJvd3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYWdlIGdpdmVuIGEgZGlyZWN0aW9uLlxuICAgKi9cbiAgdXBkYXRlUGFnZShkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBvZmZzZXQgPSB0aGlzLmluZGV4ZXMuZmlyc3QgLyB0aGlzLnBhZ2VTaXplO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgb2Zmc2V0ID0gTWF0aC5jZWlsKG9mZnNldCk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgb2Zmc2V0ID0gTWF0aC5mbG9vcihvZmZzZXQpO1xuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gIT09IHVuZGVmaW5lZCAmJiAhaXNOYU4ob2Zmc2V0KSkge1xuICAgICAgdGhpcy5wYWdlLmVtaXQoeyBvZmZzZXQgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHJvd3MgaW4gdGhlIHZpZXcgcG9ydFxuICAgKi9cbiAgdXBkYXRlUm93cygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGZpcnN0LCBsYXN0IH0gPSB0aGlzLmluZGV4ZXM7XG4gICAgbGV0IHJvd0luZGV4ID0gZmlyc3Q7XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgY29uc3QgdGVtcDogYW55W10gPSBbXTtcblxuICAgIHRoaXMucm93SW5kZXhlcy5jbGVhcigpO1xuXG4gICAgLy8gaWYgZ3JvdXByb3dzYnkgaGFzIGJlZW4gc3BlY2lmaWVkIHRyZWF0IHJvdyBwYWdpbmdcbiAgICAvLyBwYXJhbWV0ZXJzIGFzIGdyb3VwIHBhZ2luZyBwYXJhbWV0ZXJzIGllIGlmIGxpbWl0IDEwIGhhcyBiZWVuXG4gICAgLy8gc3BlY2lmaWVkIHRyZWF0IGl0IGFzIDEwIGdyb3VwcyByYXRoZXIgdGhhbiAxMCByb3dzXG4gICAgaWYgKHRoaXMuZ3JvdXBlZFJvd3MpIHtcbiAgICAgIGxldCBtYXhSb3dzUGVyR3JvdXAgPSAzO1xuICAgICAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXAgc2V0IHRoZSBtYXhpbXVtIG51bWJlciBvZlxuICAgICAgLy8gcm93cyBwZXIgZ3JvdXAgdGhlIHNhbWUgYXMgdGhlIHRvdGFsIG51bWJlciBvZiByb3dzXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWF4Um93c1Blckdyb3VwID0gdGhpcy5ncm91cGVkUm93c1swXS52YWx1ZS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChyb3dJbmRleCA8IGxhc3QgJiYgcm93SW5kZXggPCB0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aCkge1xuICAgICAgICAvLyBBZGQgdGhlIGdyb3VwcyBpbnRvIHRoaXMgcGFnZVxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXBlZFJvd3Nbcm93SW5kZXhdO1xuICAgICAgICB0ZW1wW2lkeF0gPSBncm91cDtcbiAgICAgICAgaWR4Kys7XG5cbiAgICAgICAgLy8gR3JvdXAgaW5kZXggaW4gdGhpcyBjb250ZXh0XG4gICAgICAgIHJvd0luZGV4Kys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChyb3dJbmRleCA8IGxhc3QgJiYgcm93SW5kZXggPCB0aGlzLnJvd0NvdW50KSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93c1tyb3dJbmRleF07XG5cbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgIHRoaXMucm93SW5kZXhlcy5zZXQocm93LCByb3dJbmRleCk7XG4gICAgICAgICAgdGVtcFtpZHhdID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWR4Kys7XG4gICAgICAgIHJvd0luZGV4Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZW1wID0gdGVtcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJvdyBoZWlnaHRcbiAgICovXG4gIGdldFJvd0hlaWdodChyb3c6IGFueSk6IG51bWJlciB7XG4gICAgLy8gaWYgaXRzIGEgZnVuY3Rpb24gcmV0dXJuIGl0XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJvd0hlaWdodCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0KHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucm93SGVpZ2h0IGFzIG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZ3JvdXAgdGhlIGdyb3VwIHdpdGggYWxsIHJvd3NcbiAgICovXG4gIGdldEdyb3VwSGVpZ2h0KGdyb3VwOiBhbnkpOiBudW1iZXIge1xuICAgIGxldCByb3dIZWlnaHQgPSAwO1xuXG4gICAgaWYgKGdyb3VwLnZhbHVlKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZ3JvdXAudmFsdWUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHJvd0hlaWdodCArPSB0aGlzLmdldFJvd0FuZERldGFpbEhlaWdodChncm91cC52YWx1ZVtpbmRleF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByb3dIZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHJvdyBoZWlnaHQgYmFzZWQgb24gdGhlIGV4cGFuZGVkIHN0YXRlIG9mIHRoZSByb3cuXG4gICAqL1xuICBnZXRSb3dBbmREZXRhaWxIZWlnaHQocm93OiBhbnkpOiBudW1iZXIge1xuICAgIGxldCByb3dIZWlnaHQgPSB0aGlzLmdldFJvd0hlaWdodChyb3cpO1xuICAgIGNvbnN0IGV4cGFuZGVkID0gdGhpcy5yb3dFeHBhbnNpb25zLmdldChyb3cpO1xuXG4gICAgLy8gQWRkaW5nIGRldGFpbCByb3cgaGVpZ2h0IGlmIGl0cyBleHBhbmRlZC5cbiAgICBpZiAoZXhwYW5kZWQgPT09IDEpIHtcbiAgICAgIHJvd0hlaWdodCArPSB0aGlzLmdldERldGFpbFJvd0hlaWdodChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dIZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWlnaHQgb2YgdGhlIGRldGFpbCByb3cuXG4gICAqL1xuICBnZXREZXRhaWxSb3dIZWlnaHQgPSAocm93PzogYW55LCBpbmRleD86IGFueSk6IG51bWJlciA9PiB7XG4gICAgaWYgKCF0aGlzLnJvd0RldGFpbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHJvd0hlaWdodCA9IHRoaXMucm93RGV0YWlsLnJvd0hlaWdodDtcbiAgICByZXR1cm4gdHlwZW9mIHJvd0hlaWdodCA9PT0gJ2Z1bmN0aW9uJyA/IHJvd0hlaWdodChyb3csIGluZGV4KSA6IChyb3dIZWlnaHQgYXMgbnVtYmVyKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3R5bGVzIGZvciB0aGUgcm93IHNvIHRoYXQgdGhlIHJvd3MgY2FuIGJlIG1vdmVkIGluIDJEIHNwYWNlXG4gICAqIGR1cmluZyB2aXJ0dWFsIHNjcm9sbCBpbnNpZGUgdGhlIERPTS4gICBJbiB0aGUgYmVsb3cgY2FzZSB0aGUgWSBwb3NpdGlvbiBpc1xuICAgKiBtYW5pcHVsYXRlZC4gICBBcyBhbiBleGFtcGxlLCBpZiB0aGUgaGVpZ2h0IG9mIHJvdyAwIGlzIDMwIHB4IGFuZCByb3cgMSBpc1xuICAgKiAxMDAgcHggdGhlbiBmb2xsb3dpbmcgc3R5bGVzIGFyZSBnZW5lcmF0ZWQ6XG4gICAqXG4gICAqIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7ICAgIC0+ICByb3cwXG4gICAqIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAzMHB4LCAwcHgpOyAgIC0+ICByb3cxXG4gICAqIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAxMzBweCwgMHB4KTsgIC0+ICByb3cyXG4gICAqXG4gICAqIFJvdyBoZWlnaHRzIGhhdmUgdG8gYmUgY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgcm93IGhlaWdodHMgY2FjaGUgYXMgd2Ugd29udFxuICAgKiBiZSBhYmxlIHRvIGRldGVybWluZSB3aGljaCByb3cgaXMgb2Ygd2hhdCBoZWlnaHQgYmVmb3JlIGhhbmQuICBJbiB0aGUgYWJvdmVcbiAgICogY2FzZSB0aGUgcG9zaXRpb25ZIG9mIHRoZSB0cmFuc2xhdGUzZCBmb3Igcm93MiB3b3VsZCBiZSB0aGUgc3VtIG9mIGFsbCB0aGVcbiAgICogaGVpZ2h0cyBvZiB0aGUgcm93cyBiZWZvcmUgaXQgKGkuZS4gcm93MCBhbmQgcm93MSkuXG4gICAqXG4gICAqIEBwYXJhbSByb3dzIHRoZSByb3cgdGhhdCBuZWVkcyB0byBiZSBwbGFjZWQgaW4gdGhlIDJEIHNwYWNlLlxuICAgKiBAcmV0dXJucyB0aGUgQ1NTMyBzdHlsZSB0byBiZSBhcHBsaWVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBEYXRhVGFibGVCb2R5Q29tcG9uZW50XG4gICAqL1xuICBnZXRSb3dzU3R5bGVzKHJvd3M6IGFueSk6IGFueSB7XG4gICAgY29uc3Qgc3R5bGVzOiBhbnkgPSB7fTtcblxuICAgIC8vIG9ubHkgYWRkIHN0eWxlcyBmb3IgdGhlIGdyb3VwIGlmIHRoZXJlIGlzIGEgZ3JvdXBcbiAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xuICAgICAgc3R5bGVzLndpZHRoID0gdGhpcy5jb2x1bW5Hcm91cFdpZHRocy50b3RhbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWICYmIHRoaXMudmlydHVhbGl6YXRpb24pIHtcbiAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xuICAgICAgICAvLyBHZXQgdGhlIGxhdGVzdCByb3cgcm93aW5kZXggaW4gYSBncm91cFxuICAgICAgICBjb25zdCByb3cgPSByb3dzW3Jvd3MubGVuZ3RoIC0gMV07XG4gICAgICAgIGlkeCA9IHJvdyA/IHRoaXMuZ2V0Um93SW5kZXgocm93KSA6IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZHggPSB0aGlzLmdldFJvd0luZGV4KHJvd3MpO1xuICAgICAgfVxuXG4gICAgICAvLyBjb25zdCBwb3MgPSBpZHggKiByb3dIZWlnaHQ7XG4gICAgICAvLyBUaGUgcG9zaXRpb24gb2YgdGhpcyByb3cgd291bGQgYmUgdGhlIHN1bSBvZiBhbGwgcm93IGhlaWdodHNcbiAgICAgIC8vIHVudGlsIHRoZSBwcmV2aW91cyByb3cgcG9zaXRpb24uXG4gICAgICBjb25zdCBwb3MgPSB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeShpZHggLSAxKTtcblxuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCAwLCBwb3MpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGJvdHRvbSBzdW1tYXJ5IHJvdyBvZmZzZXQgZm9yIHNjcm9sbGJhciBtb2RlLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjYWNoZSBhbmQgb2Zmc2V0IGNhbGN1bGF0aW9uXG4gICAqIHNlZSBkZXNjcmlwdGlvbiBmb3IgYGdldFJvd3NTdHlsZXNgIG1ldGhvZFxuICAgKlxuICAgKiBAcmV0dXJucyB0aGUgQ1NTMyBzdHlsZSB0byBiZSBhcHBsaWVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBEYXRhVGFibGVCb2R5Q29tcG9uZW50XG4gICAqL1xuICBnZXRCb3R0b21TdW1tYXJ5Um93U3R5bGVzKCk6IGFueSB7XG4gICAgaWYgKCF0aGlzLnNjcm9sbGJhclYgfHwgIXRoaXMucm93cyB8fCAhdGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGVzID0geyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9O1xuICAgIGNvbnN0IHBvcyA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KHRoaXMucm93cy5sZW5ndGggLSAxKTtcblxuICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgMCwgcG9zKTtcblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAqL1xuICBoaWRlSW5kaWNhdG9yKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMubG9hZGluZ0luZGljYXRvciA9IGZhbHNlKSwgNTAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBpbmRleCBvZiB0aGUgcm93cyBpbiB0aGUgdmlld3BvcnRcbiAgICovXG4gIHVwZGF0ZUluZGV4ZXMoKTogdm9pZCB7XG4gICAgbGV0IGZpcnN0ID0gMDtcbiAgICBsZXQgbGFzdCA9IDA7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICBpZiAodGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgICAvLyBDYWxjdWxhdGlvbiBvZiB0aGUgZmlyc3QgYW5kIGxhc3QgaW5kZXhlcyB3aWxsIGJlIGJhc2VkIG9uIHdoZXJlIHRoZVxuICAgICAgICAvLyBzY3JvbGxZIHBvc2l0aW9uIHdvdWxkIGJlIGF0LiAgVGhlIGxhc3QgaW5kZXggd291bGQgYmUgdGhlIG9uZVxuICAgICAgICAvLyB0aGF0IHNob3dzIHVwIGluc2lkZSB0aGUgdmlldyBwb3J0IHRoZSBsYXN0LlxuICAgICAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUludCh0aGlzLmJvZHlIZWlnaHQsIDApO1xuICAgICAgICBmaXJzdCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLmdldFJvd0luZGV4KHRoaXMub2Zmc2V0WSk7XG4gICAgICAgIGxhc3QgPSB0aGlzLnJvd0hlaWdodHNDYWNoZS5nZXRSb3dJbmRleChoZWlnaHQgKyB0aGlzLm9mZnNldFkpICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHZpcnR1YWwgcm93cyBhcmUgbm90IG5lZWRlZFxuICAgICAgICAvLyBXZSByZW5kZXIgYWxsIGluIG9uZSBnb1xuICAgICAgICBmaXJzdCA9IDA7XG4gICAgICAgIGxhc3QgPSB0aGlzLnJvd0NvdW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgc2VydmVyIGlzIGhhbmRsaW5nIHBhZ2luZyBhbmQgd2lsbCBwYXNzIGFuIGFycmF5IHRoYXQgYmVnaW5zIHdpdGggdGhlXG4gICAgICAvLyBlbGVtZW50IGF0IGEgc3BlY2lmaWVkIG9mZnNldC4gIGZpcnN0IHNob3VsZCBhbHdheXMgYmUgMCB3aXRoIGV4dGVybmFsIHBhZ2luZy5cbiAgICAgIGlmICghdGhpcy5leHRlcm5hbFBhZ2luZykge1xuICAgICAgICBmaXJzdCA9IE1hdGgubWF4KHRoaXMub2Zmc2V0ICogdGhpcy5wYWdlU2l6ZSwgMCk7XG4gICAgICB9XG4gICAgICBsYXN0ID0gTWF0aC5taW4oZmlyc3QgKyB0aGlzLnBhZ2VTaXplLCB0aGlzLnJvd0NvdW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmluZGV4ZXMgPSB7IGZpcnN0LCBsYXN0IH07XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBmdWxsIFJvdyBIZWlnaHQgY2FjaGUuICBTaG91bGQgYmUgdXNlZFxuICAgKiB3aGVuIHRoZSBlbnRpcmUgcm93IGFycmF5IHN0YXRlIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVmcmVzaFJvd0hlaWdodENhY2hlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zY3JvbGxiYXJWIHx8ICh0aGlzLnNjcm9sbGJhclYgJiYgIXRoaXMudmlydHVhbGl6YXRpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHJvdyBoZWlnaHQgY2FjaGUgaWYgYWxyZWFkeSBwcmVzZW50LlxuICAgIC8vIHRoaXMgaXMgdXNlZnVsIGR1cmluZyBzb3J0cywgZmlsdGVycyB3aGVyZSB0aGUgc3RhdGUgb2YgdGhlXG4gICAgLy8gcm93cyBhcnJheSBpcyBjaGFuZ2VkLlxuICAgIHRoaXMucm93SGVpZ2h0c0NhY2hlLmNsZWFyQ2FjaGUoKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHRyZWUgb25seSBpZiB0aGVyZSBhcmUgcm93cyBpbnNpZGUgdGhlIHRyZWUuXG4gICAgaWYgKHRoaXMucm93cyAmJiB0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJvd0hlaWdodHNDYWNoZS5pbml0Q2FjaGUoe1xuICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgIHJvd0hlaWdodDogdGhpcy5yb3dIZWlnaHQsXG4gICAgICAgIGRldGFpbFJvd0hlaWdodDogdGhpcy5nZXREZXRhaWxSb3dIZWlnaHQsXG4gICAgICAgIGV4dGVybmFsVmlydHVhbDogdGhpcy5zY3JvbGxiYXJWICYmIHRoaXMuZXh0ZXJuYWxQYWdpbmcsXG4gICAgICAgIHJvd0NvdW50OiB0aGlzLnJvd0NvdW50LFxuICAgICAgICByb3dJbmRleGVzOiB0aGlzLnJvd0luZGV4ZXMsXG4gICAgICAgIHJvd0V4cGFuc2lvbnM6IHRoaXMucm93RXhwYW5zaW9uc1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGluZGV4IGZvciB0aGUgdmlldyBwb3J0XG4gICAqL1xuICBnZXRBZGp1c3RlZFZpZXdQb3J0SW5kZXgoKTogbnVtYmVyIHtcbiAgICAvLyBDYXB0dXJlIHRoZSByb3cgaW5kZXggb2YgdGhlIGZpcnN0IHJvdyB0aGF0IGlzIHZpc2libGUgb24gdGhlIHZpZXdwb3J0LlxuICAgIC8vIElmIHRoZSBzY3JvbGwgYmFyIGlzIGp1c3QgYmVsb3cgdGhlIHJvdyB3aGljaCBpcyBoaWdobGlnaHRlZCB0aGVuIG1ha2UgdGhhdCBhcyB0aGVcbiAgICAvLyBmaXJzdCBpbmRleC5cbiAgICBjb25zdCB2aWV3UG9ydEZpcnN0Um93SW5kZXggPSB0aGlzLmluZGV4ZXMuZmlyc3Q7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWICYmIHRoaXMudmlydHVhbGl6YXRpb24pIHtcbiAgICAgIGNvbnN0IG9mZnNldFNjcm9sbCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KHZpZXdQb3J0Rmlyc3RSb3dJbmRleCAtIDEpO1xuICAgICAgcmV0dXJuIG9mZnNldFNjcm9sbCA8PSB0aGlzLm9mZnNldFkgPyB2aWV3UG9ydEZpcnN0Um93SW5kZXggLSAxIDogdmlld1BvcnRGaXJzdFJvd0luZGV4O1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3UG9ydEZpcnN0Um93SW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoZSBFeHBhbnNpb24gb2YgdGhlIHJvdyBpLmUuIGlmIHRoZSByb3cgaXMgZXhwYW5kZWQgdGhlbiBpdCB3aWxsXG4gICAqIGNvbGxhcHNlIGFuZCB2aWNlIHZlcnNhLiAgIE5vdGUgdGhhdCB0aGUgZXhwYW5kZWQgc3RhdHVzIGlzIHN0b3JlZCBhc1xuICAgKiBhIHBhcnQgb2YgdGhlIHJvdyBvYmplY3QgaXRzZWxmIGFzIHdlIGhhdmUgdG8gcHJlc2VydmUgdGhlIGV4cGFuZGVkIHJvd1xuICAgKiBzdGF0dXMgaW4gY2FzZSBvZiBzb3J0aW5nIGFuZCBmaWx0ZXJpbmcgb2YgdGhlIHJvdyBzZXQuXG4gICAqL1xuICB0b2dnbGVSb3dFeHBhbnNpb24ocm93OiBhbnkpOiB2b2lkIHtcbiAgICAvLyBDYXB0dXJlIHRoZSByb3cgaW5kZXggb2YgdGhlIGZpcnN0IHJvdyB0aGF0IGlzIHZpc2libGUgb24gdGhlIHZpZXdwb3J0LlxuICAgIGNvbnN0IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCA9IHRoaXMuZ2V0QWRqdXN0ZWRWaWV3UG9ydEluZGV4KCk7XG4gICAgbGV0IGV4cGFuZGVkID0gdGhpcy5yb3dFeHBhbnNpb25zLmdldChyb3cpO1xuXG4gICAgLy8gSWYgdGhlIGRldGFpbFJvd0hlaWdodCBpcyBhdXRvIC0tPiBvbmx5IGluIGNhc2Ugb2Ygbm9uLXZpcnR1YWxpemVkIHNjcm9sbFxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgY29uc3QgZGV0YWlsUm93SGVpZ2h0ID0gdGhpcy5nZXREZXRhaWxSb3dIZWlnaHQocm93KSAqIChleHBhbmRlZCA/IC0xIDogMSk7XG4gICAgICAvLyBjb25zdCBpZHggPSB0aGlzLnJvd0luZGV4ZXMuZ2V0KHJvdykgfHwgMDtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93KTtcbiAgICAgIHRoaXMucm93SGVpZ2h0c0NhY2hlLnVwZGF0ZShpZHgsIGRldGFpbFJvd0hlaWdodCk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSB0b2dnbGVkIHJvdyBhbmQgdXBkYXRlIHRoaXZlIG5ldmVyZSBoZWlnaHRzIGluIHRoZSBjYWNoZS5cbiAgICBleHBhbmRlZCA9IGV4cGFuZGVkIF49IDE7XG4gICAgdGhpcy5yb3dFeHBhbnNpb25zLnNldChyb3csIGV4cGFuZGVkKTtcblxuICAgIHRoaXMuZGV0YWlsVG9nZ2xlLmVtaXQoe1xuICAgICAgcm93czogW3Jvd10sXG4gICAgICBjdXJyZW50SW5kZXg6IHZpZXdQb3J0Rmlyc3RSb3dJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZC9Db2xsYXBzZSBhbGwgdGhlIHJvd3Mgbm8gbWF0dGVyIHdoYXQgdGhlaXIgc3RhdGUgaXMuXG4gICAqL1xuICB0b2dnbGVBbGxSb3dzKGV4cGFuZGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gY2xlYXIgcHJldiBleHBhbnNpb25zXG4gICAgdGhpcy5yb3dFeHBhbnNpb25zLmNsZWFyKCk7XG5cbiAgICBjb25zdCByb3dFeHBhbmRlZCA9IGV4cGFuZGVkID8gMSA6IDA7XG5cbiAgICAvLyBDYXB0dXJlIHRoZSByb3cgaW5kZXggb2YgdGhlIGZpcnN0IHJvdyB0aGF0IGlzIHZpc2libGUgb24gdGhlIHZpZXdwb3J0LlxuICAgIGNvbnN0IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCA9IHRoaXMuZ2V0QWRqdXN0ZWRWaWV3UG9ydEluZGV4KCk7XG5cbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLnJvd3MpIHtcbiAgICAgIHRoaXMucm93RXhwYW5zaW9ucy5zZXQocm93LCByb3dFeHBhbmRlZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyVikge1xuICAgICAgLy8gUmVmcmVzaCB0aGUgZnVsbCByb3cgaGVpZ2h0cyBjYWNoZSBzaW5jZSBldmVyeSByb3cgd2FzIGFmZmVjdGVkLlxuICAgICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBFbWl0IGFsbCByb3dzIHRoYXQgaGF2ZSBiZWVuIGV4cGFuZGVkLlxuICAgIHRoaXMuZGV0YWlsVG9nZ2xlLmVtaXQoe1xuICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgY3VycmVudEluZGV4OiB2aWV3UG9ydEZpcnN0Um93SW5kZXhcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZXMgdGhlIHRhYmxlXG4gICAqL1xuICByZWNhbGNMYXlvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoUm93SGVpZ2h0Q2FjaGUoKTtcbiAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICB0aGlzLnVwZGF0ZVJvd3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja3MgdGhlIGNvbHVtblxuICAgKi9cbiAgY29sdW1uVHJhY2tpbmdGbihpbmRleDogbnVtYmVyLCBjb2x1bW46IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGNvbHVtbi4kJGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvdyBwaW5uaW5nIGdyb3VwIHN0eWxlc1xuICAgKi9cbiAgc3R5bGVzQnlHcm91cChncm91cDogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5jb2x1bW5Hcm91cFdpZHRocztcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy5vZmZzZXRYO1xuXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgd2lkdGg6IGAke3dpZHRoc1tncm91cF19cHhgXG4gICAgfTtcblxuICAgIGlmIChncm91cCA9PT0gJ2xlZnQnKSB7XG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldFgsIDApO1xuICAgIH0gZWxzZSBpZiAoZ3JvdXAgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IGJvZHlXaWR0aCA9IHBhcnNlSW50KHRoaXMuaW5uZXJXaWR0aCArICcnLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsRGlmZiA9IHdpZHRocy50b3RhbCAtIGJvZHlXaWR0aDtcbiAgICAgIGNvbnN0IG9mZnNldERpZmYgPSB0b3RhbERpZmYgLSBvZmZzZXRYO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gb2Zmc2V0RGlmZiAqIC0xO1xuICAgICAgdHJhbnNsYXRlWFkoc3R5bGVzLCBvZmZzZXQsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpZiB0aGUgcm93IHdhcyBleHBhbmRlZCBhbmQgc2V0IGRlZmF1bHQgcm93IGV4cGFuc2lvbiB3aGVuIHJvdyBleHBhbnNpb24gaXMgZW1wdHlcbiAgICovXG4gIGdldFJvd0V4cGFuZGVkKHJvdzogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucm93RXhwYW5zaW9ucy5zaXplID09PSAwICYmIHRoaXMuZ3JvdXBFeHBhbnNpb25EZWZhdWx0KSB7XG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMuZ3JvdXBlZFJvd3MpIHtcbiAgICAgICAgdGhpcy5yb3dFeHBhbnNpb25zLnNldChncm91cCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZXhwYW5kZWQgPSB0aGlzLnJvd0V4cGFuc2lvbnMuZ2V0KHJvdyk7XG4gICAgcmV0dXJuIGV4cGFuZGVkID09PSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvdyBpbmRleCBnaXZlbiBhIHJvd1xuICAgKi9cbiAgZ2V0Um93SW5kZXgocm93OiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnJvd0luZGV4ZXMuZ2V0KHJvdykgfHwgMDtcbiAgfVxuXG4gIG9uVHJlZUFjdGlvbihyb3c6IGFueSkge1xuICAgIHRoaXMudHJlZUFjdGlvbi5lbWl0KHsgcm93IH0pO1xuICB9XG59XG4iXX0=