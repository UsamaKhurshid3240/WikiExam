/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { camelCase } from './camel-case';
/** @type {?} */
var cache = {};
/** @type {?} */
var testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var ɵ0 = /**
 * @return {?}
 */
function () {
    /** @type {?} */
    var styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    /** @type {?} */
    var match = typeof styles !== 'undefined'
        ? Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/)
        : null;
    /** @type {?} */
    var pre = match !== null ? match[1] : undefined;
    // tslint:disable-next-line: tsr-detect-non-literal-regexp
    /** @type {?} */
    var dom = typeof pre !== 'undefined' ? 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom
        ? {
            dom: dom,
            lowercase: pre,
            css: "-" + pre + "-",
            js: pre[0].toUpperCase() + pre.substr(1)
        }
        : undefined;
};
/** @type {?} */
var prefix = ((ɵ0))();
/**
 * @param {?} property
 * @return {?}
 */
export function getVendorPrefixedName(property) {
    /** @type {?} */
    var name = camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9wcmVmaXhlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7SUFFbkMsS0FBSyxHQUFHLEVBQUU7O0lBQ1YsU0FBUyxHQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7OztBQUluRjs7UUFDUixNQUFNLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzs7UUFDMUcsS0FBSyxHQUNULE9BQU8sTUFBTSxLQUFLLFdBQVc7UUFDM0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSzthQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNSLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDLENBQUMsSUFBSTs7UUFDSixHQUFHLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7UUFFM0MsR0FBRyxHQUFHLE9BQU8sR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFFakgsT0FBTyxHQUFHO1FBQ1IsQ0FBQyxDQUFDO1lBQ0UsR0FBRyxLQUFBO1lBQ0gsU0FBUyxFQUFFLEdBQUc7WUFDZCxHQUFHLEVBQUUsTUFBSSxHQUFHLE1BQUc7WUFDZixFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0gsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNoQixDQUFDOztJQXJCSyxNQUFNLEdBQUcsTUFxQmIsRUFBRTs7Ozs7QUFFSixNQUFNLFVBQVUscUJBQXFCLENBQUMsUUFBZ0I7O1FBQzlDLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEIsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUMxRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7U0FDckM7YUFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUN4QjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJy4vY2FtZWwtY2FzZSc7XG5cbmNvbnN0IGNhY2hlID0ge307XG5jb25zdCB0ZXN0U3R5bGUgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGUgOiB1bmRlZmluZWQ7XG5cbi8vIEdldCBQcmVmaXhcbi8vIGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvdmVuZG9yLXByZWZpeFxuY29uc3QgcHJlZml4ID0gKGZ1bmN0aW9uKCkge1xuICBjb25zdCBzdHlsZXMgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpIDogdW5kZWZpbmVkO1xuICBjb25zdCBtYXRjaCA9XG4gICAgdHlwZW9mIHN0eWxlcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAgICAgLmNhbGwoc3R5bGVzKVxuICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgIC5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKVxuICAgICAgOiBudWxsO1xuICBjb25zdCBwcmUgPSBtYXRjaCAhPT0gbnVsbCA/IG1hdGNoWzFdIDogdW5kZWZpbmVkO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRzci1kZXRlY3Qtbm9uLWxpdGVyYWwtcmVnZXhwXG4gIGNvbnN0IGRvbSA9IHR5cGVvZiBwcmUgIT09ICd1bmRlZmluZWQnID8gJ1dlYktpdHxNb3p8TVN8TycubWF0Y2gobmV3IFJlZ0V4cCgnKCcgKyBwcmUgKyAnKScsICdpJykpWzFdIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBkb21cbiAgICA/IHtcbiAgICAgICAgZG9tLFxuICAgICAgICBsb3dlcmNhc2U6IHByZSxcbiAgICAgICAgY3NzOiBgLSR7cHJlfS1gLFxuICAgICAgICBqczogcHJlWzBdLnRvVXBwZXJDYXNlKCkgKyBwcmUuc3Vic3RyKDEpXG4gICAgICB9XG4gICAgOiB1bmRlZmluZWQ7XG59KSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmVuZG9yUHJlZml4ZWROYW1lKHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgY29uc3QgbmFtZSA9IGNhbWVsQ2FzZShwcm9wZXJ0eSk7XG5cbiAgaWYgKCFjYWNoZVtuYW1lXSkge1xuICAgIGlmIChwcmVmaXggIT09IHVuZGVmaW5lZCAmJiB0ZXN0U3R5bGVbcHJlZml4LmNzcyArIHByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYWNoZVtuYW1lXSA9IHByZWZpeC5jc3MgKyBwcm9wZXJ0eTtcbiAgICB9IGVsc2UgaWYgKHRlc3RTdHlsZVtwcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FjaGVbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2FjaGVbbmFtZV07XG59XG4iXX0=