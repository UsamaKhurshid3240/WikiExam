"use strict";
/**
 * A class which takes a number and determines the suffix for that number.
 *
 * ```typescript
 * Suffix.CACHE[ 2 ];         // 2nd
 * Suffix.determine( 3 );     // rd
 * Suffix.get( 4 );           // th
 * Suffix.get( 4, true );     // 4th
 * ```
 */
var Suffix = (function () {
    function Suffix() {
    }
    Object.defineProperty(Suffix, "CACHE", {
        /**
         * The cache of number & suffix pairs.
         */
        get: function () {
            if (!this._CACHE) {
                this._CACHE = [];
                for (var i = 0; i <= this._CACHE_SIZE; i++) {
                    this._CACHE[i] = this.get(i, true);
                }
            }
            return this._CACHE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines the suffix for a given number.
     *
     * @param value The number to find the suffix for.
     * @returns The suffix determined.
     */
    Suffix.determine = function (value) {
        return value >= 11 && value <= 13 ? 'th' : this.MAP[value % this.MAP.length];
    };
    /**
     * Gets the suffix for a number and optionally appends it before the suffix.
     *
     * @param value The number to get the suffix for.
     * @param prepend When `true` the value is prepended to the suffix.
     * @returns The suffix or value & suffix pair determined.
     */
    Suffix.get = function (value, prepend) {
        if (prepend === void 0) { prepend = false; }
        var suffix = this.determine(value);
        return prepend ? value + suffix : suffix;
    };
    /**
     * The array of suffixes used.
     */
    Suffix.MAP = [
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
    ];
    /**
     * The number of values to store in the cache (inclusive).
     */
    Suffix._CACHE_SIZE = 366;
    return Suffix;
}());
export { Suffix };
//# sourceMappingURL=Suffix.js.map