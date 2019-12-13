"use strict";
import { Day } from './Day';
import { Op } from './Operation';
import { Units } from './Units';
import { Constants } from './Constants';
/**
 * A class for a range of time between two [[Day]] timestamps.
 */
var DaySpan = (function () {
    /**
     * Creates a new span of time.
     *
     * @param start The starting timestamp.
     * @param end The ending timestamp.
     */
    function DaySpan(start, end) {
        this.start = start;
        this.end = end;
    }
    Object.defineProperty(DaySpan.prototype, "isPoint", {
        /**
         * Whether this span starts and ends on the same timestamp.
         */
        get: function () {
            return this.start.time === this.end.time;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines whether the given timestamp lies between the start and end
     * timestamp.
     *
     * @param day The timestamp to test.
     * @returns True if the day is >= the start and <= the end of this span.
     */
    DaySpan.prototype.contains = function (day) {
        return day.time >= this.start.time && day.time <= this.end.time;
    };
    /**
     * Compares the given timestamp to this span. If the timestamp is before this
     * span then `-1` is returned, if the timestamp is after this span then `1`
     * us returned, otherwise `0` is returned when the timestamp is in this span.
     *
     * @param day The timestamp to compare to.
     * @returns `-1`, `0`, or `1` depending on the given timestamp relative to
     *    this span.
     */
    DaySpan.prototype.compareTo = function (day) {
        return day.time < this.start.time ? -1 : (day.time > this.end.time ? 1 : 0);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same day as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameDay]]
     */
    DaySpan.prototype.matchesDay = function (day) {
        return this.contains(day) || day.sameDay(this.start) || day.sameDay(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same week as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameWeek]]
     */
    DaySpan.prototype.matchesWeek = function (day) {
        return this.contains(day) || day.sameWeek(this.start) || day.sameWeek(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same month as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameMonth]]
     */
    DaySpan.prototype.matchesMonth = function (day) {
        return this.contains(day) || day.sameMonth(this.start) || day.sameMonth(this.end);
    };
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same year as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameYear]]
     */
    DaySpan.prototype.matchesYear = function (day) {
        return this.contains(day) || day.sameYear(this.start) || day.sameYear(this.end);
    };
    /**
     * Calculates the number of milliseconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.millisBetween]]
     */
    DaySpan.prototype.millis = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.millisBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of seconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.secondsBetween]]
     */
    DaySpan.prototype.seconds = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.secondsBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of minutes between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.minutesBetween]]
     */
    DaySpan.prototype.minutes = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.minutesBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of hours between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.hoursBetween]]
     */
    DaySpan.prototype.hours = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.hoursBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of days between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.daysBetween]]
     */
    DaySpan.prototype.days = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.daysBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of weeks between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.weeksBetween]]
     */
    DaySpan.prototype.weeks = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.weeksBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of months between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.monthsBetween]]
     */
    DaySpan.prototype.months = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.monthsBetween(this.end, op, absolute);
    };
    /**
     * Calculates the number of years between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.yearsBetween]]
     */
    DaySpan.prototype.years = function (op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return this.start.yearsBetween(this.end, op, absolute);
    };
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.start]] is relative to the given day. The delta value would
     * be less than 0 if the start of the event is before the given day.
     *
     * @param relativeTo The day to find the start delta relative to.
     * @return A number between 0 and 1 if the start of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    DaySpan.prototype.startDelta = function (relativeTo) {
        return (this.start.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    };
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.end]] is relative to the given day. The delta value would
     * be greater than 1 if the end of the event is after the given day.
     *
     * @param relativeTo The day to find the end delta relative to.
     * @return A number between 0 and 1 if the end of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    DaySpan.prototype.endDelta = function (relativeTo) {
        return (this.end.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    };
    /**
     * Calculates the bounds for span event if it were placed in a rectangle which
     * represents a day (24 hour period). By default the returned values are
     * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
     * rectangle dimensions can be passed to this function.
     *
     * @param relativeTo The day to find the bounds relative to. If this is not the
     *    start of the day the returned bounds is relative to the given time.
     * @param dayHeight The height of the rectangle of the day.
     * @param dayWidth The width of the rectangle of the day.
     * @param columnOffset The offset in the rectangle of the day to adjust this
     *    span by. This also reduces the width of the returned bounds to keep the
     *    bounds in the rectangle of the day.
     * @param clip `true` if the bounds should stay in the day rectangle, `false`
     *    and the bounds may go outside the rectangle of the day for multi-day
     *    spans.
     * @param offsetX How much to translate the left & right properties by.
     * @param offsetY How much to translate the top & bottom properties by.
     * @returns The calculated bounds for this span.
     */
    DaySpan.prototype.getBounds = function (relativeTo, dayHeight, dayWidth, columnOffset, clip, offsetX, offsetY) {
        if (dayHeight === void 0) { dayHeight = 1; }
        if (dayWidth === void 0) { dayWidth = 1; }
        if (columnOffset === void 0) { columnOffset = 0; }
        if (clip === void 0) { clip = true; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var startRaw = this.startDelta(relativeTo);
        var endRaw = this.endDelta(relativeTo);
        var start = clip ? Math.max(0, startRaw) : startRaw;
        var end = clip ? Math.min(1, endRaw) : endRaw;
        var left = columnOffset;
        var right = dayWidth - left;
        var top = start * dayHeight;
        var bottom = end * dayHeight;
        return {
            top: top + offsetY,
            bottom: bottom + offsetY,
            height: bottom - top,
            left: left + offsetX,
            right: right + offsetX,
            width: right
        };
    };
    /**
     * Summarizes this span given an approximate unit of time and a few other
     * options. If the start and end are on the same unit, a single value will
     * be returned. Otherwise a start and end will be returned with a `delimiter`.
     *
     * @param type The unit of time this span is for.
     * @param dayOfWeek When `true` the weekday of the start and end are included.
     * @param short When `true` the short form of weekdays and months will be used.
     * @param repeat When `true` the year will be repeated on the start and end
     *  timestamp even if they are the same year.
     * @param contextual When `true` the year will be hidden if it's the current
     *  year.
     * @param delimiter The string to separate the start and end timestamps with.
     * @returns The summary of this span.
     */
    DaySpan.prototype.summary = function (type, dayOfWeek, short, repeat, contextual, delimiter) {
        if (dayOfWeek === void 0) { dayOfWeek = true; }
        if (short === void 0) { short = false; }
        if (repeat === void 0) { repeat = false; }
        if (contextual === void 0) { contextual = true; }
        if (delimiter === void 0) { delimiter = ' - '; }
        var formats = DaySpan.SUMMARY_FORMATS[type];
        var today = Day.today();
        var showStartYear = !contextual || !this.start.sameYear(today);
        var showEndYear = !contextual || !this.end.sameYear(today);
        var start = this.start.format(formats(short, dayOfWeek, showStartYear));
        var end = this.end.format(formats(short, dayOfWeek, showEndYear));
        var summary = start;
        if (start !== end) {
            if (!repeat) {
                summary = this.start.format(formats(short, dayOfWeek, !this.start.sameYear(this.end)));
            }
            summary += delimiter;
            summary += end;
        }
        else {
            summary = start;
        }
        return summary;
    };
    /**
     * Determines whether the gven span intersects with this span.
     *
     * @param span The span to test.
     * @returns `true` if the spans intersect, otherwise `false`.
     */
    DaySpan.prototype.intersects = function (span) {
        return !(this.end.time < span.start.time ||
            this.start.time > span.end.time);
    };
    /**
     * Calculates the intersection between this span and the given span. If there
     * is no intersection between the two spans then `null` is returned.
     *
     * @param span The span to calculate the intersection with.
     * @returns The intersection or `null` if none exists.
     */
    DaySpan.prototype.intersection = function (span) {
        var start = this.start.max(span.start);
        var end = this.end.min(span.end);
        return start.isAfter(end) ? null : new DaySpan(start, end);
    };
    /**
     * Calculates the union between this span and the given span.
     *
     * @param span The span to calculate the union with.
     * @returns The union of the two spans.
     */
    DaySpan.prototype.union = function (span) {
        var start = this.start.min(span.start);
        var end = this.end.max(span.end);
        return new DaySpan(start, end);
    };
    /**
     * Returns a point [[DaySpan]] with the same start and end timestamp.
     *
     * @param day The timestamp which will be the start and end.
     * @returns The new instance.
     * @see [[DaySpan.isPoint]]
     */
    DaySpan.point = function (day) {
        return new DaySpan(day, day);
    };
    /**
     * Formatting functions which assist the [[DaySpan.summary]] function.
     */
    DaySpan.SUMMARY_FORMATS = (_a = {},
        _a[Units.DAY] = function (short, dayOfWeek, year) {
            return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
        },
        _a[Units.WEEK] = function (short, dayOfWeek, year) {
            return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
        },
        _a[Units.MONTH] = function (short, dayOfWeek, year) {
            return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
        },
        _a[Units.YEAR] = function (short, dayOfWeek, year) {
            return (year ? 'YYYY' : '');
        },
        _a);
    return DaySpan;
}());
export { DaySpan };
var _a;
//# sourceMappingURL=DaySpan.js.map