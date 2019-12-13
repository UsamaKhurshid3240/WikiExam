import { IdentifierInput } from './Identifier';
import { Op } from './Operation';
import { Time } from './Time';
import * as moment from 'moment';
/**
 * Valid durations that can be specified.
 */
export declare type DurationInput = moment.unitOfTime.DurationConstructor;
/**
 * All valid types which may be converted to a [[Day]] instance.
 *
 * - `number`: A UNIX timestamp.
 * - `string`: A string representation of a date.
 * - `Day`: An existing [[Day]] instance.
 * - `number[]`: An array of numbers specifying any of: [year, month, dayOfMonth, hour, minute, second, millisecond].
 * - `object`: An object with any of the following properties: year, month, dayOfMonth, hour, minute, second, millisecond.
 * - `true`: This will be interpreted as [[Day.today]]
 */
export declare type DayInput = number | string | Day | number[] | object | true;
/**
 * One of the properties on the [[Day]] object.
 */
export declare type DayProperty = keyof Day;
/**
 * A class which represents a point in time as
 */
export declare class Day {
    /**
     *
     */
    readonly date: moment.Moment;
    /**
     *
     */
    readonly time: number;
    /**
     *
     */
    readonly millis: number;
    /**
     *
     */
    readonly seconds: number;
    /**
     *
     */
    readonly minute: number;
    /**
     *
     */
    readonly hour: number;
    /**
     *
     */
    readonly month: number;
    /**
     *
     */
    readonly year: number;
    /**
     *
     */
    readonly quarter: number;
    /**
     *
     */
    readonly dayOfWeek: number;
    /**
     *
     */
    readonly dayOfMonth: number;
    /**
     *
     */
    readonly lastDayOfMonth: number;
    /**
     *
     */
    readonly dayOfYear: number;
    /**
     *
     */
    readonly week: number;
    /**
     *
     */
    readonly weekOfYear: number;
    /**
     *
     */
    readonly weekspanOfYear: number;
    /**
     *
     */
    readonly fullWeekOfYear: number;
    /**
     *
     */
    readonly lastWeekspanOfYear: number;
    /**
     *
     */
    readonly lastFullWeekOfYear: number;
    /**
     *
     */
    readonly weekOfMonth: number;
    /**
     *
     */
    readonly weekspanOfMonth: number;
    /**
     *
     */
    readonly fullWeekOfMonth: number;
    /**
     *
     */
    readonly lastWeekspanOfMonth: number;
    /**
     *
     */
    readonly lastFullWeekOfMonth: number;
    /**
     *
     */
    readonly timeIdentifier: IdentifierInput;
    /**
     *
     */
    readonly dayIdentifier: IdentifierInput;
    /**
     *
     */
    readonly weekIdentifier: IdentifierInput;
    /**
     *
     */
    readonly monthIdentifier: IdentifierInput;
    /**
     *
     */
    readonly quarterIdentifier: IdentifierInput;
    /**
     *
     */
    constructor(date: moment.Moment);
    /**
     *
     */
    sameDay(day: Day): boolean;
    /**
     *
     */
    sameMonth(day: Day): boolean;
    /**
     *
     */
    sameWeek(day: Day): boolean;
    /**
     *
     */
    sameYear(day: Day): boolean;
    /**
     *
     */
    sameQuarter(day: Day): boolean;
    /**
     *
     */
    sameHour(day: Day): boolean;
    /**
     *
     */
    sameMinute(day: Day): boolean;
    /**
     *
     */
    sameTime(time: Time): boolean;
    /**
     *
     */
    isBefore(day: Day, precision?: moment.unitOfTime.StartOf): boolean;
    /**
     *
     */
    isSameOrBefore(day: Day, precision?: moment.unitOfTime.StartOf): boolean;
    /**
     *
     */
    isAfter(day: Day, precision?: moment.unitOfTime.StartOf): boolean;
    /**
     *
     */
    isSameOrAfter(day: Day, precision?: moment.unitOfTime.StartOf): boolean;
    /**
     *
     */
    max(day: Day): Day;
    /**
     *
     */
    min(day: Day): Day;
    millisBetween(day: Day, op?: Op, absolute?: boolean): number;
    secondsBetween(day: Day, op?: Op, absolute?: boolean): number;
    minutesBetween(day: Day, op?: Op, absolute?: boolean): number;
    hoursBetween(day: Day, op?: Op, absolute?: boolean): number;
    daysBetween(day: Day, op?: Op, absolute?: boolean): number;
    weeksBetween(day: Day, op?: Op, absolute?: boolean): number;
    monthsBetween(day: Day, op?: Op, absolute?: boolean): number;
    yearsBetween(day: Day, op?: Op, absolute?: boolean): number;
    isBetween(start: Day, end: Day, inclusive?: boolean): boolean;
    mutate(mutator: (date: moment.Moment) => void): Day;
    add(amount: number, unit: string): Day;
    relative(millis: number): Day;
    relativeDays(days: number): Day;
    prev(days?: number): Day;
    next(days?: number): Day;
    withDayOfMonth(day: number): Day;
    withDayOfWeek(dayOfWeek: number): Day;
    withDayOfYear(dayOfYear: number): Day;
    withMonth(month: number): Day;
    relativeMonths(months: number): Day;
    prevMonth(months?: number): Day;
    nextMonth(months?: number): Day;
    withWeek(week: number, relativeWeek?: number): Day;
    withWeekOfYear(week: number): Day;
    withFullWeekOfYear(week: number): Day;
    withWeekspanOfYear(week: number): Day;
    withWeekOfMonth(week: number): Day;
    withWeekspanOfMonth(week: number): Day;
    withFullWeekOfMonth(week: number): Day;
    relativeWeeks(weeks: number): Day;
    prevWeek(weeks?: number): Day;
    nextWeek(weeks?: number): Day;
    withYear(year: number): Day;
    relativeYears(years: number): Day;
    prevYear(years?: number): Day;
    nextYear(years?: number): Day;
    withHour(hour: number): Day;
    relativeHours(hours: number): Day;
    prevHour(hours?: number): Day;
    nextHour(hours?: number): Day;
    withTimes(hour?: number, minute?: number, second?: number, millisecond?: number): Day;
    withTime(time: Time): Day;
    asTime(): Time;
    start(): Day;
    isStart(): boolean;
    end(inclusive?: boolean): Day;
    isEnd(): boolean;
    startOfHour(): Day;
    isStartOfHour(): boolean;
    endOfHour(inclusive?: boolean): Day;
    isEndOfHour(): boolean;
    startOfWeek(): Day;
    isStartOfWeek(): boolean;
    endOfWeek(inclusive?: boolean): Day;
    isEndOfWeek(): boolean;
    startOfMonth(): Day;
    isStartOfMonth(): boolean;
    endOfMonth(inclusive?: boolean): Day;
    isEndOfMonth(): boolean;
    startOfYear(): Day;
    isStartOfYear(): boolean;
    endOfYear(inclusive?: boolean): Day;
    isEndOfYear(): boolean;
    daysInMonth(): number;
    daysInYear(): number;
    weeksInYear(): number;
    format(format: string): string;
    utc(keepLocalTime?: boolean): Day;
    toMoment(): moment.Moment;
    toDate(): Date;
    toArray(): number[];
    toJSON(): string;
    toISOString(keepOffset?: boolean): string;
    toObject(): object;
    toString(): string;
    isDST(): boolean;
    isLeapYear(): boolean;
    static now(): Day;
    static today(): Day;
    static tomorrow(): Day;
    static fromMoment(moment: moment.Moment): Day;
    static unix(millis: number): Day;
    static unixSeconds(millis: number): Day;
    static parse(input: DayInput): Day;
    static fromString(input: string): Day;
    static fromFormat(input: string, formats: string | string[]): Day;
    static fromObject(input: object): Day;
    static fromDate(input: Date): Day;
    static fromArray(input: number[]): Day;
    static fromDayIdentifier(id: number): Day;
    static build(year: number, month: number, date?: number, hour?: number, minute?: number, second?: number, millisecond?: number): Day;
    static getWeekspanOfYear(date: moment.Moment): number;
    static getLastWeekspanOfYear(date: moment.Moment): number;
    static getWeekOfYear(date: moment.Moment): number;
    static getFullWeekOfYear(date: moment.Moment): number;
    static getLastFullWeekOfYear(date: moment.Moment): number;
    static getWeekspanOfMonth(date: moment.Moment): number;
    static getLastWeekspanOfMonth(date: moment.Moment): number;
    static getFullWeekOfMonth(date: moment.Moment): number;
    static getLastFullWeekOfMonth(date: moment.Moment): number;
    static getWeekOfMonth(date: moment.Moment): number;
    static getLastDayOfMonth(date: moment.Moment): number;
}
