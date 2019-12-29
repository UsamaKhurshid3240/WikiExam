/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Always returns the empty string ''
 * @return {?}
 */
export function emptyStringGetter() {
    return '';
}
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 * @param {?} prop
 * @return {?}
 */
export function getterForProp(prop) {
    if (prop == null) {
        return emptyStringGetter;
    }
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
/**
 * Returns the value at this numeric index.
 * @param {?} row array of values
 * @param {?} index numeric index
 * @return {?} any or '' if invalid index
 */
export function numericIndexGetter(row, index) {
    if (row == null) {
        return '';
    }
    // mimic behavior of deepValueGetter
    if (!row || index == null) {
        return row;
    }
    /** @type {?} */
    var value = row[index];
    if (value == null) {
        return '';
    }
    return value;
}
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param {?} obj object containing the field
 * @param {?} fieldName field name string
 * @return {?}
 */
export function shallowValueGetter(obj, fieldName) {
    if (obj == null) {
        return '';
    }
    if (!obj || !fieldName) {
        return obj;
    }
    /** @type {?} */
    var value = obj[fieldName];
    if (value == null) {
        return '';
    }
    return value;
}
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
export function deepValueGetter(obj, path) {
    if (obj == null) {
        return '';
    }
    if (!obj || !path) {
        return obj;
    }
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    /** @type {?} */
    var current = obj[path];
    if (current !== undefined) {
        return current;
    }
    current = obj;
    /** @type {?} */
    var split = path.split('.');
    if (split.length) {
        for (var i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null) {
                return '';
            }
        }
    }
    return current;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXByb3AtZ2V0dGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2NvbHVtbi1wcm9wLWdldHRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxNQUFNLFVBQVUsaUJBQWlCO0lBQy9CLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQzs7Ozs7OztBQU1ELE1BQU0sVUFBVSxhQUFhLENBQUMsSUFBcUI7SUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ2hCLE9BQU8saUJBQWlCLENBQUM7S0FDMUI7SUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLGtCQUFrQixDQUFDO0tBQzNCO1NBQU07UUFDTCxpQkFBaUI7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sZUFBZSxDQUFDO1NBQ3hCO2FBQU07WUFDTCxPQUFPLGtCQUFrQixDQUFDO1NBQzNCO0tBQ0Y7QUFDSCxDQUFDOzs7Ozs7O0FBUUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVUsRUFBRSxLQUFhO0lBQzFELElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7O1FBRUssS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDeEIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVEsRUFBRSxTQUFpQjtJQUM1RCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQztLQUNaOztRQUVLLEtBQUssR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQzVCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBS0QsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFRLEVBQUUsSUFBWTtJQUNwRCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixPQUFPLEdBQUcsQ0FBQztLQUNaOzs7O1FBSUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdkIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3pCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQzs7UUFDUixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFFN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsMENBQTBDO1lBQzFDLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUM3QyxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XG5cbi8vIG1heWJlIHJlbmFtZSB0aGlzIGZpbGUgdG8gcHJvcC1nZXR0ZXJzLnRzXG5cbmV4cG9ydCB0eXBlIFZhbHVlR2V0dGVyID0gKG9iajogYW55LCBwcm9wOiBUYWJsZUNvbHVtblByb3ApID0+IGFueTtcblxuLyoqXG4gKiBBbHdheXMgcmV0dXJucyB0aGUgZW1wdHkgc3RyaW5nICcnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eVN0cmluZ0dldHRlcigpOiBzdHJpbmcge1xuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgZ2V0dGVyIGZ1bmN0aW9uIGZvciB0aGlzIGtpbmQgb2YgcHJvcC5cbiAqIElmIHByb3AgPT0gbnVsbCwgcmV0dXJucyB0aGUgZW1wdHlTdHJpbmdHZXR0ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXR0ZXJGb3JQcm9wKHByb3A6IFRhYmxlQ29sdW1uUHJvcCk6IFZhbHVlR2V0dGVyIHtcbiAgaWYgKHByb3AgPT0gbnVsbCkge1xuICAgIHJldHVybiBlbXB0eVN0cmluZ0dldHRlcjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcHJvcCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbnVtZXJpY0luZGV4R2V0dGVyO1xuICB9IGVsc2Uge1xuICAgIC8vIGRlZXAgb3Igc2ltcGxlXG4gICAgaWYgKHByb3AuaW5kZXhPZignLicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGRlZXBWYWx1ZUdldHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNoYWxsb3dWYWx1ZUdldHRlcjtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBhdCB0aGlzIG51bWVyaWMgaW5kZXguXG4gKiBAcGFyYW0gcm93IGFycmF5IG9mIHZhbHVlc1xuICogQHBhcmFtIGluZGV4IG51bWVyaWMgaW5kZXhcbiAqIEByZXR1cm5zIGFueSBvciAnJyBpZiBpbnZhbGlkIGluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBudW1lcmljSW5kZXhHZXR0ZXIocm93OiBhbnlbXSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gIGlmIChyb3cgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICAvLyBtaW1pYyBiZWhhdmlvciBvZiBkZWVwVmFsdWVHZXR0ZXJcbiAgaWYgKCFyb3cgfHwgaW5kZXggPT0gbnVsbCkge1xuICAgIHJldHVybiByb3c7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IHJvd1tpbmRleF07XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGZpZWxkLlxuICogKG1vcmUgZWZmaWNpZW50IHRoYW4gZGVlcFZhbHVlR2V0dGVyKVxuICogQHBhcmFtIG9iaiBvYmplY3QgY29udGFpbmluZyB0aGUgZmllbGRcbiAqIEBwYXJhbSBmaWVsZE5hbWUgZmllbGQgbmFtZSBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dWYWx1ZUdldHRlcihvYmo6IGFueSwgZmllbGROYW1lOiBzdHJpbmcpOiBhbnkge1xuICBpZiAob2JqID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKCFvYmogfHwgIWZpZWxkTmFtZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IG9ialtmaWVsZE5hbWVdO1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGRlZXAgb2JqZWN0IGdpdmVuIGEgc3RyaW5nLiB6b29bJ2FuaW1hbC50eXBlJ11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBWYWx1ZUdldHRlcihvYmo6IGFueSwgcGF0aDogc3RyaW5nKTogYW55IHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICghb2JqIHx8ICFwYXRoKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIC8vIGNoZWNrIGlmIHBhdGggbWF0Y2hlcyBhIHJvb3QtbGV2ZWwgZmllbGRcbiAgLy8geyBcImEuYi5jXCI6IDEyMyB9XG4gIGxldCBjdXJyZW50ID0gb2JqW3BhdGhdO1xuICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cblxuICBjdXJyZW50ID0gb2JqO1xuICBjb25zdCBzcGxpdCA9IHBhdGguc3BsaXQoJy4nKTtcblxuICBpZiAoc3BsaXQubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnRbc3BsaXRbaV1dO1xuXG4gICAgICAvLyBpZiBmb3VuZCB1bmRlZmluZWQsIHJldHVybiBlbXB0eSBzdHJpbmdcbiAgICAgIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQgfHwgY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnQ7XG59XG4iXX0=