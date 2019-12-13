"use strict";
import { Functions as fn } from './Functions';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
/**
 * A class for detecting, parsing, and building identifiers to and from days.
 *
 * An identifier is a simple value which represents a span of time. It may
 * represent an entire year, a quarter (3 months) of a year, a week of a year,
 * a month in a year, a specific day of a month of a year, or a specific hour,
 * minute, day, and month of a year.
 *
 * For example:
 * - `2018`: The year 2018
 * - `201801`: January 2018
 * - `2014023`: The 23rd week of 2014
 * - `20170311`: March 11th, 2017
 * - `201406151651`: June 15th 2016 at 4:51 pm
 * - `'0525'`: Year 525 of the first age, Elrond and Elros are born
 */
export class Identifier {
    /**
     * Determines whether the given identifier is this type.
     *
     * @param id The identifier to test.
     * @returns `true` if the identifier is this type, otherwise `false`.
     */
    is(id) {
        return (id + '').length === this.getLength();
    }
    /**
     * Computes the identifier given values taken from a [[Day]].
     *
     * @param values The values to compute.
     * @returns The computed identifier.
     */
    compute(...values) {
        const scales = this.getScales();
        let total = 0;
        for (let i = 0; i < values.length; i++) {
            total += values[i] * scales[i];
        }
        return this.is(total) ? total : fn.padNumber(total, this.getLength());
    }
    /**
     * Decomputes the given identifier and returns values which describe a span
     * of time.
     *
     * @param id The identifier to decompute.
     * @returns The original values which computed the identifier.
     */
    decompute(id) {
        const scales = this.getScales();
        let total = fn.isNumber(id) ? id : parseInt(id);
        let values = [];
        for (let i = 0; i < scales.length - 1; i++) {
            let curr = scales[i + 0];
            let next = scales[i + 1];
            let mod = next / curr;
            let value = total % mod;
            values.push(value);
            total = Math.floor(total / mod);
        }
        values.push(total);
        return values;
    }
    /**
     * Finds which identifier type matches the given identifier, if any.
     *
     * @param id The identifier to find the type of.
     * @returns The found identifier type, otherwise `null` if none exists.
     */
    static find(id) {
        if (this.Time.is(id))
            return this.Time;
        if (this.Day.is(id))
            return this.Day;
        if (this.Week.is(id))
            return this.Week;
        if (this.Month.is(id))
            return this.Month;
        if (this.Year.is(id))
            return this.Year;
        return null;
    }
    /**
     * Determines whether the given time span `outer` contains the time span
     * `inner`.
     *
     * @param outer The potentially larger time span `inner` must be contained in.
     * @param inner The time span to test is contained inside `outer`.
     * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
     *    `false`.
     */
    static contains(outer, inner) {
        let outerString = outer + '';
        return (inner + '').substring(0, outerString.length) === outerString;
    }
}
/**
 * The identifier type for an hour of time on a specific day.
 */
Identifier.Time = null;
/**
 * The identifier type for a specific day.
 */
Identifier.Day = null;
/**
 * The identifier type for a specific week of a year.
 */
Identifier.Week = null;
/**
 * The identifier type for a specific month of a year.
 */
Identifier.Month = null;
/**
 * The identifier type for a specific quarter of a year.
 */
Identifier.Quarter = null;
/**
 * The identifier type for a specific year.
 */
