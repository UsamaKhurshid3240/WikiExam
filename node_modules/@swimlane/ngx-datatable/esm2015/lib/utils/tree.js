/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getterForProp } from './column-prop-getters';
/**
 * @param {?} prop
 * @return {?}
 */
export function optionalGetterForProp(prop) {
    return prop && ((/**
     * @param {?} row
     * @return {?}
     */
    row => getterForProp(prop)(row, prop)));
}
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param {?} rows
 *
 * @param {?=} from
 * @param {?=} to
 * @return {?}
 */
export function groupRowsByParents(rows, from, to) {
    if (from && to) {
        /** @type {?} */
        const nodeById = {};
        /** @type {?} */
        const l = rows.length;
        /** @type {?} */
        let node = null;
        nodeById[0] = new TreeNode(); // that's the root node
        // that's the root node
        /** @type {?} */
        const uniqIDs = rows.reduce((/**
         * @param {?} arr
         * @param {?} item
         * @return {?}
         */
        (arr, item) => {
            /** @type {?} */
            const toValue = to(item);
            if (arr.indexOf(toValue) === -1) {
                arr.push(toValue);
            }
            return arr;
        }), []);
        for (let i = 0; i < l; i++) {
            // make TreeNode objects for each item
            nodeById[to(rows[i])] = new TreeNode(rows[i]);
        }
        for (let i = 0; i < l; i++) {
            // link all TreeNode objects
            node = nodeById[to(rows[i])];
            /** @type {?} */
            let parent = 0;
            /** @type {?} */
            const fromValue = from(node.row);
            if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
                parent = fromValue;
            }
            node.parent = nodeById[parent];
            node.row['level'] = node.parent.row['level'] + 1;
            node.parent.children.push(node);
        }
        /** @type {?} */
        let resolvedRows = [];
        nodeById[0].flatten((/**
         * @return {?}
         */
        function () {
            resolvedRows = [...resolvedRows, this.row];
        }), true);
        return resolvedRows;
    }
    else {
        return rows;
    }
}
class TreeNode {
    /**
     * @param {?=} row
     */
    constructor(row = null) {
        if (!row) {
            row = {
                level: -1,
                treeStatus: 'expanded'
            };
        }
        this.row = row;
        this.parent = null;
        this.children = [];
    }
    /**
     * @param {?} f
     * @param {?} recursive
     * @return {?}
     */
    flatten(f, recursive) {
        if (this.row['treeStatus'] === 'expanded') {
            for (let i = 0, l = this.children.length; i < l; i++) {
                /** @type {?} */
                const child = this.children[i];
                f.apply(child, Array.prototype.slice.call(arguments, 2));
                if (recursive)
                    child.flatten.apply(child, arguments);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    TreeNode.prototype.row;
    /** @type {?} */
    TreeNode.prototype.parent;
    /** @type {?} */
    TreeNode.prototype.children;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFJdEQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQXFCO0lBQ3pELE9BQU8sSUFBSSxJQUFJOzs7O0lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBVyxFQUFFLElBQTBCLEVBQUUsRUFBd0I7SUFDbEcsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFOztjQUNSLFFBQVEsR0FBRyxFQUFFOztjQUNiLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTs7WUFDakIsSUFBSSxHQUFvQixJQUFJO1FBRWhDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsdUJBQXVCOzs7Y0FFL0MsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OztRQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFOztrQkFDbEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEdBQUUsRUFBRSxDQUFDO1FBRU4sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixzQ0FBc0M7WUFDdEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQiw0QkFBNEI7WUFDNUIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pCLE1BQU0sR0FBRyxDQUFDOztrQkFDUixTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDaEMsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7O1lBRUcsWUFBWSxHQUFVLEVBQUU7UUFDNUIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87OztRQUFDO1lBQ2xCLFlBQVksR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxPQUFPLFlBQVksQ0FBQztLQUNyQjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCxNQUFNLFFBQVE7Ozs7SUFLWixZQUFZLE1BQWtCLElBQUk7UUFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRztnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNULFVBQVUsRUFBRSxVQUFVO2FBQ3ZCLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLENBQU0sRUFBRSxTQUFrQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztzQkFDOUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUksU0FBUztvQkFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdEQ7U0FDRjtJQUNILENBQUM7Q0FDRjs7O0lBekJDLHVCQUFnQjs7SUFDaEIsMEJBQW1COztJQUNuQiw0QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uUHJvcCB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcblxuZXhwb3J0IHR5cGUgT3B0aW9uYWxWYWx1ZUdldHRlciA9IChyb3c6IGFueSkgPT4gYW55IHwgdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsR2V0dGVyRm9yUHJvcChwcm9wOiBUYWJsZUNvbHVtblByb3ApOiBPcHRpb25hbFZhbHVlR2V0dGVyIHtcbiAgcmV0dXJuIHByb3AgJiYgKHJvdyA9PiBnZXR0ZXJGb3JQcm9wKHByb3ApKHJvdywgcHJvcCkpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb25zIHJlYXJyYW5nZSBpdGVtcyBieSB0aGVpciBwYXJlbnRzXG4gKiBBbHNvIHNldHMgdGhlIGxldmVsIHZhbHVlIHRvIGVhY2ggb2YgdGhlIGl0ZW1zXG4gKlxuICogTm90ZTogRXhwZWN0aW5nIGVhY2ggaXRlbSBoYXMgYSBwcm9wZXJ0eSBjYWxsZWQgcGFyZW50SWRcbiAqIE5vdGU6IFRoaXMgYWxnb3JpdGhtIHdpbGwgZmFpbCBpZiBhIGxpc3QgaGFzIHR3byBvciBtb3JlIGl0ZW1zIHdpdGggc2FtZSBJRFxuICogTk9URTogVGhpcyBhbGdvcml0aG0gd2lsbCBmYWlsIGlmIHRoZXJlIGlzIGEgZGVhZGxvY2sgb2YgcmVsYXRpb25zaGlwXG4gKlxuICogRm9yIGV4YW1wbGUsXG4gKlxuICogSW5wdXRcbiAqXG4gKiBpZCAtPiBwYXJlbnRcbiAqIDEgIC0+IDBcbiAqIDIgIC0+IDBcbiAqIDMgIC0+IDFcbiAqIDQgIC0+IDFcbiAqIDUgIC0+IDJcbiAqIDcgIC0+IDhcbiAqIDYgIC0+IDNcbiAqXG4gKlxuICogT3V0cHV0XG4gKiBpZCAtPiBsZXZlbFxuICogMSAgICAgIC0+IDBcbiAqIC0tMyAgICAtPiAxXG4gKiAtLS0tNiAgLT4gMlxuICogLS00ICAgIC0+IDFcbiAqIDIgICAgICAtPiAwXG4gKiAtLTUgICAgLT4gMVxuICogNyAgICAgLT4gOFxuICpcbiAqXG4gKiBAcGFyYW0gcm93c1xuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwUm93c0J5UGFyZW50cyhyb3dzOiBhbnlbXSwgZnJvbT86IE9wdGlvbmFsVmFsdWVHZXR0ZXIsIHRvPzogT3B0aW9uYWxWYWx1ZUdldHRlcik6IGFueVtdIHtcbiAgaWYgKGZyb20gJiYgdG8pIHtcbiAgICBjb25zdCBub2RlQnlJZCA9IHt9O1xuICAgIGNvbnN0IGwgPSByb3dzLmxlbmd0aDtcbiAgICBsZXQgbm9kZTogVHJlZU5vZGUgfCBudWxsID0gbnVsbDtcblxuICAgIG5vZGVCeUlkWzBdID0gbmV3IFRyZWVOb2RlKCk7IC8vIHRoYXQncyB0aGUgcm9vdCBub2RlXG5cbiAgICBjb25zdCB1bmlxSURzID0gcm93cy5yZWR1Y2UoKGFyciwgaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdG9WYWx1ZSA9IHRvKGl0ZW0pO1xuICAgICAgaWYgKGFyci5pbmRleE9mKHRvVmFsdWUpID09PSAtMSkge1xuICAgICAgICBhcnIucHVzaCh0b1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSwgW10pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIC8vIG1ha2UgVHJlZU5vZGUgb2JqZWN0cyBmb3IgZWFjaCBpdGVtXG4gICAgICBub2RlQnlJZFt0byhyb3dzW2ldKV0gPSBuZXcgVHJlZU5vZGUocm93c1tpXSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIC8vIGxpbmsgYWxsIFRyZWVOb2RlIG9iamVjdHNcbiAgICAgIG5vZGUgPSBub2RlQnlJZFt0byhyb3dzW2ldKV07XG4gICAgICBsZXQgcGFyZW50ID0gMDtcbiAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IGZyb20obm9kZS5yb3cpO1xuICAgICAgaWYgKCEhZnJvbVZhbHVlICYmIHVuaXFJRHMuaW5kZXhPZihmcm9tVmFsdWUpID4gLTEpIHtcbiAgICAgICAgcGFyZW50ID0gZnJvbVZhbHVlO1xuICAgICAgfVxuICAgICAgbm9kZS5wYXJlbnQgPSBub2RlQnlJZFtwYXJlbnRdO1xuICAgICAgbm9kZS5yb3dbJ2xldmVsJ10gPSBub2RlLnBhcmVudC5yb3dbJ2xldmVsJ10gKyAxO1xuICAgICAgbm9kZS5wYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZWRSb3dzOiBhbnlbXSA9IFtdO1xuICAgIG5vZGVCeUlkWzBdLmZsYXR0ZW4oZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlZFJvd3MgPSBbLi4ucmVzb2x2ZWRSb3dzLCB0aGlzLnJvd107XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gcmVzb2x2ZWRSb3dzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByb3dzO1xuICB9XG59XG5cbmNsYXNzIFRyZWVOb2RlIHtcbiAgcHVibGljIHJvdzogYW55O1xuICBwdWJsaWMgcGFyZW50OiBhbnk7XG4gIHB1YmxpYyBjaGlsZHJlbjogYW55W107XG5cbiAgY29uc3RydWN0b3Iocm93OiBhbnkgfCBudWxsID0gbnVsbCkge1xuICAgIGlmICghcm93KSB7XG4gICAgICByb3cgPSB7XG4gICAgICAgIGxldmVsOiAtMSxcbiAgICAgICAgdHJlZVN0YXR1czogJ2V4cGFuZGVkJ1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5yb3cgPSByb3c7XG4gICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgfVxuXG4gIGZsYXR0ZW4oZjogYW55LCByZWN1cnNpdmU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5yb3dbJ3RyZWVTdGF0dXMnXSA9PT0gJ2V4cGFuZGVkJykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgIGYuYXBwbHkoY2hpbGQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuICAgICAgICBpZiAocmVjdXJzaXZlKSBjaGlsZC5mbGF0dGVuLmFwcGx5KGNoaWxkLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19