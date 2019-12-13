"use strict";
/**
 * A class with [[SortEvent]] functions and functions which accept other
 * [[SortEvent]]s and return a new [[SortEvent]].
 *
 * ```typescript
 * // Sorts full day events first, then events in descending order based on start time.
 * Sorts.List([Sorts.FullDay, Sorts.Desc(Sorts.Start)]);
 * ```
 */
var Sorts = (function () {
    function Sorts() {
    }
    /**
     * Sorts the two events by their start time - the earliest event being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the start of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    Sorts.Start = function (a, b) {
        return a.time.start.time - b.time.start.time;
    };
    /**
     * Sorts the two events by their end time - the earliest to end being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the end of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    Sorts.End = function (a, b) {
        return a.time.end.time - b.time.end.time;
    };
    /**
     * Sorts the two events placing the full day events before the timed events.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns If both are timed or both are full day then `0` is returned,
     *    otherwise `-1` is returned if `a` is full day and `1` is returned if
     *    `b` is full day.
     * @see [[CalendarEvent.fullDay]]
     */
    Sorts.FullDay = function (a, b) {
        var af = a.fullDay ? 0 : 1;
        var bf = b.fullDay ? 0 : 1;
        return af - bf;
    };
    /**
     * Sorts the two events placing the shorter events before the longer events.
     * Full day or multiple day events actually take up a day and will be ordered
     * last.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in milliseconds between `a` and `b`.
     * @see [[CalendarEvent.time]]
     * @see [[DaySpan.millis]]
     */
    Sorts.Duration = function (a, b) {
        return a.time.millis() - b.time.millis();
    };
    /**
     * Returns a [[SortEvent]] that effectively orders the given sorter in the
     * opposite (often descending) order.
     *
     * @param sorter The sorter to reverse.
     * @returns A new sorter which reverses the one passed in.
     */
    Sorts.Desc = function (sorter) {
        return function (a, b) {
            return sorter(b, a);
        };
    };
    /**
     * Returns a [[SortEvent]] that orders the events based on a string in each
     * event. A function must be supplied which takes an event of type `T` and
     * returns a string.
     *
     * @param getString A function which returns a string from the event.
     * @returns A sorter which sorts strings alphabetically.
     */
    Sorts.Alphabetical = function (getString) {
        return function (a, b) {
            var as = getString(a.event) || '';
            var bs = getString(b.event) || '';
            return as.localeCompare(bs);
        };
    };
    /**
     * Returns a [[SortEvent]] that orders events based on a number in each event.
     * A function must be supplied which takes an event of type `T` and returns
     * a number.
     *
     * @param getOrder A function which returns a number from the event.
     * @returns A sorter which sorts events based on a number in ascending order.
     */
    Sorts.Ordered = function (getOrder) {
        return function (a, b) {
            var ao = getOrder(a.event);
            var bo = getOrder(b.event);
            return ao - bo;
        };
    };
    /**
     * Returns a [[SortEvent]] that orders events based on an array of sorters.
     * The first sorter which returns a non-zero result is used.
     *
     * @param sorters A list of sorting functions to test one at a time.
     * @returns A sorter which sorts based on a list of sorters.
     */
    Sorts.List = function (sorters) {
        return function (a, b) {
            for (var _i = 0, sorters_1 = sorters; _i < sorters_1.length; _i++) {
                var sorter = sorters_1[_i];
                var compare = sorter(a, b);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        };
    };
    return Sorts;
}());
export { Sorts };
//# sourceMappingURL=Sort.js.map