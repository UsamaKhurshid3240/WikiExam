import { Day, DayProperty } from './Day';
import { FrequencyValueEvery, FrequencyValue } from './Frequency';
import { Schedule, ScheduleInput } from './Schedule';
/**
 * Describes a [[Pattern]] given a [[Day]] to base it on.
 *
 * @param day The day to base the description on.
 * @returns The description of the pattern.
 */
export declare type DescribePattern = (day: Day) => string;
/**
 * A rule helps parse [[ScheduleInput]] and determines whether it matches the
 * given pattern.
 *
 * - When a number is given, the input MUST be an array of the same length and contain any values.
 * - When an array of numbers is given, the input MUST be an array containing the same values.
 * - When a TRUE is given the input MUST contain that property and can be any value.
 * - When a FALSE is given the input MAY contain that property (optional).
 * - When a property is NOT specified, the input MUST NOT contain that property.
 * - When an object with every is given, the input must match the every and offset values (have the same frequency).
 */
export declare type PatternRule = number | number[] | boolean | FrequencyValueEvery;
/**
 * The set of rules you can specify for determining if a [[ScheduleInput]]
 * matches a pattern.
 */
export interface PatternRules {
    dayOfWeek?: PatternRule;
    dayOfMonth?: PatternRule;
    lastDayOfMonth?: PatternRule;
    dayOfYear?: PatternRule;
    month?: PatternRule;
    week?: PatternRule;
    year?: PatternRule;
    weekOfYear?: PatternRule;
    weekspanOfYear?: PatternRule;
    fullWeekOfYear?: PatternRule;
    lastWeekspanOfYear?: PatternRule;
    lastFullWeekOfYear?: PatternRule;
    weekOfMonth?: PatternRule;
    weekspanOfMonth?: PatternRule;
    fullWeekOfMonth?: PatternRule;
    lastWeekspanOfMonth?: PatternRule;
    lastFullWeekOfMonth?: PatternRule;
}
/**
 * A class which helps describe [[ScheduleInput]] if it matches a pattern.
 */
export declare class Pattern {
    /**
     * The properties in the [[ScheduleInput]] which are compared against the
     * rules of a pattern.
     */
    static PROPS: DayProperty[];
    /**
     * Whether this pattern should be "listed" or not. Visual schedulers may
     * provide a shortcut to describing and changing a [[Schedule]] through
     * patterns and any pattern where listed is `true` could be an option in a
     * list. The default patterns are all listed.
     */
    listed: boolean;
    /**
     * The function which describes this pattern given a [[Day]] to base it on.
     */
    describe: DescribePattern;
    /**
     * The name of this pattern. This is not typically displayed to a user, just
     * to uniquely identify a pattern.
     */
    name: string;
    /**
     * The rules for matching a pattern to a [[Schedule]] or applying a pattern to
     * a schedule.
     */
    rules: PatternRules;
    /**
     * Creates a new pattern.
     *
     * @param name The unique name of the pattern.
     * @param listed If the pattern is "listed" [[Pattern.listed]].
     * @param describe A function to describe the pattern given a [[Day]].
     * @param rules The rules which describe how to detect and apply the pattern
     *    to schedule input.
     */
    constructor(name: string, listed: boolean, describe: DescribePattern, rules: PatternRules);
    /**
     * Applies this pattern to a [[Schedule]] or [[ScheduleInput]] removing and
     * adding any necessary properties from the input to match this pattern -
     * based around the day provided.
     *
     * @param schedule The schedule to update to match this pattern.
     * @param day The day to base the schedule on.
     * @returns The reference to the input passed in.
     */
    apply<M, I extends ScheduleInput<M> | Schedule<M>>(schedule: I, day: Day): I;
    /**
     * Applies this pattern to any object provided they implement the
     * `setFrequency` and `removeFrequency` functions.
     *
     * @param day The day to base the schedule on.
     * @param setFrequency The function which sets the frequency on the object.
     * @param removeFrequency The function to remove a frequency from the object.
     */
    applyGeneric(day: Day, setFrequency: (property: DayProperty, frequency: any) => any, removeFrequency: (property: DayProperty) => any): void;
    /**
     * Determines whether the given [[Schedule]] or [[ScheduleInput]] matches this
     * pattern. Optionally a day can be provided to make sure the day matches the
     * schedule and pattern together.
     *
     * @param schedule The schedule input to test.
     * @param exactlyWith A day to further validate against for matching.
     * @returns `true` if the schedule was a match to this pattern with the
     *    day if one was provided, otherwise `false`.
     */
    isMatch<M, I extends ScheduleInput<M> | Schedule<M>>(schedule: I, exactlyWith?: Day): boolean;
    /**
     * Determines whether the given input matches this pattern. Optionally a day
     * can be provided to make sure the day matches the schedule and pattern
     * together.
     *
     * @param input The schedule input to test.
     * @param exactlyWith A day to further validate against for matching.
     * @returns `true` if the schedule input was a match to this pattern with the
     *    day if one was provided, otherwise `false`.
     */
    isMatchGeneric(getFrequency: (property: DayProperty) => FrequencyValue, exactlyWith?: Day): boolean;
    /**
     * Returns the pattern with the given name if one exists. If you add your own
     * patterns make sure to add them to [[PatternMap]].
     *
     * @param name The name of the pattern to return.
     * @return The instance to the pattern with the same name.
     */
    static withName(name: string): Pattern;
    /**
     * Finds a matching pattern to the given input searching through [[Patterns]]
     * for matches. Optionally it will only look at patterns where listed = `true`.
     *
     * @param input The schedule input to use.
     * @param listedOnly When `true` only patterns with [[Pattern.listed]] set to
     *    `true` will be looked at, otherwise all patterns are looked at.
     * @param exactlyWith  A day to further validate against for matching.
     * @see [[Pattern.isMatch]]
     */
    static findMatch<M, I extends ScheduleInput<M> | Schedule<M>>(input: I, listedOnly?: boolean, exactlyWith?: Day): Pattern;
}
/**
 * The list of patterns that can be searched through for matches to schedule
 * input.
 *
 * @see [[Pattern.findMatch]]
 */
export declare let Patterns: Pattern[];
/**
 * The map of patterns keyed by their name.
 *
 * @see [[Pattern.withName]]
 */
export declare let PatternMap: {
    [name: string]: Pattern;
};
