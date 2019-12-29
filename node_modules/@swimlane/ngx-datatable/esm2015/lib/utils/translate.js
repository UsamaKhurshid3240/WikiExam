/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';
// browser detection and prefixing tools
/** @type {?} */
const transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
/** @type {?} */
const backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
/** @type {?} */
const hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
/** @type {?} */
const hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
/** @type {?} */
const ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
/** @type {?} */
const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
/**
 * @param {?} styles
 * @param {?} x
 * @param {?} y
 * @return {?}
 */
export function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = `translate(${x}px, ${y}px)`;
        }
    }
    else {
        styles.top = `${y}px`;
        styles.left = `${x}px`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvdHJhbnNsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O01BR25DLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOztNQUMxRixrQkFBa0IsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7O01BQzVHLGdCQUFnQixHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOztNQUNuRyxrQkFBa0IsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzs7TUFDdkcsRUFBRSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVE7O01BQzFFLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7QUFFNUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFXLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDM0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksZ0JBQWdCLEVBQUU7UUFDeEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtZQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDckQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDNUQ7S0FDRjtTQUFNO1FBQ0wsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztLQUN4QjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRWZW5kb3JQcmVmaXhlZE5hbWUgfSBmcm9tICcuL3ByZWZpeGVzJztcbmltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJy4vY2FtZWwtY2FzZSc7XG5cbi8vIGJyb3dzZXIgZGV0ZWN0aW9uIGFuZCBwcmVmaXhpbmcgdG9vbHNcbmNvbnN0IHRyYW5zZm9ybSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZ2V0VmVuZG9yUHJlZml4ZWROYW1lKCd0cmFuc2Zvcm0nKSA6IHVuZGVmaW5lZDtcbmNvbnN0IGJhY2tmYWNlVmlzaWJpbGl0eSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZ2V0VmVuZG9yUHJlZml4ZWROYW1lKCdiYWNrZmFjZVZpc2liaWxpdHknKSA6IHVuZGVmaW5lZDtcbmNvbnN0IGhhc0NTU1RyYW5zZm9ybXMgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/ICEhZ2V0VmVuZG9yUHJlZml4ZWROYW1lKCd0cmFuc2Zvcm0nKSA6IHVuZGVmaW5lZDtcbmNvbnN0IGhhc0NTUzNEVHJhbnNmb3JtcyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gISFnZXRWZW5kb3JQcmVmaXhlZE5hbWUoJ3BlcnNwZWN0aXZlJykgOiB1bmRlZmluZWQ7XG5jb25zdCB1YSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgOiAnQ2hyb21lJztcbmNvbnN0IGlzU2FmYXJpID0gL1NhZmFyaVxcLy8udGVzdCh1YSkgJiYgIS9DaHJvbWVcXC8vLnRlc3QodWEpO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlWFkoc3R5bGVzOiBhbnksIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtICE9PSAndW5kZWZpbmVkJyAmJiBoYXNDU1NUcmFuc2Zvcm1zKSB7XG4gICAgaWYgKCFpc1NhZmFyaSAmJiBoYXNDU1MzRFRyYW5zZm9ybXMpIHtcbiAgICAgIHN0eWxlc1t0cmFuc2Zvcm1dID0gYHRyYW5zbGF0ZTNkKCR7eH1weCwgJHt5fXB4LCAwKWA7XG4gICAgICBzdHlsZXNbYmFja2ZhY2VWaXNpYmlsaXR5XSA9ICdoaWRkZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNbY2FtZWxDYXNlKHRyYW5zZm9ybSldID0gYHRyYW5zbGF0ZSgke3h9cHgsICR7eX1weClgO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZXMudG9wID0gYCR7eX1weGA7XG4gICAgc3R5bGVzLmxlZnQgPSBgJHt4fXB4YDtcbiAgfVxufVxuIl19