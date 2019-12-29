/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    function (row) { return getterForProp(prop)(row, prop); }));
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
        var nodeById = {};
        /** @type {?} */
        var l = rows.length;
        /** @type {?} */
        var node = null;
        nodeById[0] = new TreeNode(); // that's the root node
        // that's the root node
        /** @type {?} */
        var uniqIDs = rows.reduce((/**
         * @param {?} arr
         * @param {?} item
         * @return {?}
         */
        function (arr, item) {
            /** @type {?} */
            var toValue = to(item);
            if (arr.indexOf(toValue) === -1) {
                arr.push(toValue);
            }
            return arr;
        }), []);
        for (var i = 0; i < l; i++) {
            // make TreeNode objects for each item
            nodeById[to(rows[i])] = new TreeNode(rows[i]);
        }
        for (var i = 0; i < l; i++) {
            // link all TreeNode objects
            node = nodeById[to(rows[i])];
            /** @type {?} */
            var parent_1 = 0;
            /** @type {?} */
            var fromValue = from(node.row);
            if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
                parent_1 = fromValue;
            }
            node.parent = nodeById[parent_1];
            node.row['level'] = node.parent.row['level'] + 1;
            node.parent.children.push(node);
        }
        /** @type {?} */
        var resolvedRows_1 = [];
        nodeById[0].flatten((/**
         * @return {?}
         */
        function () {
            resolvedRows_1 = tslib_1.__spread(resolvedRows_1, [this.row]);
        }), true);
        return resolvedRows_1;
    }
    else {
        return rows;
    }
}
var TreeNode = /** @class */ (function () {
    function TreeNode(row) {
        if (row === void 0) { row = null; }
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
    TreeNode.prototype.flatten = /**
     * @param {?} f
     * @param {?} recursive
     * @return {?}
     */
    function (f, recursive) {
        if (this.row['treeStatus'] === 'expanded') {
            for (var i = 0, l = this.children.length; i < l; i++) {
                /** @type {?} */
                var child = this.children[i];
                f.apply(child, Array.prototype.slice.call(arguments, 2));
                if (recursive)
                    child.flatten.apply(child, arguments);
            }
        }
    };
    return TreeNode;
}());
if (false) {
    /** @type {?} */
    TreeNode.prototype.row;
    /** @type {?} */
    TreeNode.prototype.parent;
    /** @type {?} */
    TreeNode.prototype.children;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBSXRELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFxQjtJQUN6RCxPQUFPLElBQUksSUFBSTs7OztJQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsRUFBQyxDQUFDO0FBQ3pELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQ0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVcsRUFBRSxJQUEwQixFQUFFLEVBQXdCO0lBQ2xHLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTs7WUFDUixRQUFRLEdBQUcsRUFBRTs7WUFDYixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU07O1lBQ2pCLElBQUksR0FBb0IsSUFBSTtRQUVoQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLHVCQUF1Qjs7O1lBRS9DLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7UUFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJOztnQkFDOUIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEdBQUUsRUFBRSxDQUFDO1FBRU4sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixzQ0FBc0M7WUFDdEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQiw0QkFBNEI7WUFDNUIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pCLFFBQU0sR0FBRyxDQUFDOztnQkFDUixTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDaEMsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELFFBQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7O1lBRUcsY0FBWSxHQUFVLEVBQUU7UUFDNUIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87OztRQUFDO1lBQ2xCLGNBQVksb0JBQU8sY0FBWSxHQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQztRQUM3QyxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxPQUFPLGNBQVksQ0FBQztLQUNyQjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRDtJQUtFLGtCQUFZLEdBQXNCO1FBQXRCLG9CQUFBLEVBQUEsVUFBc0I7UUFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLEdBQUcsR0FBRztnQkFDSixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNULFVBQVUsRUFBRSxVQUFVO2FBQ3ZCLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBRUQsMEJBQU87Ozs7O0lBQVAsVUFBUSxDQUFNLEVBQUUsU0FBa0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQzlDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLFNBQVM7b0JBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3REO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7OztJQXpCQyx1QkFBZ0I7O0lBQ2hCLDBCQUFtQjs7SUFDbkIsNEJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0dGVyRm9yUHJvcCB9IGZyb20gJy4vY29sdW1uLXByb3AtZ2V0dGVycyc7XG5pbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbmFsVmFsdWVHZXR0ZXIgPSAocm93OiBhbnkpID0+IGFueSB8IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25hbEdldHRlckZvclByb3AocHJvcDogVGFibGVDb2x1bW5Qcm9wKTogT3B0aW9uYWxWYWx1ZUdldHRlciB7XG4gIHJldHVybiBwcm9wICYmIChyb3cgPT4gZ2V0dGVyRm9yUHJvcChwcm9wKShyb3csIHByb3ApKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9ucyByZWFycmFuZ2UgaXRlbXMgYnkgdGhlaXIgcGFyZW50c1xuICogQWxzbyBzZXRzIHRoZSBsZXZlbCB2YWx1ZSB0byBlYWNoIG9mIHRoZSBpdGVtc1xuICpcbiAqIE5vdGU6IEV4cGVjdGluZyBlYWNoIGl0ZW0gaGFzIGEgcHJvcGVydHkgY2FsbGVkIHBhcmVudElkXG4gKiBOb3RlOiBUaGlzIGFsZ29yaXRobSB3aWxsIGZhaWwgaWYgYSBsaXN0IGhhcyB0d28gb3IgbW9yZSBpdGVtcyB3aXRoIHNhbWUgSURcbiAqIE5PVEU6IFRoaXMgYWxnb3JpdGhtIHdpbGwgZmFpbCBpZiB0aGVyZSBpcyBhIGRlYWRsb2NrIG9mIHJlbGF0aW9uc2hpcFxuICpcbiAqIEZvciBleGFtcGxlLFxuICpcbiAqIElucHV0XG4gKlxuICogaWQgLT4gcGFyZW50XG4gKiAxICAtPiAwXG4gKiAyICAtPiAwXG4gKiAzICAtPiAxXG4gKiA0ICAtPiAxXG4gKiA1ICAtPiAyXG4gKiA3ICAtPiA4XG4gKiA2ICAtPiAzXG4gKlxuICpcbiAqIE91dHB1dFxuICogaWQgLT4gbGV2ZWxcbiAqIDEgICAgICAtPiAwXG4gKiAtLTMgICAgLT4gMVxuICogLS0tLTYgIC0+IDJcbiAqIC0tNCAgICAtPiAxXG4gKiAyICAgICAgLT4gMFxuICogLS01ICAgIC0+IDFcbiAqIDcgICAgIC0+IDhcbiAqXG4gKlxuICogQHBhcmFtIHJvd3NcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cFJvd3NCeVBhcmVudHMocm93czogYW55W10sIGZyb20/OiBPcHRpb25hbFZhbHVlR2V0dGVyLCB0bz86IE9wdGlvbmFsVmFsdWVHZXR0ZXIpOiBhbnlbXSB7XG4gIGlmIChmcm9tICYmIHRvKSB7XG4gICAgY29uc3Qgbm9kZUJ5SWQgPSB7fTtcbiAgICBjb25zdCBsID0gcm93cy5sZW5ndGg7XG4gICAgbGV0IG5vZGU6IFRyZWVOb2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgICBub2RlQnlJZFswXSA9IG5ldyBUcmVlTm9kZSgpOyAvLyB0aGF0J3MgdGhlIHJvb3Qgbm9kZVxuXG4gICAgY29uc3QgdW5pcUlEcyA9IHJvd3MucmVkdWNlKChhcnIsIGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRvVmFsdWUgPSB0byhpdGVtKTtcbiAgICAgIGlmIChhcnIuaW5kZXhPZih0b1ZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgYXJyLnB1c2godG9WYWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0sIFtdKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBtYWtlIFRyZWVOb2RlIG9iamVjdHMgZm9yIGVhY2ggaXRlbVxuICAgICAgbm9kZUJ5SWRbdG8ocm93c1tpXSldID0gbmV3IFRyZWVOb2RlKHJvd3NbaV0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAvLyBsaW5rIGFsbCBUcmVlTm9kZSBvYmplY3RzXG4gICAgICBub2RlID0gbm9kZUJ5SWRbdG8ocm93c1tpXSldO1xuICAgICAgbGV0IHBhcmVudCA9IDA7XG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSBmcm9tKG5vZGUucm93KTtcbiAgICAgIGlmICghIWZyb21WYWx1ZSAmJiB1bmlxSURzLmluZGV4T2YoZnJvbVZhbHVlKSA+IC0xKSB7XG4gICAgICAgIHBhcmVudCA9IGZyb21WYWx1ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50ID0gbm9kZUJ5SWRbcGFyZW50XTtcbiAgICAgIG5vZGUucm93WydsZXZlbCddID0gbm9kZS5wYXJlbnQucm93WydsZXZlbCddICsgMTtcbiAgICAgIG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVkUm93czogYW55W10gPSBbXTtcbiAgICBub2RlQnlJZFswXS5mbGF0dGVuKGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZWRSb3dzID0gWy4uLnJlc29sdmVkUm93cywgdGhpcy5yb3ddO1xuICAgIH0sIHRydWUpO1xuXG4gICAgcmV0dXJuIHJlc29sdmVkUm93cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm93cztcbiAgfVxufVxuXG5jbGFzcyBUcmVlTm9kZSB7XG4gIHB1YmxpYyByb3c6IGFueTtcbiAgcHVibGljIHBhcmVudDogYW55O1xuICBwdWJsaWMgY2hpbGRyZW46IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHJvdzogYW55IHwgbnVsbCA9IG51bGwpIHtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcm93ID0ge1xuICAgICAgICBsZXZlbDogLTEsXG4gICAgICAgIHRyZWVTdGF0dXM6ICdleHBhbmRlZCdcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gIH1cblxuICBmbGF0dGVuKGY6IGFueSwgcmVjdXJzaXZlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMucm93Wyd0cmVlU3RhdHVzJ10gPT09ICdleHBhbmRlZCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICBmLmFwcGx5KGNoaWxkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSkgY2hpbGQuZmxhdHRlbi5hcHBseShjaGlsZCwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==