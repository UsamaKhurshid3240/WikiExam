/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ScrollerComponent } from './scroller.component';
import { SelectionType } from '../../types/selection.type';
import { columnsByPin, columnGroupWidths } from '../../utils/column';
import { RowHeightCache } from '../../utils/row-height-cache';
import { translateXY } from '../../utils/translate';
var DataTableBodyComponent = /** @class */ (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    function DataTableBodyComponent(cd) {
        var _this = this;
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
        function (row, index) {
            if (!_this.rowDetail) {
                return 0;
            }
            /** @type {?} */
            var rowHeight = _this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : ((/** @type {?} */ (rowHeight)));
        });
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = (/**
         * @param {?} index
         * @param {?} row
         * @return {?}
         */
        function (index, row) {
            /** @type {?} */
            var idx = _this.getRowIndex(row);
            if (_this.trackByProp) {
                return row[_this.trackByProp];
            }
            else {
                return idx;
            }
        });
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageSize;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rows;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._rows = val;
            this.rowExpansions.clear();
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
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
            /** @type {?} */
            var colsByPin = columnsByPin(val);
            this.columnGroupWidths = columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._offset;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowCount;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._bodyHeight;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         */
        get: /**
         * Returns if selection is enabled.
         * @return {?}
         */
        function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         * @return {?}
         */
        function () {
            if (this.scrollbarV && this.virtualization && this.rowCount) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
            // avoid TS7030: Not all code paths return a value.
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     */
    /**
     * Called after the constructor, initializing input properties
     * @return {?}
     */
    DataTableBodyComponent.prototype.ngOnInit = /**
     * Called after the constructor, initializing input properties
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row') {
                    _this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    _this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            }));
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle.subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'group') {
                    _this.toggleRowExpansion(value);
                }
                if (type === 'all') {
                    _this.toggleAllRows(value);
                }
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            }));
        }
    };
    /**
     * Called once, before the instance is destroyed.
     */
    /**
     * Called once, before the instance is destroyed.
     * @return {?}
     */
    DataTableBodyComponent.prototype.ngOnDestroy = /**
     * Called once, before the instance is destroyed.
     * @return {?}
     */
    function () {
        if (this.rowDetail || this.groupHeader) {
            this.listener.unsubscribe();
        }
    };
    /**
     * Updates the Y offset given a new offset.
     */
    /**
     * Updates the Y offset given a new offset.
     * @param {?=} offset
     * @return {?}
     */
    DataTableBodyComponent.prototype.updateOffsetY = /**
     * Updates the Y offset given a new offset.
     * @param {?=} offset
     * @return {?}
     */
    function (offset) {
        // scroller is missing on empty table
        if (!this.scroller) {
            return;
        }
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            /** @type {?} */
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     * @param {?} event
     * @return {?}
     */
    DataTableBodyComponent.prototype.onBodyScroll = /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var scrollYPos = event.scrollYPos;
        /** @type {?} */
        var scrollXPos = event.scrollXPos;
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
    };
    /**
     * Updates the page given a direction.
     */
    /**
     * Updates the page given a direction.
     * @param {?} direction
     * @return {?}
     */
    DataTableBodyComponent.prototype.updatePage = /**
     * Updates the page given a direction.
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        /** @type {?} */
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    /**
     * Updates the rows in the view port
     * @return {?}
     */
    DataTableBodyComponent.prototype.updateRows = /**
     * Updates the rows in the view port
     * @return {?}
     */
    function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        /** @type {?} */
        var rowIndex = first;
        /** @type {?} */
        var idx = 0;
        /** @type {?} */
        var temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            /** @type {?} */
            var maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                /** @type {?} */
                var group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                /** @type {?} */
                var row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     */
    /**
     * Get the row height
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.getRowHeight = /**
     * Get the row height
     * @param {?} row
     * @return {?}
     */
    function (row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return (/** @type {?} */ (this.rowHeight));
    };
    /**
     * @param group the group with all rows
     */
    /**
     * @param {?} group the group with all rows
     * @return {?}
     */
    DataTableBodyComponent.prototype.getGroupHeight = /**
     * @param {?} group the group with all rows
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    /**
     * Calculate row height based on the expanded state of the row.
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = /**
     * Calculate row height based on the expanded state of the row.
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var rowHeight = this.getRowHeight(row);
        /** @type {?} */
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    };
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
     * @param rows the row that needs to be placed in the 2D space.
     * @returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
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
    DataTableBodyComponent.prototype.getRowsStyles = /**
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
    function (rows) {
        /** @type {?} */
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles.width = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            var idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                /** @type {?} */
                var row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            /** @type {?} */
            var pos = this.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * \@memberOf DataTableBodyComponent
     * @return {?} the CSS3 style to be applied
     *
     */
    DataTableBodyComponent.prototype.getBottomSummaryRowStyles = /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * \@memberOf DataTableBodyComponent
     * @return {?} the CSS3 style to be applied
     *
     */
    function () {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        /** @type {?} */
        var styles = { position: 'absolute' };
        /** @type {?} */
        var pos = this.rowHeightsCache.query(this.rows.length - 1);
        translateXY(styles, 0, pos);
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    /**
     * Hides the loading indicator
     * @return {?}
     */
    DataTableBodyComponent.prototype.hideIndicator = /**
     * Hides the loading indicator
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return (_this.loadingIndicator = false); }), 500);
    };
    /**
     * Updates the index of the rows in the viewport
     */
    /**
     * Updates the index of the rows in the viewport
     * @return {?}
     */
    DataTableBodyComponent.prototype.updateIndexes = /**
     * Updates the index of the rows in the viewport
     * @return {?}
     */
    function () {
        /** @type {?} */
        var first = 0;
        /** @type {?} */
        var last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                /** @type {?} */
                var height = parseInt(this.bodyHeight, 0);
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
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     * @return {?}
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     * @return {?}
     */
    function () {
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
    };
    /**
     * Gets the index for the view port
     */
    /**
     * Gets the index for the view port
     * @return {?}
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = /**
     * Gets the index for the view port
     * @return {?}
     */
    function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        /** @type {?} */
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     * @param {?} row
     * @return {?}
     */
    function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        /** @type {?} */
        var expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            /** @type {?} */
            var detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            /** @type {?} */
            var idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param {?} expanded
     * @return {?}
     */
    DataTableBodyComponent.prototype.toggleAllRows = /**
     * Expand/Collapse all the rows no matter what their state is.
     * @param {?} expanded
     * @return {?}
     */
    function (expanded) {
        var e_1, _a;
        // clear prev expansions
        this.rowExpansions.clear();
        /** @type {?} */
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        /** @type {?} */
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        try {
            for (var _b = tslib_1.__values(this.rows), _c = _b.next(); !_c.done; _c = _b.next()) {
                var row = _c.value;
                this.rowExpansions.set(row, rowExpanded);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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
    };
    /**
     * Recalculates the table
     */
    /**
     * Recalculates the table
     * @return {?}
     */
    DataTableBodyComponent.prototype.recalcLayout = /**
     * Recalculates the table
     * @return {?}
     */
    function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    /**
     * Tracks the column
     */
    /**
     * Tracks the column
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    DataTableBodyComponent.prototype.columnTrackingFn = /**
     * Tracks the column
     * @param {?} index
     * @param {?} column
     * @return {?}
     */
    function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    /**
     * Gets the row pinning group styles
     * @param {?} group
     * @return {?}
     */
    DataTableBodyComponent.prototype.stylesByGroup = /**
     * Gets the row pinning group styles
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var widths = this.columnGroupWidths;
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
            var offset = offsetDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.getRowExpanded = /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var e_2, _a;
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            try {
                for (var _b = tslib_1.__values(this.groupedRows), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    this.rowExpansions.set(group, 1);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        /** @type {?} */
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    /**
     * Gets the row index given a row
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.getRowIndex = /**
     * Gets the row index given a row
     * @param {?} row
     * @return {?}
     */
    function (row) {
        return this.rowIndexes.get(row) || 0;
    };
    /**
     * @param {?} row
     * @return {?}
     */
    DataTableBodyComponent.prototype.onTreeAction = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.treeAction.emit({ row: row });
    };
    DataTableBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'datatable-body',
                    template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\"\n    >\n      <datatable-progress *ngIf=\"loadingIndicator\"> </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths?.total\"\n        (scroll)=\"onBodyScroll($event)\"\n      >\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'top'\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\"\n        >\n        </datatable-summary-row>\n        <datatable-row-wrapper\n          [groupedRows]=\"groupedRows\"\n          *ngFor=\"let group of temp; let i = index; trackBy: rowTrackingFn\"\n          [innerWidth]=\"innerWidth\"\n          [ngStyle]=\"getRowsStyles(group)\"\n          [rowDetail]=\"rowDetail\"\n          [groupHeader]=\"groupHeader\"\n          [offsetX]=\"offsetX\"\n          [detailRowHeight]=\"getDetailRowHeight(group[i], i)\"\n          [row]=\"group\"\n          [expanded]=\"getRowExpanded(group)\"\n          [rowIndex]=\"getRowIndex(group[i])\"\n          (rowContextmenu)=\"rowContextmenu.emit($event)\"\n        >\n          <datatable-body-row\n            *ngIf=\"!groupedRows; else groupedRowsTemplate\"\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(group)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"getRowHeight(group)\"\n            [row]=\"group\"\n            [rowIndex]=\"getRowIndex(group)\"\n            [expanded]=\"getRowExpanded(group)\"\n            [rowClass]=\"rowClass\"\n            [displayCheck]=\"displayCheck\"\n            [treeStatus]=\"group.treeStatus\"\n            (treeAction)=\"onTreeAction(group)\"\n            (activate)=\"selector.onActivate($event, indexes.first + i)\"\n          >\n          </datatable-body-row>\n          <ng-template #groupedRowsTemplate>\n            <datatable-body-row\n              *ngFor=\"let row of group.value; let i = index; trackBy: rowTrackingFn\"\n              tabindex=\"-1\"\n              [isSelected]=\"selector.getRowSelected(row)\"\n              [innerWidth]=\"innerWidth\"\n              [offsetX]=\"offsetX\"\n              [columns]=\"columns\"\n              [rowHeight]=\"getRowHeight(row)\"\n              [row]=\"row\"\n              [group]=\"group.value\"\n              [rowIndex]=\"getRowIndex(row)\"\n              [expanded]=\"getRowExpanded(row)\"\n              [rowClass]=\"rowClass\"\n              (activate)=\"selector.onActivate($event, i)\"\n            >\n            </datatable-body-row>\n          </ng-template>\n        </datatable-row-wrapper>\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'bottom'\"\n          [ngStyle]=\"getBottomSummaryRowStyles()\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\"\n        >\n        </datatable-summary-row>\n      </datatable-scroller>\n      <div class=\"empty-row\" *ngIf=\"!rows?.length && !loadingIndicator\" [innerHTML]=\"emptyMessage\"></div>\n    </datatable-selection>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'datatable-body'
                    }
                }] }
    ];
    /** @nocollapse */
    DataTableBodyComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return DataTableBodyComponent;
}());
export { DataTableBodyComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JvZHkvYm9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUNMLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsU0FBUyxFQUdULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQ7SUF3UEU7O09BRUc7SUFDSCxnQ0FBb0IsRUFBcUI7UUFBekMsaUJBVUM7UUFWbUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE1SWhDLGFBQVEsR0FBVSxFQUFFLENBQUM7UUF5RnBCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQWtDLEtBQUssQ0FBQyxDQUFDO1FBQzFFLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXdCN0Qsb0JBQWUsR0FB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Q0FBMkQ7O0lBQzNELHdDQUF5RDs7SUFDekQsOENBQStEOztJQUMvRCxnREFBb0Y7O0lBQ3BGLDRDQUE2RDs7SUFFN0QsMENBQTZFOztJQXNCN0UsaURBQXVEOztJQUN2RCxzQ0FBaUI7O0lBQ2pCLHlDQUFZOztJQUNaLHlDQUFrQjs7SUFDbEIsbURBQXVCOztJQUN2QiwrREFBbUM7O0lBQ25DLCtDQUFtQjs7SUFDbkIsMENBQWM7O0lBQ2QsNENBQTRCOztJQUM1QiwrQ0FBK0I7O0lBRS9CLHVDQUFhOztJQUNiLDZDQUFpQjs7SUFDakIsMENBQWdCOztJQUNoQiwyQ0FBa0I7O0lBQ2xCLHlDQUFnQjs7SUFDaEIsMkNBQWtCOzs7OztJQTRObEIsb0RBTUU7Ozs7O0lBN05VLG9DQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdDaGlsZCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2Nyb2xsZXJDb21wb25lbnQgfSBmcm9tICcuL3Njcm9sbGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb3VzZUV2ZW50IH0gZnJvbSAnLi4vLi4vZXZlbnRzJztcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XG5pbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbkdyb3VwV2lkdGhzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29sdW1uJztcbmltcG9ydCB7IFJvd0hlaWdodENhY2hlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcm93LWhlaWdodC1jYWNoZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGVYWSB9IGZyb20gJy4uLy4uL3V0aWxzL3RyYW5zbGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1ib2R5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGF0YXRhYmxlLXNlbGVjdGlvblxuICAgICAgI3NlbGVjdG9yXG4gICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICBbc2VsZWN0Q2hlY2tdPVwic2VsZWN0Q2hlY2tcIlxuICAgICAgW3NlbGVjdEVuYWJsZWRdPVwic2VsZWN0RW5hYmxlZFwiXG4gICAgICBbc2VsZWN0aW9uVHlwZV09XCJzZWxlY3Rpb25UeXBlXCJcbiAgICAgIFtyb3dJZGVudGl0eV09XCJyb3dJZGVudGl0eVwiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIlxuICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRhdGF0YWJsZS1wcm9ncmVzcyAqbmdJZj1cImxvYWRpbmdJbmRpY2F0b3JcIj4gPC9kYXRhdGFibGUtcHJvZ3Jlc3M+XG4gICAgICA8ZGF0YXRhYmxlLXNjcm9sbGVyXG4gICAgICAgICpuZ0lmPVwicm93cz8ubGVuZ3RoXCJcbiAgICAgICAgW3Njcm9sbGJhclZdPVwic2Nyb2xsYmFyVlwiXG4gICAgICAgIFtzY3JvbGxiYXJIXT1cInNjcm9sbGJhckhcIlxuICAgICAgICBbc2Nyb2xsSGVpZ2h0XT1cInNjcm9sbEhlaWdodFwiXG4gICAgICAgIFtzY3JvbGxXaWR0aF09XCJjb2x1bW5Hcm91cFdpZHRocz8udG90YWxcIlxuICAgICAgICAoc2Nyb2xsKT1cIm9uQm9keVNjcm9sbCgkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPGRhdGF0YWJsZS1zdW1tYXJ5LXJvd1xuICAgICAgICAgICpuZ0lmPVwic3VtbWFyeVJvdyAmJiBzdW1tYXJ5UG9zaXRpb24gPT09ICd0b3AnXCJcbiAgICAgICAgICBbcm93SGVpZ2h0XT1cInN1bW1hcnlIZWlnaHRcIlxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxuICAgICAgICAgIFtyb3dzXT1cInJvd3NcIlxuICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxuICAgICAgICA+XG4gICAgICAgIDwvZGF0YXRhYmxlLXN1bW1hcnktcm93PlxuICAgICAgICA8ZGF0YXRhYmxlLXJvdy13cmFwcGVyXG4gICAgICAgICAgW2dyb3VwZWRSb3dzXT1cImdyb3VwZWRSb3dzXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZ3JvdXAgb2YgdGVtcDsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogcm93VHJhY2tpbmdGblwiXG4gICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXG4gICAgICAgICAgW25nU3R5bGVdPVwiZ2V0Um93c1N0eWxlcyhncm91cClcIlxuICAgICAgICAgIFtyb3dEZXRhaWxdPVwicm93RGV0YWlsXCJcbiAgICAgICAgICBbZ3JvdXBIZWFkZXJdPVwiZ3JvdXBIZWFkZXJcIlxuICAgICAgICAgIFtvZmZzZXRYXT1cIm9mZnNldFhcIlxuICAgICAgICAgIFtkZXRhaWxSb3dIZWlnaHRdPVwiZ2V0RGV0YWlsUm93SGVpZ2h0KGdyb3VwW2ldLCBpKVwiXG4gICAgICAgICAgW3Jvd109XCJncm91cFwiXG4gICAgICAgICAgW2V4cGFuZGVkXT1cImdldFJvd0V4cGFuZGVkKGdyb3VwKVwiXG4gICAgICAgICAgW3Jvd0luZGV4XT1cImdldFJvd0luZGV4KGdyb3VwW2ldKVwiXG4gICAgICAgICAgKHJvd0NvbnRleHRtZW51KT1cInJvd0NvbnRleHRtZW51LmVtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGF0YXRhYmxlLWJvZHktcm93XG4gICAgICAgICAgICAqbmdJZj1cIiFncm91cGVkUm93czsgZWxzZSBncm91cGVkUm93c1RlbXBsYXRlXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgW2lzU2VsZWN0ZWRdPVwic2VsZWN0b3IuZ2V0Um93U2VsZWN0ZWQoZ3JvdXApXCJcbiAgICAgICAgICAgIFtpbm5lcldpZHRoXT1cImlubmVyV2lkdGhcIlxuICAgICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXG4gICAgICAgICAgICBbY29sdW1uc109XCJjb2x1bW5zXCJcbiAgICAgICAgICAgIFtyb3dIZWlnaHRdPVwiZ2V0Um93SGVpZ2h0KGdyb3VwKVwiXG4gICAgICAgICAgICBbcm93XT1cImdyb3VwXCJcbiAgICAgICAgICAgIFtyb3dJbmRleF09XCJnZXRSb3dJbmRleChncm91cClcIlxuICAgICAgICAgICAgW2V4cGFuZGVkXT1cImdldFJvd0V4cGFuZGVkKGdyb3VwKVwiXG4gICAgICAgICAgICBbcm93Q2xhc3NdPVwicm93Q2xhc3NcIlxuICAgICAgICAgICAgW2Rpc3BsYXlDaGVja109XCJkaXNwbGF5Q2hlY2tcIlxuICAgICAgICAgICAgW3RyZWVTdGF0dXNdPVwiZ3JvdXAudHJlZVN0YXR1c1wiXG4gICAgICAgICAgICAodHJlZUFjdGlvbik9XCJvblRyZWVBY3Rpb24oZ3JvdXApXCJcbiAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJzZWxlY3Rvci5vbkFjdGl2YXRlKCRldmVudCwgaW5kZXhlcy5maXJzdCArIGkpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9kYXRhdGFibGUtYm9keS1yb3c+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cGVkUm93c1RlbXBsYXRlPlxuICAgICAgICAgICAgPGRhdGF0YWJsZS1ib2R5LXJvd1xuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93IG9mIGdyb3VwLnZhbHVlOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiByb3dUcmFja2luZ0ZuXCJcbiAgICAgICAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgIFtpc1NlbGVjdGVkXT1cInNlbGVjdG9yLmdldFJvd1NlbGVjdGVkKHJvdylcIlxuICAgICAgICAgICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcbiAgICAgICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXG4gICAgICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxuICAgICAgICAgICAgICBbcm93SGVpZ2h0XT1cImdldFJvd0hlaWdodChyb3cpXCJcbiAgICAgICAgICAgICAgW3Jvd109XCJyb3dcIlxuICAgICAgICAgICAgICBbZ3JvdXBdPVwiZ3JvdXAudmFsdWVcIlxuICAgICAgICAgICAgICBbcm93SW5kZXhdPVwiZ2V0Um93SW5kZXgocm93KVwiXG4gICAgICAgICAgICAgIFtleHBhbmRlZF09XCJnZXRSb3dFeHBhbmRlZChyb3cpXCJcbiAgICAgICAgICAgICAgW3Jvd0NsYXNzXT1cInJvd0NsYXNzXCJcbiAgICAgICAgICAgICAgKGFjdGl2YXRlKT1cInNlbGVjdG9yLm9uQWN0aXZhdGUoJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2RhdGF0YWJsZS1ib2R5LXJvdz5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2RhdGF0YWJsZS1yb3ctd3JhcHBlcj5cbiAgICAgICAgPGRhdGF0YWJsZS1zdW1tYXJ5LXJvd1xuICAgICAgICAgICpuZ0lmPVwic3VtbWFyeVJvdyAmJiBzdW1tYXJ5UG9zaXRpb24gPT09ICdib3R0b20nXCJcbiAgICAgICAgICBbbmdTdHlsZV09XCJnZXRCb3R0b21TdW1tYXJ5Um93U3R5bGVzKClcIlxuICAgICAgICAgIFtyb3dIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXG4gICAgICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXG4gICAgICAgICAgW2lubmVyV2lkdGhdPVwiaW5uZXJXaWR0aFwiXG4gICAgICAgICAgW3Jvd3NdPVwicm93c1wiXG4gICAgICAgICAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXG4gICAgICAgID5cbiAgICAgICAgPC9kYXRhdGFibGUtc3VtbWFyeS1yb3c+XG4gICAgICA8L2RhdGF0YWJsZS1zY3JvbGxlcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1yb3dcIiAqbmdJZj1cIiFyb3dzPy5sZW5ndGggJiYgIWxvYWRpbmdJbmRpY2F0b3JcIiBbaW5uZXJIVE1MXT1cImVtcHR5TWVzc2FnZVwiPjwvZGl2PlxuICAgIDwvZGF0YXRhYmxlLXNlbGVjdGlvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1ib2R5J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHNjcm9sbGJhclY6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNjcm9sbGJhckg6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxvYWRpbmdJbmRpY2F0b3I6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGV4dGVybmFsUGFnaW5nOiBib29sZWFuO1xuICBASW5wdXQoKSByb3dIZWlnaHQ6IG51bWJlciB8ICdhdXRvJyB8ICgocm93PzogYW55KSA9PiBudW1iZXIpO1xuICBASW5wdXQoKSBvZmZzZXRYOiBudW1iZXI7XG4gIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYW55W10gPSBbXTtcbiAgQElucHV0KCkgcm93SWRlbnRpdHk6IGFueTtcbiAgQElucHV0KCkgcm93RGV0YWlsOiBhbnk7XG4gIEBJbnB1dCgpIGdyb3VwSGVhZGVyOiBhbnk7XG4gIEBJbnB1dCgpIHNlbGVjdENoZWNrOiBhbnk7XG4gIEBJbnB1dCgpIGRpc3BsYXlDaGVjazogYW55O1xuICBASW5wdXQoKSB0cmFja0J5UHJvcDogc3RyaW5nO1xuICBASW5wdXQoKSByb3dDbGFzczogYW55O1xuICBASW5wdXQoKSBncm91cGVkUm93czogYW55O1xuICBASW5wdXQoKSBncm91cEV4cGFuc2lvbkRlZmF1bHQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlubmVyV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgZ3JvdXBSb3dzQnk6IHN0cmluZztcbiAgQElucHV0KCkgdmlydHVhbGl6YXRpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1bW1hcnlSb3c6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1bW1hcnlQb3NpdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgc2V0IHBhZ2VTaXplKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcGFnZVNpemUgPSB2YWw7XG4gICAgdGhpcy5yZWNhbGNMYXlvdXQoKTtcbiAgfVxuXG4gIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCByb3dzKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9yb3dzID0gdmFsO1xuICAgIHRoaXMucm93RXhwYW5zaW9ucy5jbGVhcigpO1xuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XG4gIH1cblxuICBnZXQgcm93cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgY29sdW1ucyh2YWw6IGFueVtdKSB7XG4gICAgdGhpcy5fY29sdW1ucyA9IHZhbDtcbiAgICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odmFsKTtcbiAgICB0aGlzLmNvbHVtbkdyb3VwV2lkdGhzID0gY29sdW1uR3JvdXBXaWR0aHMoY29sc0J5UGluLCB2YWwpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbnMoKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG9mZnNldCh2YWw6IG51bWJlcikge1xuICAgIHRoaXMuX29mZnNldCA9IHZhbDtcbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xuICB9XG5cbiAgZ2V0IG9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcm93Q291bnQodmFsOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yb3dDb3VudCA9IHZhbDtcbiAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xuICB9XG5cbiAgZ2V0IHJvd0NvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0NvdW50O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpXG4gIGdldCBib2R5V2lkdGgoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zY3JvbGxiYXJIKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lcldpZHRoICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcxMDAlJztcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpXG4gIHNldCBib2R5SGVpZ2h0KHZhbCkge1xuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgIHRoaXMuX2JvZHlIZWlnaHQgPSB2YWwgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ib2R5SGVpZ2h0ID0gJ2F1dG8nO1xuICAgIH1cblxuICAgIHRoaXMucmVjYWxjTGF5b3V0KCk7XG4gIH1cblxuICBnZXQgYm9keUhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYm9keUhlaWdodDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzY3JvbGw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGV0YWlsVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJvd0NvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyByb3c6IGFueSB9PihmYWxzZSk7XG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFNjcm9sbGVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsZXI6IFNjcm9sbGVyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHNlbGVjdGlvbiBpcyBlbmFibGVkLlxuICAgKi9cbiAgZ2V0IHNlbGVjdEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zZWxlY3Rpb25UeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BlcnR5IHRoYXQgd291bGQgY2FsY3VsYXRlIHRoZSBoZWlnaHQgb2Ygc2Nyb2xsIGJhclxuICAgKiBiYXNlZCBvbiB0aGUgcm93IGhlaWdodHMgY2FjaGUgZm9yIHZpcnR1YWwgc2Nyb2xsIGFuZCB2aXJ0dWFsaXphdGlvbi4gT3RoZXIgc2NlbmFyaW9zXG4gICAqIGNhbGN1bGF0ZSBzY3JvbGwgaGVpZ2h0IGF1dG9tYXRpY2FsbHkgKGFzIGhlaWdodCB3aWxsIGJlIHVuZGVmaW5lZCkuXG4gICAqL1xuICBnZXQgc2Nyb2xsSGVpZ2h0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uICYmIHRoaXMucm93Q291bnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeSh0aGlzLnJvd0NvdW50IC0gMSk7XG4gICAgfVxuICAgIC8vIGF2b2lkIFRTNzAzMDogTm90IGFsbCBjb2RlIHBhdGhzIHJldHVybiBhIHZhbHVlLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByb3dIZWlnaHRzQ2FjaGU6IFJvd0hlaWdodENhY2hlID0gbmV3IFJvd0hlaWdodENhY2hlKCk7XG4gIHRlbXA6IGFueVtdID0gW107XG4gIG9mZnNldFkgPSAwO1xuICBpbmRleGVzOiBhbnkgPSB7fTtcbiAgY29sdW1uR3JvdXBXaWR0aHM6IGFueTtcbiAgY29sdW1uR3JvdXBXaWR0aHNXaXRob3V0R3JvdXA6IGFueTtcbiAgcm93VHJhY2tpbmdGbjogYW55O1xuICBsaXN0ZW5lcjogYW55O1xuICByb3dJbmRleGVzOiBhbnkgPSBuZXcgTWFwKCk7XG4gIHJvd0V4cGFuc2lvbnM6IGFueSA9IG5ldyBNYXAoKTtcblxuICBfcm93czogYW55W107XG4gIF9ib2R5SGVpZ2h0OiBhbnk7XG4gIF9jb2x1bW5zOiBhbnlbXTtcbiAgX3Jvd0NvdW50OiBudW1iZXI7XG4gIF9vZmZzZXQ6IG51bWJlcjtcbiAgX3BhZ2VTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0YVRhYmxlQm9keUNvbXBvbmVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgLy8gZGVjbGFyZSBmbiBoZXJlIHNvIHdlIGNhbiBnZXQgYWNjZXNzIHRvIHRoZSBgdGhpc2AgcHJvcGVydHlcbiAgICB0aGlzLnJvd1RyYWNraW5nRm4gPSAoaW5kZXg6IG51bWJlciwgcm93OiBhbnkpOiBhbnkgPT4ge1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSb3dJbmRleChyb3cpO1xuICAgICAgaWYgKHRoaXMudHJhY2tCeVByb3ApIHtcbiAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnRyYWNrQnlQcm9wXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yLCBpbml0aWFsaXppbmcgaW5wdXQgcHJvcGVydGllc1xuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm93RGV0YWlsKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gdGhpcy5yb3dEZXRhaWwudG9nZ2xlLnN1YnNjcmliZSgoeyB0eXBlLCB2YWx1ZSB9OiB7IHR5cGU6IHN0cmluZzsgdmFsdWU6IGFueSB9KSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSAncm93Jykge1xuICAgICAgICAgIHRoaXMudG9nZ2xlUm93RXhwYW5zaW9uKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUFsbFJvd3ModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVmcmVzaCByb3dzIGFmdGVyIHRvZ2dsZVxuICAgICAgICAvLyBGaXhlcyAjODgzXG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJvd3MoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdyb3VwSGVhZGVyKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyID0gdGhpcy5ncm91cEhlYWRlci50b2dnbGUuc3Vic2NyaWJlKCh7IHR5cGUsIHZhbHVlIH06IHsgdHlwZTogc3RyaW5nOyB2YWx1ZTogYW55IH0pID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVJvd0V4cGFuc2lvbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVBbGxSb3dzKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZnJlc2ggcm93cyBhZnRlciB0b2dnbGVcbiAgICAgICAgLy8gRml4ZXMgIzg4M1xuICAgICAgICB0aGlzLnVwZGF0ZUluZGV4ZXMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVSb3dzKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIG9uY2UsIGJlZm9yZSB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkLlxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm93RGV0YWlsIHx8IHRoaXMuZ3JvdXBIZWFkZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgWSBvZmZzZXQgZ2l2ZW4gYSBuZXcgb2Zmc2V0LlxuICAgKi9cbiAgdXBkYXRlT2Zmc2V0WShvZmZzZXQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBzY3JvbGxlciBpcyBtaXNzaW5nIG9uIGVtcHR5IHRhYmxlXG4gICAgaWYgKCF0aGlzLnNjcm9sbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uICYmIG9mZnNldCkge1xuICAgICAgLy8gRmlyc3QgZ2V0IHRoZSByb3cgSW5kZXggdGhhdCB3ZSBuZWVkIHRvIG1vdmUgdG8uXG4gICAgICBjb25zdCByb3dJbmRleCA9IHRoaXMucGFnZVNpemUgKiBvZmZzZXQ7XG4gICAgICBvZmZzZXQgPSB0aGlzLnJvd0hlaWdodHNDYWNoZS5xdWVyeShyb3dJbmRleCAtIDEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY3JvbGxiYXJWICYmICF0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsZXIuc2V0T2Zmc2V0KG9mZnNldCB8fCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCb2R5IHdhcyBzY3JvbGxlZCwgdGhpcyBpcyBtYWlubHkgdXNlZnVsIGZvclxuICAgKiB3aGVuIGEgdXNlciBpcyBzZXJ2ZXItc2lkZSBwYWdpbmF0aW9uIHZpYSB2aXJ0dWFsIHNjcm9sbC5cbiAgICovXG4gIG9uQm9keVNjcm9sbChldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsWVBvczogbnVtYmVyID0gZXZlbnQuc2Nyb2xsWVBvcztcbiAgICBjb25zdCBzY3JvbGxYUG9zOiBudW1iZXIgPSBldmVudC5zY3JvbGxYUG9zO1xuXG4gICAgLy8gaWYgc2Nyb2xsIGNoYW5nZSwgdHJpZ2dlciB1cGRhdGVcbiAgICAvLyB0aGlzIGlzIG1haW5seSB1c2VkIGZvciBoZWFkZXIgY2VsbCBwb3NpdGlvbnNcbiAgICBpZiAodGhpcy5vZmZzZXRZICE9PSBzY3JvbGxZUG9zIHx8IHRoaXMub2Zmc2V0WCAhPT0gc2Nyb2xsWFBvcykge1xuICAgICAgdGhpcy5zY3JvbGwuZW1pdCh7XG4gICAgICAgIG9mZnNldFk6IHNjcm9sbFlQb3MsXG4gICAgICAgIG9mZnNldFg6IHNjcm9sbFhQb3NcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0WSA9IHNjcm9sbFlQb3M7XG4gICAgdGhpcy5vZmZzZXRYID0gc2Nyb2xsWFBvcztcblxuICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgIHRoaXMudXBkYXRlUGFnZShldmVudC5kaXJlY3Rpb24pO1xuICAgIHRoaXMudXBkYXRlUm93cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHBhZ2UgZ2l2ZW4gYSBkaXJlY3Rpb24uXG4gICAqL1xuICB1cGRhdGVQYWdlKGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IG9mZnNldCA9IHRoaXMuaW5kZXhlcy5maXJzdCAvIHRoaXMucGFnZVNpemU7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICBvZmZzZXQgPSBNYXRoLmNlaWwob2Zmc2V0KTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICBvZmZzZXQgPSBNYXRoLmZsb29yKG9mZnNldCk7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkICYmICFpc05hTihvZmZzZXQpKSB7XG4gICAgICB0aGlzLnBhZ2UuZW1pdCh7IG9mZnNldCB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcm93cyBpbiB0aGUgdmlldyBwb3J0XG4gICAqL1xuICB1cGRhdGVSb3dzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZmlyc3QsIGxhc3QgfSA9IHRoaXMuaW5kZXhlcztcbiAgICBsZXQgcm93SW5kZXggPSBmaXJzdDtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBjb25zdCB0ZW1wOiBhbnlbXSA9IFtdO1xuXG4gICAgdGhpcy5yb3dJbmRleGVzLmNsZWFyKCk7XG5cbiAgICAvLyBpZiBncm91cHJvd3NieSBoYXMgYmVlbiBzcGVjaWZpZWQgdHJlYXQgcm93IHBhZ2luZ1xuICAgIC8vIHBhcmFtZXRlcnMgYXMgZ3JvdXAgcGFnaW5nIHBhcmFtZXRlcnMgaWUgaWYgbGltaXQgMTAgaGFzIGJlZW5cbiAgICAvLyBzcGVjaWZpZWQgdHJlYXQgaXQgYXMgMTAgZ3JvdXBzIHJhdGhlciB0aGFuIDEwIHJvd3NcbiAgICBpZiAodGhpcy5ncm91cGVkUm93cykge1xuICAgICAgbGV0IG1heFJvd3NQZXJHcm91cCA9IDM7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBncm91cCBzZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mXG4gICAgICAvLyByb3dzIHBlciBncm91cCB0aGUgc2FtZSBhcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3NcbiAgICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtYXhSb3dzUGVyR3JvdXAgPSB0aGlzLmdyb3VwZWRSb3dzWzBdLnZhbHVlLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHJvd0luZGV4IDwgbGFzdCAmJiByb3dJbmRleCA8IHRoaXMuZ3JvdXBlZFJvd3MubGVuZ3RoKSB7XG4gICAgICAgIC8vIEFkZCB0aGUgZ3JvdXBzIGludG8gdGhpcyBwYWdlXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ncm91cGVkUm93c1tyb3dJbmRleF07XG4gICAgICAgIHRlbXBbaWR4XSA9IGdyb3VwO1xuICAgICAgICBpZHgrKztcblxuICAgICAgICAvLyBHcm91cCBpbmRleCBpbiB0aGlzIGNvbnRleHRcbiAgICAgICAgcm93SW5kZXgrKztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHJvd0luZGV4IDwgbGFzdCAmJiByb3dJbmRleCA8IHRoaXMucm93Q291bnQpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5yb3dzW3Jvd0luZGV4XTtcblxuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgdGhpcy5yb3dJbmRleGVzLnNldChyb3csIHJvd0luZGV4KTtcbiAgICAgICAgICB0ZW1wW2lkeF0gPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZHgrKztcbiAgICAgICAgcm93SW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRlbXAgPSB0ZW1wO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcm93IGhlaWdodFxuICAgKi9cbiAgZ2V0Um93SGVpZ2h0KHJvdzogYW55KTogbnVtYmVyIHtcbiAgICAvLyBpZiBpdHMgYSBmdW5jdGlvbiByZXR1cm4gaXRcbiAgICBpZiAodHlwZW9mIHRoaXMucm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yb3dIZWlnaHQgYXMgbnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBncm91cCB0aGUgZ3JvdXAgd2l0aCBhbGwgcm93c1xuICAgKi9cbiAgZ2V0R3JvdXBIZWlnaHQoZ3JvdXA6IGFueSk6IG51bWJlciB7XG4gICAgbGV0IHJvd0hlaWdodCA9IDA7XG5cbiAgICBpZiAoZ3JvdXAudmFsdWUpIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBncm91cC52YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgcm93SGVpZ2h0ICs9IHRoaXMuZ2V0Um93QW5kRGV0YWlsSGVpZ2h0KGdyb3VwLnZhbHVlW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd0hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgcm93IGhlaWdodCBiYXNlZCBvbiB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIHJvdy5cbiAgICovXG4gIGdldFJvd0FuZERldGFpbEhlaWdodChyb3c6IGFueSk6IG51bWJlciB7XG4gICAgbGV0IHJvd0hlaWdodCA9IHRoaXMuZ2V0Um93SGVpZ2h0KHJvdyk7XG4gICAgY29uc3QgZXhwYW5kZWQgPSB0aGlzLnJvd0V4cGFuc2lvbnMuZ2V0KHJvdyk7XG5cbiAgICAvLyBBZGRpbmcgZGV0YWlsIHJvdyBoZWlnaHQgaWYgaXRzIGV4cGFuZGVkLlxuICAgIGlmIChleHBhbmRlZCA9PT0gMSkge1xuICAgICAgcm93SGVpZ2h0ICs9IHRoaXMuZ2V0RGV0YWlsUm93SGVpZ2h0KHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd0hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlaWdodCBvZiB0aGUgZGV0YWlsIHJvdy5cbiAgICovXG4gIGdldERldGFpbFJvd0hlaWdodCA9IChyb3c/OiBhbnksIGluZGV4PzogYW55KTogbnVtYmVyID0+IHtcbiAgICBpZiAoIXRoaXMucm93RGV0YWlsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgY29uc3Qgcm93SGVpZ2h0ID0gdGhpcy5yb3dEZXRhaWwucm93SGVpZ2h0O1xuICAgIHJldHVybiB0eXBlb2Ygcm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nID8gcm93SGVpZ2h0KHJvdywgaW5kZXgpIDogKHJvd0hlaWdodCBhcyBudW1iZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzdHlsZXMgZm9yIHRoZSByb3cgc28gdGhhdCB0aGUgcm93cyBjYW4gYmUgbW92ZWQgaW4gMkQgc3BhY2VcbiAgICogZHVyaW5nIHZpcnR1YWwgc2Nyb2xsIGluc2lkZSB0aGUgRE9NLiAgIEluIHRoZSBiZWxvdyBjYXNlIHRoZSBZIHBvc2l0aW9uIGlzXG4gICAqIG1hbmlwdWxhdGVkLiAgIEFzIGFuIGV4YW1wbGUsIGlmIHRoZSBoZWlnaHQgb2Ygcm93IDAgaXMgMzAgcHggYW5kIHJvdyAxIGlzXG4gICAqIDEwMCBweCB0aGVuIGZvbGxvd2luZyBzdHlsZXMgYXJlIGdlbmVyYXRlZDpcbiAgICpcbiAgICogdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTsgICAgLT4gIHJvdzBcbiAgICogdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDMwcHgsIDBweCk7ICAgLT4gIHJvdzFcbiAgICogdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDEzMHB4LCAwcHgpOyAgLT4gIHJvdzJcbiAgICpcbiAgICogUm93IGhlaWdodHMgaGF2ZSB0byBiZSBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSByb3cgaGVpZ2h0cyBjYWNoZSBhcyB3ZSB3b250XG4gICAqIGJlIGFibGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHJvdyBpcyBvZiB3aGF0IGhlaWdodCBiZWZvcmUgaGFuZC4gIEluIHRoZSBhYm92ZVxuICAgKiBjYXNlIHRoZSBwb3NpdGlvblkgb2YgdGhlIHRyYW5zbGF0ZTNkIGZvciByb3cyIHdvdWxkIGJlIHRoZSBzdW0gb2YgYWxsIHRoZVxuICAgKiBoZWlnaHRzIG9mIHRoZSByb3dzIGJlZm9yZSBpdCAoaS5lLiByb3cwIGFuZCByb3cxKS5cbiAgICpcbiAgICogQHBhcmFtIHJvd3MgdGhlIHJvdyB0aGF0IG5lZWRzIHRvIGJlIHBsYWNlZCBpbiB0aGUgMkQgc3BhY2UuXG4gICAqIEByZXR1cm5zIHRoZSBDU1MzIHN0eWxlIHRvIGJlIGFwcGxpZWRcbiAgICpcbiAgICogQG1lbWJlck9mIERhdGFUYWJsZUJvZHlDb21wb25lbnRcbiAgICovXG4gIGdldFJvd3NTdHlsZXMocm93czogYW55KTogYW55IHtcbiAgICBjb25zdCBzdHlsZXM6IGFueSA9IHt9O1xuXG4gICAgLy8gb25seSBhZGQgc3R5bGVzIGZvciB0aGUgZ3JvdXAgaWYgdGhlcmUgaXMgYSBncm91cFxuICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XG4gICAgICBzdHlsZXMud2lkdGggPSB0aGlzLmNvbHVtbkdyb3VwV2lkdGhzLnRvdGFsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgIGlmICh0aGlzLmdyb3VwZWRSb3dzKSB7XG4gICAgICAgIC8vIEdldCB0aGUgbGF0ZXN0IHJvdyByb3dpbmRleCBpbiBhIGdyb3VwXG4gICAgICAgIGNvbnN0IHJvdyA9IHJvd3Nbcm93cy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWR4ID0gcm93ID8gdGhpcy5nZXRSb3dJbmRleChyb3cpIDogMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IHRoaXMuZ2V0Um93SW5kZXgocm93cyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnN0IHBvcyA9IGlkeCAqIHJvd0hlaWdodDtcbiAgICAgIC8vIFRoZSBwb3NpdGlvbiBvZiB0aGlzIHJvdyB3b3VsZCBiZSB0aGUgc3VtIG9mIGFsbCByb3cgaGVpZ2h0c1xuICAgICAgLy8gdW50aWwgdGhlIHByZXZpb3VzIHJvdyBwb3NpdGlvbi5cbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLnF1ZXJ5KGlkeCAtIDEpO1xuXG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIDAsIHBvcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYm90dG9tIHN1bW1hcnkgcm93IG9mZnNldCBmb3Igc2Nyb2xsYmFyIG1vZGUuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGNhY2hlIGFuZCBvZmZzZXQgY2FsY3VsYXRpb25cbiAgICogc2VlIGRlc2NyaXB0aW9uIGZvciBgZ2V0Um93c1N0eWxlc2AgbWV0aG9kXG4gICAqXG4gICAqIEByZXR1cm5zIHRoZSBDU1MzIHN0eWxlIHRvIGJlIGFwcGxpZWRcbiAgICpcbiAgICogQG1lbWJlck9mIERhdGFUYWJsZUJvZHlDb21wb25lbnRcbiAgICovXG4gIGdldEJvdHRvbVN1bW1hcnlSb3dTdHlsZXMoKTogYW55IHtcbiAgICBpZiAoIXRoaXMuc2Nyb2xsYmFyViB8fCAhdGhpcy5yb3dzIHx8ICF0aGlzLnJvd3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH07XG4gICAgY29uc3QgcG9zID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkodGhpcy5yb3dzLmxlbmd0aCAtIDEpO1xuXG4gICAgdHJhbnNsYXRlWFkoc3R5bGVzLCAwLCBwb3MpO1xuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICovXG4gIGhpZGVJbmRpY2F0b3IoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5sb2FkaW5nSW5kaWNhdG9yID0gZmFsc2UpLCA1MDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGluZGV4IG9mIHRoZSByb3dzIGluIHRoZSB2aWV3cG9ydFxuICAgKi9cbiAgdXBkYXRlSW5kZXhlcygpOiB2b2lkIHtcbiAgICBsZXQgZmlyc3QgPSAwO1xuICAgIGxldCBsYXN0ID0gMDtcblxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYpIHtcbiAgICAgIGlmICh0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICAgIC8vIENhbGN1bGF0aW9uIG9mIHRoZSBmaXJzdCBhbmQgbGFzdCBpbmRleGVzIHdpbGwgYmUgYmFzZWQgb24gd2hlcmUgdGhlXG4gICAgICAgIC8vIHNjcm9sbFkgcG9zaXRpb24gd291bGQgYmUgYXQuICBUaGUgbGFzdCBpbmRleCB3b3VsZCBiZSB0aGUgb25lXG4gICAgICAgIC8vIHRoYXQgc2hvd3MgdXAgaW5zaWRlIHRoZSB2aWV3IHBvcnQgdGhlIGxhc3QuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlSW50KHRoaXMuYm9keUhlaWdodCwgMCk7XG4gICAgICAgIGZpcnN0ID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUuZ2V0Um93SW5kZXgodGhpcy5vZmZzZXRZKTtcbiAgICAgICAgbGFzdCA9IHRoaXMucm93SGVpZ2h0c0NhY2hlLmdldFJvd0luZGV4KGhlaWdodCArIHRoaXMub2Zmc2V0WSkgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdmlydHVhbCByb3dzIGFyZSBub3QgbmVlZGVkXG4gICAgICAgIC8vIFdlIHJlbmRlciBhbGwgaW4gb25lIGdvXG4gICAgICAgIGZpcnN0ID0gMDtcbiAgICAgICAgbGFzdCA9IHRoaXMucm93Q291bnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSBzZXJ2ZXIgaXMgaGFuZGxpbmcgcGFnaW5nIGFuZCB3aWxsIHBhc3MgYW4gYXJyYXkgdGhhdCBiZWdpbnMgd2l0aCB0aGVcbiAgICAgIC8vIGVsZW1lbnQgYXQgYSBzcGVjaWZpZWQgb2Zmc2V0LiAgZmlyc3Qgc2hvdWxkIGFsd2F5cyBiZSAwIHdpdGggZXh0ZXJuYWwgcGFnaW5nLlxuICAgICAgaWYgKCF0aGlzLmV4dGVybmFsUGFnaW5nKSB7XG4gICAgICAgIGZpcnN0ID0gTWF0aC5tYXgodGhpcy5vZmZzZXQgKiB0aGlzLnBhZ2VTaXplLCAwKTtcbiAgICAgIH1cbiAgICAgIGxhc3QgPSBNYXRoLm1pbihmaXJzdCArIHRoaXMucGFnZVNpemUsIHRoaXMucm93Q291bnQpO1xuICAgIH1cblxuICAgIHRoaXMuaW5kZXhlcyA9IHsgZmlyc3QsIGxhc3QgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGZ1bGwgUm93IEhlaWdodCBjYWNoZS4gIFNob3VsZCBiZSB1c2VkXG4gICAqIHdoZW4gdGhlIGVudGlyZSByb3cgYXJyYXkgc3RhdGUgaGFzIGNoYW5nZWQuXG4gICAqL1xuICByZWZyZXNoUm93SGVpZ2h0Q2FjaGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNjcm9sbGJhclYgfHwgKHRoaXMuc2Nyb2xsYmFyViAmJiAhdGhpcy52aXJ0dWFsaXphdGlvbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgcm93IGhlaWdodCBjYWNoZSBpZiBhbHJlYWR5IHByZXNlbnQuXG4gICAgLy8gdGhpcyBpcyB1c2VmdWwgZHVyaW5nIHNvcnRzLCBmaWx0ZXJzIHdoZXJlIHRoZSBzdGF0ZSBvZiB0aGVcbiAgICAvLyByb3dzIGFycmF5IGlzIGNoYW5nZWQuXG4gICAgdGhpcy5yb3dIZWlnaHRzQ2FjaGUuY2xlYXJDYWNoZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdHJlZSBvbmx5IGlmIHRoZXJlIGFyZSByb3dzIGluc2lkZSB0aGUgdHJlZS5cbiAgICBpZiAodGhpcy5yb3dzICYmIHRoaXMucm93cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucm93SGVpZ2h0c0NhY2hlLmluaXRDYWNoZSh7XG4gICAgICAgIHJvd3M6IHRoaXMucm93cyxcbiAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcbiAgICAgICAgZGV0YWlsUm93SGVpZ2h0OiB0aGlzLmdldERldGFpbFJvd0hlaWdodCxcbiAgICAgICAgZXh0ZXJuYWxWaXJ0dWFsOiB0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy5leHRlcm5hbFBhZ2luZyxcbiAgICAgICAgcm93Q291bnQ6IHRoaXMucm93Q291bnQsXG4gICAgICAgIHJvd0luZGV4ZXM6IHRoaXMucm93SW5kZXhlcyxcbiAgICAgICAgcm93RXhwYW5zaW9uczogdGhpcy5yb3dFeHBhbnNpb25zXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaW5kZXggZm9yIHRoZSB2aWV3IHBvcnRcbiAgICovXG4gIGdldEFkanVzdGVkVmlld1BvcnRJbmRleCgpOiBudW1iZXIge1xuICAgIC8vIENhcHR1cmUgdGhlIHJvdyBpbmRleCBvZiB0aGUgZmlyc3Qgcm93IHRoYXQgaXMgdmlzaWJsZSBvbiB0aGUgdmlld3BvcnQuXG4gICAgLy8gSWYgdGhlIHNjcm9sbCBiYXIgaXMganVzdCBiZWxvdyB0aGUgcm93IHdoaWNoIGlzIGhpZ2hsaWdodGVkIHRoZW4gbWFrZSB0aGF0IGFzIHRoZVxuICAgIC8vIGZpcnN0IGluZGV4LlxuICAgIGNvbnN0IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCA9IHRoaXMuaW5kZXhlcy5maXJzdDtcblxuICAgIGlmICh0aGlzLnNjcm9sbGJhclYgJiYgdGhpcy52aXJ0dWFsaXphdGlvbikge1xuICAgICAgY29uc3Qgb2Zmc2V0U2Nyb2xsID0gdGhpcy5yb3dIZWlnaHRzQ2FjaGUucXVlcnkodmlld1BvcnRGaXJzdFJvd0luZGV4IC0gMSk7XG4gICAgICByZXR1cm4gb2Zmc2V0U2Nyb2xsIDw9IHRoaXMub2Zmc2V0WSA/IHZpZXdQb3J0Rmlyc3RSb3dJbmRleCAtIDEgOiB2aWV3UG9ydEZpcnN0Um93SW5kZXg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXdQb3J0Rmlyc3RSb3dJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgdGhlIEV4cGFuc2lvbiBvZiB0aGUgcm93IGkuZS4gaWYgdGhlIHJvdyBpcyBleHBhbmRlZCB0aGVuIGl0IHdpbGxcbiAgICogY29sbGFwc2UgYW5kIHZpY2UgdmVyc2EuICAgTm90ZSB0aGF0IHRoZSBleHBhbmRlZCBzdGF0dXMgaXMgc3RvcmVkIGFzXG4gICAqIGEgcGFydCBvZiB0aGUgcm93IG9iamVjdCBpdHNlbGYgYXMgd2UgaGF2ZSB0byBwcmVzZXJ2ZSB0aGUgZXhwYW5kZWQgcm93XG4gICAqIHN0YXR1cyBpbiBjYXNlIG9mIHNvcnRpbmcgYW5kIGZpbHRlcmluZyBvZiB0aGUgcm93IHNldC5cbiAgICovXG4gIHRvZ2dsZVJvd0V4cGFuc2lvbihyb3c6IGFueSk6IHZvaWQge1xuICAgIC8vIENhcHR1cmUgdGhlIHJvdyBpbmRleCBvZiB0aGUgZmlyc3Qgcm93IHRoYXQgaXMgdmlzaWJsZSBvbiB0aGUgdmlld3BvcnQuXG4gICAgY29uc3Qgdmlld1BvcnRGaXJzdFJvd0luZGV4ID0gdGhpcy5nZXRBZGp1c3RlZFZpZXdQb3J0SW5kZXgoKTtcbiAgICBsZXQgZXhwYW5kZWQgPSB0aGlzLnJvd0V4cGFuc2lvbnMuZ2V0KHJvdyk7XG5cbiAgICAvLyBJZiB0aGUgZGV0YWlsUm93SGVpZ2h0IGlzIGF1dG8gLS0+IG9ubHkgaW4gY2FzZSBvZiBub24tdmlydHVhbGl6ZWQgc2Nyb2xsXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViAmJiB0aGlzLnZpcnR1YWxpemF0aW9uKSB7XG4gICAgICBjb25zdCBkZXRhaWxSb3dIZWlnaHQgPSB0aGlzLmdldERldGFpbFJvd0hlaWdodChyb3cpICogKGV4cGFuZGVkID8gLTEgOiAxKTtcbiAgICAgIC8vIGNvbnN0IGlkeCA9IHRoaXMucm93SW5kZXhlcy5nZXQocm93KSB8fCAwO1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSb3dJbmRleChyb3cpO1xuICAgICAgdGhpcy5yb3dIZWlnaHRzQ2FjaGUudXBkYXRlKGlkeCwgZGV0YWlsUm93SGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIHRvZ2dsZWQgcm93IGFuZCB1cGRhdGUgdGhpdmUgbmV2ZXJlIGhlaWdodHMgaW4gdGhlIGNhY2hlLlxuICAgIGV4cGFuZGVkID0gZXhwYW5kZWQgXj0gMTtcbiAgICB0aGlzLnJvd0V4cGFuc2lvbnMuc2V0KHJvdywgZXhwYW5kZWQpO1xuXG4gICAgdGhpcy5kZXRhaWxUb2dnbGUuZW1pdCh7XG4gICAgICByb3dzOiBbcm93XSxcbiAgICAgIGN1cnJlbnRJbmRleDogdmlld1BvcnRGaXJzdFJvd0luZGV4XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhwYW5kL0NvbGxhcHNlIGFsbCB0aGUgcm93cyBubyBtYXR0ZXIgd2hhdCB0aGVpciBzdGF0ZSBpcy5cbiAgICovXG4gIHRvZ2dsZUFsbFJvd3MoZXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBjbGVhciBwcmV2IGV4cGFuc2lvbnNcbiAgICB0aGlzLnJvd0V4cGFuc2lvbnMuY2xlYXIoKTtcblxuICAgIGNvbnN0IHJvd0V4cGFuZGVkID0gZXhwYW5kZWQgPyAxIDogMDtcblxuICAgIC8vIENhcHR1cmUgdGhlIHJvdyBpbmRleCBvZiB0aGUgZmlyc3Qgcm93IHRoYXQgaXMgdmlzaWJsZSBvbiB0aGUgdmlld3BvcnQuXG4gICAgY29uc3Qgdmlld1BvcnRGaXJzdFJvd0luZGV4ID0gdGhpcy5nZXRBZGp1c3RlZFZpZXdQb3J0SW5kZXgoKTtcblxuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMucm93cykge1xuICAgICAgdGhpcy5yb3dFeHBhbnNpb25zLnNldChyb3csIHJvd0V4cGFuZGVkKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY3JvbGxiYXJWKSB7XG4gICAgICAvLyBSZWZyZXNoIHRoZSBmdWxsIHJvdyBoZWlnaHRzIGNhY2hlIHNpbmNlIGV2ZXJ5IHJvdyB3YXMgYWZmZWN0ZWQuXG4gICAgICB0aGlzLnJlY2FsY0xheW91dCgpO1xuICAgIH1cblxuICAgIC8vIEVtaXQgYWxsIHJvd3MgdGhhdCBoYXZlIGJlZW4gZXhwYW5kZWQuXG4gICAgdGhpcy5kZXRhaWxUb2dnbGUuZW1pdCh7XG4gICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICBjdXJyZW50SW5kZXg6IHZpZXdQb3J0Rmlyc3RSb3dJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgdGFibGVcbiAgICovXG4gIHJlY2FsY0xheW91dCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2hSb3dIZWlnaHRDYWNoZSgpO1xuICAgIHRoaXMudXBkYXRlSW5kZXhlcygpO1xuICAgIHRoaXMudXBkYXRlUm93cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrcyB0aGUgY29sdW1uXG4gICAqL1xuICBjb2x1bW5UcmFja2luZ0ZuKGluZGV4OiBudW1iZXIsIGNvbHVtbjogYW55KTogYW55IHtcbiAgICByZXR1cm4gY29sdW1uLiQkaWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm93IHBpbm5pbmcgZ3JvdXAgc3R5bGVzXG4gICAqL1xuICBzdHlsZXNCeUdyb3VwKGdyb3VwOiBzdHJpbmcpIHtcbiAgICBjb25zdCB3aWR0aHMgPSB0aGlzLmNvbHVtbkdyb3VwV2lkdGhzO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLm9mZnNldFg7XG5cbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICB3aWR0aDogYCR7d2lkdGhzW2dyb3VwXX1weGBcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwID09PSAnbGVmdCcpIHtcbiAgICAgIHRyYW5zbGF0ZVhZKHN0eWxlcywgb2Zmc2V0WCwgMCk7XG4gICAgfSBlbHNlIGlmIChncm91cCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgY29uc3QgYm9keVdpZHRoID0gcGFyc2VJbnQodGhpcy5pbm5lcldpZHRoICsgJycsIDApO1xuICAgICAgY29uc3QgdG90YWxEaWZmID0gd2lkdGhzLnRvdGFsIC0gYm9keVdpZHRoO1xuICAgICAgY29uc3Qgb2Zmc2V0RGlmZiA9IHRvdGFsRGlmZiAtIG9mZnNldFg7XG4gICAgICBjb25zdCBvZmZzZXQgPSBvZmZzZXREaWZmICogLTE7XG4gICAgICB0cmFuc2xhdGVYWShzdHlsZXMsIG9mZnNldCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGlmIHRoZSByb3cgd2FzIGV4cGFuZGVkIGFuZCBzZXQgZGVmYXVsdCByb3cgZXhwYW5zaW9uIHdoZW4gcm93IGV4cGFuc2lvbiBpcyBlbXB0eVxuICAgKi9cbiAgZ2V0Um93RXhwYW5kZWQocm93OiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5yb3dFeHBhbnNpb25zLnNpemUgPT09IDAgJiYgdGhpcy5ncm91cEV4cGFuc2lvbkRlZmF1bHQpIHtcbiAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgdGhpcy5ncm91cGVkUm93cykge1xuICAgICAgICB0aGlzLnJvd0V4cGFuc2lvbnMuc2V0KGdyb3VwLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBleHBhbmRlZCA9IHRoaXMucm93RXhwYW5zaW9ucy5nZXQocm93KTtcbiAgICByZXR1cm4gZXhwYW5kZWQgPT09IDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm93IGluZGV4IGdpdmVuIGEgcm93XG4gICAqL1xuICBnZXRSb3dJbmRleChyb3c6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucm93SW5kZXhlcy5nZXQocm93KSB8fCAwO1xuICB9XG5cbiAgb25UcmVlQWN0aW9uKHJvdzogYW55KSB7XG4gICAgdGhpcy50cmVlQWN0aW9uLmVtaXQoeyByb3cgfSk7XG4gIH1cbn1cbiJdfQ==