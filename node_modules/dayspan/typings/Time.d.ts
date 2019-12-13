/**
 * A value that can possibly be parsed into a Time instance.
 *
 * @see [[Time.parse]]
 */
export declare type TimeInput = Time | number | string | {
    hour: number;
    minute?: number;
    second?: number;
    millisecond?: number;
};
/**
 * A class which holds a specific time during in any day.
 */
export declare class Time {
    /**
     * The regular expression used to parse a time from a string.
     *
     * - ## = hour
     * - ##:## = hour & minute
     * - ##:##:## = hour, minute, & second
     * - ##:##:##.### = hour, minute, second, and milliseconds
     */
    static REGEX: RegExp;
    /**
     * The hour between 0 and 23
     */
    hour: number;
    /**
     * The minute between 0 and 59
     */
    minute: number;
    /**
     * The second between 0 and 59
     */
    second: number;
    /**
     * The millisecond between 0 and 999
     */
    millisecond: number;
    /**
     * Creates a new Time instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     */
    constructor(hour: number, minute?: number, second?: number, millisecond?: number);
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
    format(format: string): string;
    /**
     * Determines whether this time is an exact match for the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the time matches this time, otherwise `false`.
     */
    matches(time: Time): boolean;
    /**
     * Determines whether this time has the same hour as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour matches this hour, otherwise `false`.
     */
    matchesHour(time: Time): boolean;
    /**
     * Determines whether this time has the same hour and minute as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour and minute matches, otherwise `false`.
     */
    matchesMinute(time: Time): boolean;
    /**
     * Determines whether this time has the same hour, minute, and second as the
     * given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour, minute, and second matches, otherwise
     *    `false`.
     */
    matchesSecond(time: Time): boolean;
    /**
     * Sets the time of this instance to the same time of the given input.
     *
     * @param input The time to set this to.
     * @returns `true` if this time was set, otherwise `false` (invalid input).
     */
    set(input: TimeInput): boolean;
    /**
     * @returns The number of milliseconds from the start of the day until this
     *  time.
     */
    toMilliseconds(): number;
    /**
     * @returns The time formatted using the smallest format that completely
     *  represents this time.
     */
    toString(): string;
    /**
     * @returns A unique identifier for this time. The number returned is in the
     *  following format: SSSssmmHH
     */
    toIdentifier(): number;
    /**
     * @returns An object with hour, minute, second, a millisecond properties if
     *  they are non-zero on this time.
     */
    toObject(): TimeInput;
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Parse.time]]
     */
    static parse(input: any): Time;
    /**
     * Parses a string and converts it to a Time instance. If the string is not
     * in a valid format `null` is returned.
     *
     * @param time The string to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.REGEX]]
     */
    static fromString(time: string): Time;
    /**
     * Parses a number and converts it to a Time instance. The number is assumed
     * to be in the [[Time.toIdentifier]] format.
     *
     * @param time The number to parse.
     * @returns The instance parsed.
     */
    static fromIdentifier(time: number): Time;
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
    static build(hour: number, minute?: number, second?: number, millisecond?: number): Time;
    /**
     * A set of formatting functions keyed by their format string.
     */
    static FORMATTERS: ({
        size: number;
        formats: {
            SSS: (t: Time) => string;
        };
    } | {
        size: number;
        formats: {
            HH: (t: Time) => string;
            hh: (t: Time) => string;
            kk: (t: Time) => string;
            mm: (t: Time) => string;
            ss: (t: Time) => string;
            SS: (t: Time) => string;
        };
    } | {
        size: number;
        formats: {
            A: (t: Time) => "AM" | "PM";
            a: (t: Time) => "am" | "pm";
            H: (t: Time) => string;
            h: (t: Time) => string;
            k: (t: Time) => string;
            m: (t: Time) => string;
            s: (t: Time) => string;
            S: (t: Time) => string;
        };
    })[];
}
