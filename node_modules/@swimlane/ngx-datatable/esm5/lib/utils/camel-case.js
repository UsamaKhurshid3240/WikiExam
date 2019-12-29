/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 * @param {?} str
 * @return {?}
 */
export function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str
        .replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '')
        .trim()
        .toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, (/**
     * @param {?} a
     * @param {?} b
     * @param {?} c
     * @return {?}
     */
    function (a, b, c) {
        return b.trim() + c.toUpperCase();
    }));
    return str;
}
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 * @param {?} str
 * @return {?}
 */
export function deCamelCase(str) {
    return str.replace(/([A-Z])/g, (/**
     * @param {?} match
     * @return {?}
     */
    function (match) { return " " + match; })).replace(/^./, (/**
     * @param {?} match
     * @return {?}
     */
    function (match) { return match.toUpperCase(); }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWwtY2FzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2NhbWVsLWNhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBVztJQUNuQywwQ0FBMEM7SUFDMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMseUNBQXlDO0lBQ3pDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTlDLGtEQUFrRDtJQUNsRCxHQUFHLEdBQUcsR0FBRztTQUNOLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUM7U0FDdkMsSUFBSSxFQUFFO1NBQ04sV0FBVyxFQUFFLENBQUM7SUFFakIscURBQXFEO0lBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQjs7Ozs7O0lBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEQsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUMsRUFBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7O0FBTUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVOzs7O0lBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxNQUFJLEtBQU8sRUFBWCxDQUFXLEVBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTs7OztJQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixFQUFDLENBQUM7QUFDbkcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udmVydHMgc3RyaW5ncyBmcm9tIHNvbWV0aGluZyB0byBjYW1lbCBjYXNlXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNDI1Mjg3L2NvbnZlcnQtZGFzaC1zZXBhcmF0ZWQtc3RyaW5nLXRvLWNhbWVsY2FzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gUmVwbGFjZSBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCBhIHNwYWNlXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9bXmEtekEtWjAtOSBdL2csICcgJyk7XG4gIC8vIHB1dCBhIHNwYWNlIGJlZm9yZSBhbiB1cHBlcmNhc2UgbGV0dGVyXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oW2Etel0oPz1bQS1aXSkpL2csICckMSAnKTtcblxuICAvLyBMb3dlciBjYXNlIGZpcnN0IGNoYXJhY3RlciBhbmQgc29tZSBvdGhlciBzdHVmZlxuICBzdHIgPSBzdHJcbiAgICAucmVwbGFjZSgvKFteYS16QS1aMC05IF0pfF5bMC05XSsvZywgJycpXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIHVwcGVyY2FzZSBjaGFyYWN0ZXJzIHByZWNlZGVkIGJ5IGEgc3BhY2Ugb3IgbnVtYmVyXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oWyAwLTldKykoW2EtekEtWl0pL2csIGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAgICByZXR1cm4gYi50cmltKCkgKyBjLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQ29udmVydHMgc3RyaW5ncyBmcm9tIGNhbWVsIGNhc2UgdG8gd29yZHNcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzIyNTQwNy9jb252ZXJ0LWNhbWVsY2FzZXRleHQtdG8tY2FtZWwtY2FzZS10ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZUNhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCBtYXRjaCA9PiBgICR7bWF0Y2h9YCkucmVwbGFjZSgvXi4vLCBtYXRjaCA9PiBtYXRjaC50b1VwcGVyQ2FzZSgpKTtcbn1cbiJdfQ==