Identifier.Year = null;
// YYYYMMddHHmm (12)
class IdentifierTime extends Identifier {
    getScales() {
        return IdentifierTime.SCALES;
    }
    getLength() {
        return IdentifierTime.LENGTH;
    }
    get(day) {
        return this.compute(day.minute, day.hour, day.dayOfMonth, day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            minute: values[0],
            hour: values[1],
            day: values[2],
            month: values[3] - 1,
            year: values[4]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, obj.month, obj.day, obj.hour, obj.minute);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfHour(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierTime.DESCRIBE_FORMAT_SHORT : IdentifierTime.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.timeIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day &&
          day.hour === obj.hour &&
          day.minute === obj.minute
        );
        */
    }
}
IdentifierTime.DESCRIBE_FORMAT_LONG = 'LLL';
IdentifierTime.DESCRIBE_FORMAT_SHORT = 'lll';
IdentifierTime.SCALES = [
    1 /* minute */,
    100 /* hour   */,
    10000 /* day    */,
    1000000 /* month  */,
    100000000 /* year   */
];
IdentifierTime.LENGTH = 12;
// YYYYMMdd (8)
class IdentifierDay extends Identifier {
    getScales() {
        return IdentifierDay.SCALES;
    }
    getLength() {
        return IdentifierDay.LENGTH;
    }
    get(day) {
        return this.compute(day.dayOfMonth, day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            day: values[0],
            month: values[1] - 1,
            year: values[2]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, obj.month, obj.day);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.end(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierDay.DESCRIBE_FORMAT_SHORT : IdentifierDay.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.dayIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day
        );
        */
    }
}
IdentifierDay.DESCRIBE_FORMAT_LONG = 'LL';
IdentifierDay.DESCRIBE_FORMAT_SHORT = 'll';
IdentifierDay.SCALES = [
    1 /* day     */,
    100 /* month   */,
    10000 /* year    */
];
IdentifierDay.LENGTH = 8;
// YYYY0ww (7)
class IdentifierWeek extends Identifier {
    getScales() {
        return IdentifierWeek.SCALES;
    }
    getLength() {
        return IdentifierWeek.LENGTH;
    }
    get(day) {
        return this.compute(day.week, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            week: values[0],
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, 0).withWeek(obj.week);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfWeek(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierWeek.DESCRIBE_FORMAT_SHORT : IdentifierWeek.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.weekIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.week === obj.week
        );
        */
    }
}
IdentifierWeek.DESCRIBE_FORMAT_LONG = 'wo [week of] YYYY';
IdentifierWeek.DESCRIBE_FORMAT_SHORT = 'wo [week of] YYYY';
IdentifierWeek.SCALES = [
    1 /* week   */,
    1000 /* year   */
];
IdentifierWeek.LENGTH = 7;
// YYYYMM (6)
class IdentifierMonth extends Identifier {
    getScales() {
        return IdentifierMonth.SCALES;
    }
    getLength() {
        return IdentifierMonth.LENGTH;
    }
    get(day) {
        return this.compute(day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            month: values[0] - 1,
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, obj.month);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfMonth(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierMonth.DESCRIBE_FORMAT_SHORT : IdentifierMonth.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.monthIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month
        );
        */
    }
}
IdentifierMonth.DESCRIBE_FORMAT_LONG = 'MMMM YYYY';
IdentifierMonth.DESCRIBE_FORMAT_SHORT = 'MMM YYYY';
IdentifierMonth.SCALES = [
    1 /* month  */,
    100 /* year   */
];
IdentifierMonth.LENGTH = 6;
// YYYYQ (5)
class IdentifierQuarter extends Identifier {
    getScales() {
        return IdentifierQuarter.SCALES;
    }
    getLength() {
        return IdentifierQuarter.LENGTH;
    }
    get(day) {
        return this.compute(day.quarter, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            quarter: values[0],
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, (obj.quarter - 1) * 3);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.relativeMonths(3).endOfMonth(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierQuarter.DESCRIBE_FORMAT_SHORT : IdentifierQuarter.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.quarterIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.quarter === obj.quarter
        );
        */
    }
}
IdentifierQuarter.DESCRIBE_FORMAT_LONG = 'Qo [quarter] YYYY';
IdentifierQuarter.DESCRIBE_FORMAT_SHORT = 'Qo [quarter] YYYY';
IdentifierQuarter.SCALES = [
    1 /* quarter  */,
    10 /* year   */
];
IdentifierQuarter.LENGTH = 5;
// YYYY (4)
class IdentifierYear extends Identifier {
    getScales() {
        return IdentifierYear.SCALES;
    }
    getLength() {
        return IdentifierYear.LENGTH;
    }
    get(day) {
        return this.compute(day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            year: values[0]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day.build(obj.year, 0);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfYear(endInclusive);
        return new DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? IdentifierYear.DESCRIBE_FORMAT_SHORT : IdentifierYear.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.year === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year
        );
        */
    }
}
IdentifierYear.DESCRIBE_FORMAT_LONG = 'YYYY';
IdentifierYear.DESCRIBE_FORMAT_SHORT = 'YYYY';
IdentifierYear.SCALES = [
    1 /* year  */
];
IdentifierYear.LENGTH = 4;
// Sets the Identifier types
Identifier.Time = new IdentifierTime();
Identifier.Day = new IdentifierDay();
Identifier.Week = new IdentifierWeek();
Identifier.Month = new IdentifierMonth();
Identifier.Quarter = new IdentifierQuarter();
Identifier.Year = new IdentifierYear();
//# sourceMappingURL=Identifier.js.map