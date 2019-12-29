/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} selected
 * @param {?} row
 * @param {?} comparefn
 * @return {?}
 */
export function selectRows(selected, row, comparefn) {
    /** @type {?} */
    const selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
/**
 * @param {?} selected
 * @param {?} rows
 * @param {?} index
 * @param {?} prevIndex
 * @param {?} comparefn
 * @return {?}
 */
export function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    /** @type {?} */
    const reverse = index < prevIndex;
    for (let i = 0; i < rows.length; i++) {
        /** @type {?} */
        const row = rows[i];
        /** @type {?} */
        const greater = i >= prevIndex && i <= index;
        /** @type {?} */
        const lesser = i <= prevIndex && i >= index;
        /** @type {?} */
        let range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsVUFBVSxDQUFDLFFBQWUsRUFBRSxHQUFRLEVBQUUsU0FBYzs7VUFDNUQsYUFBYSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDO0lBRTlDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQzs7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixRQUFlLEVBQ2YsSUFBVyxFQUNYLEtBQWEsRUFDYixTQUFpQixFQUNqQixTQUFjOztVQUVSLE9BQU8sR0FBRyxLQUFLLEdBQUcsU0FBUztJQUVqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Y0FDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7O2NBQ2IsT0FBTyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEtBQUs7O2NBQ3RDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxLQUFLOztZQUV2QyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7UUFDaEMsSUFBSSxPQUFPLEVBQUU7WUFDWCxLQUFLLEdBQUc7Z0JBQ04sS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFLFNBQVM7YUFDZixDQUFDO1NBQ0g7YUFBTTtZQUNMLEtBQUssR0FBRztnQkFDTixLQUFLLEVBQUUsU0FBUztnQkFDaEIsR0FBRyxFQUFFLEtBQUssR0FBRyxDQUFDO2FBQ2YsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1lBQ2hELDBEQUEwRDtZQUMxRCw0Q0FBNEM7WUFDNUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdFJvd3Moc2VsZWN0ZWQ6IGFueVtdLCByb3c6IGFueSwgY29tcGFyZWZuOiBhbnkpIHtcbiAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IGNvbXBhcmVmbihyb3csIHNlbGVjdGVkKTtcblxuICBpZiAoc2VsZWN0ZWRJbmRleCA+IC0xKSB7XG4gICAgc2VsZWN0ZWQuc3BsaWNlKHNlbGVjdGVkSW5kZXgsIDEpO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdGVkLnB1c2gocm93KTtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3RlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdFJvd3NCZXR3ZWVuKFxuICBzZWxlY3RlZDogYW55W10sXG4gIHJvd3M6IGFueVtdLFxuICBpbmRleDogbnVtYmVyLFxuICBwcmV2SW5kZXg6IG51bWJlcixcbiAgY29tcGFyZWZuOiBhbnlcbik6IGFueVtdIHtcbiAgY29uc3QgcmV2ZXJzZSA9IGluZGV4IDwgcHJldkluZGV4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IHJvd3NbaV07XG4gICAgY29uc3QgZ3JlYXRlciA9IGkgPj0gcHJldkluZGV4ICYmIGkgPD0gaW5kZXg7XG4gICAgY29uc3QgbGVzc2VyID0gaSA8PSBwcmV2SW5kZXggJiYgaSA+PSBpbmRleDtcblxuICAgIGxldCByYW5nZSA9IHsgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICByYW5nZSA9IHtcbiAgICAgICAgc3RhcnQ6IGluZGV4LFxuICAgICAgICBlbmQ6IHByZXZJbmRleFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2UgPSB7XG4gICAgICAgIHN0YXJ0OiBwcmV2SW5kZXgsXG4gICAgICAgIGVuZDogaW5kZXggKyAxXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICgocmV2ZXJzZSAmJiBsZXNzZXIpIHx8ICghcmV2ZXJzZSAmJiBncmVhdGVyKSkge1xuICAgICAgLy8gaWYgaW4gdGhlIHBvc2l0aXZlIHJhbmdlIHRvIGJlIGFkZGVkIHRvIGBzZWxlY3RlZGAsIGFuZFxuICAgICAgLy8gbm90IGFscmVhZHkgaW4gdGhlIHNlbGVjdGVkIGFycmF5LCBhZGQgaXRcbiAgICAgIGlmIChpID49IHJhbmdlLnN0YXJ0ICYmIGkgPD0gcmFuZ2UuZW5kKSB7XG4gICAgICAgIHNlbGVjdGVkLnB1c2gocm93KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VsZWN0ZWQ7XG59XG4iXX0=