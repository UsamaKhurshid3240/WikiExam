"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Op } from './Operation';
import { Day } from './Day';
import { Iterator } from './Iterator';
/**
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether this day is the current day (ex: today).
         */
        _this.currentDay = false;
        /**
         * Whether this day is on the same week as the current day (ex: today).
         */
        _this.currentWeek = false;
        /**
         * Whether this day is on the same month as the current day (ex: today).
         */
        _this.currentMonth = false;
        /**
         * Whether this day is on the same year as the current day (ex: today).
         */
        _this.currentYear = false;
        /**
         * How many days away this day is from the current day (ex: today). If this
         * day is the current day the offset is 0. If this day is before the current
         * day it will be the negative number of days away. Otherwise this will be
         * positive meaning this day is after the current day by the given days.
         */
        _this.currentOffset = 0;
        /**
         * Whether this day is part of a selection on the calendar.
         */
        _this.selectedDay = false;
        /**
         * Whether this day is on the same week that the calendar selection is.
         */
        _this.selectedWeek = false;
        /**
         * Whether this day is on the same month that the calendar selection is.
         */
        _this.selectedMonth = false;
        /**
         * Whether this day is on the same year that the calendar selection is.
         */
        _this.selectedYear = false;
        /**
         * Whether this day is in the current calendar or not. Some days are outside
         * the calendar span and used to fill in weeks. Month calendars will fill in
         * days so the list of days in the calendar start on Sunday and end on Saturday.
         */
        _this.inCalendar = false;
        /**
         * The list of events on this day based on the settings and schedules in the
         * calendar.
         */
        _this.events = [];
        return _this;
    }
    /**
     * Creates an iterator for the events on this day.
     *
     * @returns The new iterator for the events on this day.
     */
    CalendarDay.prototype.iterateEvents = function () {
        return Iterator.forArray(this.events);
    };
    /**
     * Updates the current flags on this day given the current day (ex: today).
     *
     * @param current The current day of the calendar.
     */
    CalendarDay.prototype.updateCurrent = function (current) {
        this.currentDay = this.sameDay(current);
        this.currentWeek = this.sameWeek(current);
        this.currentMonth = this.sameMonth(current);
        this.currentYear = this.sameYear(current);
        this.currentOffset = this.daysBetween(current, Op.DOWN, false);
        return this;
    };
    /**
     * Updates the selection flags on this day given the selection range on the
     * calendar.
     *
     * @param selected The span of days selected on the calendar.
     */
    CalendarDay.prototype.updateSelected = function (selected) {
        this.selectedDay = selected.matchesDay(this);
        this.selectedWeek = selected.matchesWeek(this);
        this.selectedMonth = selected.matchesMonth(this);
        this.selectedYear = selected.matchesYear(this);
        return this;
    };
    /**
     * Clears the selection flags on this day. This is done when the selection on
     * the calendar is cleared.
     */
    CalendarDay.prototype.clearSelected = function () {
        this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;
        return this;
    };
    return CalendarDay;
}(Day));
export { CalendarDay };
//# sourceMappingURL=CalendarDay.js.map