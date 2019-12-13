import { Day, DayInput } from './Day';
import { DaySpan } from './DaySpan';
import { EventInput, Event } from './Event';
import { Units } from './Units';
import { SortEvent } from './Sort';
import { CalendarDay } from './CalendarDay';
import { CalendarEvent } from './CalendarEvent';
import { Iterator } from './Iterator';
/**
 * A function which moves a given day by some amount and some unit. This is
 * used to shift a calendar's frame via [[Calendar.next]] and [[Calendar.prev]].
 *
 * @param day The day to move.
 * @param amount The amount to move the day by.
 * @returns A new day instance moved by the given amount.
 */
export declare type CalendarMover = (day: Day, amount: number) => Day;
/**
 * A definition for a given [[Units]] which informs a calendar how to setup the
 * [[Calendar.span]] and how to move with [[Calendar.move]].
 */
export interface CalendarTypeDefinition {
    getStart(around: Day, size: number, focus: number): Day;
    getEnd(start: Day, size: number, focus: number): Day;
    moveStart(day: Day, amount: number): Day;
    moveEnd(day: Day, amount: number): Day;
    defaultInput: any;
}
/**
 * A map of [[CalendarTypeDefinition]] keyed by the [[Units]].
 */
export declare type CalendarTypeDefinitionMap = {
    [unit: number]: CalendarTypeDefinition;
};
/**
 * Input used to initialize or mass change the properties of a [[Calendar]].
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export interface CalendarInput<T, M> {
    /**
     * @see [[Calendar.fill]]
     */
    fill?: boolean;
    /**
     * @see [[Calendar.minimumSize]]
     */
    minimumSize?: number;
    /**
     * @see [[Calendar.repeatCovers]]
     */
    repeatCovers?: boolean;
    /**
     * @see [[Calendar.listTimes]]
     */
    listTimes?: boolean;
    /**
     * @see [[Calendar.eventsOutside]]
     */
    eventsOutside?: boolean;
    /**
     * @see [[Calendar.updateRows]]
     */
    updateRows?: boolean;
    /**
     * @see [[Calendar.updateColumns]]
     */
    updateColumns?: boolean;
    /**
     * @see [[Calendar.eventSorter]]
     */
    eventSorter?: SortEvent<T, M>;
    /**
     * @see [[Calendar.events]]
     */
    events?: EventInput<T, M>[];
    /**
     * @see [[Calendar.type]]
     */
    type?: Units;
    /**
     * @see [[Calendar.size]]
     */
    size?: number;
    /**
     * @see [[Calendar.parseMeta]]
     */
    parseMeta?: (input: any) => M;
    /**
     * @see [[Calendar.parseData]]
     */
    parseData?: (input: any) => T;
    /**
     * When morphing a calendar to a fewer number of days, do we want to keep
     * today in the calendar if it is already in the calendar?
     */
    preferToday?: boolean;
    /**
     * What day should the calendar be based around (contain)?
     */
    around?: DayInput;
    /**
     * When morphing a calendar and `preferToday` is false OR today is not in the
     * calendar AND `around` is not specified, we will pick a day at this number
     * in the current calendar (a value between 0 and 1 signifying the start and
     * and of the current calendar).
     */
    otherwiseFocus?: number;
    /**
     * When morphing or creating passing a value of `true` will avoid calling
     * [[Calendar.refresh]] as is typically done right after each of those
     * functions.
     */
    delayRefresh?: boolean;
}
/**
 * A collection of [[CalendarDay]]s, the events on the calendar, and all
 * [[CalendarEvent]]s generated based on the events.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export declare class Calendar<T, M> {
    /**
     * The span of days in the calendar.
     */
    span: DaySpan;
    /**
     * The full span of days represented on the calendar. This may be different
     * than the [[Calendar.span]] when [[Calendar.fill]] is `true` and the
     * calendar is representing months or years and the days need to start on
     * Sunday and end on Saturday.
     */
    filled: DaySpan;
    /**
     * The number of days in the calendar specified by [[Calendar.span]].
     */
    length: number;
    /**
     * The type of calendar.
     */
    type: Units;
    /**
     * The size of the calendar. When the calendar type is...
     *
     * - [[Units.DAY]]: The number of days in the calendar.
     * - [[Units.WEEK]]: The number of weeks in the calendar.
     * - [[Units.MONTH]]: The number of months in the calendar.
     * - [[Units.YEAR]]: The number of years in the calendar.
     */
    size: number;
    /**
     * The function used to move the start day of the calendar when functions like
     * [[Calendar.next]] or [[Calendar.prev]] are called.
     */
    moveStart: CalendarMover;
    /**
     * The function used to move the end day of the calendar when functions like
     * [[Calendar.next]] or [[Calendar.prev]] are called.
     */
    moveEnd: CalendarMover;
    /**
     * If the calendar should be filled in so the first day of the calendar is
     * Sunday and the last day is Saturday.
     */
    fill: boolean;
    /**
     * The minimum number of days in the calendar no matter what the type or size
     * is. This can be used to display a month with a constant number of weeks -
     * because not all months contain the same number of weeks.
     */
    minimumSize: number;
    /**
     * When `true` a [[CalendarEvent]] instance exists on each [[CalendarDay]]
     * the event covers even if the event didn't start on that day.
     */
    repeatCovers: boolean;
    /**
     * When `true` an event instance will be created for each time specified on
     * the schedule. If the schedule specifies an all day event then only one
     * event is added to a day. This is typically done when displaying days or
     * weeks and events can be displayed on a timeline.
     */
    listTimes: boolean;
    /**
     * When `true` events will be added to days "outside" the calendar. Days
     * outside the calendar are days filled in when [[Calendar.fill]] is `true`.
     * More specifically days that are in [[Calendar.filled]] and not in
     * [[Calendar.span]].
     */
    eventsOutside: boolean;
    /**
     * When `true` [[CalendarEvent.row]] will be set so when visually displaying
     * the event with others multi-day events will align and not overlap.
     */
    updateRows: boolean;
    /**
     * When `true` [[CalendarEvent.col]] will be set so when visually displaying
     * the event based on start and end time any events that overlap with each
     * other will be "indented" to see the event below it.
     */
    updateColumns: boolean;
    /**
     * The function (if any) which sorts the events on a calendar day.
     */
    eventSorter: SortEvent<T, M>;
    /**
     * A function to use when parsing meta input into the desired type.
     *
     * @param input The input to parse.
     * @returns The meta parsed from the given input, if any.
     */
    parseMeta: (input: any) => M;
    /**
     * A function to use when parsing meta input into the desired type.
     *
     * @param input The input to parse.
     * @returns The meta parsed from the given input, if any.
     */
    parseData: (input: any) => T;
    /**
     * A selection of days on the calendar. If no days are selected this is `null`.
     * This is merely used to keep the selection flags in [[CalendarDay]] updated
     * via [[Calendar.refreshSelection]].
     */
    selection: DaySpan;
    /**
     * The array of days in this calendar and their events.
     */
    days: CalendarDay<T, M>[];
    /**
     * The array of scheduled events added to the calendar.
     */
    events: Event<T, M>[];
    /**
     * The array of visible events on the calendar. This is built based on the
     * span of the schedule in the given event and also the [[Event.visible]] flag.
     */
    visible: Event<T, M>[];
    /**
     * Creates a new calendar given a span, type, size, moving functions, and
     * optionally some default properties for the calendar.
     *
     * @param start The first day on the calendar.
     * @param end The last day on the calendar.
     * @param type The calendar type used for describing the calendar and splitting it.
     * @param size The number of calendar types in this calendar.
     * @param moveStart The function to move the start day.
     * @param moveEnd The function to move the end by.
     * @param input The default properties for this calendar.
     * @see [[Calendar.start]]
     * @see [[Calendar.end]]
     * @see [[Calendar.type]]
     * @see [[Calendar.size]]
     * @see [[Calendar.moveStart]]
     * @see [[Calendar.moveEnd]]
     */
    constructor(start: Day, end: Day, type: Units, size: number, moveStart: CalendarMover, moveEnd: CalendarMover, input?: CalendarInput<T, M>);
    /**
     * Changes the calendar possibly morphing it to a different type or size if
     * specified in the given input. If the type and size are not morphed then
     * the following properties may be updated:
     *
     * - [[Calendar.fill]]
     * - [[Calendar.minimumSize]]
     * - [[Calendar.repeatCovers]]
     * - [[Calendar.listTimes]]
     * - [[Calendar.eventsOutside]]
     * - [[Calendar.updateRows]]
     * - [[Calendar.updateColumns]]
     * - [[Calendar.eventSorter]]
     * - [[Calendar.events]]
     * - [[Calendar.parseData]]
     * - [[Calendar.parseMeta]]
     *
     * If [[CalendarInput.delayRefresh]] is not given with `true` then
     * [[Calendar.refresh]] will be called once the calendar properties have been
     * updated.
     *
     * @param input The new properties for this calendar to overwrite with.
     */
    set(input: CalendarInput<T, M>): this;
    /**
     * Sets the [[Calendar.minimumSize]] value and returns `this` for method
     * chaining.
     *
     * @param minimumSize The new value.
     */
    withMinimumSize(minimumSize: number): this;
    /**
     * Sets the [[Calendar.repeatCovers]] value and returns `this` for method
     * chaining.
     *
     * @param repeatCovers The new value.
     */
    withRepeatCovers(repeatCovers: boolean): this;
    /**
     * Sets the [[Calendar.listTimes]] value and returns `this` for method
     * chaining.
     *
     * @param listTimes The new value.
     */
    withListTimes(listTimes: boolean): this;
    /**
     * Sets the [[Calendar.eventsOutside]] value and returns `this` for method
     * chaining.
     *
     * @param eventsOutside The new value.
     */
    withEventsOutside(eventsOutside: boolean): this;
    /**
     * Sets the [[Calendar.updateRows]] value and returns `this` for method
     * chaining.
     *
     * @param updateRows The new value.
     * @param refresh If the rows should be updated now if `updateRows` is `true`.
     */
    withUpdateRows(updateRows: boolean, refresh?: boolean): this;
    /**
     * Sets the [[Calendar.updateColumns]] value and returns `this` for method
     * chaining.
     *
     * @param updateColumns The new value.
     * @param refresh If the columns should be updated now if `updateColumns` is
     *    `true`.
     */
    withUpdateColumns(updateColumns: boolean, refresh?: boolean): this;
    /**
     * Returns the start day of the calendar. If this calendar is filled, this
     * may not represent the very first day in the calendar.
     */
    readonly start: Day;
    /**
     * Returns the end day of the calendar. If this calendar is filled, this
     * may not represent the very last day in the calendar.
     */
    readonly end: Day;
    /**
     * Returns the summary of the span of time this calendar represents.
     *
     * @param dayOfWeek [[DaySpan.summary]]
     * @param short [[DaySpan.summary]]
     * @param repeat [[DaySpan.summary]]
     * @param contextual [[DaySpan.summary]]
     * @param delimiter [[DaySpan.summary]]
     * @see [[DaySpan.summary]]
     */
    summary(dayOfWeek?: boolean, short?: boolean, repeat?: boolean, contextual?: boolean, delimiter?: string): string;
    /**
     * Splits up this calendar into an iterable collection of calendars. The
     * resulting iterator will return `size / by` number of calendars.
     *
     * @param by The new size of the resulting calendars. If the the size of the
     *    current calendar is not divisible by this value the resulting calendars
     *    may cover more or less than this calendar covers.
     * @returns An iterator for the calendars produced.
     */
    split(by?: number): Iterator<Calendar<T, M>>;
    /**
     * Refreshes the days and events in this calendar based on the start and end
     * days, the calendar properties, and its eventss.
     *
     * @param today The current day to update the calendar days via
     *    [[CalendarDay.updateCurrent]].
     */
    refresh(today?: Day): this;
    /**
     * Updates the [[Calendar.filled]] span based on [[Calendar.start]],
     * [[Calendar.end]], and [[Calendar.fill]] properties.
     */
    resetFilled(): this;
    /**
     * Updates [[Calendar.days]] to match the span of days in the calendar.
     */
    resetDays(): this;
    /**
     * Updates the list of visible schedules.
     */
    refreshVisible(): this;
    /**
     * Updates the days with the current day via [[CalendarDay.updateCurrent]].
     *
     * @param today The new current day.
     */
    refreshCurrent(today?: Day): this;
    /**
     * Updates the selection flags in [[CalendarDay]] based on the
     * [[Calendar.selection]] property.
     */
    refreshSelection(): this;
    /**
     * Updates the [[CalendarDay.events]] based on the events in this calendar
     * and the following properties:
     *
     * - [[Calendar.eventsForDay]]
     * - [[Calendar.eventsOutside]]
     * - [[Calendar.listTimes]]
     * - [[Calendar.repeatCovers]]
     * - [[Calendar.updateRows]]
     * - [[Calendar.updateColumns]]
     */
    refreshEvents(): this;
    /**
     * Refreshes the [[CalendarEvent.row]] property as described in the link.
     */
    refreshRows(): this;
    /**
     * Refreshes the [[CalendarEvent.col]] property as described in the link.
     */
    refreshColumns(): this;
    /**
     * Gets the calendar day for the given day.
     *
     * @param input The day to get the calendar day for.
     * @returns The reference to the calendar day, or null if the given input
     *    is not on this calendar.
     */
    getDay(input: DayInput): CalendarDay<T, M>;
    /**
     * Iterates over all days in this calendar and passes each day to `iterator`.
     *
     * @param iterator The function to pass [[CalendarDay]]s to.
     */
    iterateDays(): Iterator<CalendarDay<T, M>>;
    /**
     * Returns the events for the given day optionally looking at schedule times,
     * optionally looking at events which cover multiple days, and optionally
     * sorted with the given function.
     *
     * @param day The day to find events for.
     * @param getTimes When `true` an event is added to the result for each time
     *    specified in the schedule.
     * @param covers When `true` events which don't start on the given day but do
     *    overlap are added to the result.
     * @param sorter The function to sort the events by, if any.
     * @returns An array of events that occurred on the given day.
     */
    eventsForDay(day: Day, getTimes?: boolean, covers?: boolean, sorter?: SortEvent<T, M>): CalendarEvent<T, M>[];
    /**
     * Finds the event given one of the ways to identify the event.
     *
     * @param input The value to use to search for an event.
     * @returns The refrence to the event or null if not found.
     */
    findEvent(id: any): Event<T, M>;
    /**
     * Removes the list of events if they exist in the calendar.
     *
     * @param events The array of events to remove if they exist. If no
     *    events are passed (via `null`) then all events will be removed
     *    from the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are removed.
     * @see [[Calendar.removeEvent]]
     * @see [[Calendar.refreshEvents]]
     */
    removeEvents(events?: any[], delayRefresh?: boolean): this;
    /**
     * Removes the given event if it exists on the calendar.
     *
     * @param event The event to remove if it exists.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is removed.
     * @see [[Calendar.refreshEvents]]
     */
    removeEvent(event: any, delayRefresh?: boolean): this;
    /**
     * Adds the given event to this calendar if it doesn't exist already (or
     * `allowDuplicates` is `true`).
     *
     * @param event The event to add to the calendar.
     * @param allowDuplicates If an event can be added more than once.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is added.
     * @see [[Calendar.refreshEvents]]
     */
    addEvent(event: EventInput<T, M>, allowDuplicates?: boolean, delayRefresh?: boolean): this;
    /**
     * Adds the given events to this calendar if they don't exist already (or
     * `allowDuplicates` is `true`).
     *
     * @param events The events to add to the calendar.
     * @param allowDuplicates If an event can be added more than once.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    addEvents(events: EventInput<T, M>[], allowDuplicates?: boolean, delayRefresh?: boolean): this;
    /**
     * Sets the given events to this calendar replacing the current list of
     * events.
     *
     * @param events The events to set to the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    setEvents(events: EventInput<T, M>[], delayRefresh?: boolean): this;
    /**
     * Sets the selection point or range of the calendar and updates the flags
     * in the days.
     *
     * @param start The start of the selection.
     * @param end The end of the selection.
     * @see [[Calendar.refreshSelection]]
     */
    select(start: Day, end?: Day): this;
    /**
     * Sets the selection of the calendar to nothing.
     *
     * @see [[Calendar.refreshSelection]]
     */
    unselect(): this;
    /**
     * Shifts the calendar days by the given amount.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    move(jump?: number, delayRefresh?: boolean): this;
    /**
     * Moves the calenndar to the next set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    next(jump?: number, delayRefresh?: boolean): this;
    /**
     * Moves the calenndar to the previous set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    prev(jump?: number, delayRefresh?: boolean): this;
    /**
     * Converts this calendar to input which can be used to later recreate this
     * calendar. The only properties of the calendar which will be loss is the
     * [[Calendar.eventSorter]] property because it is a function.
     *
     * @param plain If the returned input should be plain objects as opposed
     *    to [[Day]] and [[Event]] instances.
     * @param plainData A function to convert [[Event.data]] to a plain object if
     *    it is not already.
     * @param plainMeta A function to convert values in [[Schedule.meta]] to plain
     *    objects if they are not alreday.
     * @returns The input generated from this calendar.
     */
    toInput(plain?: boolean, plainData?: (data: T) => any, plainMeta?: (meta: M) => any): CalendarInput<T, M>;
    /**
     * Creates a calendar based on the given input.
     *
     * @param input The input which has at least the `type` specified.
     * @returns A new calendar instance.
     */
    static fromInput<T, M>(input: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * Creates a calendar based around a given unit optionally focused around a
     * given day.
     *
     * @param type The unit of the calendar.
     * @param days The number of units in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how months are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     */
    static forType<T, M>(type: Units, size?: number, around?: Day, focus?: number, input?: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * Creates a calendar based around days optionally focused around a given day.
     *
     * @param days The number of days in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how days are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    static days<T, M>(days?: number, around?: Day, focus?: number, input?: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * Creates a calendar based around weeks optionally focused around a given day.
     *
     * @param days The number of weeks in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how weeks are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    static weeks<T, M>(weeks?: number, around?: Day, focus?: number, input?: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * Creates a calendar based around months optionally focused around a given day.
     *
     * @param days The number of months in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how months are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    static months<T, M>(months?: number, around?: Day, focus?: number, input?: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * Creates a calendar based around years optionally focused around a given day.
     *
     * @param days The number of years in the calendar.
     * @param around The day to focus the calendar on.
     * @param focus The value which describes how years are added around the given
     *    day. The default value will center the calendar around the given day.
     *    When the value is `0` the given day is the first day in the calendar,
     *    and when the value is `1` the given day is the last day in the calendar.
     * @param input The default properties for the calendar.
     * @returns A new calendar instance.
     * @see [[Calendar.forType]]
     */
    static years<T, M>(years?: number, around?: Day, focus?: number, input?: CalendarInput<T, M>): Calendar<T, M>;
    /**
     * A map of functions and properties by [[Units]] used to create or morph
     * Calendars.
     */
    static TYPES: CalendarTypeDefinitionMap;
}
