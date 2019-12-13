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
var Day = (function () {
    /**
     *
     */
    function Day(date) {
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
    Day.prototype.sameDay = function (day) {
        return this.dayIdentifier === day.dayIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameMonth = function (day) {
        return this.monthIdentifier === day.monthIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameWeek = function (day) {
        return this.weekIdentifier === day.weekIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameYear = function (day) {
        return this.year === day.year;
    };
    /**
     *
     */
    Day.prototype.sameQuarter = function (day) {
        return this.quarterIdentifier === day.quarterIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameHour = function (day) {
        return this.dayIdentifier === day.dayIdentifier && this.hour === day.hour;
    };
    /**
     *
     */
    Day.prototype.sameMinute = function (day) {
        return this.timeIdentifier === day.timeIdentifier;
    };
    /**
     *
     */
    Day.prototype.sameTime = function (time) {
        return this.hour === time.hour && this.minute === time.minute && this.seconds === time.second && this.millis === time.millisecond;
    };
    // Comparison
    /**
     *
     */
    Day.prototype.isBefore = function (day, precision) {
        return this.date.isBefore(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isSameOrBefore = function (day, precision) {
        return this.date.isSameOrBefore(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isAfter = function (day, precision) {
        return this.date.isAfter(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.isSameOrAfter = function (day, precision) {
        return this.date.isSameOrAfter(day.date, precision);
    };
    /**
     *
     */
    Day.prototype.max = function (day) {
        return this.date.isAfter(day.date) ? this : day;
    };
    /**
     *
     */
    Day.prototype.min = function (day) {
        return this.date.isBefore(day.date) ? this : day;
    };
    // Between
    Day.prototype.millisBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'milliseconds', true), op, absolute);
    };
    Day.prototype.secondsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'seconds', true), op, absolute);
    };
    Day.prototype.minutesBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'minutes', true), op, absolute);
    };
    Day.prototype.hoursBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'hours', true), op, absolute);
    };
    Day.prototype.daysBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'days', true), op, absolute);
    };
    Day.prototype.weeksBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'weeks', true), op, absolute);
    };
    Day.prototype.monthsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'months', true), op, absolute);
    };
    Day.prototype.yearsBetween = function (day, op, absolute) {
        if (op === void 0) { op = Op.DOWN; }
        if (absolute === void 0) { absolute = true; }
        return operate(this.date.diff(day.date, 'years', true), op, absolute);
    };
    Day.prototype.isBetween = function (start, end, inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return this.date.isBetween(start.date, end.date, null, inclusive ? '[]' : '[)');
    };
    Day.prototype.mutate = function (mutator) {
        var d = this.toMoment();
        mutator(d);
        return new Day(d);
    };
    Day.prototype.add = function (amount, unit) {
        return this.mutate(function (d) { return d.add(amount, unit); });
    };
    Day.prototype.relative = function (millis) {
        return this.mutate(function (d) { return d.add(millis, 'milliseconds'); });
    };
    // Days
    Day.prototype.relativeDays = function (days) {
        return this.mutate(function (d) { return d.add(days, 'days'); });
    };
    Day.prototype.prev = function (days) {
        if (days === void 0) { days = 1; }
        return this.relativeDays(-days);
    };
    Day.prototype.next = function (days) {
        if (days === void 0) { days = 1; }
        return this.relativeDays(days);
    };
    Day.prototype.withDayOfMonth = function (day) {
        return this.mutate(function (d) { return d.date(day); });
    };
    Day.prototype.withDayOfWeek = function (dayOfWeek) {
        return this.mutate(function (d) { return d.day(dayOfWeek); });
    };
    Day.prototype.withDayOfYear = function (dayOfYear) {
        return this.mutate(function (d) { return d.dayOfYear(dayOfYear); });
    };
    // Month
    Day.prototype.withMonth = function (month) {
        return this.mutate(function (d) { return d.month(month); });
    };
    Day.prototype.relativeMonths = function (months) {
        return this.mutate(function (d) { return d.add(months, 'months'); });
    };
    Day.prototype.prevMonth = function (months) {
        if (months === void 0) { months = 1; }
        return this.relativeMonths(-months);
    };
    Day.prototype.nextMonth = function (months) {
        if (months === void 0) { months = 1; }
        return this.relativeMonths(months);
    };
    // Week Of Year
    Day.prototype.withWeek = function (week, relativeWeek) {
        if (relativeWeek === void 0) { relativeWeek = this.week; }
        return this.mutate(function (d) { return d.add((week - relativeWeek) * Constants.DAYS_IN_WEEK, 'days'); });
    };
    Day.prototype.withWeekOfYear = function (week) {
        return this.withWeek(week, this.weekOfYear);
    };
    Day.prototype.withFullWeekOfYear = function (week) {
        return this.withWeek(week, this.fullWeekOfYear);
    };
    Day.prototype.withWeekspanOfYear = function (week) {
        return this.withWeek(week, this.weekspanOfYear);
    };
    Day.prototype.withWeekOfMonth = function (week) {
        return this.withWeek(week, this.weekOfMonth);
    };
    Day.prototype.withWeekspanOfMonth = function (week) {
        return this.withWeek(week, this.weekspanOfMonth);
    };
    Day.prototype.withFullWeekOfMonth = function (week) {
        return this.withWeek(week, this.fullWeekOfMonth);
    };
    Day.prototype.relativeWeeks = function (weeks) {
        return this.mutate(function (d) { return d.add(weeks, 'weeks'); });
    };
    Day.prototype.prevWeek = function (weeks) {
        if (weeks === void 0) { weeks = 1; }
        return this.relativeWeeks(-weeks);
    };
    Day.prototype.nextWeek = function (weeks) {
        if (weeks === void 0) { weeks = 1; }
        return this.relativeWeeks(weeks);
    };
    // Year
    Day.prototype.withYear = function (year) {
        return this.mutate(function (d) { return d.year(year); });
    };
    Day.prototype.relativeYears = function (years) {
        return this.mutate(function (d) { return d.add(years, 'year'); });
    };
    Day.prototype.prevYear = function (years) {
        if (years === void 0) { years = 1; }
        return this.relativeYears(-years);
    };
    Day.prototype.nextYear = function (years) {
        if (years === void 0) { years = 1; }
        return this.relativeYears(years);
    };
    // Hour
    Day.prototype.withHour = function (hour) {
        return this.mutate(function (d) { return d.hour(hour); });
    };
    Day.prototype.relativeHours = function (hours) {
        return this.mutate(function (d) { return d.add(hours, 'hours'); });
    };
    Day.prototype.prevHour = function (hours) {
        if (hours === void 0) { hours = 1; }
        return this.relativeHours(-hours);
    };
    Day.prototype.nextHour = function (hours) {
        if (hours === void 0) { hours = 1; }
        return this.relativeHours(hours);
    };
    // Time
    Day.prototype.withTimes = function (hour, minute, second, millisecond) {
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return this.mutate(function (d) { return d.set({ hour: hour, minute: minute, second: second, millisecond: millisecond }); });
    };
    Day.prototype.withTime = function (time) {
        return this.withTimes(time.hour, time.minute, time.second, time.millisecond);
    };
    Day.prototype.asTime = function () {
        return new Time(this.hour, this.minute, this.seconds, this.millis);
    };
    // Start & End
    // Time
    Day.prototype.start = function () {
        return this.mutate(function (d) { return d.startOf('day'); });
    };
    Day.prototype.isStart = function () {
        return this.hour === Constants.HOUR_MIN &&
            this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    };
    Day.prototype.end = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('day'); }) :
            this.mutate(function (d) { return d.startOf('day').add(1, 'day'); });
    };
    Day.prototype.isEnd = function () {
        return this.hour === Constants.HOUR_MAX &&
            this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Hour
    Day.prototype.startOfHour = function () {
        return this.mutate(function (d) { return d.startOf('hour'); });
    };
    Day.prototype.isStartOfHour = function () {
        return this.minute === Constants.MINUTE_MIN &&
            this.seconds === Constants.SECOND_MIN &&
            this.millis === Constants.MILLIS_MIN;
    };
    Day.prototype.endOfHour = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('hour'); }) :
            this.mutate(function (d) { return d.startOf('hour').add(1, 'hour'); });
    };
    Day.prototype.isEndOfHour = function () {
        return this.minute === Constants.MINUTE_MAX &&
            this.seconds === Constants.SECOND_MAX &&
            this.millis === Constants.MILLIS_MAX;
    };
    // Week
    Day.prototype.startOfWeek = function () {
        return this.mutate(function (d) { return d.startOf('week'); });
    };
    Day.prototype.isStartOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MIN;
    };
    Day.prototype.endOfWeek = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('week'); }) :
            this.mutate(function (d) { return d.startOf('week').add(1, 'week'); });
    };
    Day.prototype.isEndOfWeek = function () {
        return this.dayOfWeek === Constants.WEEKDAY_MAX;
    };
    // Month
    Day.prototype.startOfMonth = function () {
        return this.mutate(function (d) { return d.startOf('month'); });
    };
    Day.prototype.isStartOfMonth = function () {
        return this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfMonth = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('month'); }) :
            this.mutate(function (d) { return d.startOf('month').add(1, 'month'); });
    };
    Day.prototype.isEndOfMonth = function () {
        return this.dayOfMonth === this.daysInMonth();
    };
    // Year
    Day.prototype.startOfYear = function () {
        return this.mutate(function (d) { return d.startOf('year'); });
    };
    Day.prototype.isStartOfYear = function () {
        return this.month === Constants.MONTH_MIN && this.dayOfMonth === Constants.DAY_MIN;
    };
    Day.prototype.endOfYear = function (inclusive) {
        if (inclusive === void 0) { inclusive = true; }
        return inclusive ?
            this.mutate(function (d) { return d.endOf('year'); }) :
            this.mutate(function (d) { return d.startOf('year').add(1, 'year'); });
    };
    Day.prototype.isEndOfYear = function () {
        return this.month === Constants.MONTH_MAX && this.dayOfMonth === Constants.DAY_MAX;
    };
    // Days In X
    Day.prototype.daysInMonth = function () {
        return this.date.daysInMonth();
    };
    Day.prototype.daysInYear = function () {
        return this.endOfYear().dayOfYear;
    };
    Day.prototype.weeksInYear = function () {
        return this.date.weeksInYear();
    };
    // Display
    Day.prototype.format = function (format) {
        return this.date.format(format);
    };
    Day.prototype.utc = function (keepLocalTime) {
        return this.mutate(function (d) { return d.utc(keepLocalTime); });
    };
    Day.prototype.toMoment = function () {
        return this.date.clone();
    };
    Day.prototype.toDate = function () {
        return this.date.toDate();
    };
    Day.prototype.toArray = function () {
        return this.date.toArray();
    };
    Day.prototype.toJSON = function () {
        return this.date.toJSON();
    };
    Day.prototype.toISOString = function (keepOffset) {
        if (keepOffset === void 0) { keepOffset = false; }
        return this.date.toISOString(keepOffset);
    };
    Day.prototype.toObject = function () {
        return this.date.toObject();
    };
    Day.prototype.toString = function () {
        return this.date.toString();
    };
    // State
    Day.prototype.isDST = function () {
        return this.date.isDST();
    };
    Day.prototype.isLeapYear = function () {
        return this.date.isLeapYear();
    };
    // Instances
    Day.now = function () {
        return new Day(moment());
    };
    Day.today = function () {
        return this.now().start();
    };
    Day.tomorrow = function () {
        return this.today().next();
    };
    Day.fromMoment = function (moment) {
        return moment && moment.isValid() ? new Day(moment) : null;
    };
    Day.unix = function (millis) {
        return this.fromMoment(moment(millis));
    };
    Day.unixSeconds = function (millis) {
        return this.fromMoment(moment.unix(millis));
    };
    Day.parse = function (input) {
        return Parse.day(input);
    };
    Day.fromString = function (input) {
        return this.fromMoment(moment(input));
    };
    Day.fromFormat = function (input, formats) {
        return this.fromMoment(moment(input, formats));
    };
    Day.fromObject = function (input) {
        return this.fromMoment(moment(input));
    };
    Day.fromDate = function (input) {
        return this.fromMoment(moment(input));
    };
    Day.fromArray = function (input) {
        return this.fromMoment(moment(input));
    };
    Day.fromDayIdentifier = function (id) {
        var date = id % 100;
        var month = (Math.floor(id / 100) % 100) - 1;
        var year = Math.floor(id / 10000);
        return this.build(year, month, date);
    };
    Day.build = function (year, month, date, hour, minute, second, millisecond) {
        if (date === void 0) { date = Constants.DAY_MIN; }
        if (hour === void 0) { hour = Constants.HOUR_MIN; }
        if (minute === void 0) { minute = Constants.MINUTE_MIN; }
        if (second === void 0) { second = Constants.SECOND_MIN; }
        if (millisecond === void 0) { millisecond = Constants.MILLIS_MIN; }
        return new Day(moment({ year: year, month: month, date: date, hour: hour, minute: minute, second: second, millisecond: millisecond }));
    };
    Day.getWeekspanOfYear = function (date) {
        return Math.floor((date.dayOfYear() - 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastWeekspanOfYear = function (date) {
        var lastOfYear = date.clone().endOf('year');
        var daysInYear = lastOfYear.dayOfYear();
        return Math.floor((daysInYear - date.dayOfYear()) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        return firstOfYear.day() > Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY ? weeks - 1 : weeks;
    };
    Day.getFullWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? weeks : weeks - 1;
    };
    Day.getLastFullWeekOfYear = function (date) {
        var firstOfYear = date.clone().startOf('year');
        var weeks = date.week();
        var weeksMax = date.weeksInYear();
        var lastWeek = weeksMax - weeks;
        return firstOfYear.day() === Constants.WEEKDAY_MIN ? lastWeek + 1 : lastWeek;
    };
    Day.getWeekspanOfMonth = function (date) {
        return Math.floor((date.date() - 1) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastWeekspanOfMonth = function (date) {
        return Math.floor((date.daysInMonth() - date.date()) / Constants.DAYS_IN_WEEK);
    };
    Day.getFullWeekOfMonth = function (date) {
        return Math.floor((date.date() - 1 - date.day() + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastFullWeekOfMonth = function (date) {
        return Math.floor((date.daysInMonth() - date.date() - (Constants.WEEKDAY_MAX - date.day()) + Constants.DAYS_IN_WEEK) / Constants.DAYS_IN_WEEK);
    };
    Day.getWeekOfMonth = function (date) {
        var dom = date.date();
        var dow = date.day();
        var sundayDate = dom - dow;
        return Math.floor((sundayDate + Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY + 5) / Constants.DAYS_IN_WEEK);
    };
    Day.getLastDayOfMonth = function (date) {
        return date.daysInMonth() - date.date() + 1;
    };
    return Day;
}());
export { Day };
//# sourceMappingURL=Day.js.map