import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { CalendarEvent } from './CalendarEvent';
import { Iterator } from './Iterator';
/**
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
export declare class CalendarDay<T, M> extends Day {
    /**
     * Whether this day is the current day (ex: today).
     */
    currentDay: boolean;
    /**
     * Whether this day is on the same week as the current day (ex: today).
     */
    currentWeek: boolean;
    /**
     * Whether this day is on the same month as the current day (ex: today).
     */
    currentMonth: boolean;
    /**
     * Whether this day is on the same year as the current day (ex: today).
     */
    currentYear: boolean;
    /**
     * How many days away this day is from the current day (ex: today). If this
     * day is the current day the offset is 0. If this day is before the current
     * day it will be the negative number of days away. Otherwise this will be
     * positive meaning this day is after the current day by the given days.
     */
    currentOffset: number;
    /**
     * Whether this day is part of a selection on the calendar.
     */
    selectedDay: boolean;
    /**
     * Whether this day is on the same week that the calendar selection is.
     */
    selectedWeek: boolean;
    /**
     * Whether this day is on the same month that the calendar selection is.
     */
    selectedMonth: boolean;
    /**
     * Whether this day is on the same year that the calendar selection is.
     */
    selectedYear: boolean;
    /**
     * Whether this day is in the current calendar or not. Some days are outside
     * the calendar span and used to fill in weeks. Month calendars will fill in
     * days so the list of days in the calendar start on Sunday and end on Saturday.
     */
    inCalendar: boolean;
    /**
     * The list of events on this day based on the settings and schedules in the
     * calendar.
     */
    events: CalendarEvent<T, M>[];
    /**
     * Creates an iterator for the events on this day.
     *
     * @returns The new iterator for the events on this day.
     */
    iterateEvents(): Iterator<CalendarEvent<T, M>>;
    /**
     * Updates the current flags on this day given the current day (ex: today).
     *
     * @param current The current day of the calendar.
     */
    updateCurrent(current: Day): this;
    /**
     * Updates the selection flags on this day given the selection range on the
     * calendar.
     *
     * @param selected The span of days selected on the calendar.
     */
    updateSelected(selected: DaySpan): this;
    /**
     * Clears the selection flags on this day. This is done when the selection on
     * the calendar is cleared.
     */
    clearSelected(): this;
}
