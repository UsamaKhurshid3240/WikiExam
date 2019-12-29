/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Column Type
 * @record
 */
export function TableColumn() { }
if (false) {
    /**
     * Internal unique id
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$id;
    /**
     * Internal for column width distributions
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$oldWidth;
    /**
     * Internal for setColumnDefaults
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.$$valueGetter;
    /**
     * Determines if column is checkbox
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.checkboxable;
    /**
     * Determines if the column is frozen to the left
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.frozenLeft;
    /**
     * Determines if the column is frozen to the right
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.frozenRight;
    /**
     * The grow factor relative to other columns. Same as the flex-grow
     * API from http =//www.w3.org/TR/css3-flexbox/. Basically;
     * take any available extra width and distribute it proportionally
     * according to all columns' flexGrow values.
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.flexGrow;
    /**
     * Min width of the column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.minWidth;
    /**
     * Max width of the column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.maxWidth;
    /**
     * The default width of the column, in pixels
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.width;
    /**
     * Can the column be resized
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.resizeable;
    /**
     * Custom sort comparator
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.comparator;
    /**
     * Custom pipe transforms
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.pipe;
    /**
     * Can the column be sorted
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.sortable;
    /**
     * Can the column be re-arranged by dragging
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.draggable;
    /**
     * Whether the column can automatically resize to fill space in the table.
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.canAutoResize;
    /**
     * Column name or label
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.name;
    /**
     * Property to bind to the row. Example:
     *
     * `someField` or `some.field.nested`, 0 (numeric)
     *
     * If left blank, will use the name as camel case conversion
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.prop;
    /**
     * Cell template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.cellTemplate;
    /**
     * Header template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerTemplate;
    /**
     * Tree toggle template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.treeToggleTemplate;
    /**
     * CSS Classes for the cell
     *
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.cellClass;
    /**
     * CSS classes for the header
     *
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerClass;
    /**
     * Header checkbox enabled
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.headerCheckboxable;
    /**
     * Is tree displayed on this column
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.isTreeColumn;
    /**
     * Width of the tree level indent
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.treeLevelIndent;
    /**
     * Summary function
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.summaryFunc;
    /**
     * Summary cell template ref
     *
     * \@memberOf TableColumn
     * @type {?|undefined}
     */
    TableColumn.prototype.summaryTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29sdW1uLnR5cGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi90eXBlcy90YWJsZS1jb2x1bW4udHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWFBLGlDQTZNQzs7Ozs7Ozs7SUF2TUMsMkJBQWM7Ozs7Ozs7SUFPZCxpQ0FBb0I7Ozs7Ozs7SUFPcEIsb0NBQTRCOzs7Ozs7O0lBTzVCLG1DQUF1Qjs7Ozs7OztJQU92QixpQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQXNCOzs7Ozs7Ozs7O0lBVXRCLCtCQUFrQjs7Ozs7OztJQU9sQiwrQkFBa0I7Ozs7Ozs7SUFPbEIsK0JBQWtCOzs7Ozs7O0lBT2xCLDRCQUFlOzs7Ozs7O0lBT2YsaUNBQXFCOzs7Ozs7O0lBT3JCLGlDQUFpQjs7Ozs7OztJQU9qQiwyQkFBcUI7Ozs7Ozs7SUFPckIsK0JBQW1COzs7Ozs7O0lBT25CLGdDQUFvQjs7Ozs7OztJQU9wQixvQ0FBd0I7Ozs7Ozs7SUFPeEIsMkJBQWM7Ozs7Ozs7Ozs7O0lBV2QsMkJBQXVCOzs7Ozs7O0lBT3ZCLG1DQUFtQjs7Ozs7OztJQU9uQixxQ0FBcUI7Ozs7Ozs7SUFPckIseUNBQXlCOzs7Ozs7OztJQVF6QixnQ0FBbUQ7Ozs7Ozs7O0lBUW5ELGtDQUFxRDs7Ozs7OztJQU9yRCx5Q0FBNkI7Ozs7Ozs7SUFPN0IsbUNBQXVCOzs7Ozs7O0lBT3ZCLHNDQUF5Qjs7Ozs7OztJQU96QixrQ0FBb0M7Ozs7Ozs7SUFPcEMsc0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsdWVHZXR0ZXIgfSBmcm9tICcuLi91dGlscy9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcblxuLyoqXG4gKiBDb2x1bW4gcHJvcGVydHkgdGhhdCBpbmRpY2F0ZXMgaG93IHRvIHJldHJpZXZlIHRoaXMgY29sdW1uJ3NcbiAqIHZhbHVlIGZyb20gYSByb3cuXG4gKiAnYS5kZWVwLnZhbHVlJywgJ25vcm1hbHByb3AnLCAwIChudW1lcmljKVxuICovXG5leHBvcnQgdHlwZSBUYWJsZUNvbHVtblByb3AgPSBzdHJpbmcgfCBudW1iZXI7XG5cbi8qKlxuICogQ29sdW1uIFR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKiBJbnRlcm5hbCB1bmlxdWUgaWRcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICAkJGlkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBmb3IgY29sdW1uIHdpZHRoIGRpc3RyaWJ1dGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICAkJG9sZFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBmb3Igc2V0Q29sdW1uRGVmYXVsdHNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICAkJHZhbHVlR2V0dGVyPzogVmFsdWVHZXR0ZXI7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgY29sdW1uIGlzIGNoZWNrYm94XG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgY2hlY2tib3hhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgY29sdW1uIGlzIGZyb3plbiB0byB0aGUgbGVmdFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGZyb3plbkxlZnQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjb2x1bW4gaXMgZnJvemVuIHRvIHRoZSByaWdodFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGZyb3plblJpZ2h0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGdyb3cgZmFjdG9yIHJlbGF0aXZlIHRvIG90aGVyIGNvbHVtbnMuIFNhbWUgYXMgdGhlIGZsZXgtZ3Jvd1xuICAgKiBBUEkgZnJvbSBodHRwID0vL3d3dy53My5vcmcvVFIvY3NzMy1mbGV4Ym94Ly4gQmFzaWNhbGx5O1xuICAgKiB0YWtlIGFueSBhdmFpbGFibGUgZXh0cmEgd2lkdGggYW5kIGRpc3RyaWJ1dGUgaXQgcHJvcG9ydGlvbmFsbHlcbiAgICogYWNjb3JkaW5nIHRvIGFsbCBjb2x1bW5zJyBmbGV4R3JvdyB2YWx1ZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgZmxleEdyb3c/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE1pbiB3aWR0aCBvZiB0aGUgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgbWluV2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE1heCB3aWR0aCBvZiB0aGUgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IHdpZHRoIG9mIHRoZSBjb2x1bW4sIGluIHBpeGVsc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDYW4gdGhlIGNvbHVtbiBiZSByZXNpemVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBzb3J0IGNvbXBhcmF0b3JcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBjb21wYXJhdG9yPzogYW55O1xuXG4gIC8qKlxuICAgKiBDdXN0b20gcGlwZSB0cmFuc2Zvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgcGlwZT86IFBpcGVUcmFuc2Zvcm07XG5cbiAgLyoqXG4gICAqIENhbiB0aGUgY29sdW1uIGJlIHNvcnRlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ2FuIHRoZSBjb2x1bW4gYmUgcmUtYXJyYW5nZWQgYnkgZHJhZ2dpbmdcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBkcmFnZ2FibGU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjb2x1bW4gY2FuIGF1dG9tYXRpY2FsbHkgcmVzaXplIHRvIGZpbGwgc3BhY2UgaW4gdGhlIHRhYmxlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb2x1bW4gbmFtZSBvciBsYWJlbFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIG5hbWU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByb3BlcnR5IHRvIGJpbmQgdG8gdGhlIHJvdy4gRXhhbXBsZTpcbiAgICpcbiAgICogYHNvbWVGaWVsZGAgb3IgYHNvbWUuZmllbGQubmVzdGVkYCwgMCAobnVtZXJpYylcbiAgICpcbiAgICogSWYgbGVmdCBibGFuaywgd2lsbCB1c2UgdGhlIG5hbWUgYXMgY2FtZWwgY2FzZSBjb252ZXJzaW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgcHJvcD86IFRhYmxlQ29sdW1uUHJvcDtcblxuICAvKipcbiAgICogQ2VsbCB0ZW1wbGF0ZSByZWZcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBjZWxsVGVtcGxhdGU/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEhlYWRlciB0ZW1wbGF0ZSByZWZcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBoZWFkZXJUZW1wbGF0ZT86IGFueTtcblxuICAvKipcbiAgICogVHJlZSB0b2dnbGUgdGVtcGxhdGUgcmVmXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgdHJlZVRvZ2dsZVRlbXBsYXRlPzogYW55O1xuXG4gIC8qKlxuICAgKiBDU1MgQ2xhc3NlcyBmb3IgdGhlIGNlbGxcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBjZWxsQ2xhc3M/OiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcblxuICAvKipcbiAgICogQ1NTIGNsYXNzZXMgZm9yIHRoZSBoZWFkZXJcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBoZWFkZXJDbGFzcz86IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xuXG4gIC8qKlxuICAgKiBIZWFkZXIgY2hlY2tib3ggZW5hYmxlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb2x1bW5cbiAgICovXG4gIGhlYWRlckNoZWNrYm94YWJsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElzIHRyZWUgZGlzcGxheWVkIG9uIHRoaXMgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgaXNUcmVlQ29sdW1uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2lkdGggb2YgdGhlIHRyZWUgbGV2ZWwgaW5kZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgdHJlZUxldmVsSW5kZW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdW1tYXJ5IGZ1bmN0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbHVtblxuICAgKi9cbiAgc3VtbWFyeUZ1bmM/OiAoY2VsbHM6IGFueVtdKSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIFN1bW1hcnkgY2VsbCB0ZW1wbGF0ZSByZWZcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29sdW1uXG4gICAqL1xuICBzdW1tYXJ5VGVtcGxhdGU/OiBhbnk7XG59XG4iXX0=