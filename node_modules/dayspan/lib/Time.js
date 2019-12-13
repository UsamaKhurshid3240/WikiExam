"use strict";
import { Functions as fn } from './Functions';
import { Constants } from './Constants';
import { Parse } from './Parse';
/**
 * A class which holds a specific time during in any day.
 */
var Time = (function () {
    /**
     * Creates a new Time instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     */
    function Time(hour, minute, second, millisecond) {
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
    }
    /**
     * Formats this time into a string. The following list describes the available
     * formatting patterns:
     *
     * ### Hour
     * - H: 0-23
     * - HH: 00-23
     * - h: 12,1-12,1-11
     * - hh: 12,01-12,01-11
     * - k: 1-24
     * - kk: 01-24
     * - a: am,pm
     * - A: AM,PM
     * ### Minute
     * - m: 0-59
     * - mm: 00-59
     * ### Second
     * - s: 0-59
     * - ss: 00-59
     * ### Millisecond
     * - S: 0-9
     * - SS: 00-99
     * - SSS: 000-999
     *
     * @param format The format to output.
     * @returns The formatted time.
     */
    Time.prototype.format = function (format) {
        var formatterEntries = Time.FORMATTERS;
        var out = '';
        for (var i = 0; i < format.length; i++) {
            var handled = false;
            for (var k = 0; k < formatterEntries.length && !handled; k++) {
                var entry = formatterEntries[k];
                var part = format.substring(i, i + entry.size);
                if (part.length === entry.size) {
                    var formatter = entry.formats[part];
                    if (formatter) {
                        out += formatter(this);
                        i += entry.size - 1;
                        handled = true;
                    }
                }
            }
            if (!handled) {
                out += format.charAt(i);
            }
        }
        return out;
    };
    /**
     * Determines whether this time is an exact match for the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the time matches this time, otherwise `false`.
     */
    Time.prototype.matches = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second &&
            this.millisecond === time.millisecond;
    };
    /**
     * Determines whether this time has the same hour as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour matches this hour, otherwise `false`.
     */
    Time.prototype.matchesHour = function (time) {
        return this.hour === time.hour;
    };
    /**
     * Determines whether this time has the same hour and minute as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour and minute matches, otherwise `false`.
     */
    Time.prototype.matchesMinute = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute;
    };
    /**
     * Determines whether this time has the same hour, minute, and second as the
     * given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour, minute, and second matches, otherwise
     *    `false`.
     */
    Time.prototype.matchesSecond = function (time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second;
    };
    /**
     * Sets the time of this instance to the same time of the given input.
     *
     * @param input The time to set this to.
     * @returns `true` if this time was set, otherwise `false` (invalid input).
     */
    Time.prototype.set = function (input) {
        var parsed = Time.parse(input);
        var valid = !!parsed;
        if (valid) {
            this.hour = parsed.hour;
            this.minute = parsed.minute;
            this.second = parsed.second;
            this.millisecond = parsed.millisecond;
        }
        return valid;
    };
    /**
     * @returns The number of milliseconds from the start of the day until this
     *  time.
     */
    Time.prototype.toMilliseconds = function () {
        return this.hour * Constants.MILLIS_IN_HOUR +
            this.minute * Constants.MILLIS_IN_MINUTE +
            this.second * Constants.MILLIS_IN_SECOND +
            this.millisecond;
    };
    /**
     * @returns The time formatted using the smallest format that completely
     *  represents this time.
     */
    Time.prototype.toString = function () {
        if (this.millisecond)
            return this.format('HH:mm:ss.SSS');
        if (this.second)
            return this.format('HH:mm:ss');
        if (this.minute)
            return this.format('HH:mm');
        return this.format('HH');
    };
    /**
     * @returns A unique identifier for this time. The number returned is in the
     *  following format: SSSssmmHH
     */
    Time.prototype.toIdentifier = function () {
        return this.hour +
            this.minute * 100 +
            this.second * 10000 +
            this.millisecond * 10000000;
    };
    /**
     * @returns An object with hour, minute, second, a millisecond properties if
     *  they are non-zero on this time.
     */
    Time.prototype.toObject = function () {
        var out = {
            hour: this.hour
        };
        if (this.minute)
            out.minute = this.minute;
        if (this.second)
            out.second = this.second;
        if (this.millisecond)
            out.millisecond = this.millisecond;
        return out;
    };
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Parse.time]]
     */
    Time.parse = function (input) {
        return Parse.time(input);
    };
    /**
     * Parses a string and converts it to a Time instance. If the string is not
     * in a valid format `null` is returned.
     *
     * @param time The string to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.REGEX]]
     */
    Time.fromString = function (time) {
        var matches = this.REGEX.exec(time);
        if (!matches) {
            return null;
        }
        var h = parseInt(matches[1]) || 0;
        var m = parseInt(matches[2]) || 0;
        var s = parseInt(matches[3]) || 0;
        var l = parseInt(matches[4]) || 0;
        return this.build(h, m, s, l);
    };
    /**
     * Parses a number and converts it to a Time instance. The number is assumed
     * to be in the [[Time.toIdentifier]] format.
     *
     * @param time The number to parse.
     * @returns The instance parsed.
     */
    Time.fromIdentifier = function (time) {
        var h = time % 100;
        var m = Math.floor(time / 100) % 100;
        var s = Math.floor(time / 10000) % 100;
        var l = Math.floor(time / 10000000) % 1000;
        return this.build(h, m, s, l);
    };
    /**
     * Returns a new instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     * @returns A new instance.
     */
    Time.build = function (hour, minute, second, millisecond) {
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return new Time(hour, minute, second, millisecond);
    };
    /**
     * The regular expression used to parse a time from a string.
     *
     * - ## = hour
     * - ##:## = hour & minute
     * - ##:##:## = hour, minute, & second
     * - ##:##:##.### = hour, minute, second, and milliseconds
     */
    Time.REGEX = /^(\d\d?):?(\d\d)?:?(\d\d)?\.?(\d\d\d)?$/;
    /**
     * A set of formatting functions keyed by their format string.
     */
    Time.FORMATTERS = [
        {
            size: 3,
            formats: {
                SSS: function (t) { return fn.padNumber(t.millisecond, 3); }
            }
        },
        {
            size: 2,
            formats: {
                HH: function (t) { return fn.padNumber(t.hour, 2); },
                hh: function (t) { return fn.padNumber((t.hour % 12) || 12, 2); },
                kk: function (t) { return fn.padNumber(t.hour + 1, 2); },
                mm: function (t) { return fn.padNumber(t.minute, 2); },
                ss: function (t) { return fn.padNumber(t.second, 2); },
                SS: function (t) { return fn.padNumber(t.millisecond, 3, 2); }
            }
        },
        {
            size: 1,
            formats: {
                A: function (t) { return t.hour < 12 ? 'AM' : 'PM'; },
                a: function (t) { return t.hour < 12 ? 'am' : 'pm'; },
                H: function (t) { return t.hour + ''; },
                h: function (t) { return ((t.hour % 12) || 12) + ''; },
                k: function (t) { return (t.hour + 1) + ''; },
                m: function (t) { return t.minute + ''; },
                s: function (t) { return t.second + ''; },
                S: function (t) { return fn.padNumber(t.millisecond, 3, 1); }
            }
        }
    ];
    return Time;
}());
export { Time };
//# sourceMappingURL=Time.js.map