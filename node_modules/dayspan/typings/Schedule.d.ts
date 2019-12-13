import { FrequencyValue, FrequencyCheck } from './Frequency';
import { Day, DayInput, DurationInput, DayProperty } from './Day';
import { Identifier, IdentifierInput } from './Identifier';
import { DaySpan } from './DaySpan';
import { Time, TimeInput } from './Time';
import { ScheduleModifier } from './ScheduleModifier';
import { Iterator } from './Iterator';
/**
 * A tuple which identifies an event on the schedule. The tuple contains the
 * total span of the event occurrence, the day of the event (could be the start
 * day, end day, or any days in between for multi-day events) as well as the
 * identifier for the event.
 */
export declare type ScheduleEventTuple = [DaySpan, Day, IdentifierInput];
/**
 * Input given by a user which describes an event schedule.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
export interface ScheduleInput<M> {
    /**
     * @see [[Schedule.start]]
     */
    start?: DayInput;
    /**
     * @see [[Schedule.end]]
     */
    end?: DayInput;
    /**
     * A shortcut to setting the [[Schedule.start]], [[Schedule.end]],
     * [[Schedule.year]], [[Schedule.month]], and [[Schedule.dayOfMonth]].
     */
    on?: DayInput;
    /**
     * @see [[Schedule.times]]
     */
    times?: TimeInput[];
    /**
     * @see [[Schedule.duration]]
     */
    duration?: number;
    /**
     * @see [[Schedule.durationUnit]]
     */
    durationUnit?: DurationInput;
    /**
     * An array of days or identifiers which should be excluded from the schedule.
     *
     * @see [[Schedule.exclude]]
     */
    exclude?: (Day | IdentifierInput)[];
    /**
     * An array of days or identifiers which should be included in the schedule.
     *
     * @see [[Schedule.include]]
     */
    include?: (Day | IdentifierInput)[];
    /**
     * An array of days or identifiers which should be canceled in the schedule.
     *
     * @see [[Schedule.cancel]]
     */
    cancel?: (Day | IdentifierInput)[];
    /**
     * @see [[Schedule.meta]]
     */
    meta?: {
        [identifier: string]: M;
    };
    /**
     * @see [[Schedule.month]]
     */
    month?: FrequencyValue;
    /**
     * @see [[Schedule.year]]
     */
    year?: FrequencyValue;
    /**
     * @see [[Schedule.week]]
     */
    week?: FrequencyValue;
    /**
     * @see [[Schedule.dayOfWeek]]
     */
    dayOfWeek?: FrequencyValue;
    /**
     * @see [[Schedule.dayOfMonth]]
     */
    dayOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.lastDayOfMonth]]
     */
    lastDayOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.dayOfYear]]
     */
    dayOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.weekOfYear]]
     */
    weekOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.weekspanOfYear]]
     */
    weekspanOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.fullWeekOfYear]]
     */
    fullWeekOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.lastWeekspanOfYear]]
     */
    lastWeekspanOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.lastFullWeekOfYear]]
     */
    lastFullWeekOfYear?: FrequencyValue;
    /**
     * @see [[Schedule.weekOfMonth]]
     */
    weekOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.weekspanOfMonth]]
     */
    weekspanOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.fullWeekOfMonth]]
     */
    fullWeekOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.lastWeekspanOfMonth]]
     */
    lastWeekspanOfMonth?: FrequencyValue;
    /**
     * @see [[Schedule.lastFullWeekOfMonth]]
     */
    lastFullWeekOfMonth?: FrequencyValue;
    /**
     * The function to parse metadata with.
     */
    parseMeta?: (input: any) => M;
}
/**
 * A class which describes when an event occurs over what time and if it repeats.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
export declare class Schedule<M> {
    /**
     * The earliest an event can occur in the schedule, or `null` if there are no
     * restrictions when the earliest event can occur. This day is inclusive.
     */
    start: Day;
    /**
     * The latest an event can occur in the schedule, or `null` if there are no
     * restrictions when the latest event can occur. This day is inclusive.
     */
    end: Day;
    /**
     * The length of events in this schedule.
     */
    duration: number;
    /**
     * The unit which describes the duration of the event.
     */
    durationUnit: DurationInput;
    /**
     * The times at which the events occur on the days they should. If there are
     * no times specified its assumed to be an all day event - potentially over
     * multiple days or weeks based on [[Schedule.duration]] and
     * [[Schedule.durationUnit]].
     */
    times: Time[];
    /**
     * The number of days an event in this schedule lasts PAST the starting day.
     * If this is a full day event with a duration greater than zero this value
     * will be greater than one. If this event occurs at a specific time with a
     * given duration that is taken into account and if it passes over into the
     * next day this value will be greater than one. This value is used to look
     * back in time when trying to figure out what events start or overlap on a
     * given day.
     */
    durationInDays: number;
    /**
     * A set of identifiers which mark what days or times are excluded on the
     * schedule. This typically represents the set of event occurrences removed.
     */
    exclude: ScheduleModifier<boolean>;
    /**
     * A set of identifiers which mark what days or times are included outside
     * the normal series of days on the schedule. This typically represents
     * an event occurrence which is moved so its added to the exclude and include
     * sets.
     */
    include: ScheduleModifier<boolean>;
    /**
     * A set of identifiers which mark what days, times, weeks, months, etc that
     * should have all event occurrences cancelled.
     */
    cancel: ScheduleModifier<boolean>;
    /**
     * A map of metadata keyed by an identifier. The metadata is placed in
     * [[CalendarEvent]].
     */
    meta: ScheduleModifier<M>;
    /**
     * How frequent the event occurs based on [[Day.dayOfWeek]].
     */
    dayOfWeek: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.dayOfMonth]].
     */
    dayOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.lastDayOfMonth]].
     */
    lastDayOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.dayOfYear]].
     */
    dayOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.month]].
     */
    month: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.week]].
     */
    week: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.weekOfYear]].
     */
    weekOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.weekspanOfYear]].
     */
    weekspanOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.fullWeekOfYear]].
     */
    fullWeekOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.lastWeekspanOfYear]].
     */
    lastWeekspanOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.lastFullWeekOfYear]].
     */
    lastFullWeekOfYear: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.weekOfMonth]].
     */
    weekOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.weekspanOfMonth]].
     */
    weekspanOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.fullWeekOfMonth]].
     */
    fullWeekOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.lastWeekspanOfMonth]].
     */
    lastWeekspanOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.lastFullWeekOfMonth]].
     */
    lastFullWeekOfMonth: FrequencyCheck;
    /**
     * How frequent the event occurs based on [[Day.year]].
     */
    year: FrequencyCheck;
    /**
     * The array of frequency functions which had valid frequencies.
     *
     * @see [[FrequencyCheck.given]]
     */
    checks: FrequencyCheck[];
    /**
     * Creates a schedule based on the given input.
     *
     * @param input The input which describes the schedule of events.
     */
    constructor(input?: ScheduleInput<M>);
    /**
     * Sets the schedule with the given input.
     *
     * @param input The input or schedule which describes the schedule of events.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @see [[Parse.schedule]]
     */
    set(input: ScheduleInput<M> | Schedule<M>, parseMeta?: (input: any) => M): this;
    /**
     * Returns the last event time specified or `undefined` if this schedule is
     * for an all day event.
     */
    readonly lastTime: Time;
    /**
     * The [[Identifier]] for this schedule. Either [[Identifier.Day]] or
     * [[Identifier.Time]].
     */
    readonly identifierType: Identifier;
    /**
     * Updates the [[Schedule.durationInDays]] variable based on the
     * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
     * [[Schedule.durationUnit]].
     */
    updateDurationInDays(): this;
    /**
     * Updates [[Schedule.checks]] based on the frequencies that were specified
     * in the schedule input.
     */
    updateChecks(): this;
    /**
     * Determines whether the given day lies between the earliest and latest
     * valid day in the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day lies in the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    matchesSpan(day: Day): boolean;
    /**
     * Determines whether the given range overlaps with the earliest and latest
     * valid days in this schedule (if any).
     *
     * @param start The first day in the range.
     * @param end The last day in the range.
     * @returns `true` if the range intersects with the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    matchesRange(start: Day, end: Day): boolean;
    /**
     * Determines whether the given day is explicitly excluded in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was excluded, otherwise `false`.
     */
    isExcluded(day: Day, lookAtTime?: boolean): boolean;
    /**
     * Determines whether the given day is explicitly included in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day is NOT explicitly included, otherwise `false`.
     */
    isIncluded(day: Day, lookAtTime?: boolean): boolean;
    /**
     * Determines whether the given day is cancelled in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was cancelled, otherwise `false`.
     */
    isCancelled(day: Day, lookAtTime?: boolean): boolean;
    /**
     * Returns the metadata for the given day or `null` if there is none.
     *
     * @param day The day to return the metadata for.
     * @param otherwise The data to return if none exists for the given day.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns The metadata or `null`.
     */
    getMeta(day: Day, otherwise?: M, lookAtTime?: boolean): M;
    /**
     * Returns all metadata for the given day or an empty array if there is none.
     *
     * @param day The day to return the metadata for.
     * @returns The array of metadata ordered by priority or an empty array.
     */
    getMetas(day: Day): M[];
    /**
     * Returns whether the events in the schedule are all day long or start at
     * specific times. Full day events start at the start of the day and end at
     * the start of the next day (if the duration = `1` and durationUnit = 'days').
     * Full day events have no times specified and should have a durationUnit of
     * either `days` or `weeks`.
     */
    isFullDay(): boolean;
    /**
     * Sets whether this schedule is a full day event if it is not already. If
     * this schedule is a full day event and `false` is passed to this function
     * a single timed event will be added based on `defaultTime`. If this schedule
     * has timed events and `true` is passed to make the schedule full day, the
     * timed events are removed from this schedule. If the durationUnit is not the
     * expected unit based on the new full day flag - the duration is reset to 1
     * and the duration unit is set to the expected unit.
     *
     * @param fullDay Whether this schedule should represent a full day event or
     *    timed events.
     * @param defaultTime If `fullDay` is `false` and this schedule is currently
     *    a full day event - this time will be used as the time of the first event.
     */
    setFullDay(fullDay?: boolean, defaultTime?: TimeInput): this;
    /**
     * Adjusts the [[Schedule.start]] and [[Schedule.end]] dates specified on this
     * schedule if this schedule represents a single event and the `start` and
     * `end` are already set or `addSpan` is `true`.
     *
     * @param addSpan If `true`, the `start` and `end` dates will always be
     *    adjusted if this schedule is a single event.
     */
    adjustDefinedSpan(addSpan?: boolean): this;
    /**
     * Returns a span of time for a schedule with full day events starting on the
     * start of the given day with the desired duration in days or weeks.
     *
     * @param day The day the span starts on.
     * @returns The span of time starting on the given day.
     */
    getFullSpan(day: Day): DaySpan;
    /**
     * Returns a span of time starting on the given day at the given day with the
     * duration specified on this schedule.
     *
     * @param day The day the span starts on.
     * @param time The time of day the span starts.
     * @returns The span of time calculated.
     */
    getTimeSpan(day: Day, time: Time): DaySpan;
    /**
     * Determines whether the given day is a day on the schedule for the start
     * of an event. If an event is more than one day and the day given is not the
     * start this may return `false`. This does not test for event instances
     * that exist through [[Schedule.include]].
     *
     * @param day The day to test.
     * @returns `true` if the day marks the start of an event on the schedule.
     * @see [[Schedule.isIncluded]]
     * @see [[Schedule.isFullyExcluded]]
     * @see [[Schedule.matchesSpan]]
     */
    matchesDay(day: Day): boolean;
    /**
     * Determines whether the given day has events added through
     * [[Schedule.include]].
     *
     * @param day The day to look for included times on.
     * @returns `true` if there are included event instances on the given day,
     *    otherwise `false`.
     */
    hasIncludedTime(day: Day): boolean;
    /**
     * Determines whether the given day is fully excluded from the schedule. A
     * fully excluded day is one that has a day-wide exclusion, or the schedule
     * is not an all-day event and all times in the schedule are specifically
     * excluded.
     *
     * @param day The day to test.*
     * @returns `true` if he day is fully excluded, otherwise `false`.
     */
    isFullyExcluded(day: Day): boolean;
    /**
     * Finds the next day an event occurs on the schedule given a day to start,
     * optionally including it, and a maximum number of days to look ahead.
     *
     * @param day The day to start to search from.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look ahead from the given
     *     day for event occurrences.
     * @returns The next day on the schedule or `null` if none exists.
     */
    nextDay(day: Day, includeDay?: boolean, lookAhead?: number): Day;
    /**
     * Finds the next specified number of days that events occur on the schedule
     * given a day to start, optionally including it, and a maximum number of days
     * to look ahead.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to return in the result.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look ahead from the given
     *     day for event occurrences.
     * @returns An array containing the next days on the schedule that events
     *    start or an empty array if there are none.
     */
    nextDays(day: Day, max: number, includeDay?: boolean, lookAhead?: number): Iterator<Day>;
    /**
     * Finds the previous day an event occurs on the schedule given a day to start,
     * optionally including it, and a maximum number of days to look behind.
     *
     * @param day The day to start to search from.
     * @param includeDay If the given day should be included in the search.
     * @param lookBack The maximum number of days to look behind from the given
     *     day for event occurrences.
     * @returns The previous day on the schedule or `null` if none exists.
     */
    prevDay(day: Day, includeDay?: boolean, lookBack?: number): Day;
    /**
     * Finds the previous specified number of days that events occur on the
     * schedule given a day to start, optionally including it, and a maximum
     * number of days to look behind.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to return in the result.
     * @param includeDay If the given day should be included in the search.
     * @param lookAhead The maximum number of days to look behind from the given
     *     day for event occurrences.
     * @returns An array containing the previous days on the schedule that events
     *    start or an empty array if there are none.
     */
    prevDays(day: Day, max: number, includeDay?: boolean, lookBack?: number): Iterator<Day>;
    /**
     * Iterates over days that events start in the schedule given a day to start,
     * a maximum number of days to find, and a direction to look.
     *
     * @param day The day to start to search from.
     * @param max The maximum number of days to iterate.
     * @param next If `true` this searches forward, otherwise `false` is backwards.
     * @param includeDay If the given day should be included in the search.
     * @param lookup The maximum number of days to look through from the given
     *     day for event occurrences.
     * @returns A new Iterator for the days found in the cast.
     * @see [[Schedule.iterateSpans]]
     */
    iterateDaycast(day: Day, max: number, next: boolean, includeDay?: boolean, lookup?: number): Iterator<Day>;
    /**
     * Iterates through the spans (event instances) that start on or covers the
     * given day.
     *
     * @param day The day to look for spans on.
     * @param covers If `true` spans which span multiple days will be looked at
     *    to see if they intersect with the given day, otherwise `false` will
     *    only look at the given day for the start of events.
     * @returns A new Iterator for all the spans found.
     */
    iterateSpans(day: Day, covers?: boolean): Iterator<DaySpan>;
    /**
     * Determines if the given day is on the schedule and the time specified on
     * the day matches one of the times on the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day and time match the schedule, otherwise false.
     */
    matchesTime(day: Day): boolean;
    /**
     * Determines if the given day is covered by this schedule. A schedule can
     * specify events that span multiple days - so even though the day does not
     * match the starting day of a span - it can be a day that is within the
     * schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day is covered by an event on this schedule,
     *    otherwise `false`.
     */
    coversDay(day: Day): boolean;
    /**
     * Determines if the given timestamp lies in an event occurrence on this
     * schedule.
     *
     * @param day The timestamp to test against the schedule.
     * @return `true` if the timestamp lies in an event occurrent start and end
     *    timestamps, otherwise `false`.
     */
    coversTime(day: Day): boolean;
    /**
     * Sets the frequency for the given property. This does not update the
     * [[Schedule.checks]] array, the [[Schedule.updateChecks]] function needs
     * to be called.
     *
     * @param property The frequency to update.
     * @param frequency The new frequency.
     */
    setFrequency(property: DayProperty, frequency?: FrequencyValue): this;
    /**
     * Changes the exclusion status of the event at the given time. By default
     * this excludes this event - but `false`  may be passed to undo an exclusion.
     *
     * @param time The start time of the event occurrence to exclude or include.
     * @param excluded Whether the event should be excluded.
     */
    setExcluded(time: Day, excluded?: boolean): this;
    /**
     * Changes the cancellation status of the event at the given start time. By
     * default this cancels the event occurrence - but `false` may be passed to
     * undo a cancellation.
     *
     * @param time The start time of the event occurrence to cancel or uncancel.
     * @param cancelled Whether the event should be cancelled.
     */
    setCancelled(time: Day, cancelled?: boolean): this;
    /**
     * Removes the time from this schedule and all related included, excluded,
     * cancelled instances as well as metadata.
     *
     * @param time The time to remove from the schedule.
     * @param removeInclude If any included instances should be removed as well.
     * @returns `true` if the time was removed, otherwise `false`.
     */
    removeTime(time: Time, removeInclude?: boolean): boolean;
    /**
     * Moves the event instance starting at `fromTime` to `toTime` optionally
     * placing `meta` in the schedules metadata for the new time `toTime`.
     * If this schedule has a single event ([[Schedule.isSingleEvent]]) then the
     * only value needed is `toTime` and not `fromTime`.
     *
     * @param toTime The timestamp of the new event.
     * @param fromTime The timestamp of the event on the schedule to move if this
     *    schedule generates multiple events.
     * @returns `true` if the schedule had the event moved, otherwise `false`.
     */
    move(toTime: Day, fromTime?: Day, meta?: M): boolean;
    /**
     * Moves a time specified in this schedule to the given time, adjusting
     * any cancelled event instances, metadata, and any excluded and included
     * event instances.
     *
     * @param fromTime The time to move.
     * @param toTime The new time in the schedule.
     * @returns `true` if time was moved, otherwise `false`.
     */
    moveTime(fromTime: Time, toTime: Time): boolean;
    /**
     * Moves the event instance starting at `fromTime` to `toTime` optionally
     * placing `meta` in the schedules metadata for the new time `toTime`. A move
     * is accomplished by excluding the current event and adding an inclusion of
     * the new day & time.
     *
     * @param fromTime The timestamp of the event on the schedule to move.
     * @param toTime The timestamp of the new event.
     * @returns `true`.
     * @see [[Schedule.move]]
     */
    moveInstance(fromTime: Day, toTime: Day): boolean;
    /**
     * Moves the single event in this schedule to the given day/time if applicable.
     * If this schedule is not a single event schedule then `false` is returned.
     * If this schedule is a timed event the time will take the time of the given
     * `toTime` of `takeTime` is `true`.
     *
     * @param toTime The time to move the single event to.
     * @param takeTime If this schedule has a single timed event, should the time
     *    of the event be changed to the time of the given `toTime`?
     * @returns `true` if the schedule was adjusted, otherwise `false`.
     * @see [[Schedule.move]]
     */
    moveSingleEvent(toTime: Day, takeTime?: boolean): boolean;
    /**
     * Returns the span of the single event in this schedule if it's that type of
     * schedule, otherwise `null` is returned.
     *
     * @returns A span of the single event, otherwise `null`.
     * @see [[Schedule.isSingleEvent]]
     */
    getSingleEventSpan(): DaySpan;
    /**
     * Determines whether this schedule produces a single event, and no more.
     * If this schedule has any includes, it's assumed to be a multiple event
     * schedule. A single event can be detected in the following scenarios where
     * each frequency has a single occurrence (see [[Schedule.isSingleFrequency]]).
     *
     * - year, day of year
     * - year, month, day of month
     * - year, month, week of month, day of week
     * - year, week of year, day of week
     *
     * @returns `true` if this schedule produces a single event, otherwise `false`.
     */
    isSingleEvent(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific year.
     * @see [[Schedule.year]]
     */
    isSingleYear(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific month.
     * @see [[Schedule.month]]
     */
    isSingleMonth(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the month.
     * @see [[Schedule.dayOfMonth]]
     * @see [[Schedule.lastDayOfMonth]]
     */
    isSingleDayOfMonth(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the week.
     * @see [[Schedule.dayOfWeek]]
     */
    isSingleDayOfWeek(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the year.
     * @see [[Schedule.dayOfYear]]
     */
    isSingleDayOfYear(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the month.
     * @see [[Schedule.weekspanOfMonth]]
     * @see [[Schedule.fullWeekOfMonth]]
     * @see [[Schedule.weekOfMonth]]
     * @see [[Schedule.lastFullWeekOfMonth]]
     * @see [[Schedule.lastWeekspanOfMonth]]
     */
    isSingleWeekOfMonth(): boolean;
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the year.
     * @see [[Schedule.weekspanOfYear]]
     * @see [[Schedule.fullWeekOfYear]]
     * @see [[Schedule.week]]
     * @see [[Schedule.weekOfYear]]
     * @see [[Schedule.lastFullWeekOfYear]]
     * @see [[Schedule.lastWeekspanOfYear]]
     */
    isSingleWeekOfYear(): boolean;
    /**
     * Determines if the given [[FrequencyCheck]] results in a single occurrence.
     *
     * @returns `true` if the frequency results in a single event, otherwise `false`.
     */
    isSingleFrequency(frequency: FrequencyCheck): boolean;
    /**
     * Creates a forecast for this schedule which returns a number of event
     * occurrences around a given day. A single item could be returned per day, or
     * you could get an item for each timed event occurrence.
     *
     * @param around The day to find a forecast around.
     * @param covers If `true` spans which span multiple days will be looked at
     *    to see if they intersect with the given day, otherwise `false` will
     *    only look at the given day for the start of events.
     * @param daysAfter The number of events to return before the given day.
     * @param daysBefore The number of events to return after the given day.
     * @param times If timed events should be returned, or only one for each day.
     * @param lookAround How many days to look before and after the given day for
     *    event occurrences.
     * @returns A new iterator which provides the event occurence span, the day it
     *    starts (or is covered if `covers` is `true`), and the identifier for the
     *    event.
     */
    forecast(around: Day, covers: boolean, daysAfter: number, daysBefore?: number, times?: boolean, lookAround?: number): Iterator<ScheduleEventTuple>;
    /**
     * Iterates timed events that were explicitly specified on the given day.
     * Those events could span multiple days so may be tested against another day.
     *
     * @param day The day to look for included timed events.
     * @param matchAgainst The day to test against the timed event.
     * @returns A new Iterator for all the included spans found.
     */
    iterateIncludeTimes(day: Day, matchAgainst?: Day): Iterator<DaySpan>;
    /**
     * Clones this schedule.
     *
     * @returns A new schedule which matches this schedule.
     */
    clone(): Schedule<M>;
    /**
     * Converts the schedule instance back into input.
     *
     * @param returnDays When `true` the start, end, and array of exclusions will
     *    have [[Day]] instances, otherwise the UTC timestamp and dayIdentifiers
     *    will be used when `false`.
     * @param returnTimes When `true` the times returned in the input will be
     *    instances of [[Time]] otherwise the `timeFormat` is used to convert the
     *    times to strings.
     * @param timeFormat The time format to use when returning the times as strings.
     * @param alwaysDuration If the duration values (`duration` and
     *    `durationUnit`) should always be returned in the input.
     * @returns The input that describes this schedule.
     * @see [[Time.format]]
     */
    toInput(returnDays?: boolean, returnTimes?: boolean, timeFormat?: string, alwaysDuration?: boolean): ScheduleInput<M>;
    /**
     * Describes the schedule in a human friendly string taking into account all
     * possible values specified in this schedule.
     *
     * @param thing A brief description of the things (events) on the schedule.
     * @param includeRange When `true` the [[Schedule.start]] and [[Schedule.end]]
     *    are possibly included in the description if they have values.
     * @param includeTimes When `true` the [[Schedule.times]] are possibly included
     *    in the description.
     * @param includeDuration When `true` the [[Schedule.duration]] and
     *    [[Schedule.durationUnit]] are added to the description if
     *    [[Schedule.duration]] is not equal to `1`.
     * @param includeExcludes When `true` the [[Schedule.exclude]] are added
     *    to the description if there are any.
     * @param includeIncludes When `true` the [[Schedule.include]] are added
     *    to the description if there are any.
     * @param includeCancels When `true` the [[Schedule.cancel]] are added
     *    to the description if there are any.
     * @returns The descroption of the schedule.
     */
    describe(thing?: string, includeRange?: boolean, includeTimes?: boolean, includeDuration?: boolean, includeExcludes?: boolean, includeIncludes?: boolean, includeCancels?: boolean): string;
    /**
     * Describes the given frequency.
     *
     * @param value The frequency to describe.
     * @param unit The unit of the frequency.
     * @param map How the values in the frequency should be described.
     * @param everyOffset A value to add to a [[FrequencyValueEvery]] offset to
     *    account for zero-based values that should be shifted for human
     *    friendliness.
     * @param the If the word 'the' should be used to describe the unit.
     * @param on The word which preceeds values of the given unit.
     * @param required If the description should always return a non-empty string
     *    even if the frequency was not specified in the original input.
     * @returns A string description of the frequency.
     */
    private describeRule(value, unit, map, everyOffset?, the?, on?, required?);
    /**
     * Describes the array by adding commas where appropriate and 'and' before the
     * last value of the array (if its more than `1`).
     *
     * @param array The array of items to describe.
     * @param map The function which converts an item to a string.
     * @returns The final description of the array items.
     */
    private describeArray<T>(array, map);
    /**
     * Generates a schedule for an event which occurs once all day for a given day
     * optionally spanning multiple days starting on the given day.
     *
     * @param input The day the event starts.
     * @param days The number of days the event lasts.
     * @returns A new schedule that starts on the given day.
     */
    static forDay<M>(input: DayInput, days?: number): Schedule<M>;
    /**
     * Generates a schedule for an event which occurs once at a given time on a
     * given day optionally spanning any amount of time (default is 1 hour).
     *
     * @param input The day the event starts.
     * @param time The time the event starts.
     * @param duration The duration of the event.
     * @param durationUnit The unit for the duration of the event.
     * @returns A new schedule that starts on the given day and time.
     */
    static forTime<M>(input: DayInput, time: TimeInput, duration?: number, durationUnit?: DurationInput): Schedule<M>;
    /**
     * Generates a schedule for an event which occurs once over a given span.
     *
     * @param span The span of the event.
     * @returns A new schedule that starts and ends at the given timestamps.
     */
    static forSpan<M>(span: DaySpan): Schedule<M>;
}
