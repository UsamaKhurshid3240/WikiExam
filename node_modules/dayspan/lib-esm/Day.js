"use strict";
import { Identifier } from './Identifier';
import { Constants } from './Constants';
import { Op, operate } from './Operation';
import { Parse } from './Parse';
import { Time } from './Time';
// @ts-ignore
import * as moment from 'moment';
/**
 * A class which represents a point in time as
 */
export class Day {
    /**
     *
     */
    constructor(date) {
        this.date = date;
        this.time = date.valueOf();
        this.millis = date.millisecond();
        this.seconds = date.second();
        this.minute = date.minute();
        this.hour = date.hour();
        this.month = date.month();
        this.year = date.year();
        this.quarter = date.quarter();
        this.dayOfWeek = date.day();
        this.dayOfMonth = date.date();
        this.dayOfYear = date.dayOfYear();
        this.week = date.week();
        this.lastDayOfMonth = Day.getLastDayOfMonth(date);
        this.weekOfYear = Day.getWeekOfYear(date);
        this.weekspanOfYear = Day.getWeekspanOfYear(date);
        this.fullWeekOfYear = Day.getFullWeekOfYear(date);
        this.lastWeekspanOfYear = Day.getLastWeekspanOfYear(date);
        this.lastFullWeekOfYear = Day.getLastFullWeekOfYear(date);
        this.weekOfMonth = Day.getWeekOfMonth(date);
        this.weekspanOfMonth = Day.getWeekspanOfMonth(date);
        this.fullWeekOfMonth = Day.getFullWeekOfMonth(date);
        this.lastWeekspanOfMonth = Day.getLastWeekspanOfMonth(date);
        this.lastFullWeekOfMonth = Day.getLastFullWeekOfMonth(date);
        this.timeIdentifier = Identifier.Time.get(this);
        this.dayIdentifier = Identifier.Day.get(this);
        this.weekIdentifier = Identifier.Week.get(this);
        this.monthIdentifier = Identifier.Month.get(this);
        this.quarterIdentifier = Identifier.Quarter.get(this);
    }
    // Same
    /**
     *
     */
    sameDay(day) {
        return this.dayIdentifier === day.dayIdentifier;
    }
    /**
     *
     */
    sameMonth(day) {
        return this.monthIdentifier === day.monthIdentifier;
    }
    /**
     *
     */
    sameWeek(day) {
        return this.weekIdentifier === day.weekIdentifier;
    }
    /**
     *
     */
    sameYear(day) {
        return this.year === day.year;
    }
    /**
     *
     */
    sameQuarter(day) {
        return this.quarterIdentifier === day.quarterIdentifier;
    }
    /**
     *
     */
    sameHour(day) {
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour;
    }
    /**
     *
     */
    sameMinute(day) {
        return this.timeIdentifier === day.timeIdentifier;
    }
    /**
     *
     */
    sameTime(time) {
        return this.hour === time.hour && this.minute === time.minute && this.seconds === time.second && this.millis === time.millisecond;
    }
    // Comparison
    /**
     *
     */
    isBefore(day, precision) {
        return this.date.isBefore(day.date, precision);
    }
    /**
     *
     */
    isSameOrBefore(day, precision) {
        return this.date.isSameOrBefore(day.date, precision);
    }
    /**
     *
     */
    isAfter(day, precision) {
        return this.date.isAfter(day.date, precision);
    }
    /**
     *
     */
    isSameOrAfter(day, precision) {
        return this.date.isSameOrAfter(day.date, precision);
    }
    /**
     *
     */
    max(day) {
        return this.date.isAfter(day.date) ? this : day;
    }
    /**
     *
     */
    min(day) {
        return this.date.isBefore(day.date) ? this : day;
    }
    // Between
    millisBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'milliseconds', true), op, absolute);
    }
    secondsBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'seconds', true), op, absolute);
    }
    minutesBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'minutes', true), op, absolute);
    }
    hoursBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'hours', true), op, absolute);
    }
    daysBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'days', true), op, absolute);
    }
    weeksBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'weeks', true), op, absolute);
    }
    monthsBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'months', true), op, absolute);
    }
    yearsBetween(day, op = Op.DOWN, absolute = true) {
        return operate(this.date.diff(day.date, 'years', true), op, absolute);
    }
    isBetween(start, end, inclusive = true) {
        return this.date.isBetween(start.date, end.date, null, inclusive ? '[]' : '[)');
    }
    mutate(mutator) {
        var d = this.toMoment();
        mutator(d);
        return new Day(d);
    }
    add(amount, unit) {
        return this.mutate(d => d.add(amount, unit));
    }
    relative(millis) {
        return this.mutate(d => d.add(millis, 'milliseconds'));
    }
    // Days
    relativeDays(days) {
        return this.mutate(d => d.add(days, 'days'));
    }
    prev(days = 1) {
        return this.relativeDays(-days);
    }
    next(days = 1) {
        return this.relativeDays(days);
    }
    withDayOfMonth(day) {
        return this.mutate(d => d.date(day));
    }
    withDayOfWeek(dayOfWeek) {
        return this.mutate(d => d.day(dayOfWeek));
    }
    withDayOfYear(dayOfYear) {
        return this.mutate(d => d.dayOfYear(dayOfYear));
    }
    // Month
    withMonth(month) {
        return this.mutate(d => d.month(month));
    }
    relativeMonths(months) {
        return this.mutate(d => d.add(months, 'months'));
    }
    prevMonth(months = 1) {
        return this.relativeMonths(-months);
    }
    nextMonth(months = 1) {
        return this.relativeMonths(months);
    }
    // Week Of Year
    withWeek(week, relativeWeek = this.week) {
        return this.mutate(d => d.add((week - relativeWeek) * Constants.DAYS_IN_WEEK, 'days'));
    }
    withWeekOfYear(week) {
        return this.withWeek(week, this.weekOfYear);
    }
    withFullWeekOfYear(week) {
        return this.withWeek(week, this.fullWeekOfYear);
    }
    withWeekspanOfYear(week) {
        return this.withWeek(week, this.weekspanOfYear);
    }
    withWeekOfMonth(week) {
        return this.withWeek(week, this.weekOfMonth);
    }
    withWeekspanOfMonth(week) {
        return this.withWeek(week, this.weekspanOfMonth);
    }
    withFullWeekOfMonth(week) {
        return this.withWeek(week, this.fullWeekOfMonth);
    }
    relativeWeeks(weeks) {
        return this.mutate(d => d.add(weeks, 'weeks'));
    }
    prevWeek(weeks = 1) {
        return this.relativeWeeks(-weeks);
    }
    nextWeek(weeks = 1) {
        return this.relativeWeeks(weeks);
    }
    // Year
    withYear(year) {
        return this.mutate(d => d.year(year));
    }
    relativeYears(years) {
        return this.mutate(d => d.add(years, 'year'));
    }
    prevYear(years = 1) {
        return this.relativeYears(-years);
    }
    nextYear(years = 1) {
        return this.relativeYears(years);
    }
    // Hour
    withHour(hour) {
        return this.mutate(d => d.hour(hour));
    }
    relativeHours(hours) {
        return this.mutate(d => d.add(hours, 'hours'));
    }
    prevHour(hours = 1) {
        return this.relativeHours(-hours);
    }
    nextHour(hours = 1) {
        return this.relativeHours(hours);
    }
    // Time
    withTimes(hour = Constants.HOUR_MIN, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        return this.mutate(d => d.set({ hour, minute, second, millisecond }));
    }
    withTime(time) {
        return this.withTimes(time.hour, time.minute, time.second, time.millisecond);
    }
    asTime() {
        return new Time(this.hour, this.minute, this.seconds, this.millis);
    }
    // Start & End
    // Time
    start() {
        return this.mutate(d => d.startOf('day'));
    }
    isStart() {
        return this.hour === Constants.HOUR_MIN &&
            this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    }
    end(inclusive = true) {
        return inclusive ?
            this.mutate(d => d.endOf('day')) :
            this.mutate(d => d.startOf('day').add(1, 'day'));
    }
    isEnd() {
        return this.hour === Constants.HOUR_MAX &&
            this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    }
    // Hour
    startOfHour() {
        return this.mutate(d => d.startOf('hour'));
    }
    isStartOfHour() {
        return this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    }
    endOfHour(inclusive = true) {
        return inclusive ?
            this.mutate(d => d.endOf('hour')) :
            this.mutate(d => d.startOf('hour').add(1, 'hour'));
    }
    isEndOfHour() {
        return this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    }
    // Week
    startOfWeek() {
        return this.mutate(d => d.startOf('week'));
    }
    isStartOfWeek() {
        return this.dayOfWeek === Constants.WEEKDAY_MIN;
    }
    endOfWeek(inclusive = true) {
        return inclusive ?
            this.mutate(d => d.endOf('week')) :
            this.mutate(d => d.startOf('week').add(1, 'week'));
    }
    isEndOfWeek() {
        return this.dayOfWeek === Constants.WEEKDAY_MAX;
    }
    // Month
    startOfMonth() {
        return this.mutate(d => d.startOf('month'));
    }
    isStartOfMonth() {
        return this.dayOfMonth === Constants.DAY_MIN;
    }
    endOfMonth(inclusive = true) {
        return inclusive ?
            this.mutate(d => d.endOf('month')) :
            this.mutate(d => d.startOf('month').add(1, 'month'));
    }
    isEndOfMonth() {
        return this.dayOfMonth === this.daysInMonth();
    }
    // Year
    startOfYear() {
        return this.mutate(d => d.startOf('year'));
    }
    isStartOfYear() {
        return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
    }
    endOfYear(inclusive = true) {
        return inclusive ?
            this.mutate(d => d.endOf('year')) :
            this.mutate(d => d.startOf('year').add(1, 'year'));
    }
    isEndOfYear() {
        return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
    }
    // Days In X
    daysInMonth() {
        return this.date.daysInMonth();
    }
    daysInYear() {
        return this.endOfYear().dayOfYear;
    }
    weeksInYear() {
        return this.date.weeksInYear();
    }
    // Display
    format(format) {
        return this.date.format(format);
    }
    utc(keepLocalTime) {
        return this.mutate(d => d.utc(keepLocalTime));
    }
    toMoment() {
        return this.date.clone();
    }
    toDate() {
        return this.date.toDate();
    }
    toArray() {
        return this.date.toArray();
    }
    toJSON() {
        return this.date.toJSON();
    }
    toISOString(keepOffset = false) {
        return this.date.toISOString(keepOffset);
    }
    toObject() {
        return this.date.toObject();
    }
    toString() {
        return this.date.toString();
    }
    // State
    isDST() {
        return this.date.isDST();
    }
    isLeapYear() {
        return this.date.isLeapYear();
    }
    // Instances
    static now() {
        return new Day(moment());
    }
    static today() {
        return this.now().start();
    }
    static tomorrow() {
        return this.today().next();
    }
    static fromMoment(moment) {
        return moment && moment.isValid() ? new Day(moment) : null;
    }
    static unix(millis) {
        return this.fromMoment(moment(millis));
    }
    static unixSeconds(millis) {
        return this.fromMoment(moment.unix(millis));
    }
    static parse(input) {
        return Parse.day(input);
    }
    static fromString(input) {
        return this.fromMoment(moment(input));
    }
    static fromFormat(input, formats) {
        return this.fromMoment(moment(input, formats));
    }
    static fromObject(input) {
        return this.fromMoment(moment(input));
    }
    static fromDate(input) {
        return this.fromMoment(moment(input));
    }
    static fromArray(input) {
        return this.fromMoment(moment(input));
    }
    static fromDayIdentifier(id) {
        let date = id % 100;
        let month = (Math.floor(id / 100) % 100) - 1;
        let year = Math.floor(id / 10000);
        return this.build(year, month, date);
    }
    static build(year, month, date = Constants.DAY_MIN, hour = Constants.HOUR_MIN, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        return new Day(moment({ year, month, date, hour, minute, second, millisecond }));
    }
    static getWeekspanOfYear(date) {
        return Math.floor((date.dayOfYear() - 1) / Constants.DAYS_IN_WEEK);
    }
    static getLastWeekspanOfYear(date) {
        let lastOfYear = date.clone().endOf('year');
        let daysInYear = lastOfYear.dayOfYear();
        return Math.floor((daysInYear - date.dayOfYear()) / Constants.DAYS_IN_WEEK);
    }
    static getWeekOfYear(date) {
        let firstOfYear = date.clone().startOf('year');
        let weeks = date.week();
        return firstOfYear.day() > Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY ? weeks - 1 : weeks;
    }
    static getFullWeekOfYear(date) {
        let firstOfYear = date.clone().startOf('year');
        let weeks = date.week();
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? weeks : weeks - 1;
    }
    static getLastFullWeekOfYear(date) {
        let firstOfYear = date.clone().startOf('year');
        let weeks = date.week();
        let weeksMax = date.weeksInYear();
        let lastWeek = weeksMax - weeks;
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? lastWeek + 1 : lastWeek;
    }
    static getWeekspanOfMonth(date) {
        return Math.floor((date.date() - 1) / Constants.DAYS_IN_WEEK);
    }
    static getLastWeekspanOfMonth(date) {
        return Math.floor((date.daysInMonth() - date.date()) / Constants.DAYS_IN_WEEK);
    }
    static getFullWeekOfMonth(date) {
        return Math.floor((date.date() - 1 - date.day() + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    }
    static getLastFullWeekOfMonth(date) {
        return Math.floor((date.daysInMonth() - date.date() - (Constants.WEEKDAY_MAX - date.day()) + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    }
    static getWeekOfMonth(date) {
        let dom = date.date();
        let dow = date.day();
        let sundayDate = dom - dow;
        return Math.floor((sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5) / Constants.DAYS_IN_WEEK);
    }
    static getLastDayOfMonth(date) {
        return date.daysInMonth() - date.date() + 1;
    }
}
//# sourceMappingURL=Day.js.map