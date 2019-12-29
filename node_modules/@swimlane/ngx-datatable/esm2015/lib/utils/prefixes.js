/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { camelCase } from './camel-case';
/** @type {?} */
const cache = {};
/** @type {?} */
const testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
const ɵ0 = /**
 * @return {?}
 */
function () {
    /** @type {?} */
    const styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    /** @type {?} */
    const match = typeof styles !== 'undefined'
        ? Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/)
        : null;
    /** @type {?} */
    const pre = match !== null ? match[1] : undefined;
    // tslint:disable-next-line: tsr-detect-non-literal-regexp
    /** @type {?} */
    const dom = typeof pre !== 'undefined' ? 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom
        ? {
            dom,
            lowercase: pre,
            css: `-${pre}-`,
            js: pre[0].toUpperCase() + pre.substr(1)
        }
        : undefined;
};
/** @type {?} */
const prefix = ((ɵ0))();
/**
 * @param {?} property
 * @return {?}
 */
export function getVendorPrefixedName(property) {
    /** @type {?} */
    const name = camelCase(property);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9wcmVmaXhlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7TUFFbkMsS0FBSyxHQUFHLEVBQUU7O01BQ1YsU0FBUyxHQUFHLE9BQU8sUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7OztBQUluRjs7VUFDUixNQUFNLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzs7VUFDMUcsS0FBSyxHQUNULE9BQU8sTUFBTSxLQUFLLFdBQVc7UUFDM0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSzthQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNSLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDLENBQUMsSUFBSTs7VUFDSixHQUFHLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7VUFFM0MsR0FBRyxHQUFHLE9BQU8sR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFFakgsT0FBTyxHQUFHO1FBQ1IsQ0FBQyxDQUFDO1lBQ0UsR0FBRztZQUNILFNBQVMsRUFBRSxHQUFHO1lBQ2QsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHO1lBQ2YsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN6QztRQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDaEIsQ0FBQzs7TUFyQkssTUFBTSxHQUFHLE1BcUJiLEVBQUU7Ozs7O0FBRUosTUFBTSxVQUFVLHFCQUFxQixDQUFDLFFBQWdCOztVQUM5QyxJQUFJLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUVoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2hCLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDMUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDeEI7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuL2NhbWVsLWNhc2UnO1xuXG5jb25zdCBjYWNoZSA9IHt9O1xuY29uc3QgdGVzdFN0eWxlID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlIDogdW5kZWZpbmVkO1xuXG4vLyBHZXQgUHJlZml4XG4vLyBodHRwOi8vZGF2aWR3YWxzaC5uYW1lL3ZlbmRvci1wcmVmaXhcbmNvbnN0IHByZWZpeCA9IChmdW5jdGlvbigpIHtcbiAgY29uc3Qgc3R5bGVzID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbWF0Y2ggPVxuICAgIHR5cGVvZiBzdHlsZXMgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAgIC5jYWxsKHN0eWxlcylcbiAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAubWF0Y2goLy0obW96fHdlYmtpdHxtcyktLylcbiAgICAgIDogbnVsbDtcbiAgY29uc3QgcHJlID0gbWF0Y2ggIT09IG51bGwgPyBtYXRjaFsxXSA6IHVuZGVmaW5lZDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB0c3ItZGV0ZWN0LW5vbi1saXRlcmFsLXJlZ2V4cFxuICBjb25zdCBkb20gPSB0eXBlb2YgcHJlICE9PSAndW5kZWZpbmVkJyA/ICdXZWJLaXR8TW96fE1TfE8nLm1hdGNoKG5ldyBSZWdFeHAoJygnICsgcHJlICsgJyknLCAnaScpKVsxXSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gZG9tXG4gICAgPyB7XG4gICAgICAgIGRvbSxcbiAgICAgICAgbG93ZXJjYXNlOiBwcmUsXG4gICAgICAgIGNzczogYC0ke3ByZX0tYCxcbiAgICAgICAganM6IHByZVswXS50b1VwcGVyQ2FzZSgpICsgcHJlLnN1YnN0cigxKVxuICAgICAgfVxuICAgIDogdW5kZWZpbmVkO1xufSkoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlbmRvclByZWZpeGVkTmFtZShwcm9wZXJ0eTogc3RyaW5nKSB7XG4gIGNvbnN0IG5hbWUgPSBjYW1lbENhc2UocHJvcGVydHkpO1xuXG4gIGlmICghY2FjaGVbbmFtZV0pIHtcbiAgICBpZiAocHJlZml4ICE9PSB1bmRlZmluZWQgJiYgdGVzdFN0eWxlW3ByZWZpeC5jc3MgKyBwcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FjaGVbbmFtZV0gPSBwcmVmaXguY3NzICsgcHJvcGVydHk7XG4gICAgfSBlbHNlIGlmICh0ZXN0U3R5bGVbcHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhY2hlW25hbWVdID0gcHJvcGVydHk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNhY2hlW25hbWVdO1xufVxuIl19