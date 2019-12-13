import { FrequencyCheck } from './Frequency';
import { Schedule, ScheduleInput } from './Schedule';
import { ScheduleModifier } from './ScheduleModifier';
import { Day, DayProperty, DayInput } from './Day';
import { Event } from './Event';
import { Time } from './Time';
/**
 * The class which takes user input and parses it to specific structures.
 */
export declare class Parse {
    /**
     * Parses a value and converts it to a [[FrequencyCheck]].
     *
     * @param input The input to parse into a function.
     * @param property The [[Day]] property the frequency is for.
     * @returns A function which determines whether a value matches a frequency.
     * @see [[Schedule]]
     */
    static frequency(input: any, property: DayProperty): FrequencyCheck;
    /**
     * Parses [[DayInput]] into a [[Day]] instance.
     *
     * ```typescript
     * Parse.day( 65342300 );               // UTC timestamp
     * Parse.day( '01/02/2014' );           // strings in many formats
     * Parse.day( day );                    // return a passed instance
     * Parse.day( [2018, 0, 2] );           // array: 01/02/2018
     * Parse.day( {year: 2018, month: 2} ); // object: 03/01/2018
     * Parse.day( true );                   // today
     * ```
     *
     * @param input The input to parse.
     * @returns The Day parsed or `null` if the value is not valid.
     */
    static day(input: DayInput): Day;
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * ```typescript
     * Parse.time( time );      // return a passed instance
     * Parse.time( 9 );         // 09:00:00.000
     * Parse.time( 3009 );      // 09:30:00.000
     * Parse.time( 593009 );    // 09:30:59.000
     * Parsetime( '09' );       // 09:00:00.000
     * Parse.time( '9:30' );    // 09:30:00.000
     * Parse.time( '9:30:59' ); // 09:30:59.000
     * Parse.time( {hour: 2} ); // 02:00:00.000
     * ```
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.fromIdentifier]]
     * @see [[Time.fromString]]
     */
    static time(input: any): Time;
    /**
     * Parses a value and tries to convert it to an array of Time instances.
     * If any of the given values are not a valid time value then the resulting
     * array will not contain a time instance.
     *
     * @param input The input to parse.
     * @returns A non-null array of time instances.
     * @see [[Parse.time]]
     */
    static times(input: any): Time[];
    /**
     * Parses an array of excluded days into a map of excluded days where the
     * array value and returned object key are [[Day.dayIdentifier]].
     *
     * ```typescript
     * Parse.modifier( [ 20180101, 20140506 ] );            // {'20180101': true, '20140506': true}
     * Parse.modifier( [ 20180101, Day.build(2014,4,6) ] ); // {'20180101': true, '20140506': true}
     * ```
     *
     * @param input The input to parse.
     * @param value The default value if the input given is an array of identifiers.
     * @param parseMeta A function to use to parse a modifier.
     * @param out The modifier to set the identifiers and values of and return.
     * @returns The object with identifier keys and `true` values.
     * @see [[Day.dayIdentifier]]
     */
    static modifier<T>(input: any, value: T, parseMeta?: (input: any) => T, out?: ScheduleModifier<T>): ScheduleModifier<T>;
    /**
     * Parses an object which specifies a schedule where events may or may not
     * repeat and they may be all day events or at specific times.
     *
     * @param input The input to parse into a schedule.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @param out The schedule to set the values of and return.
     * @returns An instance of the parsed [[Schedule]].
     */
    static schedule<M>(input: ScheduleInput<M> | Schedule<M>, parseMeta?: (input: any) => M, out?: Schedule<M>): Schedule<M>;
    /**
     * Parses an array of [[FrequencyCheck]] functions and returns an array of
     * functions for only the checks that were specified by the user.
     *
     * @param checks The array of check functions to filter through.
     * @returns The array of user specified checks.
     */
    static givenFrequency(checks: FrequencyCheck[]): FrequencyCheck[];
    /**
     * Parses [[EventInput]] and returns an [[Event]].
     *
     * @param input The input to parse.
     * @param parseData A function to use when parsing data input into the desired type.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @returns The parsed value.
     */
    static event<T, M>(input: any, parseData?: (input: any) => T, parseMeta?: (input: any) => M): Event<T, M>;
    /**
     * Parses a schedule from a CRON pattern. TODO
     */
    static cron<M>(pattern: string, out?: Schedule<M>): Schedule<M>;
}
