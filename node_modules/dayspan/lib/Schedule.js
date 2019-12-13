"use strict";
import { Functions as fn } from './Functions';
import { Day } from './Day';
import { Identifier } from './Identifier';
import { DaySpan } from './DaySpan';
import { Constants } from './Constants';
import { Parse } from './Parse';
import { Suffix } from './Suffix';
import { ScheduleModifier } from './ScheduleModifier';
import { Units } from './Units';
import { Iterator, IteratorAction } from './Iterator';
// @ts-ignore
import * as moment from 'moment';
/**
 * A class which describes when an event occurs over what time and if it repeats.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
var Schedule = (function () {
    /**
     * Creates a schedule based on the given input.
     *
     * @param input The input which describes the schedule of events.
     */
    function Schedule(input) {
        this.exclude = new ScheduleModifier();
        this.include = new ScheduleModifier();
        this.cancel = new ScheduleModifier();
        this.meta = new ScheduleModifier();
        if (fn.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     * Sets the schedule with the given input.
     *
     * @param input The input or schedule which describes the schedule of events.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @see [[Parse.schedule]]
     */
    Schedule.prototype.set = function (input, parseMeta) {
        if (parseMeta === void 0) { parseMeta = (function (x) { return x; }); }
        if (input instanceof Schedule) {
            Parse.schedule(input.toInput(), undefined, this);
        }
        else {
            Parse.schedule(input, fn.coalesce(input.parseMeta, parseMeta), this);
        }
        return this;
    };
    Object.defineProperty(Schedule.prototype, "lastTime", {
        /**
         * Returns the last event time specified or `undefined` if this schedule is
         * for an all day event.
         */
        get: function () {
            return this.times[this.times.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Schedule.prototype, "identifierType", {
        /**
         * The [[Identifier]] for this schedule. Either [[Identifier.Day]] or
         * [[Identifier.Time]].
         */
        get: function () {
            return this.isFullDay() ? Identifier.Day : Identifier.Time;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the [[Schedule.durationInDays]] variable based on the
     * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
     * [[Schedule.durationUnit]].
     */
    Schedule.prototype.updateDurationInDays = function () {
        var start = this.lastTime ? this.lastTime.toMilliseconds() : 0;
        var duration = this.duration * (Constants.DURATION_TO_MILLIS[this.durationUnit] || 0);
        var exclude = Constants.MILLIS_IN_DAY;
        var day = Constants.MILLIS_IN_DAY;
        this.durationInDays = Math.max(0, Math.ceil((start + duration - exclude) / day));
        return this;
    };
    /**
     * Updates [[Schedule.checks]] based on the frequencies that were specified
     * in the schedule input.
     */
    Schedule.prototype.updateChecks = function () {
        this.checks = Parse.givenFrequency([
            this.year,
            this.month,
            this.week,
            this.weekOfYear,
            this.fullWeekOfYear,
            this.weekspanOfYear,
            this.lastFullWeekOfYear,
            this.lastWeekspanOfYear,
            this.weekOfMonth,
            this.weekspanOfMonth,
            this.fullWeekOfMonth,
            this.lastWeekspanOfMonth,
            this.lastFullWeekOfMonth,
            this.dayOfWeek,
            this.dayOfMonth,
            this.lastDayOfMonth,
            this.dayOfYear
        ]);
        return this;
    };
    /**
     * Determines whether the given day lies between the earliest and latest
     * valid day in the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day lies in the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    Schedule.prototype.matchesSpan = function (day) {
        return (this.start === null || day.isSameOrAfter(this.start)) &&
            (this.end === null || day.isBefore(this.end));
    };
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
    Schedule.prototype.matchesRange = function (start, end) {
        if (this.start && end.isBefore(this.start)) {
            return false;
        }
        if (this.end && start.isAfter(this.end)) {
            return false;
        }
        return true;
    };
    /**
     * Determines whether the given day is explicitly excluded in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was excluded, otherwise `false`.
     */
    Schedule.prototype.isExcluded = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.exclude.get(day, false, lookAtTime);
    };
    /**
     * Determines whether the given day is explicitly included in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day is NOT explicitly included, otherwise `false`.
     */
    Schedule.prototype.isIncluded = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.include.get(day, false, lookAtTime);
    };
    /**
     * Determines whether the given day is cancelled in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was cancelled, otherwise `false`.
     */
    Schedule.prototype.isCancelled = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.cancel.get(day, false, lookAtTime);
    };
    /**
     * Returns the metadata for the given day or `null` if there is none.
     *
     * @param day The day to return the metadata for.
     * @param otherwise The data to return if none exists for the given day.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns The metadata or `null`.
     */
    Schedule.prototype.getMeta = function (day, otherwise, lookAtTime) {
        if (otherwise === void 0) { otherwise = null; }
        if (lookAtTime === void 0) { lookAtTime = true; }
        return this.meta.get(day, otherwise, lookAtTime);
    };
    /**
     * Returns all metadata for the given day or an empty array if there is none.
     *
     * @param day The day to return the metadata for.
     * @returns The array of metadata ordered by priority or an empty array.
     */
    Schedule.prototype.getMetas = function (day) {
        return this.meta.getAll(day);
    };
    /**
     * Returns whether the events in the schedule are all day long or start at
     * specific times. Full day events start at the start of the day and end at
     * the start of the next day (if the duration = `1` and durationUnit = 'days').
     * Full day events have no times specified and should have a durationUnit of
     * either `days` or `weeks`.
     */
    Schedule.prototype.isFullDay = function () {
        return this.times.length === 0;
    };
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
    Schedule.prototype.setFullDay = function (fullDay, defaultTime) {
        if (fullDay === void 0) { fullDay = true; }
        if (defaultTime === void 0) { defaultTime = '08:00'; }
        if (fullDay !== this.isFullDay()) {
            if (fullDay) {
                this.times = [];
                if (this.durationUnit !== 'days' && this.durationUnit !== 'day') {
                    this.duration = 1;
                    this.durationUnit = 'days';
                }
            }
            else {
                this.times = [Parse.time(defaultTime)];
                if (this.durationUnit !== 'hours' && this.durationUnit !== 'hour') {
                    this.duration = 1;
                    this.durationUnit = 'hours';
                }
            }
        }
        return this;
    };
    /**
     * Adjusts the [[Schedule.start]] and [[Schedule.end]] dates specified on this
     * schedule if this schedule represents a single event and the `start` and
     * `end` are already set or `addSpan` is `true`.
     *
     * @param addSpan If `true`, the `start` and `end` dates will always be
     *    adjusted if this schedule is a single event.
     */
    Schedule.prototype.adjustDefinedSpan = function (addSpan) {
        if (addSpan === void 0) { addSpan = false; }
        var single = this.getSingleEventSpan();
        if (single && (addSpan || (this.start && this.end))) {
            this.start = single.start.start();
            this.end = single.end.end();
        }
        return this;
    };
    /**
     * Returns a span of time for a schedule with full day events starting on the
     * start of the given day with the desired duration in days or weeks.
     *
     * @param day The day the span starts on.
     * @returns The span of time starting on the given day.
     */
    Schedule.prototype.getFullSpan = function (day) {
        var start = day.start();
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan(start, end);
    };
    /**
     * Returns a span of time starting on the given day at the given day with the
     * duration specified on this schedule.
     *
     * @param day The day the span starts on.
     * @param time The time of day the span starts.
     * @returns The span of time calculated.
     */
    Schedule.prototype.getTimeSpan = function (day, time) {
        var start = day.withTime(time);
        var end = start.add(this.duration, this.durationUnit);
        return new DaySpan(start, end);
    };
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
    Schedule.prototype.matchesDay = function (day) {
        if (this.isIncluded(day, false)) {
            return true;
        }
        if (!this.matchesSpan(day) || this.isFullyExcluded(day)) {
            return false;
        }
        for (var _i = 0, _a = this.checks; _i < _a.length; _i++) {
            var check = _a[_i];
            if (!check(day[check.property])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Determines whether the given day has events added through
     * [[Schedule.include]].
     *
     * @param day The day to look for included times on.
     * @returns `true` if there are included event instances on the given day,
     *    otherwise `false`.
     */
    Schedule.prototype.hasIncludedTime = function (day) {
        return !this.iterateIncludeTimes(day).isEmpty();
    };
    /**
     * Determines whether the given day is fully excluded from the schedule. A
     * fully excluded day is one that has a day-wide exclusion, or the schedule
     * is not an all-day event and all times in the schedule are specifically
     * excluded.
     *
     * @param day The day to test.*
     * @returns `true` if he day is fully excluded, otherwise `false`.
     */
    Schedule.prototype.isFullyExcluded = function (day) {
        if (this.isExcluded(day, false)) {
            return true;
        }
        if (this.isFullDay()) {
            return false;
        }
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var time = _a[_i];
            if (!this.isExcluded(day.withTime(time))) {
                return false;
            }
        }
        return true;
    };
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
    Schedule.prototype.nextDay = function (day, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        return this.iterateDaycast(day, 1, true, includeDay, lookAhead).first();
    };
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
    Schedule.prototype.nextDays = function (day, max, includeDay, lookAhead) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookAhead === void 0) { lookAhead = 366; }
        return this.iterateDaycast(day, max, true, includeDay, lookAhead);
    };
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
    Schedule.prototype.prevDay = function (day, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        return this.iterateDaycast(day, 1, false, includeDay, lookBack).first();
    };
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
    Schedule.prototype.prevDays = function (day, max, includeDay, lookBack) {
        if (includeDay === void 0) { includeDay = false; }
        if (lookBack === void 0) { lookBack = 366; }
        return this.iterateDaycast(day, max, false, includeDay, lookBack);
    };
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
    Schedule.prototype.iterateDaycast = function (day, max, next, includeDay, lookup) {
        var _this = this;
        if (includeDay === void 0) { includeDay = false; }
        if (lookup === void 0) { lookup = 366; }
        return new Iterator(function (iterator) {
            var iterated = 0;
            for (var days = 0; days < lookup; days++) {
                if (!includeDay || days > 0) {
                    day = next ? day.next() : day.prev();
                }
                if (!_this.iterateSpans(day, false).isEmpty()) {
                    var action = iterator.act(day);
                    if (action === IteratorAction.Stop || ++iterated >= max) {
                        return;
                    }
                }
            }
        });
    };
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
    Schedule.prototype.iterateSpans = function (day, covers) {
        var _this = this;
        if (covers === void 0) { covers = false; }
        return new Iterator(function (iterator) {
            var current = day;
            var lookBehind = covers ? _this.durationInDays : 0;
            // If the events start at the end of the day and may last multiple days....
            if (_this.isFullDay()) {
                // If the schedule has events which span multiple days we need to look
                // backwards for events that overlap with the given day.
                while (lookBehind >= 0) {
                    // If the current day matches the schedule rules...
                    if (_this.matchesDay(current)) {
                        // Build a DaySpan with the given start day and the schedules duration.
                        var span = _this.getFullSpan(current);
                        // If that dayspan intersects with the given day, it's a winner!
                        if (span.matchesDay(day)) {
                            switch (iterator.act(span)) {
                                case IteratorAction.Stop:
                                    return;
                            }
                        }
                    }
                    current = current.prev();
                    lookBehind--;
                }
            }
            else {
                // If the schedule has events which span multiple days we need to look
                // backwards for events that overlap with the given day.
                while (lookBehind >= 0) {
                    // If the current day matches the schedule rules...
                    if (_this.matchesDay(current)) {
                        // Iterate through each daily occurrence in the schedule...
                        for (var _i = 0, _a = _this.times; _i < _a.length; _i++) {
                            var time = _a[_i];
                            var span = _this.getTimeSpan(current, time);
                            // If the event intersects with the given day and the occurrence
                            // has not specifically been excluded...
                            if (span.matchesDay(day) && !_this.isExcluded(span.start, true)) {
                                switch (iterator.act(span)) {
                                    case IteratorAction.Stop:
                                        return;
                                }
                            }
                        }
                    }
                    else {
                        // The current day does not match the schedule, however the schedule
                        // might have moved/random event occurrents on the current day.
                        // We only want the ones that overlap with the given day.
                        _this.iterateIncludeTimes(current, day).iterate(function (span, timeIterator) {
                            switch (iterator.act(span)) {
                                case IteratorAction.Stop:
                                    timeIterator.stop();
                                    break;
                            }
                        });
                        if (iterator.action === IteratorAction.Stop) {
                            return;
                        }
                    }
                    current = current.prev();
                    lookBehind--;
                }
            }
        });
    };
    /**
     * Determines if the given day is on the schedule and the time specified on
     * the day matches one of the times on the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day and time match the schedule, otherwise false.
     */
    Schedule.prototype.matchesTime = function (day) {
        return !!this.iterateSpans(day, true).first(function (span) { return span.start.sameMinute(day); });
    };
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
    Schedule.prototype.coversDay = function (day) {
        return !this.iterateSpans(day, true).isEmpty();
    };
    /**
     * Determines if the given timestamp lies in an event occurrence on this
     * schedule.
     *
     * @param day The timestamp to test against the schedule.
     * @return `true` if the timestamp lies in an event occurrent start and end
     *    timestamps, otherwise `false`.
     */
    Schedule.prototype.coversTime = function (day) {
        return !!this.iterateSpans(day, true).first(function (span) { return span.contains(day); });
    };
    /**
     * Sets the frequency for the given property. This does not update the
     * [[Schedule.checks]] array, the [[Schedule.updateChecks]] function needs
     * to be called.
     *
     * @param property The frequency to update.
     * @param frequency The new frequency.
     */
    Schedule.prototype.setFrequency = function (property, frequency) {
        this[property] = Parse.frequency(frequency, property);
        return this;
    };
    /**
     * Changes the exclusion status of the event at the given time. By default
     * this excludes this event - but `false`  may be passed to undo an exclusion.
     *
     * @param time The start time of the event occurrence to exclude or include.
     * @param excluded Whether the event should be excluded.
     */
    Schedule.prototype.setExcluded = function (time, excluded) {
        if (excluded === void 0) { excluded = true; }
        var type = this.identifierType;
        this.exclude.set(time, excluded, type);
        this.include.set(time, !excluded, type);
        return this;
    };
    /**
     * Changes the cancellation status of the event at the given start time. By
     * default this cancels the event occurrence - but `false` may be passed to
     * undo a cancellation.
     *
     * @param time The start time of the event occurrence to cancel or uncancel.
     * @param cancelled Whether the event should be cancelled.
     */
    Schedule.prototype.setCancelled = function (time, cancelled) {
        if (cancelled === void 0) { cancelled = true; }
        this.cancel.set(time, cancelled, this.identifierType);
        return this;
    };
    /**
     * Removes the time from this schedule and all related included, excluded,
     * cancelled instances as well as metadata.
     *
     * @param time The time to remove from the schedule.
     * @param removeInclude If any included instances should be removed as well.
     * @returns `true` if the time was removed, otherwise `false`.
     */
    Schedule.prototype.removeTime = function (time, removeInclude) {
        if (removeInclude === void 0) { removeInclude = true; }
        var found = false;
        for (var i = 0; i < this.times.length && !found; i++) {
            if (found = time.matches(this.times[i])) {
                this.times.splice(i, 1);
            }
        }
        if (found) {
            if (removeInclude) {
                this.include.removeTime(time);
            }
            this.exclude.removeTime(time);
            this.cancel.removeTime(time);
            this.meta.removeTime(time);
        }
        return found;
    };
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
    Schedule.prototype.move = function (toTime, fromTime, meta) {
        if (!this.moveSingleEvent(toTime) && fromTime) {
            return this.moveInstance(fromTime, toTime);
        }
        return false;
    };
    /**
     * Moves a time specified in this schedule to the given time, adjusting
     * any cancelled event instances, metadata, and any excluded and included
     * event instances.
     *
     * @param fromTime The time to move.
     * @param toTime The new time in the schedule.
     * @returns `true` if time was moved, otherwise `false`.
     */
    Schedule.prototype.moveTime = function (fromTime, toTime) {
        var found = false;
        for (var i = 0; i < this.times.length && !found; i++) {
            if (found = fromTime.matches(this.times[i])) {
                this.times.splice(i, 1, toTime);
            }
        }
        if (found) {
            this.include.moveTime(fromTime, toTime);
            this.exclude.moveTime(fromTime, toTime);
            this.cancel.moveTime(fromTime, toTime);
            this.meta.moveTime(fromTime, toTime);
            this.adjustDefinedSpan(false);
        }
        return found;
    };
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
    Schedule.prototype.moveInstance = function (fromTime, toTime) {
        var type = this.identifierType;
        this.exclude.set(fromTime, true, type);
        this.exclude.set(toTime, false, type);
        this.include.set(toTime, true, type);
        this.include.set(fromTime, false, type);
        if (this.cancel.get(fromTime, false) && !this.cancel.get(toTime, false)) {
            this.cancel.set(toTime, true, type);
            if (this.cancel.getIdentifier(fromTime) === type) {
                this.cancel.unset(fromTime, type);
            }
        }
        var meta = this.meta.get(fromTime, null);
        if (meta && meta !== this.meta.get(toTime, null)) {
            this.meta.set(toTime, meta, type);
            if (this.meta.getIdentifier(fromTime) === type) {
                this.meta.unset(fromTime, type);
            }
        }
        return true;
    };
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
    Schedule.prototype.moveSingleEvent = function (toTime, takeTime) {
        if (takeTime === void 0) { takeTime = true; }
        if (!this.isSingleEvent()) {
            return false;
        }
        for (var _i = 0, _a = this.checks; _i < _a.length; _i++) {
            var check = _a[_i];
            var prop = check.property;
            var value = toTime[prop];
            var frequency = Parse.frequency([value], prop);
            this[prop] = frequency;
        }
        if (this.times.length === 1 && takeTime) {
            this.times = [toTime.asTime()];
        }
        this.updateChecks();
        var span = this.getSingleEventSpan();
        if (this.start) {
            this.start = span.start.start();
        }
        if (this.end) {
            this.end = span.end.end();
        }
        return true;
    };
    /**
     * Returns the span of the single event in this schedule if it's that type of
     * schedule, otherwise `null` is returned.
     *
     * @returns A span of the single event, otherwise `null`.
     * @see [[Schedule.isSingleEvent]]
     */
    Schedule.prototype.getSingleEventSpan = function () {
        if (!this.isSingleEvent()) {
            return null;
        }
        var startOfYear = Day.build(this.year.input[0], 0, 1);
        var start = this.iterateDaycast(startOfYear, 1, true, true, 366).first();
        if (!start) {
            return null;
        }
        return this.isFullDay() ?
            this.getFullSpan(start) :
            this.getTimeSpan(start, this.times[0]);
    };
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
    Schedule.prototype.isSingleEvent = function () {
        // 0 = full day, 1 = once a day, 1+ = multiple events a day
        if (this.times.length > 1) {
            return false;
        }
        // Let's assume if there are includes, this is not a single event.
        if (!this.include.isEmpty()) {
            return false;
        }
        // If this can occur on multiple years, not a single event.
        if (!this.isSingleYear()) {
            return false;
        }
        // If this is a specific year and day of the year: single!
        if (this.isSingleDayOfYear()) {
            return true;
        }
        // If this is a specific year, month, and day of month: single!
        if (this.isSingleMonth() && this.isSingleDayOfMonth()) {
            return true;
        }
        // If this is a specific year, month, week of the month, day of the week: single!
        if (this.isSingleMonth() && this.isSingleWeekOfMonth() && this.isSingleDayOfWeek()) {
            return true;
        }
        // If this is a specific year, week of the year, day of the week: single!
        if (this.isSingleWeekOfYear() && this.isSingleDayOfWeek()) {
            return true;
        }
        // Doesn't look like a single event.
        return false;
    };
    /**
     * @returns `true` if this schedule produces events only in a specific year.
     * @see [[Schedule.year]]
     */
    Schedule.prototype.isSingleYear = function () {
        return this.isSingleFrequency(this.year);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific month.
     * @see [[Schedule.month]]
     */
    Schedule.prototype.isSingleMonth = function () {
        return this.isSingleFrequency(this.month);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the month.
     * @see [[Schedule.dayOfMonth]]
     * @see [[Schedule.lastDayOfMonth]]
     */
    Schedule.prototype.isSingleDayOfMonth = function () {
        return this.isSingleFrequency(this.dayOfMonth) ||
            this.isSingleFrequency(this.lastDayOfMonth);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the week.
     * @see [[Schedule.dayOfWeek]]
     */
    Schedule.prototype.isSingleDayOfWeek = function () {
        return this.isSingleFrequency(this.dayOfWeek);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the year.
     * @see [[Schedule.dayOfYear]]
     */
    Schedule.prototype.isSingleDayOfYear = function () {
        return this.isSingleFrequency(this.dayOfYear);
    };
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the month.
     * @see [[Schedule.weekspanOfMonth]]
     * @see [[Schedule.fullWeekOfMonth]]
     * @see [[Schedule.weekOfMonth]]
     * @see [[Schedule.lastFullWeekOfMonth]]
     * @see [[Schedule.lastWeekspanOfMonth]]
     */
    Schedule.prototype.isSingleWeekOfMonth = function () {
        return this.isSingleFrequency(this.weekspanOfMonth) ||
            this.isSingleFrequency(this.fullWeekOfMonth) ||
            this.isSingleFrequency(this.weekOfMonth) ||
            this.isSingleFrequency(this.lastFullWeekOfMonth) ||
            this.isSingleFrequency(this.lastWeekspanOfMonth);
    };
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
    Schedule.prototype.isSingleWeekOfYear = function () {
        return this.isSingleFrequency(this.weekspanOfYear) ||
            this.isSingleFrequency(this.fullWeekOfYear) ||
            this.isSingleFrequency(this.week) ||
            this.isSingleFrequency(this.weekOfYear) ||
            this.isSingleFrequency(this.lastFullWeekOfYear) ||
            this.isSingleFrequency(this.lastWeekspanOfYear);
    };
    /**
     * Determines if the given [[FrequencyCheck]] results in a single occurrence.
     *
     * @returns `true` if the frequency results in a single event, otherwise `false`.
     */
    Schedule.prototype.isSingleFrequency = function (frequency) {
        return fn.isArray(frequency.input) && frequency.input.length === 1;
    };
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
    Schedule.prototype.forecast = function (around, covers, daysAfter, daysBefore, times, lookAround) {
        var _this = this;
        if (covers === void 0) { covers = true; }
        if (daysBefore === void 0) { daysBefore = daysAfter; }
        if (times === void 0) { times = false; }
        if (lookAround === void 0) { lookAround = 366; }
        var type = this.identifierType;
        var tuplesForDay = function (day, tuples) {
            var spans = _this.iterateSpans(day, covers).list();
            var last = times ? spans.length : Math.min(1, spans.length);
            var offset = times ? 0 : spans.length - 1;
            for (var i = 0; i < last; i++) {
                var span = spans[i + offset];
                var id = type.get(span.start);
                if (tuples.act([span, day, id]) === IteratorAction.Stop) {
                    return false;
                }
            }
            return true;
        };
        var prev = new Iterator(function (iterator) {
            var curr = around;
            for (var i = 0; i < lookAround; i++) {
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
                curr = curr.prev();
            }
        });
        var next = new Iterator(function (iterator) {
            var curr = around;
            for (var i = 0; i < lookAround; i++) {
                curr = curr.next();
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
            }
        });
        return prev.take(daysBefore + 1).reverse().append(next.take(daysAfter));
    };
    /**
     * Iterates timed events that were explicitly specified on the given day.
     * Those events could span multiple days so may be tested against another day.
     *
     * @param day The day to look for included timed events.
     * @param matchAgainst The day to test against the timed event.
     * @returns A new Iterator for all the included spans found.
     */
    Schedule.prototype.iterateIncludeTimes = function (day, matchAgainst) {
        var _this = this;
        if (matchAgainst === void 0) { matchAgainst = day; }
        var isIncludedTime = function (result) {
            var id = result[0], included = result[1];
            return included && Identifier.Time.is(id);
        };
        var getSpan = function (result) {
            var id = result[0];
            var time = Identifier.Time.start(id);
            var span = _this.getTimeSpan(time, time.asTime());
            if (span.matchesDay(matchAgainst)) {
                return span;
            }
        };
        return this.include.query(day.dayIdentifier).map(getSpan, isIncludedTime);
    };
    /**
     * Clones this schedule.
     *
     * @returns A new schedule which matches this schedule.
     */
    Schedule.prototype.clone = function () {
        return new Schedule(this.toInput());
    };
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
    Schedule.prototype.toInput = function (returnDays, returnTimes, timeFormat, alwaysDuration) {
        if (returnDays === void 0) { returnDays = false; }
        if (returnTimes === void 0) { returnTimes = false; }
        if (timeFormat === void 0) { timeFormat = ''; }
        if (alwaysDuration === void 0) { alwaysDuration = false; }
        var defaultUnit = Constants.DURATION_DEFAULT_UNIT(this.isFullDay());
        var exclusions = this.exclude.identifiers(function (v) { return v; }).list();
        var inclusions = this.include.identifiers(function (v) { return v; }).list();
        var cancels = this.cancel.identifiers(function (v) { return v; }).list();
        var hasMeta = !this.meta.isEmpty();
        var out = {};
        var times = [];
        for (var _i = 0, _a = this.times; _i < _a.length; _i++) {
            var time = _a[_i];
            times.push(returnTimes ? time : (timeFormat ? time.format(timeFormat) : time.toString()));
        }
        if (this.start)
            out.start = returnDays ? this.start : this.start.time;
        if (this.end)
            out.end = returnDays ? this.end : this.end.time;
        if (times.length)
            out.times = times;
        if (alwaysDuration || this.duration !== Constants.DURATION_DEFAULT)
            out.duration = this.duration;
        if (alwaysDuration || this.durationUnit !== defaultUnit)
            out.durationUnit = this.durationUnit;
        if (exclusions.length)
            out.exclude = exclusions;
        if (inclusions.length)
            out.include = inclusions;
        if (cancels.length)
            out.cancel = cancels;
        if (hasMeta)
            out.meta = fn.extend({}, this.meta.map);
        if (this.dayOfWeek.input)
            out.dayOfWeek = this.dayOfWeek.input;
        if (this.dayOfMonth.input)
            out.dayOfMonth = this.dayOfMonth.input;
        if (this.lastDayOfMonth.input)
            out.lastDayOfMonth = this.lastDayOfMonth.input;
        if (this.dayOfYear.input)
            out.dayOfYear = this.dayOfYear.input;
        if (this.year.input)
            out.year = this.year.input;
        if (this.month.input)
            out.month = this.month.input;
        if (this.week.input)
            out.week = this.week.input;
        if (this.weekOfYear.input)
            out.weekOfYear = this.weekOfYear.input;
        if (this.weekspanOfYear.input)
            out.weekspanOfYear = this.weekspanOfYear.input;
        if (this.fullWeekOfYear.input)
            out.fullWeekOfYear = this.fullWeekOfYear.input;
        if (this.lastWeekspanOfYear.input)
            out.lastWeekspanOfYear = this.lastWeekspanOfYear.input;
        if (this.lastFullWeekOfYear.input)
            out.lastFullWeekOfYear = this.lastFullWeekOfYear.input;
        if (this.weekOfMonth.input)
            out.weekOfMonth = this.weekOfMonth.input;
        if (this.weekspanOfMonth.input)
            out.weekspanOfMonth = this.weekspanOfMonth.input;
        if (this.fullWeekOfMonth.input)
            out.fullWeekOfMonth = this.fullWeekOfMonth.input;
        if (this.lastWeekspanOfMonth.input)
            out.lastWeekspanOfMonth = this.lastWeekspanOfMonth.input;
        if (this.lastFullWeekOfMonth.input)
            out.lastFullWeekOfMonth = this.lastFullWeekOfMonth.input;
        return out;
    };
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
    Schedule.prototype.describe = function (thing, includeRange, includeTimes, includeDuration, includeExcludes, includeIncludes, includeCancels) {
        if (thing === void 0) { thing = 'event'; }
        if (includeRange === void 0) { includeRange = true; }
        if (includeTimes === void 0) { includeTimes = true; }
        if (includeDuration === void 0) { includeDuration = false; }
        if (includeExcludes === void 0) { includeExcludes = false; }
        if (includeIncludes === void 0) { includeIncludes = false; }
        if (includeCancels === void 0) { includeCancels = false; }
        var out = '';
        if (includeRange) {
            if (this.start) {
                out += 'Starting on ' + this.start.format('dddd Do, YYYY');
                if (this.end) {
                    out += ' and ending on ' + this.end.format('dddd Do, YYYY');
                }
            }
            else if (this.end) {
                out += 'Up until ' + this.end.format('dddd Do, YYYY');
            }
        }
        if (out) {
            out += ' the ' + thing + ' will occur';
        }
        else {
            out += 'The ' + thing + ' will occur';
        }
        out += this.describeRule(this.dayOfWeek.input, 'day of the week', function (x) { return moment.weekdays()[x]; }, 1, false);
        out += this.describeRule(this.lastDayOfMonth.input, 'last day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfMonth.input, 'day of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.dayOfYear.input, 'day of the year', function (x) { return Suffix.CACHE[x]; }, 1);
        out += this.describeRule(this.year.input, 'year', function (x) { return x; }, 0, false, ' in ');
        out += this.describeRule(this.month.input, 'month', function (x) { return moment.months()[x]; }, 0, false, ' in ');
        out += this.describeRule(this.weekOfYear.input, 'week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekspanOfYear.input, 'weekspan of the year', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.fullWeekOfYear.input, 'full week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.lastWeekspanOfYear.input, 'last weekspan of the year', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.lastFullWeekOfYear.input, 'last full week of the year', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekOfMonth.input, 'week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.fullWeekOfMonth.input, 'full week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.weekspanOfMonth.input, 'weekspan of the month', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        out += this.describeRule(this.lastFullWeekOfMonth.input, 'last full week of the month', function (x) { return Suffix.CACHE[x]; });
        out += this.describeRule(this.lastWeekspanOfMonth.input, 'last weekspan of the month', function (x) { return Suffix.CACHE[x + 1]; }, 1);
        if (includeTimes && this.times.length) {
            out += ' at ';
            out += this.describeArray(this.times, function (x) { return x.format('hh:mm a'); });
        }
        if (includeDuration && this.duration !== Constants.DURATION_DEFAULT) {
            out += ' lasting ' + this.duration + ' ';
            if (this.durationUnit) {
                out += this.durationUnit + ' ';
            }
        }
        if (includeExcludes) {
            var excludes = this.exclude.spans().list();
            if (excludes.length) {
                out += ' excluding ';
                out += this.describeArray(excludes, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        if (includeIncludes) {
            var includes = this.include.spans().list();
            if (includes.length) {
                out += ' including ';
                out += this.describeArray(includes, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        if (includeCancels) {
            var cancels = this.cancel.spans().list();
            if (cancels.length) {
                out += ' with cancellations on ';
                out += this.describeArray(cancels, function (x) { return x.span.summary(Units.DAY); });
            }
        }
        return out;
    };
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
    Schedule.prototype.describeRule = function (value, unit, map, everyOffset, the, on, required) {
        if (everyOffset === void 0) { everyOffset = 0; }
        if (the === void 0) { the = true; }
        if (on === void 0) { on = ' on '; }
        if (required === void 0) { required = false; }
        var out = '';
        var suffix = the ? ' ' + unit : '';
        if (fn.isFrequencyValueEvery(value)) {
            var valueEvery = value;
            out += ' every ' + Suffix.CACHE[valueEvery.every] + ' ' + unit;
            if (valueEvery.offset) {
                out += ' starting at ' + map(valueEvery.offset + everyOffset) + suffix;
            }
        }
        else if (fn.isFrequencyValueOneOf(value)) {
            var valueOne = value;
            if (valueOne.length) {
                out += on + (the ? 'the ' : '');
                out += this.describeArray(valueOne, map);
                out += suffix;
            }
        }
        else if (required) {
            out += on + 'any ' + unit;
        }
        return out;
    };
    /**
     * Describes the array by adding commas where appropriate and 'and' before the
     * last value of the array (if its more than `1`).
     *
     * @param array The array of items to describe.
     * @param map The function which converts an item to a string.
     * @returns The final description of the array items.
     */
    Schedule.prototype.describeArray = function (array, map) {
        var out = '';
        var last = array.length - 1;
        out += map(array[0]);
        for (var i = 1; i < last; i++) {
            out += ', ' + map(array[i]);
        }
        if (last > 0) {
            out += ' and ' + map(array[last]);
        }
        return out;
    };
    /**
     * Generates a schedule for an event which occurs once all day for a given day
     * optionally spanning multiple days starting on the given day.
     *
     * @param input The day the event starts.
     * @param days The number of days the event lasts.
     * @returns A new schedule that starts on the given day.
     */
    Schedule.forDay = function (input, days) {
        if (days === void 0) { days = 1; }
        var day = Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            duration: days,
            durationUnit: 'days'
        });
    };
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
    Schedule.forTime = function (input, time, duration, durationUnit) {
        if (duration === void 0) { duration = 1; }
        if (durationUnit === void 0) { durationUnit = 'hours'; }
        var day = Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            times: [time],
            duration: duration,
            durationUnit: durationUnit
        });
    };
    /**
     * Generates a schedule for an event which occurs once over a given span.
     *
     * @param span The span of the event.
     * @returns A new schedule that starts and ends at the given timestamps.
     */
    Schedule.forSpan = function (span) {
        var start = span.start;
        var minutes = span.minutes();
        var isDay = minutes % Constants.MINUTES_IN_DAY === 0;
        var isHour = minutes % Constants.MINUTES_IN_HOUR === 0;
        var duration = isDay ? minutes / Constants.MINUTES_IN_DAY : (isHour ? minutes / Constants.MINUTES_IN_HOUR : minutes);
        var durationUnit = isDay ? 'days' : (isHour ? 'hours' : 'minutes');
        return this.forTime(start, start.asTime(), duration, durationUnit);
    };
    return Schedule;
}());
export { Schedule };
//# sourceMappingURL=Schedule.js.map