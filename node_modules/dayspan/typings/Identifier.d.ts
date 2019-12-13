import { Day } from './Day';
import { DaySpan } from './DaySpan';
/**
 * The type for identifiers. Most of the time an identifier can be stored as a
 * number because the 4 digit year is first. However when the year is below
 * 1000 a string will be used with zero padding. Storing identifiers as numbers
 * enable very quick comparisons and using strings or numbers allows the
 * identifier to be used as a key to a map.
 */
export declare type IdentifierInput = number | string;
/**
 * The possible properties which can be pulled from an identifier.
 */
export interface IdentifierObject {
    /**
     * The year pulled from an identifier (0-9999).
     */
    year?: number;
    /**
     * The quarter of the year pulled from an identifier (1-4)
     */
    quarter?: number;
    /**
     * The month of the year pulled from an identifier (0-11)
     */
    month?: number;
    /**
     * The week of the year pulled from an identifier (1-52)
     */
    week?: number;
    /**
     * The day of the month pulled from an identifier (1-31)
     */
    day?: number;
    /**
     * The hour of the day pulled from an identifier (0-23)
     */
    hour?: number;
    /**
     * The minute of the hour pulled from an identifier (0-59)
     */
    minute?: number;
}
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
export declare abstract class Identifier {
    /**
     * Determines whether the given identifier is this type.
     *
     * @param id The identifier to test.
     * @returns `true` if the identifier is this type, otherwise `false`.
     */
    is(id: IdentifierInput): boolean;
    /**
     * Returns the identifier of this type for the given day,
     *
     * @param day The day to get the identifier of.
     * @returns The identifier for the day of this type.
     */
    abstract get(day: Day): IdentifierInput;
    /**
     * Converts the given identifier which has passed [[Identifier.is]] to an
     * object with properties pulled from the identifier.
     *
     * @param id The identifier to parse.
     * @returns The object with properties parsed from the identifer.
     */
    abstract object(id: IdentifierInput): IdentifierObject;
    /**
     * Returns the start of the time span the identifier represents.
     *
     * @param id The identifier to convert to a start day.
     * @returns The start of the time span the identifier represents.
     */
    abstract start(id: IdentifierInput): Day;
    /**
     * Returns the span of time the identifier represents.
     *
     * @param id The identifier to convert to a span.
     * @param endInclusive When `true` the end of the span will be the very last
     *    millisecond that represents the timespan, otherwise `false` the end
     *    will be the start of the very next span.
     * @returns
     */
    abstract span(id: IdentifierInput, endInclusive: boolean): DaySpan;
    /**
     * Determines if the day matches the given identifier.
     *
     * @param day The day to test.
     * @param id The identifier to compare to.
     * @returns `true` if the day exists in the time span represented by the
     *    identifier, otherwise `false`.
     */
    abstract matches(day: Day, id: IdentifierInput): boolean;
    /**
     * Describes the given identifier as a human friendly string.
     *
     * @param id The identifier to describe.
     * @param short If the description should use shorter language or longer.
     * @returns The human friendly string that describes the identifier.
     */
    abstract describe(id: IdentifierInput, short: boolean): string;
    /**
     * The scales for all the different values stored in an identifier.
     */
    protected abstract getScales(): number[];
    /**
     * The length of the identifier of this type in digits.
     */
    protected abstract getLength(): number;
    /**
     * Computes the identifier given values taken from a [[Day]].
     *
     * @param values The values to compute.
     * @returns The computed identifier.
     */
    protected compute(...values: number[]): IdentifierInput;
    /**
     * Decomputes the given identifier and returns values which describe a span
     * of time.
     *
     * @param id The identifier to decompute.
     * @returns The original values which computed the identifier.
     */
    protected decompute(id: IdentifierInput): number[];
    /**
     * The identifier type for an hour of time on a specific day.
     */
    static Time: Identifier;
    /**
     * The identifier type for a specific day.
     */
    static Day: Identifier;
    /**
     * The identifier type for a specific week of a year.
     */
    static Week: Identifier;
    /**
     * The identifier type for a specific month of a year.
     */
    static Month: Identifier;
    /**
     * The identifier type for a specific quarter of a year.
     */
    static Quarter: Identifier;
    /**
     * The identifier type for a specific year.
     */
    static Year: Identifier;
    /**
     * Finds which identifier type matches the given identifier, if any.
     *
     * @param id The identifier to find the type of.
     * @returns The found identifier type, otherwise `null` if none exists.
     */
    static find(id: IdentifierInput): Identifier;
    /**
     * Determines whether the given time span `outer` contains the time span
     * `inner`.
     *
     * @param outer The potentially larger time span `inner` must be contained in.
     * @param inner The time span to test is contained inside `outer`.
     * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
     *    `false`.
     */
    static contains(outer: IdentifierInput, inner: IdentifierInput): boolean;
}
