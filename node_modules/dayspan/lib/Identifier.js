"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Identifier = (function () {
    function Identifier() {
    }
    /**
     * Determines whether the given identifier is this type.
     *
     * @param id The identifier to test.
     * @returns `true` if the identifier is this type, otherwise `false`.
     */
    Identifier.prototype.is = function (id) {
        return (id + '').length === this.getLength();
    };
    /**
     * Computes the identifier given values taken from a [[Day]].
     *
     * @param values The values to compute.
     * @returns The computed identifier.
     */
    Identifier.prototype.compute = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var scales = this.getScales();
        var total = 0;
        for (var i = 0; i < values.length; i++) {
            total += values[i] * scales[i];
        }
        return this.is(total) ? total : fn.padNumber(total, this.getLength());
    };
    /**
     * Decomputes the given identifier and returns values which describe a span
     * of time.
     *
     * @param id The identifier to decompute.
     * @returns The original values which computed the identifier.
     */
    Identifier.prototype.decompute = function (id) {
        var scales = this.getScales();
        var total = fn.isNumber(id) ? id : parseInt(id);
        var values = [];
        for (var i = 0; i < scales.length - 1; i++) {
            var curr = scales[i + 0];
            var next = scales[i + 1];
            var mod = next / curr;
            var value = total % mod;
            values.push(value);
            total = Math.floor(total / mod);
        }
        values.push(total);
        return values;
    };
    /**
     * Finds which identifier type matches the given identifier, if any.
     *
     * @param id The identifier to find the type of.
     * @returns The found identifier type, otherwise `null` if none exists.
     */
    Identifier.find = function (id) {
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
    };
    /**
     * Determines whether the given time span `outer` contains the time span
     * `inner`.
     *
     * @param outer The potentially larger time span `inner` must be contained in.
     * @param inner The time span to test is contained inside `outer`.
     * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
     *    `false`.
     */
    Identifier.contains = function (outer, inner) {
        var outerString = outer + '';
        return (inner + '').substring(0, outerString.length) === outerString;
    };
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
    return Identifier;
}());
export { Identifier };
// YYYYMMddHHmm (12)
var IdentifierTime = (function (_super) {
    __extends(IdentifierTime, _super);
    function IdentifierTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierTime.prototype.getScales = function () {
        return IdentifierTime.SCALES;
    };
    IdentifierTime.prototype.getLength = function () {
        return IdentifierTime.LENGTH;
    };
    IdentifierTime.prototype.get = function (day) {
        return this.compute(day.minute, day.hour, day.dayOfMonth, day.month + 1, day.year);
    };
    IdentifierTime.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            minute: values[0],
            hour: values[1],
            day: values[2],
            month: values[3] - 1,
            year: values[4]
        };
    };
    IdentifierTime.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, obj.month, obj.day, obj.hour, obj.minute);
        return start;
    };
    IdentifierTime.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfHour(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierTime.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierTime.DESCRIBE_FORMAT_SHORT : IdentifierTime.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierTime.prototype.matches = function (day, id) {
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
    };
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
    return IdentifierTime;
}(Identifier));
// YYYYMMdd (8)
var IdentifierDay = (function (_super) {
    __extends(IdentifierDay, _super);
    function IdentifierDay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierDay.prototype.getScales = function () {
        return IdentifierDay.SCALES;
    };
    IdentifierDay.prototype.getLength = function () {
        return IdentifierDay.LENGTH;
    };
    IdentifierDay.prototype.get = function (day) {
        return this.compute(day.dayOfMonth, day.month + 1, day.year);
    };
    IdentifierDay.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            day: values[0],
            month: values[1] - 1,
            year: values[2]
        };
    };
    IdentifierDay.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, obj.month, obj.day);
        return start;
    };
    IdentifierDay.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.end(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierDay.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierDay.DESCRIBE_FORMAT_SHORT : IdentifierDay.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierDay.prototype.matches = function (day, id) {
        return day.dayIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day
        );
        */
    };
    IdentifierDay.DESCRIBE_FORMAT_LONG = 'LL';
    IdentifierDay.DESCRIBE_FORMAT_SHORT = 'll';
    IdentifierDay.SCALES = [
        1 /* day     */,
        100 /* month   */,
        10000 /* year    */
    ];
    IdentifierDay.LENGTH = 8;
    return IdentifierDay;
}(Identifier));
// YYYY0ww (7)
var IdentifierWeek = (function (_super) {
    __extends(IdentifierWeek, _super);
    function IdentifierWeek() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierWeek.prototype.getScales = function () {
        return IdentifierWeek.SCALES;
    };
    IdentifierWeek.prototype.getLength = function () {
        return IdentifierWeek.LENGTH;
    };
    IdentifierWeek.prototype.get = function (day) {
        return this.compute(day.week, day.year);
    };
    IdentifierWeek.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            week: values[0],
            year: values[1]
        };
    };
    IdentifierWeek.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, 0).withWeek(obj.week);
        return start;
    };
    IdentifierWeek.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfWeek(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierWeek.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierWeek.DESCRIBE_FORMAT_SHORT : IdentifierWeek.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierWeek.prototype.matches = function (day, id) {
        return day.weekIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.week === obj.week
        );
        */
    };
    IdentifierWeek.DESCRIBE_FORMAT_LONG = 'wo [week of] YYYY';
    IdentifierWeek.DESCRIBE_FORMAT_SHORT = 'wo [week of] YYYY';
    IdentifierWeek.SCALES = [
        1 /* week   */,
        1000 /* year   */
    ];
    IdentifierWeek.LENGTH = 7;
    return IdentifierWeek;
}(Identifier));
// YYYYMM (6)
var IdentifierMonth = (function (_super) {
    __extends(IdentifierMonth, _super);
    function IdentifierMonth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierMonth.prototype.getScales = function () {
        return IdentifierMonth.SCALES;
    };
    IdentifierMonth.prototype.getLength = function () {
        return IdentifierMonth.LENGTH;
    };
    IdentifierMonth.prototype.get = function (day) {
        return this.compute(day.month + 1, day.year);
    };
    IdentifierMonth.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            month: values[0] - 1,
            year: values[1]
        };
    };
    IdentifierMonth.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, obj.month);
        return start;
    };
    IdentifierMonth.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfMonth(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierMonth.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierMonth.DESCRIBE_FORMAT_SHORT : IdentifierMonth.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierMonth.prototype.matches = function (day, id) {
        return day.monthIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month
        );
        */
    };
    IdentifierMonth.DESCRIBE_FORMAT_LONG = 'MMMM YYYY';
    IdentifierMonth.DESCRIBE_FORMAT_SHORT = 'MMM YYYY';
    IdentifierMonth.SCALES = [
        1 /* month  */,
        100 /* year   */
    ];
    IdentifierMonth.LENGTH = 6;
    return IdentifierMonth;
}(Identifier));
// YYYYQ (5)
var IdentifierQuarter = (function (_super) {
    __extends(IdentifierQuarter, _super);
    function IdentifierQuarter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierQuarter.prototype.getScales = function () {
        return IdentifierQuarter.SCALES;
    };
    IdentifierQuarter.prototype.getLength = function () {
        return IdentifierQuarter.LENGTH;
    };
    IdentifierQuarter.prototype.get = function (day) {
        return this.compute(day.quarter, day.year);
    };
    IdentifierQuarter.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            quarter: values[0],
            year: values[1]
        };
    };
    IdentifierQuarter.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, (obj.quarter - 1) * 3);
        return start;
    };
    IdentifierQuarter.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.relativeMonths(3).endOfMonth(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierQuarter.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierQuarter.DESCRIBE_FORMAT_SHORT : IdentifierQuarter.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierQuarter.prototype.matches = function (day, id) {
        return day.quarterIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.quarter === obj.quarter
        );
        */
    };
    IdentifierQuarter.DESCRIBE_FORMAT_LONG = 'Qo [quarter] YYYY';
    IdentifierQuarter.DESCRIBE_FORMAT_SHORT = 'Qo [quarter] YYYY';
    IdentifierQuarter.SCALES = [
        1 /* quarter  */,
        10 /* year   */
    ];
    IdentifierQuarter.LENGTH = 5;
    return IdentifierQuarter;
}(Identifier));
// YYYY (4)
var IdentifierYear = (function (_super) {
    __extends(IdentifierYear, _super);
    function IdentifierYear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdentifierYear.prototype.getScales = function () {
        return IdentifierYear.SCALES;
    };
    IdentifierYear.prototype.getLength = function () {
        return IdentifierYear.LENGTH;
    };
    IdentifierYear.prototype.get = function (day) {
        return this.compute(day.year);
    };
    IdentifierYear.prototype.object = function (id) {
        var values = this.decompute(id);
        return {
            year: values[0]
        };
    };
    IdentifierYear.prototype.start = function (id) {
        var obj = this.object(id);
        var start = Day.build(obj.year, 0);
        return start;
    };
    IdentifierYear.prototype.span = function (id, endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        var start = this.start(id);
        var end = start.endOfYear(endInclusive);
        return new DaySpan(start, end);
    };
    IdentifierYear.prototype.describe = function (id, short) {
        if (short === void 0) { short = false; }
        var start = this.start(id);
        var format = short ? IdentifierYear.DESCRIBE_FORMAT_SHORT : IdentifierYear.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    };
    IdentifierYear.prototype.matches = function (day, id) {
        return day.year === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year
        );
        */
    };
    IdentifierYear.DESCRIBE_FORMAT_LONG = 'YYYY';
    IdentifierYear.DESCRIBE_FORMAT_SHORT = 'YYYY';
    IdentifierYear.SCALES = [
        1 /* year  */
    ];
    IdentifierYear.LENGTH = 4;
    return IdentifierYear;
}(Identifier));
// Sets the Identifier types
Identifier.Time = new IdentifierTime();
Identifier.Day = new IdentifierDay();
Identifier.Week = new IdentifierWeek();
Identifier.Month = new IdentifierMonth();
Identifier.Quarter = new IdentifierQuarter();
Identifier.Year = new IdentifierYear();
//# sourceMappingURL=Identifier.js.map