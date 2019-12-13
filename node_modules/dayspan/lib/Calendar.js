"use strict";
import { Functions as fn } from './Functions';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Op } from './Operation';
import { Units } from './Units';
import { Parse } from './Parse';
import { Constants } from './Constants';
import { CalendarDay } from './CalendarDay';
import { CalendarEvent } from './CalendarEvent';
import { Iterator, IteratorAction } from './Iterator';
/**
 * A collection of [[CalendarDay]]s, the events on the calendar, and all
 * [[CalendarEvent]]s generated based on the events.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
var Calendar = (function () {
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
    function Calendar(start, end, type, size, moveStart, moveEnd, input) {
        /**
         * If the calendar should be filled in so the first day of the calendar is
         * Sunday and the last day is Saturday.
         */
        this.fill = false;
        /**
         * The minimum number of days in the calendar no matter what the type or size
         * is. This can be used to display a month with a constant number of weeks -
         * because not all months contain the same number of weeks.
         */
        this.minimumSize = 0;
        /**
         * When `true` a [[CalendarEvent]] instance exists on each [[CalendarDay]]
         * the event covers even if the event didn't start on that day.
         */
        this.repeatCovers = true;
        /**
         * When `true` an event instance will be created for each time specified on
         * the schedule. If the schedule specifies an all day event then only one
         * event is added to a day. This is typically done when displaying days or
         * weeks and events can be displayed on a timeline.
         */
        this.listTimes = false;
        /**
         * When `true` events will be added to days "outside" the calendar. Days
         * outside the calendar are days filled in when [[Calendar.fill]] is `true`.
         * More specifically days that are in [[Calendar.filled]] and not in
         * [[Calendar.span]].
         */
        this.eventsOutside = false;
        /**
         * When `true` [[CalendarEvent.row]] will be set so when visually displaying
         * the event with others multi-day events will align and not overlap.
         */
        this.updateRows = false;
        /**
         * When `true` [[CalendarEvent.col]] will be set so when visually displaying
         * the event based on start and end time any events that overlap with each
         * other will be "indented" to see the event below it.
         */
        this.updateColumns = false;
        /**
         * The function (if any) which sorts the events on a calendar day.
         */
        this.eventSorter = null;
        /**
         * A function to use when parsing meta input into the desired type.
         *
         * @param input The input to parse.
         * @returns The meta parsed from the given input, if any.
         */
        this.parseMeta = (function (x) { return x; });
        /**
         * A function to use when parsing meta input into the desired type.
         *
         * @param input The input to parse.
         * @returns The meta parsed from the given input, if any.
         */
        this.parseData = (function (x) { return x; });
        /**
         * A selection of days on the calendar. If no days are selected this is `null`.
         * This is merely used to keep the selection flags in [[CalendarDay]] updated
         * via [[Calendar.refreshSelection]].
         */
        this.selection = null;
        /**
         * The array of days in this calendar and their events.
         */
        this.days = [];
        /**
         * The array of scheduled events added to the calendar.
         */
        this.events = [];
        /**
         * The array of visible events on the calendar. This is built based on the
         * span of the schedule in the given event and also the [[Event.visible]] flag.
         */
        this.visible = [];
        this.span = new DaySpan(start, end);
        this.filled = new DaySpan(start, end);
        this.type = type;
        this.size = size;
        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
        if (fn.isDefined(input)) {
            this.set(input);
        }
        else {
            this.refresh();
        }
    }
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
    Calendar.prototype.set = function (input) {
        var typeChange = fn.isDefined(input.type) && input.type !== this.type;
        var sizeChange = fn.isDefined(input.size) && input.size !== this.size;
        if (typeChange || sizeChange) {
            var focus_1 = fn.coalesce(input.otherwiseFocus, 0.4999);
            var prefer = fn.coalesce(input.preferToday, true);
            var size = fn.coalesce(input.size, this.size);
            var type = fn.coalesce(input.type, this.type);
            var around = fn.coalesce(input.around, this.days[Math.floor((this.days.length - 1) * focus_1)]);
            var today = Day.today();
            if (!around || (prefer && this.span.matchesDay(today))) {
                around = today;
            }
            var meta = Calendar.TYPES[type];
            var start = meta.getStart(Day.parse(around), size, focus_1);
            var end = meta.getEnd(start, size, focus_1);
            this.span.start = start;
            this.span.end = end;
            this.type = type;
            this.size = size;
            this.moveStart = meta.moveStart;
            this.moveEnd = meta.moveEnd;
        }
        else if (input.around) {
            var focus_2 = fn.coalesce(input.otherwiseFocus, 0.4999);
            var around = Day.parse(input.around);
            var type = this.type;
            var size = this.size;
            var meta = Calendar.TYPES[type];
            var start = meta.getStart(around, size, focus_2);
            var end = meta.getEnd(start, size, focus_2);
            this.span.start = start;
            this.span.end = end;
        }
        this.fill = fn.coalesce(input.fill, this.fill);
        this.minimumSize = fn.coalesce(input.minimumSize, this.minimumSize);
        this.repeatCovers = fn.coalesce(input.repeatCovers, this.repeatCovers);
        this.listTimes = fn.coalesce(input.listTimes, this.listTimes);
        this.eventsOutside = fn.coalesce(input.eventsOutside, this.eventsOutside);
        this.updateRows = fn.coalesce(input.updateRows, this.updateRows);
        this.updateColumns = fn.coalesce(input.updateColumns, this.updateColumns);
        this.eventSorter = fn.coalesce(input.eventSorter, this.eventSorter);
        this.parseMeta = fn.coalesce(input.parseMeta, this.parseMeta);
        this.parseData = fn.coalesce(input.parseData, this.parseData);
        if (fn.isArray(input.events)) {
            this.setEvents(input.events, true);
        }
        if (!input.delayRefresh) {
            this.refresh();
        }
        return this;
    };
    /**
     * Sets the [[Calendar.minimumSize]] value and returns `this` for method
     * chaining.
     *
     * @param minimumSize The new value.
     */
    Calendar.prototype.withMinimumSize = function (minimumSize) {
        this.minimumSize = minimumSize;
        this.refresh();
        return this;
    };
    /**
     * Sets the [[Calendar.repeatCovers]] value and returns `this` for method
     * chaining.
     *
     * @param repeatCovers The new value.
     */
    Calendar.prototype.withRepeatCovers = function (repeatCovers) {
        this.repeatCovers = repeatCovers;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.listTimes]] value and returns `this` for method
     * chaining.
     *
     * @param listTimes The new value.
     */
    Calendar.prototype.withListTimes = function (listTimes) {
        this.listTimes = listTimes;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.eventsOutside]] value and returns `this` for method
     * chaining.
     *
     * @param eventsOutside The new value.
     */
    Calendar.prototype.withEventsOutside = function (eventsOutside) {
        this.eventsOutside = eventsOutside;
        this.refreshEvents();
        return this;
    };
    /**
     * Sets the [[Calendar.updateRows]] value and returns `this` for method
     * chaining.
     *
     * @param updateRows The new value.
     * @param refresh If the rows should be updated now if `updateRows` is `true`.
     */
    Calendar.prototype.withUpdateRows = function (updateRows, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.updateRows = updateRows;
        if (refresh && updateRows) {
            this.refreshRows();
        }
        return this;
    };
    /**
     * Sets the [[Calendar.updateColumns]] value and returns `this` for method
     * chaining.
     *
     * @param updateColumns The new value.
     * @param refresh If the columns should be updated now if `updateColumns` is
     *    `true`.
     */
    Calendar.prototype.withUpdateColumns = function (updateColumns, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.updateColumns = updateColumns;
        if (refresh && updateColumns) {
            this.refreshColumns();
        }
        return this;
    };
    Object.defineProperty(Calendar.prototype, "start", {
        /**
         * Returns the start day of the calendar. If this calendar is filled, this
         * may not represent the very first day in the calendar.
         */
        get: function () {
            return this.span.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "end", {
        /**
         * Returns the end day of the calendar. If this calendar is filled, this
         * may not represent the very last day in the calendar.
         */
        get: function () {
            return this.span.end;
        },
        enumerable: true,
        configurable: true
    });
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
    Calendar.prototype.summary = function (dayOfWeek, short, repeat, contextual, delimiter) {
        if (dayOfWeek === void 0) { dayOfWeek = true; }
        if (short === void 0) { short = false; }
        if (repeat === void 0) { repeat = false; }
        if (contextual === void 0) { contextual = true; }
        if (delimiter === void 0) { delimiter = ' - '; }
        return this.span.summary(this.type, dayOfWeek, short, repeat, contextual, delimiter);
    };
    /**
     * Splits up this calendar into an iterable collection of calendars. The
     * resulting iterator will return `size / by` number of calendars.
     *
     * @param by The new size of the resulting calendars. If the the size of the
     *    current calendar is not divisible by this value the resulting calendars
     *    may cover more or less than this calendar covers.
     * @returns An iterator for the calendars produced.
     */
    Calendar.prototype.split = function (by) {
        var _this = this;
        if (by === void 0) { by = 1; }
        return new Iterator(function (iterator) {
            var start = _this.start;
            var end = _this.moveEnd(_this.end, by - _this.size);
            for (var i = 0; i < _this.size; i++) {
                var calendar = new Calendar(start, end, _this.type, by, _this.moveStart, _this.moveEnd, _this);
                if (iterator.act(calendar) === IteratorAction.Stop) {
                    return;
                }
                start = _this.moveStart(start, by);
                end = _this.moveEnd(end, by);
            }
        });
    };
    /**
     * Refreshes the days and events in this calendar based on the start and end
     * days, the calendar properties, and its eventss.
     *
     * @param today The current day to update the calendar days via
     *    [[CalendarDay.updateCurrent]].
     */
    Calendar.prototype.refresh = function (today) {
        if (today === void 0) { today = Day.today(); }
        this.length = this.span.days(Op.UP, true);
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshVisible();
        this.refreshEvents();
        return this;
    };
    /**
     * Updates the [[Calendar.filled]] span based on [[Calendar.start]],
     * [[Calendar.end]], and [[Calendar.fill]] properties.
     */
    Calendar.prototype.resetFilled = function () {
        this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
        this.filled.end = this.fill ? this.end.endOfWeek() : this.end;
        return this;
    };
    /**
     * Updates [[Calendar.days]] to match the span of days in the calendar.
     */
    Calendar.prototype.resetDays = function () {
        this.resetFilled();
        var days = this.days;
        var filled = this.filled;
        var current = filled.start;
        var daysBetween = filled.days(Op.UP);
        var total = Math.max(this.minimumSize, daysBetween);
        for (var i = 0; i < total; i++) {
            var day = days[i];
            if (!day || !day.sameDay(current)) {
                day = new CalendarDay(current.date);
                if (i < days.length) {
                    days.splice(i, 1, day);
                }
                else {
                    days.push(day);
                }
            }
            day.inCalendar = this.span.contains(day);
            current = current.next();
        }
        if (days.length > total) {
            days.splice(total, days.length - total);
        }
        return this;
    };
    /**
     * Updates the list of visible schedules.
     */
    Calendar.prototype.refreshVisible = function () {
        var start = this.filled.start;
        var end = this.filled.end;
        this.visible = this.events.filter(function (e) {
            return e.visible && e.schedule.matchesRange(start, end);
        });
        return this;
    };
    /**
     * Updates the days with the current day via [[CalendarDay.updateCurrent]].
     *
     * @param today The new current day.
     */
    Calendar.prototype.refreshCurrent = function (today) {
        if (today === void 0) { today = Day.today(); }
        this.iterateDays().iterate(function (d) {
            d.updateCurrent(today);
        });
        return this;
    };
    /**
     * Updates the selection flags in [[CalendarDay]] based on the
     * [[Calendar.selection]] property.
     */
    Calendar.prototype.refreshSelection = function () {
        var _this = this;
        this.iterateDays().iterate(function (d) {
            if (_this.selection) {
                d.updateSelected(_this.selection);
            }
            else {
                d.clearSelected();
            }
        });
        return this;
    };
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
    Calendar.prototype.refreshEvents = function () {
        var _this = this;
        this.iterateDays().iterate(function (d) {
            if (d.inCalendar || _this.eventsOutside) {
                d.events = _this.eventsForDay(d, _this.listTimes, _this.repeatCovers);
            }
        });
        if (this.updateRows) {
            this.refreshRows();
        }
        if (this.updateColumns) {
            this.refreshColumns();
        }
        return this;
    };
    /**
     * Refreshes the [[CalendarEvent.row]] property as described in the link.
     */
    Calendar.prototype.refreshRows = function () {
        var eventToRow = {};
        var onlyFullDay = this.listTimes;
        this.iterateDays().iterate(function (d) {
            if (d.dayOfWeek === 0) {
                eventToRow = {};
            }
            var used = {};
            for (var _i = 0, _a = d.events; _i < _a.length; _i++) {
                var event_1 = _a[_i];
                if (onlyFullDay && !event_1.fullDay) {
                    continue;
                }
                if (event_1.id in eventToRow) {
                    used[event_1.row = eventToRow[event_1.id]] = true;
                }
            }
            var rowIndex = 0;
            for (var _b = 0, _c = d.events; _b < _c.length; _b++) {
                var event_2 = _c[_b];
                if ((onlyFullDay && !event_2.fullDay) || event_2.id in eventToRow) {
                    continue;
                }
                while (used[rowIndex]) {
                    rowIndex++;
                }
                eventToRow[event_2.id] = event_2.row = rowIndex;
                rowIndex++;
            }
        });
        return this;
    };
    /**
     * Refreshes the [[CalendarEvent.col]] property as described in the link.
     */
    Calendar.prototype.refreshColumns = function () {
        this.iterateDays().iterate(function (d) {
            var markers = [];
            for (var _i = 0, _a = d.events; _i < _a.length; _i++) {
                var event_3 = _a[_i];
                if (!event_3.fullDay) {
                    markers.push({
                        time: event_3.time.start.time,
                        event: event_3,
                        start: true,
                        parent: null
                    });
                    markers.push({
                        time: event_3.time.end.time - 1,
                        event: event_3,
                        start: false,
                        parent: null
                    });
                }
            }
            markers.sort(function (a, b) {
                return a.time - b.time;
            });
            var parent = null;
            for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
                var marker = markers_1[_b];
                if (marker.start) {
                    marker.parent = parent;
                    parent = marker;
                }
                else if (parent) {
                    parent = parent.parent;
                }
            }
            for (var _c = 0, markers_2 = markers; _c < markers_2.length; _c++) {
                var marker = markers_2[_c];
                if (marker.start) {
                    marker.event.col = marker.parent ? marker.parent.event.col + 1 : 0;
                }
            }
        });
        return this;
    };
    /**
     * Gets the calendar day for the given day.
     *
     * @param input The day to get the calendar day for.
     * @returns The reference to the calendar day, or null if the given input
     *    is not on this calendar.
     */
    Calendar.prototype.getDay = function (input) {
        var parsed = Day.parse(input);
        if (parsed) {
            var dayCount = parsed.start().daysBetween(this.days[0], Op.DOWN, false);
            return this.days[dayCount];
        }
        return null;
    };
    /**
     * Iterates over all days in this calendar and passes each day to `iterator`.
     *
     * @param iterator The function to pass [[CalendarDay]]s to.
     */
    Calendar.prototype.iterateDays = function () {
        var _this = this;
        return new Iterator(function (iterator) {
            var days = _this.days;
            for (var i = 0; i < days.length; i++) {
                switch (iterator.act(days[i])) {
                    case IteratorAction.Stop:
                        return;
                }
            }
        });
    };
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
    Calendar.prototype.eventsForDay = function (day, getTimes, covers, sorter) {
        if (getTimes === void 0) { getTimes = true; }
        if (covers === void 0) { covers = true; }
        if (sorter === void 0) { sorter = this.eventSorter; }
        var events = [];
        var entries = this.visible;
        var _loop_1 = function (entryIndex) {
            var entry = entries[entryIndex];
            var schedule = entry.schedule;
            var eventId = entryIndex * Constants.MAX_EVENTS_PER_DAY;
            var timeIndex = 0;
            schedule.iterateSpans(day, covers).iterate(function (span, iterator) {
                events.push(new CalendarEvent(eventId + timeIndex++, entry, span, day));
                if (!getTimes) {
                    iterator.stop();
                }
            });
        };
        for (var entryIndex = 0; entryIndex < entries.length; entryIndex++) {
            _loop_1(entryIndex);
        }
        if (sorter) {
            events.sort(sorter);
        }
        return events;
    };
    /**
     * Finds the event given one of the ways to identify the event.
     *
     * @param input The value to use to search for an event.
     * @returns The refrence to the event or null if not found.
     */
    Calendar.prototype.findEvent = function (id) {
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_4 = _a[_i];
            if (event_4 === id || event_4.schedule === id || event_4.data === id || event_4.id === id) {
                return event_4;
            }
        }
        return null;
    };
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
    Calendar.prototype.removeEvents = function (events, delayRefresh) {
        if (events === void 0) { events = null; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        if (events) {
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_5 = events_1[_i];
                this.removeEvent(event_5, true);
            }
        }
        else {
            this.events = [];
        }
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Removes the given event if it exists on the calendar.
     *
     * @param event The event to remove if it exists.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is removed.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.removeEvent = function (event, delayRefresh) {
        if (delayRefresh === void 0) { delayRefresh = false; }
        var found = this.findEvent(event);
        if (found) {
            this.events.splice(this.events.indexOf(found), 1);
            this.refreshVisible();
            if (!delayRefresh) {
                this.refreshEvents();
            }
        }
        return this;
    };
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
    Calendar.prototype.addEvent = function (event, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        var parsed = Parse.event(event, this.parseData, this.parseMeta);
        if (!allowDuplicates) {
            var existing = this.findEvent(parsed);
            if (existing) {
                return this;
            }
        }
        this.events.push(parsed);
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
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
    Calendar.prototype.addEvents = function (events, allowDuplicates, delayRefresh) {
        if (allowDuplicates === void 0) { allowDuplicates = false; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
            var event_6 = events_2[_i];
            this.addEvent(event_6, allowDuplicates, true);
        }
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Sets the given events to this calendar replacing the current list of
     * events.
     *
     * @param events The events to set to the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    Calendar.prototype.setEvents = function (events, delayRefresh) {
        if (delayRefresh === void 0) { delayRefresh = false; }
        var parsedEvents = [];
        for (var i = 0; i < events.length; i++) {
            var parsed = Parse.event(events[i], this.parseData, this.parseMeta);
            if (parsed) {
                parsedEvents.push(parsed);
            }
        }
        this.events = parsedEvents;
        this.refreshVisible();
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    };
    /**
     * Sets the selection point or range of the calendar and updates the flags
     * in the days.
     *
     * @param start The start of the selection.
     * @param end The end of the selection.
     * @see [[Calendar.refreshSelection]]
     */
    Calendar.prototype.select = function (start, end) {
        if (end === void 0) { end = start; }
        this.selection = new DaySpan(start, end);
        this.refreshSelection();
        return this;
    };
    /**
     * Sets the selection of the calendar to nothing.
     *
     * @see [[Calendar.refreshSelection]]
     */
    Calendar.prototype.unselect = function () {
        this.selection = null;
        this.refreshSelection();
        return this;
    };
    /**
     * Shifts the calendar days by the given amount.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.move = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        this.span.start = this.moveStart(this.start, jump);
        this.span.end = this.moveEnd(this.end, jump);
        if (!delayRefresh) {
            this.refresh();
        }
        return this;
    };
    /**
     * Moves the calenndar to the next set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.next = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        return this.move(jump, delayRefresh);
    };
    /**
     * Moves the calenndar to the previous set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    Calendar.prototype.prev = function (jump, delayRefresh) {
        if (jump === void 0) { jump = this.size; }
        if (delayRefresh === void 0) { delayRefresh = false; }
        return this.move(-jump, delayRefresh);
    };
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
    Calendar.prototype.toInput = function (plain, plainData, plainMeta) {
        if (plain === void 0) { plain = false; }
        if (plainData === void 0) { plainData = function (d) { return d; }; }
        if (plainMeta === void 0) { plainMeta = function (m) { return m; }; }
        var out = {};
        out.type = this.type;
        out.size = this.size;
        out.fill = this.fill;
        out.minimumSize = this.minimumSize;
        out.repeatCovers = this.repeatCovers;
        out.listTimes = this.listTimes;
        out.eventsOutside = this.eventsOutside;
        out.updateRows = this.updateRows;
        out.updateColumns = this.updateColumns;
        out.around = plain ? this.span.start.time : this.span.start;
        out.events = [];
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_7 = _a[_i];
            if (plain) {
                var plainEvent = {};
                if (fn.isDefined(event_7.id)) {
                    plainEvent.id = event_7.id;
                }
                if (fn.isDefined(event_7.data)) {
                    plainEvent.data = plainData(event_7.data);
                }
                if (!event_7.visible) {
                    plainEvent.visible = event_7.visible;
                }
                plainEvent.schedule = event_7.schedule.toInput();
                var meta = plainEvent.schedule.meta;
                if (meta) {
                    for (var identifier in meta) {
                        meta[identifier] = plainMeta(meta[identifier]);
                    }
                }
                out.events.push(plainEvent);
            }
            else {
                out.events.push(event_7);
            }
        }
        return out;
    };
    /**
     * Creates a calendar based on the given input.
     *
     * @param input The input which has at least the `type` specified.
     * @returns A new calendar instance.
     */
    Calendar.fromInput = function (input) {
        var initial = Day.today();
        return new Calendar(initial, initial, null, 1, null, null, input);
    };
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
    Calendar.forType = function (type, size, around, focus, input) {
        if (size === void 0) { size = 1; }
        if (around === void 0) { around = Day.today(); }
        if (focus === void 0) { focus = 0.49999; }
        var meta = this.TYPES[type];
        var start = meta.getStart(around, size, focus);
        var end = meta.getEnd(start, size, focus);
        return new Calendar(start, end, type, size, meta.moveStart, meta.moveEnd, input || meta.defaultInput);
    };
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
    Calendar.days = function (days, around, focus, input) {
        if (days === void 0) { days = 1; }
        if (around === void 0) { around = Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.DAY, days, around, focus, input);
    };
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
    Calendar.weeks = function (weeks, around, focus, input) {
        if (weeks === void 0) { weeks = 1; }
        if (around === void 0) { around = Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.WEEK, weeks, around, focus, input);
    };
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
    Calendar.months = function (months, around, focus, input) {
        if (months === void 0) { months = 1; }
        if (around === void 0) { around = Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.MONTH, months, around, focus, input);
    };
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
    Calendar.years = function (years, around, focus, input) {
        if (years === void 0) { years = 1; }
        if (around === void 0) { around = Day.today(); }
        if (focus === void 0) { focus = 0.4999; }
        return this.forType(Units.YEAR, years, around, focus, input);
    };
    /**
     * A map of functions and properties by [[Units]] used to create or morph
     * Calendars.
     */
    Calendar.TYPES = (_a = {},
        _a[Units.DAY] = {
            getStart: function (around, size, focus) {
                return around.start().relativeDays(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeDays(size - 1).end();
            },
            moveStart: function (day, amount) {
                return day.relativeDays(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeDays(amount);
            },
            defaultInput: undefined
        },
        _a[Units.WEEK] = {
            getStart: function (around, size, focus) {
                return around.start().startOfWeek().relativeWeeks(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeWeeks(size - 1).endOfWeek();
            },
            moveStart: function (day, amount) {
                return day.relativeWeeks(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeWeeks(amount);
            },
            defaultInput: undefined
        },
        _a[Units.MONTH] = {
            getStart: function (around, size, focus) {
                return around.start().startOfMonth().relativeMonths(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeMonths(size - 1).endOfMonth();
            },
            moveStart: function (day, amount) {
                return day.relativeMonths(amount);
            },
            moveEnd: function (day, amount) {
                return day.startOfMonth().relativeMonths(amount).endOfMonth();
            },
            defaultInput: { fill: true }
        },
        _a[Units.YEAR] = {
            getStart: function (around, size, focus) {
                return around.start().startOfYear().relativeYears(-Math.floor(size * focus));
            },
            getEnd: function (start, size, focus) {
                return start.relativeYears(size - 1).endOfYear();
            },
            moveStart: function (day, amount) {
                return day.relativeYears(amount);
            },
            moveEnd: function (day, amount) {
                return day.relativeYears(amount);
            },
            defaultInput: { fill: true }
        },
        _a);
    return Calendar;
}());
export { Calendar };
var _a;
//# sourceMappingURL=Calendar.js.map