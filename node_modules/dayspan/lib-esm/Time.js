"use strict";
import { Functions as fn } from './Functions';
import { Constants } from './Constants';
import { Parse } from './Parse';
/**
 * A class which holds a specific time during in any day.
 */
export class Time {
    /**
     * Creates a new Time instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     */
    constructor(hour, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
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
    format(format) {
        let formatterEntries = Time.FORMATTERS;
        let out = '';
        for (let i = 0; i < format.length; i++) {
            let handled = false;
            for (let k = 0; k < formatterEntries.length && !handled; k++) {
                let entry = formatterEntries[k];
                let part = format.substring(i, i + entry.size);
                if (part.length === entry.size) {
                    let formatter = entry.formats[part];
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
    }
    /**
     * Determines whether this time is an exact match for the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the time matches this time, otherwise `false`.
     */
    matches(time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second &&
            this.millisecond === time.millisecond;
    }
    /**
     * Determines whether this time has the same hour as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour matches this hour, otherwise `false`.
     */
    matchesHour(time) {
        return this.hour === time.hour;
    }
    /**
     * Determines whether this time has the same hour and minute as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour and minute matches, otherwise `false`.
     */
    matchesMinute(time) {
        return this.hour === time.hour &&
            this.minute === time.minute;
    }
    /**
     * Determines whether this time has the same hour, minute, and second as the
     * given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour, minute, and second matches, otherwise
     *    `false`.
     */
    matchesSecond(time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second;
    }
    /**
     * Sets the time of this instance to the same time of the given input.
     *
     * @param input The time to set this to.
     * @returns `true` if this time was set, otherwise `false` (invalid input).
     */
    set(input) {
        let parsed = Time.parse(input);
        let valid = !!parsed;
        if (valid) {
            this.hour = parsed.hour;
            this.minute = parsed.minute;
            this.second = parsed.second;
            this.millisecond = parsed.millisecond;
        }
        return valid;
    }
    /**
     * @returns The number of milliseconds from the start of the day until this
     *  time.
     */
    toMilliseconds() {
        return this.hour * Constants.MILLIS_IN_HOUR +
            this.minute * Constants.MILLIS_IN_MINUTE +
            this.second * Constants.MILLIS_IN_SECOND +
            this.millisecond;
    }
    /**
     * @returns The time formatted using the smallest format that completely
     *  represents this time.
     */
    toString() {
        if (this.millisecond)
            return this.format('HH:mm:ss.SSS');
        if (this.second)
            return this.format('HH:mm:ss');
        if (this.minute)
            return this.format('HH:mm');
        return this.format('HH');
    }
    /**
     * @returns A unique identifier for this time. The number returned is in the
     *  following format: SSSssmmHH
     */
    toIdentifier() {
        return this.hour +
            this.minute * 100 +
            this.second * 10000 +
            this.millisecond * 10000000;
    }
    /**
     * @returns An object with hour, minute, second, a millisecond properties if
     *  they are non-zero on this time.
     */
    toObject() {
        let out = {
            hour: this.hour
        };
        if (this.minute)
            out.minute = this.minute;
        if (this.second)
            out.second = this.second;
        if (this.millisecond)
            out.millisecond = this.millisecond;
        return out;
    }
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Parse.time]]
     */
    static parse(input) {
        return Parse.time(input);
    }
    /**
     * Parses a string and converts it to a Time instance. If the string is not
     * in a valid format `null` is returned.
     *
     * @param time The string to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.REGEX]]
     */
    static fromString(time) {
        let matches = this.REGEX.exec(time);
        if (!matches) {
            return null;
        }
        let h = parseInt(matches[1]) || 0;
        let m = parseInt(matches[2]) || 0;
        let s = parseInt(matches[3]) || 0;
        let l = parseInt(matches[4]) || 0;
        return this.build(h, m, s, l);
    }
    /**
     * Parses a number and converts it to a Time instance. The number is assumed
     * to be in the [[Time.toIdentifier]] format.
     *
     * @param time The number to parse.
     * @returns The instance parsed.
     */
    static fromIdentifier(time) {
        let h = time % 100;
        let m = Math.floor(time / 100) % 100;
        let s = Math.floor(time / 10000) % 100;
        let l = Math.floor(time / 10000000) % 1000;
        return this.build(h, m, s, l);
    }
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
    static build(hour, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        return new Time(hour, minute, second, millisecond);
    }
}
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
            SSS: (t) => fn.padNumber(t.millisecond, 3)
        }
    },
    {
        size: 2,
        formats: {
            HH: (t) => fn.padNumber(t.hour, 2),
            hh: (t) => fn.padNumber((t.hour % 12) || 12, 2),
            kk: (t) => fn.padNumber(t.hour + 1, 2),
            mm: (t) => fn.padNumber(t.minute, 2),
            ss: (t) => fn.padNumber(t.second, 2),
            SS: (t) => fn.padNumber(t.millisecond, 3, 2)
        }
    },
    {
        size: 1,
        formats: {
            A: (t) => t.hour < 12 ? 'AM' : 'PM',
            a: (t) => t.hour < 12 ? 'am' : 'pm',
            H: (t) => t.hour + '',
            h: (t) => ((t.hour % 12) || 12) + '',
            k: (t) => (t.hour + 1) + '',
            m: (t) => t.minute + '',
            s: (t) => t.second + '',
            S: (t) => fn.padNumber(t.millisecond, 3, 1)
        }
    }
];
//# sourceMappingURL=Time.js.map