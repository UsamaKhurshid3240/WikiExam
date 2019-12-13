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
export class Sorts {
    /**
     * Sorts the two events by their start time - the earliest event being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the start of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    static Start(a, b) {
        return a.time.start.time - b.time.start.time;
    }
    /**
     * Sorts the two events by their end time - the earliest to end being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the end of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    static End(a, b) {
        return a.time.end.time - b.time.end.time;
    }
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
    static FullDay(a, b) {
        let af = a.fullDay ? 0 : 1;
        let bf = b.fullDay ? 0 : 1;
        return af - bf;
    }
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
    static Duration(a, b) {
        return a.time.millis() - b.time.millis();
    }
    /**
     * Returns a [[SortEvent]] that effectively orders the given sorter in the
     * opposite (often descending) order.
     *
     * @param sorter The sorter to reverse.
     * @returns A new sorter which reverses the one passed in.
     */
    static Desc(sorter) {
        return (a, b) => {
            return sorter(b, a);
        };
    }
    /**
     * Returns a [[SortEvent]] that orders the events based on a string in each
     * event. A function must be supplied which takes an event of type `T` and
     * returns a string.
     *
     * @param getString A function which returns a string from the event.
     * @returns A sorter which sorts strings alphabetically.
     */
    static Alphabetical(getString) {
        return (a, b) => {
            let as = getString(a.event) || '';
            let bs = getString(b.event) || '';
            return as.localeCompare(bs);
        };
    }
    /**
     * Returns a [[SortEvent]] that orders events based on a number in each event.
     * A function must be supplied which takes an event of type `T` and returns
     * a number.
     *
     * @param getOrder A function which returns a number from the event.
     * @returns A sorter which sorts events based on a number in ascending order.
     */
    static Ordered(getOrder) {
        return (a, b) => {
            let ao = getOrder(a.event);
            let bo = getOrder(b.event);
            return ao - bo;
        };
    }
    /**
     * Returns a [[SortEvent]] that orders events based on an array of sorters.
     * The first sorter which returns a non-zero result is used.
     *
     * @param sorters A list of sorting functions to test one at a time.
     * @returns A sorter which sorts based on a list of sorters.
     */
    static List(sorters) {
        return (a, b) => {
            for (let sorter of sorters) {
                let compare = sorter(a, b);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        };
    }
}
//# sourceMappingURL=Sort.js.map