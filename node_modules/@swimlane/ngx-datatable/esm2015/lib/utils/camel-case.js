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
    match => ` ${match}`)).replace(/^./, (/**
     * @param {?} match
     * @return {?}
     */
    match => match.toUpperCase()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWwtY2FzZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2NhbWVsLWNhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBVztJQUNuQywwQ0FBMEM7SUFDMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMseUNBQXlDO0lBQ3pDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTlDLGtEQUFrRDtJQUNsRCxHQUFHLEdBQUcsR0FBRztTQUNOLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUM7U0FDdkMsSUFBSSxFQUFFO1NBQ04sV0FBVyxFQUFFLENBQUM7SUFFakIscURBQXFEO0lBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQjs7Ozs7O0lBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEQsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUMsRUFBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7O0FBTUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVOzs7O0lBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7SUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBQyxDQUFDO0FBQ25HLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnZlcnRzIHN0cmluZ3MgZnJvbSBzb21ldGhpbmcgdG8gY2FtZWwgY2FzZVxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDQyNTI4Ny9jb252ZXJ0LWRhc2gtc2VwYXJhdGVkLXN0cmluZy10by1jYW1lbGNhc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFJlcGxhY2Ugc3BlY2lhbCBjaGFyYWN0ZXJzIHdpdGggYSBzcGFjZVxuICBzdHIgPSBzdHIucmVwbGFjZSgvW15hLXpBLVowLTkgXS9nLCAnICcpO1xuICAvLyBwdXQgYSBzcGFjZSBiZWZvcmUgYW4gdXBwZXJjYXNlIGxldHRlclxuICBzdHIgPSBzdHIucmVwbGFjZSgvKFthLXpdKD89W0EtWl0pKS9nLCAnJDEgJyk7XG5cbiAgLy8gTG93ZXIgY2FzZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHNvbWUgb3RoZXIgc3R1ZmZcbiAgc3RyID0gc3RyXG4gICAgLnJlcGxhY2UoLyhbXmEtekEtWjAtOSBdKXxeWzAtOV0rL2csICcnKVxuICAgIC50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKTtcblxuICAvLyB1cHBlcmNhc2UgY2hhcmFjdGVycyBwcmVjZWRlZCBieSBhIHNwYWNlIG9yIG51bWJlclxuICBzdHIgPSBzdHIucmVwbGFjZSgvKFsgMC05XSspKFthLXpBLVpdKS9nLCBmdW5jdGlvbihhLCBiLCBjKSB7XG4gICAgcmV0dXJuIGIudHJpbSgpICsgYy50b1VwcGVyQ2FzZSgpO1xuICB9KTtcblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHN0cmluZ3MgZnJvbSBjYW1lbCBjYXNlIHRvIHdvcmRzXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyMjU0MDcvY29udmVydC1jYW1lbGNhc2V0ZXh0LXRvLWNhbWVsLWNhc2UtdGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVDYW1lbENhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgbWF0Y2ggPT4gYCAke21hdGNofWApLnJlcGxhY2UoL14uLywgbWF0Y2ggPT4gbWF0Y2gudG9VcHBlckNhc2UoKSk7XG59XG4iXX0=