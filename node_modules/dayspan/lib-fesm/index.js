/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/Functions.ts

/**
 * The class which contains commonly used functions by the library. These
 * functions and variables exist in a class so they may be overridden if
 * desired.
 */
class Functions {
    /**
     * Determines whether the given input is an array.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is an array, otherwise `false`.
     */
    static isArray(input) {
        return input instanceof Array;
    }
    /**
     * Determines whether the two arrays given are stricly equivalent. If the
     * arrays are not the same length or contain the same values in the same order
     * then `false` is returned.
     *
     * @param x The first array to test.
     * @param y The second array to test.
     * @returns `true` if they have the same exact values, otherwise `false`.
     */
    static isArrayEquals(x, y) {
        if (x === y)
            return true;
        if (x.length !== y.length)
            return false;
        for (let i = 0; i < x.length; i++) {
            if (x[i] !== y[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Determines whether the given input is a string.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a string, otherwise `false`.
     */
    static isString(input) {
        return typeof (input) === 'string';
    }
    /**
     * Determines whether the given input is a finite number (a number which is
     * not infinite or not the result of a divide-by-zero operation).
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a finite number, otherwise `false`.
     */
    static isNumber(input) {
        return isFinite(input) && typeof input === 'number';
    }
    /**
     * Determines whether the given input is an object and NOT an array.
     *
     * @param input The variable to test.
     * @returns `true` if the variable is a plain object, otherwise `false`.
     */
    static isObject(input) {
        return input !== null && !this.isArray(input) && typeof (input) === 'object';
    }
    /**
     * Determines whether the given input is defined.
     *
     * @param input The variable to test.
     * @return `true` if the variable is defined, otherwise `false`.
     */
    static isDefined(input) {
        return typeof (input) !== 'undefined';
    }
    /**
     * Determines whether the given input is defined and not null.
     *
     * @param input The variable to test.
     * @return `true` if the variable is defined and not null, otherwise `false`.
     */
    static isValue(input) {
        return input !== null && typeof (input) !== 'undefined';
    }
    /**
     * Determines whether the given input appears to be a valid
     * [[FrequencyValueEvery]].
     *
     * ```typescript
     * Functions.isFrequencyValueEvery({});                   // false
     * Functions.isFrequencyValueEvery([]);                   // false
     * Functions.isFrequencyValueEvery([1]);                  // false
     * Functions.isFrequencyValueEvery(null);                 // false
     * Functions.isFrequencyValueEvery({every:2});            // true
     * Functions.isFrequencyValueEvery({offset:1});           // false
     * Functions.isFrequencyValueEvery({every:2, offset:1});  // true
     * ```
     *
     * @param input The variable to test.
     * @returns `true` if the variable appears to be a [[FrequencyValueEvery]],
     *    otherwise false.
     */
    static isFrequencyValueEvery(input) {
        return this.isObject(input) && this.isNumber(input.every);
    }
    /**
     * Determines whether the given input appears to be a valid
     * [[FrequencyValueOneOf]].
     *
     * ```typescript
     * Functions.isFrequencyValueOneOf({});    // false
     * Functions.isFrequencyValueOneOf([]);    // false
     * Functions.isFrequencyValueOneOf([1]);   // true
     * Functions.isFrequencyValueOneOf(null);  // false
     * ```
     *
     * @param input The variable to test.
     * @returns `true` if the variable appears to be a [[FrequencyValueOneOf]],
     *    otherwise false.
     */
    static isFrequencyValueOneOf(input) {
        return this.isArray(input) && input.length > 0;
    }
    /**
     * Returns the first argument which is defined.
     *
     * ```typescript
     * Functions.coalesce(3, 4);                // 3
     * Functions.coalesce(undefined, 4);        // 4
     * Functions.coalesce(null, 4);             // null
     * Functions.coalesce(void 0, void 0, 5);   // 5
     * ```
     *
     * @param a The first argument to look at.
     * @param b The second argument to look at.
     * @returns The first defined argument.
     * @see [[Functions.isDefined]]
     */
    static coalesce(a, b, c) {
        return this.isDefined(a) ? a : (this.isDefined(b) ? b : c);
    }
    /**
     * Copies values from `from` object and sets them to the `target` object.
     *
     * @param target The object to set values to.
     * @param from The object to copy value references from.
     * @returns The reference to `target`.
     */
    static extend(target, from) {
        for (let prop in from) {
            target[prop] = from[prop];
        }
        return target;
    }
    /**
     * Pads the string `x` up to `length` characters with the given `padding`
     * optionally placing the `padding` `before` `x`.
     *
     * ```typescript
     * Functions.pad('hey', 5, '_', false);   // 'hey__'
     * Functions.pad('hey', 5, '_', true);    // '__hey'
     * Functions.pad('heyman', 5, '_', true); // 'heyman'
     * ```
     *
     * @param x The string to pad.
     * @param length The length to pad to.
     * @param padding The string to pad with.
     * @param before If the padding should go before the string to pad.
     * @returns The padded string if any padding needed be added.
     */
    static pad(x, length, padding, before) {
        while (x.length < length) {
            before ? x = padding + x : x = x + padding;
        }
        return x;
    }
    /**
     * Pads the number `x` up to `length` digits where the padding is `0` and it
     * goes before `x`. This function will only return the first `length`
     * characters of the padding string representation of the number but can return
     * an alternative number of `first` characters.
     *
     * ```typescript
     * Functions.padNumber(29, 3);      // '029'
     * Functions.padNumber(29, 3, 2);   // '02'
     * Functions.padNumber(9573, 3);    // '957'
     * ```
     *
     * @param x The number to pad with zeros in the beginning.
     * @param length The number of digits the number should be padded to.
     * @param first The number of digits to return from the start of the string.
     * @returns A padded number.
     */
    static padNumber(x, length, first = length) {
        return this.pad(x + '', length, '0', true).substring(0, first);
    }
}

// CONCATENATED MODULE: ./src/Operation.ts

/**
 * An operation that can be performed on a single number.
 */
var Op;
(function (Op) {
    /**
     * The number is returned unmodified.
     */
    Op[Op["NONE"] = 0] = "NONE";
    /**
     * The number is rounded down to the nearest whole number.
     */
    Op[Op["FLOOR"] = 1] = "FLOOR";
    /**
     * The number is rounded up to the nearest whole number.
     */
    Op[Op["CEIL"] = 2] = "CEIL";
    /**
     * The number is rounded up or down depending on if the fractional value is
     * greater than or less than 0.5 respectively.
     */
    Op[Op["ROUND"] = 3] = "ROUND";
    /**
     * The fractional part of the number is dropped.
     */
    Op[Op["TRUNCATE"] = 4] = "TRUNCATE";
    /**
     * The number is rounded up when positive and down when negative. This is
     * effectively ceiling the absolute value where the result preserves the sign.
     */
    Op[Op["UP"] = 5] = "UP";
    /**
     * The number is rounded down when positive and up when negative. This is
     * effectively floor the absolute value where the result preserves the sign.
     */
    Op[Op["DOWN"] = 6] = "DOWN";
})(Op = Op || (Op = {}));
/**
 * Performs the requested operation on the given number, optionally taking
 * the absolute value of the number before the operation.
 *
 * @param value The number to operate on.
 * @param op The operation to perform.
 * @param absolute If the number should be positive before the operation.
 * @return The operated result, or the original value if its not a valid number.
 */
function operate(value, op, absolute = false) {
    if (isFinite(value)) {
        if (absolute) {
            value = Math.abs(value);
        }
        switch (op) {
            case Op.NONE:
                return value;
            case Op.FLOOR:
                return Math.floor(value);
            case Op.CEIL:
                return Math.ceil(value);
            case Op.ROUND:
                return Math.round(value);
            case Op.TRUNCATE:
            case Op.DOWN:
                return value < 0 ? Math.ceil(value) : Math.floor(value);
            case Op.UP:
                return value < 0 ? Math.floor(value) : Math.ceil(value);
        }
    }
    return value;
}

// CONCATENATED MODULE: ./src/Units.ts

/**
 * Units of time that are compromised of 1 or more days for the [[Calendar]] class.
 */
var Units;
(function (Units) {
    Units[Units["DAY"] = 0] = "DAY";
    Units[Units["WEEK"] = 1] = "WEEK";
    Units[Units["MONTH"] = 2] = "MONTH";
    Units[Units["YEAR"] = 3] = "YEAR";
})(Units = Units || (Units = {}));

// CONCATENATED MODULE: ./src/Constants.ts

/**
 * A class that stores commonly used values.
 */
class Constants {
}
/**
 * The number of milliseconds in a second.
 */
Constants.MILLIS_IN_SECOND = 1000;
/**
 * The number of milliseconds in a minute.
 */
Constants.MILLIS_IN_MINUTE = Constants.MILLIS_IN_SECOND * 60;
/**
 * The number of milliseconds in an hour.
 */
Constants.MILLIS_IN_HOUR = Constants.MILLIS_IN_MINUTE * 60;
/**
 * The number of milliseconds in a day (not including DST days).
 */
Constants.MILLIS_IN_DAY = Constants.MILLIS_IN_HOUR * 24;
/**
 * The number of milliseconds in a week (not including ones that include DST).
 */
Constants.MILLIS_IN_WEEK = Constants.MILLIS_IN_DAY * 7;
/**
 * The number of minutes in an hour.
 */
Constants.MINUTES_IN_HOUR = 60;
/**
 * The number of minutes in a day (not including DST days).
 */
Constants.MINUTES_IN_DAY = 60 * 24;
/**
 * The number of days in a week.
 */
Constants.DAYS_IN_WEEK = 7;
/**
 * The number of months in a year.
 */
Constants.MONTHS_IN_YEAR = 12;
/**
 * The number of hours in a day (not including DST days).
 */
Constants.HOURS_IN_DAY = 24;
/**
 * The first month of the year.
 */
Constants.MONTH_MIN = 0;
/**
 * The last month of the year.
 */
Constants.MONTH_MAX = 11;
/**
 * The first day of a month.
 */
Constants.DAY_MIN = 1;
/**
 * The last day of the longest month.
 */
Constants.DAY_MAX = 31;
/**
 * The first hour of the day.
 */
Constants.HOUR_MIN = 0;
/**
 * The last hour of the day.
 */
Constants.HOUR_MAX = 23;
/**
 * The first minute of the hour.
 */
Constants.MINUTE_MIN = 0;
/**
 * The last minute of the hour.
 */
Constants.MINUTE_MAX = 59;
/**
 * The first second of the minute.
 */
Constants.SECOND_MIN = 0;
/**
 * The last second of the minute.
 */
Constants.SECOND_MAX = 59;
/**
 * The first millisecond of the second.
 */
Constants.MILLIS_MIN = 0;
/**
 * The last millisecond of the second.
 */
Constants.MILLIS_MAX = 999;
/**
 * The first day of the week.
 */
Constants.WEEKDAY_MIN = 0;
/**
 * The last day of the week.
 */
Constants.WEEKDAY_MAX = 6;
/**
 * The default duration for an event.
 */
Constants.DURATION_DEFAULT = 1;
/**
 * The default duration unit for an all day event.
 */
Constants.DURATION_DEFAULT_UNIT_ALL = 'days';
/**
 * The default duration unit for an event at a given time.
 */
Constants.DURATION_DEFAULT_UNIT_TIMES = 'hours';
/**
 * Computes the duration unit given its for an all day event.
 *
 * @param all If the event is all day.
 * @return The default unit for the event.
 */
Constants.DURATION_DEFAULT_UNIT = all => all ? Constants.DURATION_DEFAULT_UNIT_ALL :
    Constants.DURATION_DEFAULT_UNIT_TIMES;
/**
 * The number of milliseconds for various duration units. These are worse case
 * scenario and do not include DST changes.
 */
Constants.DURATION_TO_MILLIS = {
    minute: Constants.MILLIS_IN_MINUTE,
    minutes: Constants.MILLIS_IN_MINUTE,
    hour: Constants.MILLIS_IN_HOUR,
    hours: Constants.MILLIS_IN_HOUR,
    day: Constants.MILLIS_IN_DAY,
    days: Constants.MILLIS_IN_DAY,
    week: Constants.MILLIS_IN_WEEK,
    weeks: Constants.MILLIS_IN_WEEK,
    month: Constants.MILLIS_IN_DAY * Constants.DAY_MAX,
    months: Constants.MILLIS_IN_DAY * Constants.DAY_MAX
};
/**
 * The maximum estimated number of events per day. This is used to calculate
 * [[CalendarEvent.id]] to give each event a unique ID. If you think you will
 * have more events than this per day, you can enlarge the value.
 */
Constants.MAX_EVENTS_PER_DAY = 24;
/**
 * The day of the week which determines the first week of the year or month.
 * By default this day is Thursday.
 */
Constants.WEEK_OF_MONTH_MINIMUM_WEEKDAY = 4;

// CONCATENATED MODULE: ./src/DaySpan.ts





/**
 * A class for a range of time between two [[Day]] timestamps.
 */
class DaySpan_DaySpan {
    /**
     * Creates a new span of time.
     *
     * @param start The starting timestamp.
     * @param end The ending timestamp.
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Whether this span starts and ends on the same timestamp.
     */
    get isPoint() {
        return this.start.time === this.end.time;
    }
    /**
     * Determines whether the given timestamp lies between the start and end
     * timestamp.
     *
     * @param day The timestamp to test.
     * @returns True if the day is >= the start and <= the end of this span.
     */
    contains(day) {
        return day.time >= this.start.time && day.time <= this.end.time;
    }
    /**
     * Compares the given timestamp to this span. If the timestamp is before this
     * span then `-1` is returned, if the timestamp is after this span then `1`
     * us returned, otherwise `0` is returned when the timestamp is in this span.
     *
     * @param day The timestamp to compare to.
     * @returns `-1`, `0`, or `1` depending on the given timestamp relative to
     *    this span.
     */
    compareTo(day) {
        return day.time < this.start.time ? -1 : (day.time > this.end.time ? 1 : 0);
    }
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same day as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameDay]]
     */
    matchesDay(day) {
        return this.contains(day) || day.sameDay(this.start) || day.sameDay(this.end);
    }
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same week as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameWeek]]
     */
    matchesWeek(day) {
        return this.contains(day) || day.sameWeek(this.start) || day.sameWeek(this.end);
    }
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same month as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameMonth]]
     */
    matchesMonth(day) {
        return this.contains(day) || day.sameMonth(this.start) || day.sameMonth(this.end);
    }
    /**
     * Determines whether the given timestamp is between the start and end
     * timestamp or lies on the same year as the start or end timestamp.
     *
     * @param day The timestamp to test.
     * @see [[Day.sameYear]]
     */
    matchesYear(day) {
        return this.contains(day) || day.sameYear(this.start) || day.sameYear(this.end);
    }
    /**
     * Calculates the number of milliseconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.millisBetween]]
     */
    millis(op = Op.DOWN, absolute = true) {
        return this.start.millisBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of seconds between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.secondsBetween]]
     */
    seconds(op = Op.DOWN, absolute = true) {
        return this.start.secondsBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of minutes between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.minutesBetween]]
     */
    minutes(op = Op.DOWN, absolute = true) {
        return this.start.minutesBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of hours between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.hoursBetween]]
     */
    hours(op = Op.DOWN, absolute = true) {
        return this.start.hoursBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of days between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.daysBetween]]
     */
    days(op = Op.DOWN, absolute = true) {
        return this.start.daysBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of weeks between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.weeksBetween]]
     */
    weeks(op = Op.DOWN, absolute = true) {
        return this.start.weeksBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of months between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.monthsBetween]]
     */
    months(op = Op.DOWN, absolute = true) {
        return this.start.monthsBetween(this.end, op, absolute);
    }
    /**
     * Calculates the number of years between the start and end timestamp.
     *
     * @param op The operation to perform on the result.
     * @param absolute Whether the result should always be positive.
     * @returns The time between the start and end timestamp.
     * @see [[Day.yearsBetween]]
     */
    years(op = Op.DOWN, absolute = true) {
        return this.start.yearsBetween(this.end, op, absolute);
    }
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.start]] is relative to the given day. The delta value would
     * be less than 0 if the start of the event is before the given day.
     *
     * @param relativeTo The day to find the start delta relative to.
     * @return A number between 0 and 1 if the start of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    startDelta(relativeTo) {
        return (this.start.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    }
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[DaySpan.end]] is relative to the given day. The delta value would
     * be greater than 1 if the end of the event is after the given day.
     *
     * @param relativeTo The day to find the end delta relative to.
     * @return A number between 0 and 1 if the end of this span is in the
     *    24-hour period starting at the given timestamp, otherwise the value
     *    returned may be less than 0 or greater than 1.
     */
    endDelta(relativeTo) {
        return (this.end.time - relativeTo.time) / Constants.MILLIS_IN_DAY;
    }
    /**
     * Calculates the bounds for span event if it were placed in a rectangle which
     * represents a day (24 hour period). By default the returned values are
     * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
     * rectangle dimensions can be passed to this function.
     *
     * @param relativeTo The day to find the bounds relative to. If this is not the
     *    start of the day the returned bounds is relative to the given time.
     * @param dayHeight The height of the rectangle of the day.
     * @param dayWidth The width of the rectangle of the day.
     * @param columnOffset The offset in the rectangle of the day to adjust this
     *    span by. This also reduces the width of the returned bounds to keep the
     *    bounds in the rectangle of the day.
     * @param clip `true` if the bounds should stay in the day rectangle, `false`
     *    and the bounds may go outside the rectangle of the day for multi-day
     *    spans.
     * @param offsetX How much to translate the left & right properties by.
     * @param offsetY How much to translate the top & bottom properties by.
     * @returns The calculated bounds for this span.
     */
    getBounds(relativeTo, dayHeight = 1, dayWidth = 1, columnOffset = 0, clip = true, offsetX = 0, offsetY = 0) {
        let startRaw = this.startDelta(relativeTo);
        let endRaw = this.endDelta(relativeTo);
        let start = clip ? Math.max(0, startRaw) : startRaw;
        let end = clip ? Math.min(1, endRaw) : endRaw;
        let left = columnOffset;
        let right = dayWidth - left;
        let top = start * dayHeight;
        let bottom = end * dayHeight;
        return {
            top: top + offsetY,
            bottom: bottom + offsetY,
            height: bottom - top,
            left: left + offsetX,
            right: right + offsetX,
            width: right
        };
    }
    /**
     * Summarizes this span given an approximate unit of time and a few other
     * options. If the start and end are on the same unit, a single value will
     * be returned. Otherwise a start and end will be returned with a `delimiter`.
     *
     * @param type The unit of time this span is for.
     * @param dayOfWeek When `true` the weekday of the start and end are included.
     * @param short When `true` the short form of weekdays and months will be used.
     * @param repeat When `true` the year will be repeated on the start and end
     *  timestamp even if they are the same year.
     * @param contextual When `true` the year will be hidden if it's the current
     *  year.
     * @param delimiter The string to separate the start and end timestamps with.
     * @returns The summary of this span.
     */
    summary(type, dayOfWeek = true, short = false, repeat = false, contextual = true, delimiter = ' - ') {
        let formats = DaySpan_DaySpan.SUMMARY_FORMATS[type];
        let today = Day_Day.today();
        let showStartYear = !contextual || !this.start.sameYear(today);
        let showEndYear = !contextual || !this.end.sameYear(today);
        let start = this.start.format(formats(short, dayOfWeek, showStartYear));
        let end = this.end.format(formats(short, dayOfWeek, showEndYear));
        let summary = start;
        if (start !== end) {
            if (!repeat) {
                summary = this.start.format(formats(short, dayOfWeek, !this.start.sameYear(this.end)));
            }
            summary += delimiter;
            summary += end;
        }
        else {
            summary = start;
        }
        return summary;
    }
    /**
     * Determines whether the gven span intersects with this span.
     *
     * @param span The span to test.
     * @returns `true` if the spans intersect, otherwise `false`.
     */
    intersects(span) {
        return !(this.end.time < span.start.time ||
            this.start.time > span.end.time);
    }
    /**
     * Calculates the intersection between this span and the given span. If there
     * is no intersection between the two spans then `null` is returned.
     *
     * @param span The span to calculate the intersection with.
     * @returns The intersection or `null` if none exists.
     */
    intersection(span) {
        let start = this.start.max(span.start);
        let end = this.end.min(span.end);
        return start.isAfter(end) ? null : new DaySpan_DaySpan(start, end);
    }
    /**
     * Calculates the union between this span and the given span.
     *
     * @param span The span to calculate the union with.
     * @returns The union of the two spans.
     */
    union(span) {
        let start = this.start.min(span.start);
        let end = this.end.max(span.end);
        return new DaySpan_DaySpan(start, end);
    }
    /**
     * Returns a point [[DaySpan]] with the same start and end timestamp.
     *
     * @param day The timestamp which will be the start and end.
     * @returns The new instance.
     * @see [[DaySpan.isPoint]]
     */
    static point(day) {
        return new DaySpan_DaySpan(day, day);
    }
}
/**
 * Formatting functions which assist the [[DaySpan.summary]] function.
 */
DaySpan_DaySpan.SUMMARY_FORMATS = {
    [Units.DAY]: (short, dayOfWeek, year) => {
        return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.WEEK]: (short, dayOfWeek, year) => {
        return (dayOfWeek ? (short ? 'ddd, ' : 'dddd, ') : '') + (short ? 'MMM ' : 'MMMM ') + 'Do' + (year ? ' YYYY' : '');
    },
    [Units.MONTH]: (short, dayOfWeek, year) => {
        return (short ? 'MMM' : 'MMMM') + (year ? ' YYYY' : '');
    },
    [Units.YEAR]: (short, dayOfWeek, year) => {
        return (year ? 'YYYY' : '');
    }
};

// CONCATENATED MODULE: ./src/Identifier.ts




/**
 * A class for detecting, parsing, and building identifiers to and from days.
 *
 * An identifier is a simple value which represents a span of time. It may
 * represent an entire year, a quarter (3 months) of a year, a week of a year,
 * a month in a year, a specific day of a month of a year, or a specific hour,
 * minute, day, and month of a year.
 *
 * For example:
 * - `2018`: The year 2018
 * - `201801`: January 2018
 * - `2014023`: The 23rd week of 2014
 * - `20170311`: March 11th, 2017
 * - `201406151651`: June 15th 2016 at 4:51 pm
 * - `'0525'`: Year 525 of the first age, Elrond and Elros are born
 */
class Identifier_Identifier {
    /**
     * Determines whether the given identifier is this type.
     *
     * @param id The identifier to test.
     * @returns `true` if the identifier is this type, otherwise `false`.
     */
    is(id) {
        return (id + '').length === this.getLength();
    }
    /**
     * Computes the identifier given values taken from a [[Day]].
     *
     * @param values The values to compute.
     * @returns The computed identifier.
     */
    compute(...values) {
        const scales = this.getScales();
        let total = 0;
        for (let i = 0; i < values.length; i++) {
            total += values[i] * scales[i];
        }
        return this.is(total) ? total : Functions.padNumber(total, this.getLength());
    }
    /**
     * Decomputes the given identifier and returns values which describe a span
     * of time.
     *
     * @param id The identifier to decompute.
     * @returns The original values which computed the identifier.
     */
    decompute(id) {
        const scales = this.getScales();
        let total = Functions.isNumber(id) ? id : parseInt(id);
        let values = [];
        for (let i = 0; i < scales.length - 1; i++) {
            let curr = scales[i + 0];
            let next = scales[i + 1];
            let mod = next / curr;
            let value = total % mod;
            values.push(value);
            total = Math.floor(total / mod);
        }
        values.push(total);
        return values;
    }
    /**
     * Finds which identifier type matches the given identifier, if any.
     *
     * @param id The identifier to find the type of.
     * @returns The found identifier type, otherwise `null` if none exists.
     */
    static find(id) {
        if (this.Time.is(id))
            return this.Time;
        if (this.Day.is(id))
            return this.Day;
        if (this.Week.is(id))
            return this.Week;
        if (this.Month.is(id))
            return this.Month;
        if (this.Year.is(id))
            return this.Year;
        return null;
    }
    /**
     * Determines whether the given time span `outer` contains the time span
     * `inner`.
     *
     * @param outer The potentially larger time span `inner` must be contained in.
     * @param inner The time span to test is contained inside `outer`.
     * @returns `true` if `inner` is equal to or contained in `outer`, otherwise
     *    `false`.
     */
    static contains(outer, inner) {
        let outerString = outer + '';
        return (inner + '').substring(0, outerString.length) === outerString;
    }
}
/**
 * The identifier type for an hour of time on a specific day.
 */
Identifier_Identifier.Time = null;
/**
 * The identifier type for a specific day.
 */
Identifier_Identifier.Day = null;
/**
 * The identifier type for a specific week of a year.
 */
Identifier_Identifier.Week = null;
/**
 * The identifier type for a specific month of a year.
 */
Identifier_Identifier.Month = null;
/**
 * The identifier type for a specific quarter of a year.
 */
Identifier_Identifier.Quarter = null;
/**
 * The identifier type for a specific year.
 */
Identifier_Identifier.Year = null;
// YYYYMMddHHmm (12)
class Identifier_IdentifierTime extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierTime.SCALES;
    }
    getLength() {
        return Identifier_IdentifierTime.LENGTH;
    }
    get(day) {
        return this.compute(day.minute, day.hour, day.dayOfMonth, day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            minute: values[0],
            hour: values[1],
            day: values[2],
            month: values[3] - 1,
            year: values[4]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, obj.month, obj.day, obj.hour, obj.minute);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfHour(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierTime.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierTime.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.timeIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day &&
          day.hour === obj.hour &&
          day.minute === obj.minute
        );
        */
    }
}
Identifier_IdentifierTime.DESCRIBE_FORMAT_LONG = 'LLL';
Identifier_IdentifierTime.DESCRIBE_FORMAT_SHORT = 'lll';
Identifier_IdentifierTime.SCALES = [
    1 /* minute */,
    100 /* hour   */,
    10000 /* day    */,
    1000000 /* month  */,
    100000000 /* year   */
];
Identifier_IdentifierTime.LENGTH = 12;
// YYYYMMdd (8)
class Identifier_IdentifierDay extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierDay.SCALES;
    }
    getLength() {
        return Identifier_IdentifierDay.LENGTH;
    }
    get(day) {
        return this.compute(day.dayOfMonth, day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            day: values[0],
            month: values[1] - 1,
            year: values[2]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, obj.month, obj.day);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.end(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierDay.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierDay.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.dayIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month &&
          day.dayOfMonth === obj.day
        );
        */
    }
}
Identifier_IdentifierDay.DESCRIBE_FORMAT_LONG = 'LL';
Identifier_IdentifierDay.DESCRIBE_FORMAT_SHORT = 'll';
Identifier_IdentifierDay.SCALES = [
    1 /* day     */,
    100 /* month   */,
    10000 /* year    */
];
Identifier_IdentifierDay.LENGTH = 8;
// YYYY0ww (7)
class Identifier_IdentifierWeek extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierWeek.SCALES;
    }
    getLength() {
        return Identifier_IdentifierWeek.LENGTH;
    }
    get(day) {
        return this.compute(day.week, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            week: values[0],
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, 0).withWeek(obj.week);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfWeek(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierWeek.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierWeek.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.weekIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.week === obj.week
        );
        */
    }
}
Identifier_IdentifierWeek.DESCRIBE_FORMAT_LONG = 'wo [week of] YYYY';
Identifier_IdentifierWeek.DESCRIBE_FORMAT_SHORT = 'wo [week of] YYYY';
Identifier_IdentifierWeek.SCALES = [
    1 /* week   */,
    1000 /* year   */
];
Identifier_IdentifierWeek.LENGTH = 7;
// YYYYMM (6)
class Identifier_IdentifierMonth extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierMonth.SCALES;
    }
    getLength() {
        return Identifier_IdentifierMonth.LENGTH;
    }
    get(day) {
        return this.compute(day.month + 1, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            month: values[0] - 1,
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, obj.month);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfMonth(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierMonth.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierMonth.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.monthIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.month === obj.month
        );
        */
    }
}
Identifier_IdentifierMonth.DESCRIBE_FORMAT_LONG = 'MMMM YYYY';
Identifier_IdentifierMonth.DESCRIBE_FORMAT_SHORT = 'MMM YYYY';
Identifier_IdentifierMonth.SCALES = [
    1 /* month  */,
    100 /* year   */
];
Identifier_IdentifierMonth.LENGTH = 6;
// YYYYQ (5)
class Identifier_IdentifierQuarter extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierQuarter.SCALES;
    }
    getLength() {
        return Identifier_IdentifierQuarter.LENGTH;
    }
    get(day) {
        return this.compute(day.quarter, day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            quarter: values[0],
            year: values[1]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, (obj.quarter - 1) * 3);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.relativeMonths(3).endOfMonth(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierQuarter.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierQuarter.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.quarterIdentifier === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year &&
          day.quarter === obj.quarter
        );
        */
    }
}
Identifier_IdentifierQuarter.DESCRIBE_FORMAT_LONG = 'Qo [quarter] YYYY';
Identifier_IdentifierQuarter.DESCRIBE_FORMAT_SHORT = 'Qo [quarter] YYYY';
Identifier_IdentifierQuarter.SCALES = [
    1 /* quarter  */,
    10 /* year   */
];
Identifier_IdentifierQuarter.LENGTH = 5;
// YYYY (4)
class Identifier_IdentifierYear extends Identifier_Identifier {
    getScales() {
        return Identifier_IdentifierYear.SCALES;
    }
    getLength() {
        return Identifier_IdentifierYear.LENGTH;
    }
    get(day) {
        return this.compute(day.year);
    }
    object(id) {
        let values = this.decompute(id);
        return {
            year: values[0]
        };
    }
    start(id) {
        let obj = this.object(id);
        let start = Day_Day.build(obj.year, 0);
        return start;
    }
    span(id, endInclusive = false) {
        let start = this.start(id);
        let end = start.endOfYear(endInclusive);
        return new DaySpan_DaySpan(start, end);
    }
    describe(id, short = false) {
        let start = this.start(id);
        let format = short ? Identifier_IdentifierYear.DESCRIBE_FORMAT_SHORT : Identifier_IdentifierYear.DESCRIBE_FORMAT_LONG;
        return start.format(format);
    }
    matches(day, id) {
        return day.year === id;
        /*
        let obj: IdentifierObject = this.object(id);
    
        return (
          day.year === obj.year
        );
        */
    }
}
Identifier_IdentifierYear.DESCRIBE_FORMAT_LONG = 'YYYY';
Identifier_IdentifierYear.DESCRIBE_FORMAT_SHORT = 'YYYY';
Identifier_IdentifierYear.SCALES = [
    1 /* year  */
];
Identifier_IdentifierYear.LENGTH = 4;
// Sets the Identifier types
Identifier_Identifier.Time = new Identifier_IdentifierTime();
Identifier_Identifier.Day = new Identifier_IdentifierDay();
Identifier_Identifier.Week = new Identifier_IdentifierWeek();
Identifier_Identifier.Month = new Identifier_IdentifierMonth();
Identifier_Identifier.Quarter = new Identifier_IdentifierQuarter();
Identifier_Identifier.Year = new Identifier_IdentifierYear();

// CONCATENATED MODULE: ./src/Suffix.ts

/**
 * A class which takes a number and determines the suffix for that number.
 *
 * ```typescript
 * Suffix.CACHE[ 2 ];         // 2nd
 * Suffix.determine( 3 );     // rd
 * Suffix.get( 4 );           // th
 * Suffix.get( 4, true );     // 4th
 * ```
 */
class Suffix {
    /**
     * The cache of number & suffix pairs.
     */
    static get CACHE() {
        if (!this._CACHE) {
            this._CACHE = [];
            for (let i = 0; i <= this._CACHE_SIZE; i++) {
                this._CACHE[i] = this.get(i, true);
            }
        }
        return this._CACHE;
    }
    /**
     * Determines the suffix for a given number.
     *
     * @param value The number to find the suffix for.
     * @returns The suffix determined.
     */
    static determine(value) {
        return value >= 11 && value <= 13 ? 'th' : this.MAP[value % this.MAP.length];
    }
    /**
     * Gets the suffix for a number and optionally appends it before the suffix.
     *
     * @param value The number to get the suffix for.
     * @param prepend When `true` the value is prepended to the suffix.
     * @returns The suffix or value & suffix pair determined.
     */
    static get(value, prepend = false) {
        let suffix = this.determine(value);
        return prepend ? value + suffix : suffix;
    }
}
/**
 * The array of suffixes used.
 */
Suffix.MAP = [
    'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
];
/**
 * The number of values to store in the cache (inclusive).
 */
Suffix._CACHE_SIZE = 366;

// CONCATENATED MODULE: ./src/Iterator.ts


/**
 * An action to perform on the source as instructed by the iterator.
 */
var IteratorAction;
(function (IteratorAction) {
    /**
     * Continue iteration.
     */
    IteratorAction[IteratorAction["Continue"] = 0] = "Continue";
    /**
     * Stop iteration.
     */
    IteratorAction[IteratorAction["Stop"] = 1] = "Stop";
    /**
     * Remove the current item if possible, and continue iteration.
     */
    IteratorAction[IteratorAction["Remove"] = 2] = "Remove";
    /**
     * Replace the current item with the provided value.
     */
    IteratorAction[IteratorAction["Replace"] = 3] = "Replace";
})(IteratorAction = IteratorAction || (IteratorAction = {}));
/**
 * A class that allows an iteratable source to be iterated any number of times
 * by providing the following functionality:
 *
 * - [[Iterator.isEmpty]]: Determines whether the source contains any items.
 * - [[Iterator.first]]: Gets the first item in the source.
 * - [[Iterator.count]]: Counds the number of items in the source.
 * - [[Iterator.list]]: Builds a list of the items in the source.
 * - [[Iterator.object]]: Builds an object of the items in the source.
 * - [[Iterator.reduce]]: Reduces the items in the source down to a single value.
 * - [[Iterator.purge]]: Removes items from the source which meet some criteria.
 * - [[Iterator.filter]]: Returns a subset of items that meet some criteria by
 *    returning a new Iterator.
 * - [[Iterator.map]]: Maps each item in the source to another item by returning
 *    a new Iterator.
 * - [[Iterator.iterate]]: Invokes a function for each item in the source.
 *
 * The following static functions exist to help iterate simple sources:
 *
 * - [[Iterator.forArray]]: Iterates an array, optionally reverse
 * - [[Iterator.forObject]]: Iterates the properties of an object, optionally
 *    just the properties explicitly set on the object.
 *
 * ```typescript
 * let iter = object.iterateThings();
 * iter.isEmpty();              // no items?
 * iter.isEmpty(d => d.flag);   // no items that meet some criteria?
 * iter.count();                // number of items
 * iter.count(d => d.flag);     // number of items that meet some criteria
 * iter.first();                // first item
 * iter.first(d => d.flag);     // first item that meets some criteria
 * iter.list();                 // get all items as array
 * iter.list(myArray);          // add all items to given array
 * iter.list([], d => d.flag);  // get all items as array that meet some criteria
 * iter.object(d => d.id);      // get all items as an object keyed by a value (ex: id)
 * iter.object(d => d.id, {},
 *    d => d.flag);             // get all items as an object keyed by a value where the item meets some criteria (ex: key id if flag is truthy)
 * iter.purge(d => d.flag);     // remove all items from source that meet some criteria
 * iter.filter(d => d.flag);    // returns an iterator which iterates a subset of items which meet some criteria
 * iter.reduce<number>(0,
 *   (d, t) => t + d.size);     // reduces all items to a single value (ex: sums all size)
 * iter.reduce<number>(0,
 *   (d, t) => t + d.size,
 *   d => d.flag);              // reduces all items to a single value (ex: sums all size) where the item meets some criteria
 * iter.map<S>(d => d.subitem); // return an iterator for subitems if they exist
 * iter.iterate(d => log(d));   // do something for each item
 * ```
 *
 * @typeparam T The type of item being iterated.
 */
class Iterator_Iterator {
    /**
     * Creates a new Iterator given a source.
     *
     * @param source The source of items to iterator.
     */
    constructor(source) {
        /**
         * A result of the iteration passed to [[Iterator.stop]].
         */
        this.result = null;
        this.source = source;
    }
    /**
     * Returns a clone of this iterator with the same source. This is necessary
     * if you want to iterate all or a portion of the source while already
     * iterating it (like a nested loop).
     */
    clone() {
        return new Iterator_Iterator(this.source);
    }
    /**
     * Passes the given item to the iterator callback and returns the action
     * requested at this point in iteration.
     *
     * @param item The current item being iterated.
     */
    act(item) {
        this.action = IteratorAction.Continue;
        this.replaceWith = null;
        this.callback(item, this);
        return this.action;
    }
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    stop(result) {
        this.result = result;
        this.action = IteratorAction.Stop;
        return this;
    }
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    replace(replaceWith) {
        this.replaceWith = replaceWith;
        this.action = IteratorAction.Replace;
        return this;
    }
    /**
     * Signals to the iterator source that the current item wants to be removed.
     */
    remove() {
        this.action = IteratorAction.Remove;
        return this;
    }
    /**
     * Determines with this iterator is empty. A filter function can be specified
     * to only check for items which match certain criteria.
     *
     * @param filter A function to the checks items for certain criteria.
     * @returns `true` if no valid items exist in the source.
     */
    isEmpty(filter = null) {
        let empty = true;
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            empty = false;
            iterator.stop();
        });
        return empty;
    }
    /**
     * Counts the number of items in the iterator. A filter function can be
     * specified to only count items which match certain criteria.
     *
     * @param filter A function to count items for certain criteria.
     * @returns The number of items in the source that optionally match the given
     *    criteria.
     */
    count(filter = null) {
        let total = 0;
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            total++;
        });
        return total;
    }
    /**
     * Returns the first item in the iterator. A filter function can be specified
     * to only return the first item which matches certain criteria.
     *
     * @param filter A function to compare items to to match certain criteria.
     * @returns The first item found that optonally matches the given criteria.
     */
    first(filter = null) {
        let first = null;
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            first = item;
            iterator.stop();
        });
        return first;
    }
    /**
     * Builds a list of items from the source. A filter function can be specified
     * so the resulting list only contain items that match certain criteria.
     *
     * @param out The array to place the items in.
     * @param filter The function which determines which items are added to the list.
     * @returns The reference to `out` which has had items added to it which
     *    optionally match the given criteria.
     */
    list(out = [], filter = null) {
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            out.push(item);
        });
        return out;
    }
    /**
     * Builds an object of items from the source keyed by a result returned by
     * a `getKey` function.
     *
     * @param getKey The function which returns the key of the object.
     * @param out The object to place the items in.
     * @param filter The function which determines which items are set on the object.
     * @returns The reference to `out` which has had items set to it which
     *    optionally match the given criteria.
     */
    object(getKey, out = {}, filter = null) {
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            let key = getKey(item);
            out[key] = item;
        });
        return out;
    }
    /**
     * Returns a new iterator that only returns a maximum number of items.
     *
     * @param amount The maximum number of items to return.
     * @returns A new iterator which returns a maximum number of items.
     */
    take(amount) {
        return new Iterator_Iterator(next => {
            this.iterate((item, prev) => {
                switch (next.act(item)) {
                    case IteratorAction.Stop:
                        prev.stop();
                        break;
                    case IteratorAction.Remove:
                        prev.remove();
                        break;
                    case IteratorAction.Replace:
                        prev.replace(next.replaceWith);
                        break;
                }
                if (--amount <= 0) {
                    prev.stop();
                }
            });
        });
    }
    /**
     * Returns a new iterator that skips the given number of items from the items
     * in this iterator.
     *
     * @param amount The number of items to skip.
     * @returns A new iterator which skipped the given number of items.
     */
    skip(amount) {
        return new Iterator_Iterator(next => {
            let skipped = 0;
            this.iterate((item, prev) => {
                if (skipped >= amount) {
                    switch (next.act(item)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            prev.replace(next.replaceWith);
                            break;
                    }
                }
                skipped++;
            });
        });
    }
    /**
     * Returns a new iterator thats items are the items in this iterator followed
     * by the items in the given iterators.
     *
     * @param iterators The iterators to append after this one.
     * @returns A new iterator based on this iterator followed by the given.
     */
    append(...iterators) {
        return Iterator_Iterator.join(this, ...iterators);
    }
    /**
     * Returns a new iterator thats items are the items in the given iterators
     * followed by the items in this iterator.
     *
     * @param iterators The iterators to prepend before this one.
     * @returns A new iterator based on the given iterators followed by this.
     */
    prepend(...iterators) {
        return Iterator_Iterator.join(...iterators, this);
    }
    /**
     * Removes items from the source that match certain criteria.
     *
     * @param filter The function which determines which items to remove.
     */
    purge(filter) {
        this.iterate((item, iterator) => {
            if (filter(item)) {
                iterator.remove();
            }
        });
        return this;
    }
    /**
     * Returns an iterator which takes items from this iterator and presents them
     * in reverse.
     *
     * @returns A new iterator with the items in this iterator in reverse.
     */
    reverse() {
        return new Iterator_Iterator(iterator => {
            let items = this.list();
            let modifies = false;
            let actions = [];
            let replaces = [];
            for (let i = items.length - 1; i >= 0; i--) {
                let item = items[i];
                let action = iterator.act(item);
                if (action === IteratorAction.Stop) {
                    break;
                }
                if (action !== IteratorAction.Continue) {
                    modifies = true;
                    actions[i] = action;
                    replaces[i] = iterator.replaceWith;
                }
            }
            if (modifies) {
                let index = 0;
                this.iterate((item, iterator) => {
                    switch (actions[index]) {
                        case IteratorAction.Remove:
                            iterator.remove();
                            break;
                        case IteratorAction.Replace:
                            iterator.replace(replaces[index]);
                            break;
                    }
                    index++;
                });
            }
        });
    }
    /**
     * Reduces all the items in the source to a single value given the initial
     * value and a function to convert an item and the current reduced value
     */
    reduce(initial, reducer, filter = null) {
        let reduced = initial;
        this.iterate((item, iterator) => {
            if (filter && !filter(item)) {
                return;
            }
            reduced = reducer(item, reduced);
        });
        return reduced;
    }
    /**
     * Returns an iterator where this iterator is the source and the returned
     * iterator is built on a subset of items which pass a `filter` function.
     *
     * @param filter The function which determines if an item should be iterated.
     * @returns A new iterator for the filtered items from this iterator.
     */
    filter(filter) {
        return new Iterator_Iterator(next => {
            this.iterate((prevItem, prev) => {
                if (filter(prevItem)) {
                    switch (next.act(prevItem)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            prev.replace(next.replaceWith);
                            break;
                    }
                }
            });
        });
    }
    /**
     * Returns an iterator where this iterator is the source and the returned
     * iterator is built from mapped items pulled from items in the source
     * of this iterator. If the given callback `outerCallback` does not return
     * a mapped value then the returned iterator will not see the item. A filter
     * function can be specified to only look at mapping items which match
     * certain criteria.
     *
     * @param mapper The function which maps an item to another.
     * @param filter The function which determines if an item should be mapped.
     * @param unmapper The function which unmaps a value when replace is called.
     * @returns A new iterator for the mapped items from this iterator.
     */
    map(mapper, filter = null, unmapper = null) {
        return new Iterator_Iterator(next => {
            this.iterate((prevItem, prev) => {
                if (filter && !filter(prevItem)) {
                    return;
                }
                let nextItem = mapper(prevItem, prev);
                if (Functions.isDefined(nextItem)) {
                    switch (next.act(nextItem)) {
                        case IteratorAction.Stop:
                            prev.stop();
                            break;
                        case IteratorAction.Remove:
                            prev.remove();
                            break;
                        case IteratorAction.Replace:
                            if (unmapper) {
                                prev.replace(unmapper(next.replaceWith, nextItem, prevItem));
                            }
                            break;
                    }
                }
            });
        });
    }
    /**
     * Invokes the callback for each item in the source of this iterator. The
     * second argument in the callback is the reference to this iterator and
     * [[Iterator.stop]] can be called at anytime to cease iteration.
     *
     * @param callback The function to invoke for each item in this iterator.
     */
    iterate(callback) {
        this.result = undefined;
        this.callback = callback;
        this.action = IteratorAction.Continue;
        this.source(this);
        this.callback = null;
        return this;
    }
    /**
     * Passes the result of the iteration to the given function if a truthy
     * result was passed to [[Iterator.stop]].
     *
     * @param getResult The function to pass the result to if it exists.
     */
    withResult(getResult) {
        if (this.result) {
            getResult(this.result);
        }
        return this;
    }
    /**
     * Returns an iterator for the given array optionally iterating it in reverse.
     *
     * @param items The array of items to iterate.
     * @param reverse If the array should be iterated in reverse.
     * @returns A new iterator for the given array.
     */
    static forArray(items, reverse = false) {
        return new Iterator_Iterator(iterator => {
            if (reverse) {
                for (let i = items.length - 1; i >= 0; i--) {
                    switch (iterator.act(items[i])) {
                        case IteratorAction.Stop:
                            return;
                        case IteratorAction.Remove:
                            items.splice(i, 1);
                            break;
                        case IteratorAction.Replace:
                            items.splice(i, 1, iterator.replaceWith);
                            break;
                    }
                }
            }
            else {
                for (let i = 0; i < items.length; i++) {
                    switch (iterator.act(items[i])) {
                        case IteratorAction.Stop:
                            return;
                        case IteratorAction.Remove:
                            items.splice(i, 1);
                            i--;
                            break;
                        case IteratorAction.Replace:
                            items.splice(i, 1, iterator.replaceWith);
                            break;
                    }
                }
            }
        });
    }
    /**
     * Returns an iterator for the given object optionally checking the
     * `hasOwnProperty` function on the given object.
     *
     * @param items The object to iterate.
     * @param hasOwnProperty If `hasOwnProperty` should be checked.
     * @returns A new iterator for the given object.
     */
    static forObject(items, hasOwnProperty = true) {
        return new Iterator_Iterator(iterator => {
            for (let key in items) {
                if (hasOwnProperty && !items.hasOwnProperty(key)) {
                    continue;
                }
                switch (iterator.act(items[key])) {
                    case IteratorAction.Stop:
                        return;
                    case IteratorAction.Remove:
                        delete items[key];
                        break;
                    case IteratorAction.Replace:
                        items[key] = iterator.replaceWith;
                        break;
                }
            }
        });
    }
    /**
     * Joins all the given iterators into a single iterator where the items
     * returned are in the same order as passed to this function. If any items
     * are removed from the returned iterator they will be removed from the given
     * iterator if it supports removal.
     *
     * @param iterators The array of iterators to join as one.
     * @returns A new iterator for the given iterators.
     */
    static join(...iterators) {
        return new Iterator_Iterator(parent => {
            for (let child of iterators) {
                child.iterate((item, childIterator) => {
                    switch (parent.act(item)) {
                        case IteratorAction.Remove:
                            childIterator.remove();
                            break;
                        case IteratorAction.Stop:
                            childIterator.stop();
                            break;
                        case IteratorAction.Replace:
                            childIterator.replace(parent.replaceWith);
                            break;
                    }
                });
                if (child.action === IteratorAction.Stop) {
                    return;
                }
            }
        });
    }
    /**
     * Returns a new iterator with no items.
     *
     * @returns A new iterator with no items.
     */
    static empty() {
        return new Iterator_Iterator(parent => { });
    }
}

// CONCATENATED MODULE: ./src/ScheduleModifier.ts




/**
 * A class that can modify the events of a schedule by storing [[Identifier]]s
 * and an associated value.
 *
 * @typeparam T The type of data that modifies the schedule.
 */
class ScheduleModifier_ScheduleModifier {
    /**
     * Creates a new schedule modifier.
     */
    constructor() {
        this.map = {};
    }
    /**
     * Clears the modifier of all modifications.
     */
    clear() {
        this.map = {};
        return this;
    }
    /**
     * Returns `true` if this modifier lacks any modifications, otherwise `false`.
     */
    isEmpty() {
        // @ts-ignore
        for (let id in this.map) {
            return !id;
        }
        return true;
    }
    /**
     * Gets the most specific value in this modifier for the given day, if none
     * exists `otherwise` is returned. A modifier can have multiple values for a
     * given day because [[Identifier]]s represent a span of time.
     *
     * @param day The day to get a value for.
     * @param otherwise What to return if no value exists for the given day.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific value for the given day, or `otherwise`.
     */
    get(day, otherwise, lookAtTime = true) {
        let map = this.map;
        return (lookAtTime && map[day.timeIdentifier]) ||
            map[day.dayIdentifier] ||
            map[day.monthIdentifier] ||
            map[day.weekIdentifier] ||
            map[day.quarterIdentifier] ||
            otherwise;
    }
    /**
     * Gets the most specific identifier type for the span over the given day.
     * If the day does not have a modification, `null` is returned.
     *
     * @param day The day to get the type for.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific identifier for the given day, otherwise `null`.
     */
    getIdentifier(day, lookAtTime = true) {
        let map = this.map;
        if (lookAtTime && Functions.isDefined(map[day.timeIdentifier]))
            return Identifier_Identifier.Time;
        if (Functions.isDefined(map[day.dayIdentifier]))
            return Identifier_Identifier.Day;
        if (Functions.isDefined(map[day.monthIdentifier]))
            return Identifier_Identifier.Month;
        if (Functions.isDefined(map[day.weekIdentifier]))
            return Identifier_Identifier.Week;
        if (Functions.isDefined(map[day.quarterIdentifier]))
            return Identifier_Identifier.Quarter;
        if (Functions.isDefined(map[day.year]))
            return Identifier_Identifier.Year;
        return null;
    }
    /**
     * Gets all values in this modifier for the given day. If none exist, an empty
     * array is returned. The values returned in the array are returned in most
     * specific to least specific.
     *
     * @param day The day to get the values for.
     * @returns An array of values (modifications) for the given day.
     */
    getAll(day) {
        let map = this.map;
        let all = [];
        if (map[day.timeIdentifier])
            all.push(map[day.timeIdentifier]);
        if (map[day.dayIdentifier])
            all.push(map[day.dayIdentifier]);
        if (map[day.monthIdentifier])
            all.push(map[day.monthIdentifier]);
        if (map[day.weekIdentifier])
            all.push(map[day.weekIdentifier]);
        if (map[day.quarterIdentifier])
            all.push(map[day.quarterIdentifier]);
        return all;
    }
    /**
     * Moves the value/modification from one identifier to another.
     *
     * @param from The day to take the identifier from.
     * @param fromType The identifier type.
     * @param to The day to move the value to.
     * @param toType The identifier type to move the value to.
     */
    move(from, fromType, to, toType) {
        let fromIdentifier = fromType.get(from);
        let toIdentifier = toType.get(to);
        this.map[toIdentifier] = this.map[fromIdentifier];
        delete this.map[fromIdentifier];
        return this;
    }
    /**
     * Moves any identifiers with the matching time `fromTime` to `toTime` and
     * returns the number of moves.
     *
     * @param fromTime The time to move from.
     * @param toTime The time to move to.
     * @returns The number of modifiers moved.
     */
    moveTime(fromTime, toTime) {
        let type = Identifier_Identifier.Time;
        let moveIds = [];
        this.iterate().iterate(([id, value]) => {
            if (type.is(id)) {
                let start = type.start(id);
                if (start.sameTime(fromTime)) {
                    moveIds.push(id);
                }
            }
        });
        let moved = 0;
        for (let id of moveIds) {
            let value = this.map[id];
            let start = type.start(id);
            let newStart = start.withTime(toTime);
            let newId = type.get(newStart);
            if (!this.map[newId]) {
                this.map[newId] = value;
                delete this.map[id];
                moved++;
            }
        }
        return moved;
    }
    /**
     * Removes any identifiers and modifications that are at the given time.
     *
     * @param time The time to remove.
     * @returns The number of modifiers removed.
     */
    removeTime(time) {
        let type = Identifier_Identifier.Time;
        let removed = 0;
        this.iterate().iterate(([id,], iterator) => {
            if (type.is(id)) {
                let start = type.start(id);
                if (start.sameTime(time)) {
                    iterator.remove();
                    removed++;
                }
            }
        });
        return removed;
    }
    /**
     * Sets the value/modification in this map given a day, the value, and the
     * identifier type.
     *
     * @param day The day to take an identifier from.
     * @param value The value/modification to set.
     * @param type The identifier type.
     */
    set(day, value, type) {
        this.map[type.get(day)] = value;
        return this;
    }
    /**
     * Removes the value/modification from this modifier based on the identifier
     * pulled from the day.
     *
     * @param day The day to take an identifier from.
     * @param type The identifier type.
     */
    unset(day, type) {
        delete this.map[type.get(day)];
        return this;
    }
    /**
     * Iterates through the modifiers passing the identifier and the related value.
     *
     * @returns A new instance of an [[Iterator]].
     */
    iterate() {
        return new Iterator_Iterator(iterator => {
            let map = this.map;
            for (let rawId in map) {
                let asNumber = parseInt(rawId);
                let validAsNumber = asNumber + '' === rawId;
                let id = validAsNumber ? asNumber : rawId;
                switch (iterator.act([id, map[rawId]])) {
                    case IteratorAction.Stop:
                        return;
                    case IteratorAction.Remove:
                        delete map[rawId];
                        break;
                }
            }
        });
    }
    /**
     * Queries the modifier for all values/modifications which fall in the time
     * span that the given identifier represents. All identifiers and their value
     * are passed to the given callback.
     *
     * @param prefix The identifier
     * @returns A new instance of an [[Iterator]].
     */
    query(query) {
        return this.iterate()
            .filter(([id, value]) => Identifier_Identifier.contains(query, id));
        ;
    }
    /**
     * Returns all identifiers stored in this modifier.
     */
    identifiers(filter) {
        return this.iterate()
            .filter(([id, value]) => !filter || filter(value, id))
            .map(([id,]) => id);
    }
    /**
     * Builds a list of spans and the associated values. The spans are calculated
     * from the identiier key via [[Identifier.span]].
     *
     * @param endInclusive If the end date in the spans should be the last
     *    millisecond of the timespan or the first millisecond of the next.
     * @returns An array of spans calculated from the identifiers with the
     *    associated values/modifications.
     */
    spans(endInclusive = false) {
        return this.iterate()
            .map(([id, value]) => {
            let type = Identifier_Identifier.find(id);
            if (type) {
                let span = type.span(id, endInclusive);
                return { span, value };
            }
        });
    }
    /**
     * Builds a list of the descriptions of the identifiers in this modifier.
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built list of descriptions.
     */
    describe(short = false) {
        return this.iterate()
            .map(([id,]) => {
            let type = Identifier_Identifier.find(id);
            if (type) {
                return type.describe(id, short);
            }
        });
    }
    /**
     * Builds a map of the values/modifications keyed by the descripton of the
     * identifier computed via [[Identifier.describe]].
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built map of description to values/modifications.
     */
    describeMap(short = false) {
        let map = this.map;
        let out = {};
        for (let id in map) {
            let type = Identifier_Identifier.find(id);
            if (type) {
                out[type.describe(id, short)] = map[id];
            }
        }
        return out;
    }
}

// CONCATENATED MODULE: ./src/Schedule.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);











// @ts-ignore

/**
 * A class which describes when an event occurs over what time and if it repeats.
 *
 * @typeparam M The type of metadata stored in the schedule.
 */
class Schedule_Schedule {
    /**
     * Creates a schedule based on the given input.
     *
     * @param input The input which describes the schedule of events.
     */
    constructor(input) {
        this.exclude = new ScheduleModifier_ScheduleModifier();
        this.include = new ScheduleModifier_ScheduleModifier();
        this.cancel = new ScheduleModifier_ScheduleModifier();
        this.meta = new ScheduleModifier_ScheduleModifier();
        if (Functions.isDefined(input)) {
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
    set(input, parseMeta = (x => x)) {
        if (input instanceof Schedule_Schedule) {
            Parse_Parse.schedule(input.toInput(), undefined, this);
        }
        else {
            Parse_Parse.schedule(input, Functions.coalesce(input.parseMeta, parseMeta), this);
        }
        return this;
    }
    /**
     * Returns the last event time specified or `undefined` if this schedule is
     * for an all day event.
     */
    get lastTime() {
        return this.times[this.times.length - 1];
    }
    /**
     * The [[Identifier]] for this schedule. Either [[Identifier.Day]] or
     * [[Identifier.Time]].
     */
    get identifierType() {
        return this.isFullDay() ? Identifier_Identifier.Day : Identifier_Identifier.Time;
    }
    /**
     * Updates the [[Schedule.durationInDays]] variable based on the
     * [[Schedule.lastTime]] (if any), the [[Schedule.duration]] and it's
     * [[Schedule.durationUnit]].
     */
    updateDurationInDays() {
        let start = this.lastTime ? this.lastTime.toMilliseconds() : 0;
        let duration = this.duration * (Constants.DURATION_TO_MILLIS[this.durationUnit] || 0);
        let exclude = Constants.MILLIS_IN_DAY;
        let day = Constants.MILLIS_IN_DAY;
        this.durationInDays = Math.max(0, Math.ceil((start + duration - exclude) / day));
        return this;
    }
    /**
     * Updates [[Schedule.checks]] based on the frequencies that were specified
     * in the schedule input.
     */
    updateChecks() {
        this.checks = Parse_Parse.givenFrequency([
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
    }
    /**
     * Determines whether the given day lies between the earliest and latest
     * valid day in the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day lies in the schedule, otherwise `false`.
     * @see [[Schedule.start]]
     * @see [[Schedule.end]]
     */
    matchesSpan(day) {
        return (this.start === null || day.isSameOrAfter(this.start)) &&
            (this.end === null || day.isBefore(this.end));
    }
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
    matchesRange(start, end) {
        if (this.start && end.isBefore(this.start)) {
            return false;
        }
        if (this.end && start.isAfter(this.end)) {
            return false;
        }
        return true;
    }
    /**
     * Determines whether the given day is explicitly excluded in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was excluded, otherwise `false`.
     */
    isExcluded(day, lookAtTime = true) {
        return this.exclude.get(day, false, lookAtTime);
    }
    /**
     * Determines whether the given day is explicitly included in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day is NOT explicitly included, otherwise `false`.
     */
    isIncluded(day, lookAtTime = true) {
        return this.include.get(day, false, lookAtTime);
    }
    /**
     * Determines whether the given day is cancelled in the schedule.
     *
     * @param day The day to test.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns `true` if the day was cancelled, otherwise `false`.
     */
    isCancelled(day, lookAtTime = true) {
        return this.cancel.get(day, false, lookAtTime);
    }
    /**
     * Returns the metadata for the given day or `null` if there is none.
     *
     * @param day The day to return the metadata for.
     * @param otherwise The data to return if none exists for the given day.
     * @param lookAtTime lookAtTime If the specific time of the given day should
     *    be looked at.
     * @returns The metadata or `null`.
     */
    getMeta(day, otherwise = null, lookAtTime = true) {
        return this.meta.get(day, otherwise, lookAtTime);
    }
    /**
     * Returns all metadata for the given day or an empty array if there is none.
     *
     * @param day The day to return the metadata for.
     * @returns The array of metadata ordered by priority or an empty array.
     */
    getMetas(day) {
        return this.meta.getAll(day);
    }
    /**
     * Returns whether the events in the schedule are all day long or start at
     * specific times. Full day events start at the start of the day and end at
     * the start of the next day (if the duration = `1` and durationUnit = 'days').
     * Full day events have no times specified and should have a durationUnit of
     * either `days` or `weeks`.
     */
    isFullDay() {
        return this.times.length === 0;
    }
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
    setFullDay(fullDay = true, defaultTime = '08:00') {
        if (fullDay !== this.isFullDay()) {
            if (fullDay) {
                this.times = [];
                if (this.durationUnit !== 'days' && this.durationUnit !== 'day') {
                    this.duration = 1;
                    this.durationUnit = 'days';
                }
            }
            else {
                this.times = [Parse_Parse.time(defaultTime)];
                if (this.durationUnit !== 'hours' && this.durationUnit !== 'hour') {
                    this.duration = 1;
                    this.durationUnit = 'hours';
                }
            }
        }
        return this;
    }
    /**
     * Adjusts the [[Schedule.start]] and [[Schedule.end]] dates specified on this
     * schedule if this schedule represents a single event and the `start` and
     * `end` are already set or `addSpan` is `true`.
     *
     * @param addSpan If `true`, the `start` and `end` dates will always be
     *    adjusted if this schedule is a single event.
     */
    adjustDefinedSpan(addSpan = false) {
        let single = this.getSingleEventSpan();
        if (single && (addSpan || (this.start && this.end))) {
            this.start = single.start.start();
            this.end = single.end.end();
        }
        return this;
    }
    /**
     * Returns a span of time for a schedule with full day events starting on the
     * start of the given day with the desired duration in days or weeks.
     *
     * @param day The day the span starts on.
     * @returns The span of time starting on the given day.
     */
    getFullSpan(day) {
        let start = day.start();
        let end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    }
    /**
     * Returns a span of time starting on the given day at the given day with the
     * duration specified on this schedule.
     *
     * @param day The day the span starts on.
     * @param time The time of day the span starts.
     * @returns The span of time calculated.
     */
    getTimeSpan(day, time) {
        let start = day.withTime(time);
        let end = start.add(this.duration, this.durationUnit);
        return new DaySpan_DaySpan(start, end);
    }
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
    matchesDay(day) {
        if (this.isIncluded(day, false)) {
            return true;
        }
        if (!this.matchesSpan(day) || this.isFullyExcluded(day)) {
            return false;
        }
        for (let check of this.checks) {
            if (!check(day[check.property])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Determines whether the given day has events added through
     * [[Schedule.include]].
     *
     * @param day The day to look for included times on.
     * @returns `true` if there are included event instances on the given day,
     *    otherwise `false`.
     */
    hasIncludedTime(day) {
        return !this.iterateIncludeTimes(day).isEmpty();
    }
    /**
     * Determines whether the given day is fully excluded from the schedule. A
     * fully excluded day is one that has a day-wide exclusion, or the schedule
     * is not an all-day event and all times in the schedule are specifically
     * excluded.
     *
     * @param day The day to test.*
     * @returns `true` if he day is fully excluded, otherwise `false`.
     */
    isFullyExcluded(day) {
        if (this.isExcluded(day, false)) {
            return true;
        }
        if (this.isFullDay()) {
            return false;
        }
        for (let time of this.times) {
            if (!this.isExcluded(day.withTime(time))) {
                return false;
            }
        }
        return true;
    }
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
    nextDay(day, includeDay = false, lookAhead = 366) {
        return this.iterateDaycast(day, 1, true, includeDay, lookAhead).first();
    }
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
    nextDays(day, max, includeDay = false, lookAhead = 366) {
        return this.iterateDaycast(day, max, true, includeDay, lookAhead);
    }
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
    prevDay(day, includeDay = false, lookBack = 366) {
        return this.iterateDaycast(day, 1, false, includeDay, lookBack).first();
    }
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
    prevDays(day, max, includeDay = false, lookBack = 366) {
        return this.iterateDaycast(day, max, false, includeDay, lookBack);
    }
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
    iterateDaycast(day, max, next, includeDay = false, lookup = 366) {
        return new Iterator_Iterator(iterator => {
            let iterated = 0;
            for (let days = 0; days < lookup; days++) {
                if (!includeDay || days > 0) {
                    day = next ? day.next() : day.prev();
                }
                if (!this.iterateSpans(day, false).isEmpty()) {
                    let action = iterator.act(day);
                    if (action === IteratorAction.Stop || ++iterated >= max) {
                        return;
                    }
                }
            }
        });
    }
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
    iterateSpans(day, covers = false) {
        return new Iterator_Iterator(iterator => {
            let current = day;
            let lookBehind = covers ? this.durationInDays : 0;
            // If the events start at the end of the day and may last multiple days....
            if (this.isFullDay()) {
                // If the schedule has events which span multiple days we need to look
                // backwards for events that overlap with the given day.
                while (lookBehind >= 0) {
                    // If the current day matches the schedule rules...
                    if (this.matchesDay(current)) {
                        // Build a DaySpan with the given start day and the schedules duration.
                        let span = this.getFullSpan(current);
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
                    if (this.matchesDay(current)) {
                        // Iterate through each daily occurrence in the schedule...
                        for (let time of this.times) {
                            let span = this.getTimeSpan(current, time);
                            // If the event intersects with the given day and the occurrence
                            // has not specifically been excluded...
                            if (span.matchesDay(day) && !this.isExcluded(span.start, true)) {
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
                        this.iterateIncludeTimes(current, day).iterate((span, timeIterator) => {
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
    }
    /**
     * Determines if the given day is on the schedule and the time specified on
     * the day matches one of the times on the schedule.
     *
     * @param day The day to test.
     * @returns `true` if the day and time match the schedule, otherwise false.
     */
    matchesTime(day) {
        return !!this.iterateSpans(day, true).first(span => span.start.sameMinute(day));
    }
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
    coversDay(day) {
        return !this.iterateSpans(day, true).isEmpty();
    }
    /**
     * Determines if the given timestamp lies in an event occurrence on this
     * schedule.
     *
     * @param day The timestamp to test against the schedule.
     * @return `true` if the timestamp lies in an event occurrent start and end
     *    timestamps, otherwise `false`.
     */
    coversTime(day) {
        return !!this.iterateSpans(day, true).first(span => span.contains(day));
    }
    /**
     * Sets the frequency for the given property. This does not update the
     * [[Schedule.checks]] array, the [[Schedule.updateChecks]] function needs
     * to be called.
     *
     * @param property The frequency to update.
     * @param frequency The new frequency.
     */
    setFrequency(property, frequency) {
        this[property] = Parse_Parse.frequency(frequency, property);
        return this;
    }
    /**
     * Changes the exclusion status of the event at the given time. By default
     * this excludes this event - but `false`  may be passed to undo an exclusion.
     *
     * @param time The start time of the event occurrence to exclude or include.
     * @param excluded Whether the event should be excluded.
     */
    setExcluded(time, excluded = true) {
        let type = this.identifierType;
        this.exclude.set(time, excluded, type);
        this.include.set(time, !excluded, type);
        return this;
    }
    /**
     * Changes the cancellation status of the event at the given start time. By
     * default this cancels the event occurrence - but `false` may be passed to
     * undo a cancellation.
     *
     * @param time The start time of the event occurrence to cancel or uncancel.
     * @param cancelled Whether the event should be cancelled.
     */
    setCancelled(time, cancelled = true) {
        this.cancel.set(time, cancelled, this.identifierType);
        return this;
    }
    /**
     * Removes the time from this schedule and all related included, excluded,
     * cancelled instances as well as metadata.
     *
     * @param time The time to remove from the schedule.
     * @param removeInclude If any included instances should be removed as well.
     * @returns `true` if the time was removed, otherwise `false`.
     */
    removeTime(time, removeInclude = true) {
        let found = false;
        for (let i = 0; i < this.times.length && !found; i++) {
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
    }
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
    move(toTime, fromTime, meta) {
        if (!this.moveSingleEvent(toTime) && fromTime) {
            return this.moveInstance(fromTime, toTime);
        }
        return false;
    }
    /**
     * Moves a time specified in this schedule to the given time, adjusting
     * any cancelled event instances, metadata, and any excluded and included
     * event instances.
     *
     * @param fromTime The time to move.
     * @param toTime The new time in the schedule.
     * @returns `true` if time was moved, otherwise `false`.
     */
    moveTime(fromTime, toTime) {
        let found = false;
        for (let i = 0; i < this.times.length && !found; i++) {
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
    }
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
    moveInstance(fromTime, toTime) {
        let type = this.identifierType;
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
        let meta = this.meta.get(fromTime, null);
        if (meta && meta !== this.meta.get(toTime, null)) {
            this.meta.set(toTime, meta, type);
            if (this.meta.getIdentifier(fromTime) === type) {
                this.meta.unset(fromTime, type);
            }
        }
        return true;
    }
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
    moveSingleEvent(toTime, takeTime = true) {
        if (!this.isSingleEvent()) {
            return false;
        }
        for (let check of this.checks) {
            let prop = check.property;
            let value = toTime[prop];
            let frequency = Parse_Parse.frequency([value], prop);
            this[prop] = frequency;
        }
        if (this.times.length === 1 && takeTime) {
            this.times = [toTime.asTime()];
        }
        this.updateChecks();
        let span = this.getSingleEventSpan();
        if (this.start) {
            this.start = span.start.start();
        }
        if (this.end) {
            this.end = span.end.end();
        }
        return true;
    }
    /**
     * Returns the span of the single event in this schedule if it's that type of
     * schedule, otherwise `null` is returned.
     *
     * @returns A span of the single event, otherwise `null`.
     * @see [[Schedule.isSingleEvent]]
     */
    getSingleEventSpan() {
        if (!this.isSingleEvent()) {
            return null;
        }
        let startOfYear = Day_Day.build(this.year.input[0], 0, 1);
        let start = this.iterateDaycast(startOfYear, 1, true, true, 366).first();
        if (!start) {
            return null;
        }
        return this.isFullDay() ?
            this.getFullSpan(start) :
            this.getTimeSpan(start, this.times[0]);
    }
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
    isSingleEvent() {
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
    }
    /**
     * @returns `true` if this schedule produces events only in a specific year.
     * @see [[Schedule.year]]
     */
    isSingleYear() {
        return this.isSingleFrequency(this.year);
    }
    /**
     * @returns `true` if this schedule produces events only in a specific month.
     * @see [[Schedule.month]]
     */
    isSingleMonth() {
        return this.isSingleFrequency(this.month);
    }
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the month.
     * @see [[Schedule.dayOfMonth]]
     * @see [[Schedule.lastDayOfMonth]]
     */
    isSingleDayOfMonth() {
        return this.isSingleFrequency(this.dayOfMonth) ||
            this.isSingleFrequency(this.lastDayOfMonth);
    }
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the week.
     * @see [[Schedule.dayOfWeek]]
     */
    isSingleDayOfWeek() {
        return this.isSingleFrequency(this.dayOfWeek);
    }
    /**
     * @returns `true` if this schedule produces events only in a specific day of
     *    the year.
     * @see [[Schedule.dayOfYear]]
     */
    isSingleDayOfYear() {
        return this.isSingleFrequency(this.dayOfYear);
    }
    /**
     * @returns `true` if this schedule produces events only in a specific week of
     *    the month.
     * @see [[Schedule.weekspanOfMonth]]
     * @see [[Schedule.fullWeekOfMonth]]
     * @see [[Schedule.weekOfMonth]]
     * @see [[Schedule.lastFullWeekOfMonth]]
     * @see [[Schedule.lastWeekspanOfMonth]]
     */
    isSingleWeekOfMonth() {
        return this.isSingleFrequency(this.weekspanOfMonth) ||
            this.isSingleFrequency(this.fullWeekOfMonth) ||
            this.isSingleFrequency(this.weekOfMonth) ||
            this.isSingleFrequency(this.lastFullWeekOfMonth) ||
            this.isSingleFrequency(this.lastWeekspanOfMonth);
    }
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
    isSingleWeekOfYear() {
        return this.isSingleFrequency(this.weekspanOfYear) ||
            this.isSingleFrequency(this.fullWeekOfYear) ||
            this.isSingleFrequency(this.week) ||
            this.isSingleFrequency(this.weekOfYear) ||
            this.isSingleFrequency(this.lastFullWeekOfYear) ||
            this.isSingleFrequency(this.lastWeekspanOfYear);
    }
    /**
     * Determines if the given [[FrequencyCheck]] results in a single occurrence.
     *
     * @returns `true` if the frequency results in a single event, otherwise `false`.
     */
    isSingleFrequency(frequency) {
        return Functions.isArray(frequency.input) && frequency.input.length === 1;
    }
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
    forecast(around, covers = true, daysAfter, daysBefore = daysAfter, times = false, lookAround = 366) {
        let type = this.identifierType;
        let tuplesForDay = (day, tuples) => {
            let spans = this.iterateSpans(day, covers).list();
            let last = times ? spans.length : Math.min(1, spans.length);
            let offset = times ? 0 : spans.length - 1;
            for (let i = 0; i < last; i++) {
                let span = spans[i + offset];
                let id = type.get(span.start);
                if (tuples.act([span, day, id]) === IteratorAction.Stop) {
                    return false;
                }
            }
            return true;
        };
        let prev = new Iterator_Iterator(iterator => {
            let curr = around;
            for (let i = 0; i < lookAround; i++) {
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
                curr = curr.prev();
            }
        });
        let next = new Iterator_Iterator(iterator => {
            let curr = around;
            for (let i = 0; i < lookAround; i++) {
                curr = curr.next();
                if (!tuplesForDay(curr, iterator)) {
                    break;
                }
            }
        });
        return prev.take(daysBefore + 1).reverse().append(next.take(daysAfter));
    }
    /**
     * Iterates timed events that were explicitly specified on the given day.
     * Those events could span multiple days so may be tested against another day.
     *
     * @param day The day to look for included timed events.
     * @param matchAgainst The day to test against the timed event.
     * @returns A new Iterator for all the included spans found.
     */
    iterateIncludeTimes(day, matchAgainst = day) {
        let isIncludedTime = (result) => {
            let [id, included] = result;
            return included && Identifier_Identifier.Time.is(id);
        };
        let getSpan = (result) => {
            let [id] = result;
            let time = Identifier_Identifier.Time.start(id);
            let span = this.getTimeSpan(time, time.asTime());
            if (span.matchesDay(matchAgainst)) {
                return span;
            }
        };
        return this.include.query(day.dayIdentifier).map(getSpan, isIncludedTime);
    }
    /**
     * Clones this schedule.
     *
     * @returns A new schedule which matches this schedule.
     */
    clone() {
        return new Schedule_Schedule(this.toInput());
    }
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
    toInput(returnDays = false, returnTimes = false, timeFormat = '', alwaysDuration = false) {
        let defaultUnit = Constants.DURATION_DEFAULT_UNIT(this.isFullDay());
        let exclusions = this.exclude.identifiers(v => v).list();
        let inclusions = this.include.identifiers(v => v).list();
        let cancels = this.cancel.identifiers(v => v).list();
        let hasMeta = !this.meta.isEmpty();
        let out = {};
        let times = [];
        for (let time of this.times) {
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
            out.meta = Functions.extend({}, this.meta.map);
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
    }
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
    describe(thing = 'event', includeRange = true, includeTimes = true, includeDuration = false, includeExcludes = false, includeIncludes = false, includeCancels = false) {
        let out = '';
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
        out += this.describeRule(this.dayOfWeek.input, 'day of the week', x => __WEBPACK_IMPORTED_MODULE_10_moment__["weekdays"]()[x], 1, false);
        out += this.describeRule(this.lastDayOfMonth.input, 'last day of the month', x => Suffix.CACHE[x]);
        out += this.describeRule(this.dayOfMonth.input, 'day of the month', x => Suffix.CACHE[x]);
        out += this.describeRule(this.dayOfYear.input, 'day of the year', x => Suffix.CACHE[x], 1);
        out += this.describeRule(this.year.input, 'year', x => x, 0, false, ' in ');
        out += this.describeRule(this.month.input, 'month', x => __WEBPACK_IMPORTED_MODULE_10_moment__["months"]()[x], 0, false, ' in ');
        out += this.describeRule(this.weekOfYear.input, 'week of the year', x => Suffix.CACHE[x]);
        out += this.describeRule(this.weekspanOfYear.input, 'weekspan of the year', x => Suffix.CACHE[x + 1], 1);
        out += this.describeRule(this.fullWeekOfYear.input, 'full week of the year', x => Suffix.CACHE[x]);
        out += this.describeRule(this.lastWeekspanOfYear.input, 'last weekspan of the year', x => Suffix.CACHE[x + 1], 1);
        out += this.describeRule(this.lastFullWeekOfYear.input, 'last full week of the year', x => Suffix.CACHE[x]);
        out += this.describeRule(this.weekOfMonth.input, 'week of the month', x => Suffix.CACHE[x]);
        out += this.describeRule(this.fullWeekOfMonth.input, 'full week of the month', x => Suffix.CACHE[x]);
        out += this.describeRule(this.weekspanOfMonth.input, 'weekspan of the month', x => Suffix.CACHE[x + 1], 1);
        out += this.describeRule(this.lastFullWeekOfMonth.input, 'last full week of the month', x => Suffix.CACHE[x]);
        out += this.describeRule(this.lastWeekspanOfMonth.input, 'last weekspan of the month', x => Suffix.CACHE[x + 1], 1);
        if (includeTimes && this.times.length) {
            out += ' at ';
            out += this.describeArray(this.times, x => x.format('hh:mm a'));
        }
        if (includeDuration && this.duration !== Constants.DURATION_DEFAULT) {
            out += ' lasting ' + this.duration + ' ';
            if (this.durationUnit) {
                out += this.durationUnit + ' ';
            }
        }
        if (includeExcludes) {
            let excludes = this.exclude.spans().list();
            if (excludes.length) {
                out += ' excluding ';
                out += this.describeArray(excludes, x => x.span.summary(Units.DAY));
            }
        }
        if (includeIncludes) {
            let includes = this.include.spans().list();
            if (includes.length) {
                out += ' including ';
                out += this.describeArray(includes, x => x.span.summary(Units.DAY));
            }
        }
        if (includeCancels) {
            let cancels = this.cancel.spans().list();
            if (cancels.length) {
                out += ' with cancellations on ';
                out += this.describeArray(cancels, x => x.span.summary(Units.DAY));
            }
        }
        return out;
    }
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
    describeRule(value, unit, map, everyOffset = 0, the = true, on = ' on ', required = false) {
        let out = '';
        let suffix = the ? ' ' + unit : '';
        if (Functions.isFrequencyValueEvery(value)) {
            let valueEvery = value;
            out += ' every ' + Suffix.CACHE[valueEvery.every] + ' ' + unit;
            if (valueEvery.offset) {
                out += ' starting at ' + map(valueEvery.offset + everyOffset) + suffix;
            }
        }
        else if (Functions.isFrequencyValueOneOf(value)) {
            let valueOne = value;
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
    }
    /**
     * Describes the array by adding commas where appropriate and 'and' before the
     * last value of the array (if its more than `1`).
     *
     * @param array The array of items to describe.
     * @param map The function which converts an item to a string.
     * @returns The final description of the array items.
     */
    describeArray(array, map) {
        let out = '';
        let last = array.length - 1;
        out += map(array[0]);
        for (let i = 1; i < last; i++) {
            out += ', ' + map(array[i]);
        }
        if (last > 0) {
            out += ' and ' + map(array[last]);
        }
        return out;
    }
    /**
     * Generates a schedule for an event which occurs once all day for a given day
     * optionally spanning multiple days starting on the given day.
     *
     * @param input The day the event starts.
     * @param days The number of days the event lasts.
     * @returns A new schedule that starts on the given day.
     */
    static forDay(input, days = 1) {
        let day = Day_Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule_Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            duration: days,
            durationUnit: 'days'
        });
    }
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
    static forTime(input, time, duration = 1, durationUnit = 'hours') {
        let day = Day_Day.parse(input);
        if (!day) {
            return null;
        }
        return new Schedule_Schedule({
            year: [day.year],
            month: [day.month],
            dayOfMonth: [day.dayOfMonth],
            times: [time],
            duration: duration,
            durationUnit: durationUnit
        });
    }
    /**
     * Generates a schedule for an event which occurs once over a given span.
     *
     * @param span The span of the event.
     * @returns A new schedule that starts and ends at the given timestamps.
     */
    static forSpan(span) {
        let start = span.start;
        let minutes = span.minutes();
        let isDay = minutes % Constants.MINUTES_IN_DAY === 0;
        let isHour = minutes % Constants.MINUTES_IN_HOUR === 0;
        let duration = isDay ? minutes / Constants.MINUTES_IN_DAY : (isHour ? minutes / Constants.MINUTES_IN_HOUR : minutes);
        let durationUnit = isDay ? 'days' : (isHour ? 'hours' : 'minutes');
        return this.forTime(start, start.asTime(), duration, durationUnit);
    }
}

// CONCATENATED MODULE: ./src/Event.ts

/**
 * A pairing of a user specified event object and the schedule which defines
 * when it occurs on a calendar.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
class Event {
    /**
     * Creates a new event.
     *
     * @param schedule The schedule which defines when the event occurs.
     * @param data User specified object which describes this event.
     * @param id User specified ID which identifies this event.
     */
    constructor(schedule, data, id, visible = true) {
        this.schedule = schedule;
        this.data = data;
        this.id = id;
        this.visible = visible;
    }
}

// CONCATENATED MODULE: ./src/Time.ts




/**
 * A class which holds a specific time during in any day.
 */
class Time_Time {
    /**
     * Creates a new Time instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     */
    constructor(hour, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.millisecond = millisecond;
    }
    /**
     * Formats this time into a string. The following list describes the available
     * formatting patterns:
     *
     * ### Hour
     * - H: 0-23
     * - HH: 00-23
     * - h: 12,1-12,1-11
     * - hh: 12,01-12,01-11
     * - k: 1-24
     * - kk: 01-24
     * - a: am,pm
     * - A: AM,PM
     * ### Minute
     * - m: 0-59
     * - mm: 00-59
     * ### Second
     * - s: 0-59
     * - ss: 00-59
     * ### Millisecond
     * - S: 0-9
     * - SS: 00-99
     * - SSS: 000-999
     *
     * @param format The format to output.
     * @returns The formatted time.
     */
    format(format) {
        let formatterEntries = Time_Time.FORMATTERS;
        let out = '';
        for (let i = 0; i < format.length; i++) {
            let handled = false;
            for (let k = 0; k < formatterEntries.length && !handled; k++) {
                let entry = formatterEntries[k];
                let part = format.substring(i, i + entry.size);
                if (part.length === entry.size) {
                    let formatter = entry.formats[part];
                    if (formatter) {
                        out += formatter(this);
                        i += entry.size - 1;
                        handled = true;
                    }
                }
            }
            if (!handled) {
                out += format.charAt(i);
            }
        }
        return out;
    }
    /**
     * Determines whether this time is an exact match for the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the time matches this time, otherwise `false`.
     */
    matches(time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second &&
            this.millisecond === time.millisecond;
    }
    /**
     * Determines whether this time has the same hour as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour matches this hour, otherwise `false`.
     */
    matchesHour(time) {
        return this.hour === time.hour;
    }
    /**
     * Determines whether this time has the same hour and minute as the given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour and minute matches, otherwise `false`.
     */
    matchesMinute(time) {
        return this.hour === time.hour &&
            this.minute === time.minute;
    }
    /**
     * Determines whether this time has the same hour, minute, and second as the
     * given time.
     *
     * @param time The given time to test against.
     * @returns `true` if the given hour, minute, and second matches, otherwise
     *    `false`.
     */
    matchesSecond(time) {
        return this.hour === time.hour &&
            this.minute === time.minute &&
            this.second === time.second;
    }
    /**
     * Sets the time of this instance to the same time of the given input.
     *
     * @param input The time to set this to.
     * @returns `true` if this time was set, otherwise `false` (invalid input).
     */
    set(input) {
        let parsed = Time_Time.parse(input);
        let valid = !!parsed;
        if (valid) {
            this.hour = parsed.hour;
            this.minute = parsed.minute;
            this.second = parsed.second;
            this.millisecond = parsed.millisecond;
        }
        return valid;
    }
    /**
     * @returns The number of milliseconds from the start of the day until this
     *  time.
     */
    toMilliseconds() {
        return this.hour * Constants.MILLIS_IN_HOUR +
            this.minute * Constants.MILLIS_IN_MINUTE +
            this.second * Constants.MILLIS_IN_SECOND +
            this.millisecond;
    }
    /**
     * @returns The time formatted using the smallest format that completely
     *  represents this time.
     */
    toString() {
        if (this.millisecond)
            return this.format('HH:mm:ss.SSS');
        if (this.second)
            return this.format('HH:mm:ss');
        if (this.minute)
            return this.format('HH:mm');
        return this.format('HH');
    }
    /**
     * @returns A unique identifier for this time. The number returned is in the
     *  following format: SSSssmmHH
     */
    toIdentifier() {
        return this.hour +
            this.minute * 100 +
            this.second * 10000 +
            this.millisecond * 10000000;
    }
    /**
     * @returns An object with hour, minute, second, a millisecond properties if
     *  they are non-zero on this time.
     */
    toObject() {
        let out = {
            hour: this.hour
        };
        if (this.minute)
            out.minute = this.minute;
        if (this.second)
            out.second = this.second;
        if (this.millisecond)
            out.millisecond = this.millisecond;
        return out;
    }
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Parse.time]]
     */
    static parse(input) {
        return Parse_Parse.time(input);
    }
    /**
     * Parses a string and converts it to a Time instance. If the string is not
     * in a valid format `null` is returned.
     *
     * @param time The string to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.REGEX]]
     */
    static fromString(time) {
        let matches = this.REGEX.exec(time);
        if (!matches) {
            return null;
        }
        let h = parseInt(matches[1]) || 0;
        let m = parseInt(matches[2]) || 0;
        let s = parseInt(matches[3]) || 0;
        let l = parseInt(matches[4]) || 0;
        return this.build(h, m, s, l);
    }
    /**
     * Parses a number and converts it to a Time instance. The number is assumed
     * to be in the [[Time.toIdentifier]] format.
     *
     * @param time The number to parse.
     * @returns The instance parsed.
     */
    static fromIdentifier(time) {
        let h = time % 100;
        let m = Math.floor(time / 100) % 100;
        let s = Math.floor(time / 10000) % 100;
        let l = Math.floor(time / 10000000) % 1000;
        return this.build(h, m, s, l);
    }
    /**
     * Returns a new instance given an hour and optionally a minute, second,
     * and millisecond. If they have not been specified they default to 0.
     *
     * @param hour The hour.
     * @param minute The minute.
     * @param second The second.
     * @param millisecond The millisecond.
     * @returns A new instance.
     */
    static build(hour, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        return new Time_Time(hour, minute, second, millisecond);
    }
}
/**
 * The regular expression used to parse a time from a string.
 *
 * - ## = hour
 * - ##:## = hour & minute
 * - ##:##:## = hour, minute, & second
 * - ##:##:##.### = hour, minute, second, and milliseconds
 */
Time_Time.REGEX = /^(\d\d?):?(\d\d)?:?(\d\d)?\.?(\d\d\d)?$/;
/**
 * A set of formatting functions keyed by their format string.
 */
Time_Time.FORMATTERS = [
    {
        size: 3,
        formats: {
            SSS: (t) => Functions.padNumber(t.millisecond, 3)
        }
    },
    {
        size: 2,
        formats: {
            HH: (t) => Functions.padNumber(t.hour, 2),
            hh: (t) => Functions.padNumber((t.hour % 12) || 12, 2),
            kk: (t) => Functions.padNumber(t.hour + 1, 2),
            mm: (t) => Functions.padNumber(t.minute, 2),
            ss: (t) => Functions.padNumber(t.second, 2),
            SS: (t) => Functions.padNumber(t.millisecond, 3, 2)
        }
    },
    {
        size: 1,
        formats: {
            A: (t) => t.hour < 12 ? 'AM' : 'PM',
            a: (t) => t.hour < 12 ? 'am' : 'pm',
            H: (t) => t.hour + '',
            h: (t) => ((t.hour % 12) || 12) + '',
            k: (t) => (t.hour + 1) + '',
            m: (t) => t.minute + '',
            s: (t) => t.second + '',
            S: (t) => Functions.padNumber(t.millisecond, 3, 1)
        }
    }
];

// CONCATENATED MODULE: ./src/Parse.ts








/**
 * The class which takes user input and parses it to specific structures.
 */
class Parse_Parse {
    /**
     * Parses a value and converts it to a [[FrequencyCheck]].
     *
     * @param input The input to parse into a function.
     * @param property The [[Day]] property the frequency is for.
     * @returns A function which determines whether a value matches a frequency.
     * @see [[Schedule]]
     */
    static frequency(input, property) {
        let check = (value) => {
            return true;
        };
        check.given = false;
        if (Functions.isFrequencyValueEvery(input)) {
            let every = input.every;
            let offset = (input.offset || 0) % every;
            check = (value) => {
                return value % every === offset;
            };
            check.given = true;
        }
        if (Functions.isFrequencyValueOneOf(input)) {
            let map = {};
            for (let i = 0; i < input.length; i++) {
                map[input[i]] = true;
            }
            check = (value) => {
                return !!map[value];
            };
            check.given = true;
        }
        check.input = Functions.coalesce(input, null);
        check.property = property;
        return check;
    }
    /**
     * Parses [[DayInput]] into a [[Day]] instance.
     *
     * ```typescript
     * Parse.day( 65342300 );               // UTC timestamp
     * Parse.day( '01/02/2014' );           // strings in many formats
     * Parse.day( day );                    // return a passed instance
     * Parse.day( [2018, 0, 2] );           // array: 01/02/2018
     * Parse.day( {year: 2018, month: 2} ); // object: 03/01/2018
     * Parse.day( true );                   // today
     * ```
     *
     * @param input The input to parse.
     * @returns The Day parsed or `null` if the value is not valid.
     */
    static day(input) {
        if (Functions.isNumber(input)) {
            return Day_Day.unix(input);
        }
        else if (Functions.isString(input)) {
            return Day_Day.fromString(input);
        }
        else if (input instanceof Day_Day) {
            return input;
        }
        else if (Functions.isArray(input)) {
            return Day_Day.fromArray(input);
        }
        else if (Functions.isObject(input)) {
            return Day_Day.fromObject(input);
        }
        else if (input === true) {
            return Day_Day.today();
        }
        return null;
    }
    /**
     * Parses a value and tries to convert it to a Time instance.
     *
     * ```typescript
     * Parse.time( time );      // return a passed instance
     * Parse.time( 9 );         // 09:00:00.000
     * Parse.time( 3009 );      // 09:30:00.000
     * Parse.time( 593009 );    // 09:30:59.000
     * Parsetime( '09' );       // 09:00:00.000
     * Parse.time( '9:30' );    // 09:30:00.000
     * Parse.time( '9:30:59' ); // 09:30:59.000
     * Parse.time( {hour: 2} ); // 02:00:00.000
     * ```
     *
     * @param input The input to parse.
     * @returns The instance parsed or `null` if it was invalid.
     * @see [[Time.fromIdentifier]]
     * @see [[Time.fromString]]
     */
    static time(input) {
        if (input instanceof Time_Time) {
            return input;
        }
        if (Functions.isNumber(input)) {
            return Time_Time.fromIdentifier(input);
        }
        if (Functions.isString(input)) {
            return Time_Time.fromString(input);
        }
        if (Functions.isObject(input) && Functions.isNumber(input.hour)) {
            return new Time_Time(input.hour, input.minute, input.second, input.millisecond);
        }
        return null;
    }
    /**
     * Parses a value and tries to convert it to an array of Time instances.
     * If any of the given values are not a valid time value then the resulting
     * array will not contain a time instance.
     *
     * @param input The input to parse.
     * @returns A non-null array of time instances.
     * @see [[Parse.time]]
     */
    static times(input) {
        let times = [];
        if (Functions.isArray(input)) {
            for (let timeInput of input) {
                let time = this.time(timeInput);
                if (time) {
                    times.push(time);
                }
            }
            // Sort times from earliest to latest.
            times.sort((a, b) => {
                return a.toMilliseconds() - b.toMilliseconds();
            });
        }
        return times;
    }
    /**
     * Parses an array of excluded days into a map of excluded days where the
     * array value and returned object key are [[Day.dayIdentifier]].
     *
     * ```typescript
     * Parse.modifier( [ 20180101, 20140506 ] );            // {'20180101': true, '20140506': true}
     * Parse.modifier( [ 20180101, Day.build(2014,4,6) ] ); // {'20180101': true, '20140506': true}
     * ```
     *
     * @param input The input to parse.
     * @param value The default value if the input given is an array of identifiers.
     * @param parseMeta A function to use to parse a modifier.
     * @param out The modifier to set the identifiers and values of and return.
     * @returns The object with identifier keys and `true` values.
     * @see [[Day.dayIdentifier]]
     */
    static modifier(input, value, parseMeta = (x => x), out = new ScheduleModifier_ScheduleModifier()) {
        let map = {};
        if (Functions.isArray(input)) {
            for (let identifier of input) {
                if (identifier instanceof Day_Day) {
                    map[identifier.dayIdentifier] = value;
                }
                else if (Functions.isNumber(identifier)) {
                    map[identifier] = value;
                }
                else if (Functions.isString(identifier)) {
                    map[identifier] = value;
                }
            }
        }
        if (Functions.isObject(input)) {
            for (let identifier in input) {
                map[identifier] = parseMeta(input[identifier]);
            }
        }
        out.map = map;
        return out;
    }
    /**
     * Parses an object which specifies a schedule where events may or may not
     * repeat and they may be all day events or at specific times.
     *
     * @param input The input to parse into a schedule.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @param out The schedule to set the values of and return.
     * @returns An instance of the parsed [[Schedule]].
     */
    static schedule(input, parseMeta = (x => x), out = new Schedule_Schedule()) {
        if (input instanceof Schedule_Schedule) {
            return input;
        }
        let on = this.day(input.on);
        let times = this.times(input.times);
        let fullDay = times.length === 0;
        if (on) {
            input.start = on.start();
            input.end = on.end();
            input.year = [on.year];
            input.month = [on.month];
            input.dayOfMonth = [on.dayOfMonth];
        }
        out.times = times;
        out.duration = Functions.coalesce(input.duration, Constants.DURATION_DEFAULT);
        out.durationUnit = Functions.coalesce(input.durationUnit, Constants.DURATION_DEFAULT_UNIT(fullDay));
        out.start = this.day(input.start);
        out.end = this.day(input.end);
        out.exclude = this.modifier(input.exclude, true, undefined, out.exclude);
        out.include = this.modifier(input.include, true, undefined, out.include);
        out.cancel = this.modifier(input.cancel, true, undefined, out.cancel);
        out.meta = this.modifier(input.meta, null, parseMeta, out.meta);
        out.year = this.frequency(input.year, 'year');
        out.month = this.frequency(input.month, 'month');
        out.week = this.frequency(input.week, 'week');
        out.weekOfYear = this.frequency(input.weekOfYear, 'weekOfYear');
        out.weekspanOfYear = this.frequency(input.weekspanOfYear, 'weekspanOfYear');
        out.fullWeekOfYear = this.frequency(input.fullWeekOfYear, 'fullWeekOfYear');
        out.lastWeekspanOfYear = this.frequency(input.lastWeekspanOfYear, 'lastWeekspanOfYear');
        out.lastFullWeekOfYear = this.frequency(input.lastFullWeekOfYear, 'lastFullWeekOfYear');
        out.weekOfMonth = this.frequency(input.weekOfMonth, 'weekOfMonth');
        out.weekspanOfMonth = this.frequency(input.weekspanOfMonth, 'weekspanOfMonth');
        out.fullWeekOfMonth = this.frequency(input.fullWeekOfMonth, 'fullWeekOfMonth');
        out.lastWeekspanOfMonth = this.frequency(input.lastWeekspanOfMonth, 'lastWeekspanOfMonth');
        out.lastFullWeekOfMonth = this.frequency(input.lastFullWeekOfMonth, 'lastFullWeekOfMonth');
        out.dayOfWeek = this.frequency(input.dayOfWeek, 'dayOfWeek');
        out.dayOfMonth = this.frequency(input.dayOfMonth, 'dayOfMonth');
        out.lastDayOfMonth = this.frequency(input.lastDayOfMonth, 'lastDayOfMonth');
        out.dayOfYear = this.frequency(input.dayOfYear, 'dayOfYear');
        out.updateDurationInDays();
        out.updateChecks();
        return out;
    }
    /**
     * Parses an array of [[FrequencyCheck]] functions and returns an array of
     * functions for only the checks that were specified by the user.
     *
     * @param checks The array of check functions to filter through.
     * @returns The array of user specified checks.
     */
    static givenFrequency(checks) {
        let out = [];
        for (let check of checks) {
            if (check.given) {
                out.push(check);
            }
        }
        return out;
    }
    /**
     * Parses [[EventInput]] and returns an [[Event]].
     *
     * @param input The input to parse.
     * @param parseData A function to use when parsing data input into the desired type.
     * @param parseMeta A function to use when parsing meta input into the desired type.
     * @returns The parsed value.
     */
    static event(input, parseData = (x => x), parseMeta = (x => x)) {
        if (input instanceof Event) {
            return input;
        }
        if (!input.schedule) {
            return null;
        }
        let schedule = this.schedule(input.schedule, parseMeta);
        return new Event(schedule, parseData(input.data), input.id, input.visible);
    }
    /**
     * Parses a schedule from a CRON pattern. TODO
     */
    static cron(pattern, out = new Schedule_Schedule()) {
        return out;
    }
}

// CONCATENATED MODULE: ./src/Day.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);






// @ts-ignore

/**
 * A class which represents a point in time as
 */
class Day_Day {
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
        this.lastDayOfMonth = Day_Day.getLastDayOfMonth(date);
        this.weekOfYear = Day_Day.getWeekOfYear(date);
        this.weekspanOfYear = Day_Day.getWeekspanOfYear(date);
        this.fullWeekOfYear = Day_Day.getFullWeekOfYear(date);
        this.lastWeekspanOfYear = Day_Day.getLastWeekspanOfYear(date);
        this.lastFullWeekOfYear = Day_Day.getLastFullWeekOfYear(date);
        this.weekOfMonth = Day_Day.getWeekOfMonth(date);
        this.weekspanOfMonth = Day_Day.getWeekspanOfMonth(date);
        this.fullWeekOfMonth = Day_Day.getFullWeekOfMonth(date);
        this.lastWeekspanOfMonth = Day_Day.getLastWeekspanOfMonth(date);
        this.lastFullWeekOfMonth = Day_Day.getLastFullWeekOfMonth(date);
        this.timeIdentifier = Identifier_Identifier.Time.get(this);
        this.dayIdentifier = Identifier_Identifier.Day.get(this);
        this.weekIdentifier = Identifier_Identifier.Week.get(this);
        this.monthIdentifier = Identifier_Identifier.Month.get(this);
        this.quarterIdentifier = Identifier_Identifier.Quarter.get(this);
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
        return new Day_Day(d);
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
        return new Time_Time(this.hour, this.minute, this.seconds, this.millis);
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
        return new Day_Day(__WEBPACK_IMPORTED_MODULE_5_moment__());
    }
    static today() {
        return this.now().start();
    }
    static tomorrow() {
        return this.today().next();
    }
    static fromMoment(moment) {
        return moment && moment.isValid() ? new Day_Day(moment) : null;
    }
    static unix(millis) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(millis));
    }
    static unixSeconds(millis) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__["unix"](millis));
    }
    static parse(input) {
        return Parse_Parse.day(input);
    }
    static fromString(input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    }
    static fromFormat(input, formats) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input, formats));
    }
    static fromObject(input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    }
    static fromDate(input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    }
    static fromArray(input) {
        return this.fromMoment(__WEBPACK_IMPORTED_MODULE_5_moment__(input));
    }
    static fromDayIdentifier(id) {
        let date = id % 100;
        let month = (Math.floor(id / 100) % 100) - 1;
        let year = Math.floor(id / 10000);
        return this.build(year, month, date);
    }
    static build(year, month, date = Constants.DAY_MIN, hour = Constants.HOUR_MIN, minute = Constants.MINUTE_MIN, second = Constants.SECOND_MIN, millisecond = Constants.MILLIS_MIN) {
        return new Day_Day(__WEBPACK_IMPORTED_MODULE_5_moment__({ year, month, date, hour, minute, second, millisecond }));
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

// CONCATENATED MODULE: ./src/CalendarDay.ts




/**
 * A day in a [[Calendar]] with extra information relative to any selection on
 * the calendar, the current date, or events on the day.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
class CalendarDay_CalendarDay extends Day_Day {
    constructor() {
        super(...arguments);
        /**
         * Whether this day is the current day (ex: today).
         */
        this.currentDay = false;
        /**
         * Whether this day is on the same week as the current day (ex: today).
         */
        this.currentWeek = false;
        /**
         * Whether this day is on the same month as the current day (ex: today).
         */
        this.currentMonth = false;
        /**
         * Whether this day is on the same year as the current day (ex: today).
         */
        this.currentYear = false;
        /**
         * How many days away this day is from the current day (ex: today). If this
         * day is the current day the offset is 0. If this day is before the current
         * day it will be the negative number of days away. Otherwise this will be
         * positive meaning this day is after the current day by the given days.
         */
        this.currentOffset = 0;
        /**
         * Whether this day is part of a selection on the calendar.
         */
        this.selectedDay = false;
        /**
         * Whether this day is on the same week that the calendar selection is.
         */
        this.selectedWeek = false;
        /**
         * Whether this day is on the same month that the calendar selection is.
         */
        this.selectedMonth = false;
        /**
         * Whether this day is on the same year that the calendar selection is.
         */
        this.selectedYear = false;
        /**
         * Whether this day is in the current calendar or not. Some days are outside
         * the calendar span and used to fill in weeks. Month calendars will fill in
         * days so the list of days in the calendar start on Sunday and end on Saturday.
         */
        this.inCalendar = false;
        /**
         * The list of events on this day based on the settings and schedules in the
         * calendar.
         */
        this.events = [];
    }
    /**
     * Creates an iterator for the events on this day.
     *
     * @returns The new iterator for the events on this day.
     */
    iterateEvents() {
        return Iterator_Iterator.forArray(this.events);
    }
    /**
     * Updates the current flags on this day given the current day (ex: today).
     *
     * @param current The current day of the calendar.
     */
    updateCurrent(current) {
        this.currentDay = this.sameDay(current);
        this.currentWeek = this.sameWeek(current);
        this.currentMonth = this.sameMonth(current);
        this.currentYear = this.sameYear(current);
        this.currentOffset = this.daysBetween(current, Op.DOWN, false);
        return this;
    }
    /**
     * Updates the selection flags on this day given the selection range on the
     * calendar.
     *
     * @param selected The span of days selected on the calendar.
     */
    updateSelected(selected) {
        this.selectedDay = selected.matchesDay(this);
        this.selectedWeek = selected.matchesWeek(this);
        this.selectedMonth = selected.matchesMonth(this);
        this.selectedYear = selected.matchesYear(this);
        return this;
    }
    /**
     * Clears the selection flags on this day. This is done when the selection on
     * the calendar is cleared.
     */
    clearSelected() {
        this.selectedDay = this.selectedWeek = this.selectedMonth = this.selectedYear = false;
        return this;
    }
}

// CONCATENATED MODULE: ./src/CalendarEvent.ts


/**
 * An instance of an [[Event]] on a given day of a [[Calendar]] generated by
 * the event's [[Schedule]].
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule and in this class.
 */
class CalendarEvent_CalendarEvent {
    /**
     * Creates a new event instance given the id, the event paired with the
     * schedule, the schedule, the time span of the event, and the day on the
     * calendar the event belongs to.
     *
     * @param id The relatively unique identifier of this event.
     * @param event The event which created this instance.
     * @param time The time span of this event.
     * @param actualDay The day on the calendar this event is for.
     */
    constructor(id, event, time, actualDay) {
        /**
         * The row this event is on in a visual calendar. An event can span multiple
         * days and it is desirable to have the occurrence on each day to line up.
         * This is only set when [[Calendar.updateRows]] is true or manually set.
         * This value makes sense for visual calendars for all day events or when the
         * visual calendar is not positioning events based on their time span.
         */
        this.row = 0;
        /**
         * The column this event is on in a visual calendar. An event can have its
         * time overlap with another event displaying one of the events in another
         * column. This is only set when [[Calendar.updateColumns]] is true or
         * manually set. This value makes sense for visual calendars that are
         * displaying event occurrences at specific times positioned accordingly.
         */
        this.col = 0;
        this.id = id;
        this.event = event;
        this.time = time;
        this.day = actualDay;
        this.fullDay = event.schedule.isFullDay();
        this.meta = event.schedule.getMeta(time.start);
        this.cancelled = event.schedule.isCancelled(time.start);
        this.starting = time.isPoint || time.start.sameDay(actualDay);
        this.ending = time.isPoint || time.end.relative(-1).sameDay(actualDay);
    }
    /**
     * The id of the schedule uniqe within the calendar which generated this event.
     */
    get scheduleId() {
        return Math.floor(this.id / Constants.MAX_EVENTS_PER_DAY);
    }
    /**
     * The start timestamp of the event.
     */
    get start() {
        return this.time.start;
    }
    /**
     * The end timestamp of the event.
     */
    get end() {
        return this.time.end;
    }
    /**
     * The schedule which generated this event.
     */
    get schedule() {
        return this.event.schedule;
    }
    /**
     * The related event data.
     */
    get data() {
        return this.event.data;
    }
    /**
     * An [[IdentifierInput]] for the start of this event.
     */
    get identifier() {
        return this.identifierType.get(this.start);
    }
    /**
     * The [[Identifier]] for this event. Either [[Identifier.Day]] or
     * [[Identifier.Time]].
     */
    get identifierType() {
        return this.schedule.identifierType;
    }
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[CalendarEvent.start]] is relative to [[CalendarEvent.day]]. The delta
     * value would be less than 0 if the start of the event is before
     * [[CalendarEvent.day]].
     */
    get startDelta() {
        return this.time.startDelta(this.day);
    }
    /**
     * Returns a delta value between 0 and 1 which represents where the
     * [[CalendarEvent.end]] is relative to [[CalendarEvent.day]]. The delta value
     * would be greater than 1 if the end of the event is after
     * [[CalendarEvent.day]].
     */
    get endDelta() {
        return this.time.endDelta(this.day);
    }
    /**
     * Calculates the bounds for this event if it were placed in a rectangle which
     * represents a day (24 hour period). By default the returned values are
     * between 0 and 1 and can be scaled by the proper rectangle dimensions or the
     * rectangle dimensions can be passed to this function.
     *
     * @param dayHeight The height of the rectangle of the day.
     * @param dayWidth The width of the rectangle of the day.
     * @param columnOffset The offset in the rectangle of the day to adjust this
     *    event by if it intersects or is contained in a previous event. This also
     *    reduces the width of the returned bounds to keep the bounds in the
     *    rectangle of the day.
     * @param clip `true` if the bounds should stay in the day rectangle, `false`
     *    and the bounds may go outside the rectangle of the day for multi-day
     *    events.
     * @param offsetX How much to translate the left & right properties by.
     * @param offsetY How much to translate the top & bottom properties by.
     * @returns The calculated bounds for this event.
     */
    getTimeBounds(dayHeight = 1, dayWidth = 1, columnOffset = 0.1, clip = true, offsetX = 0, offsetY = 0) {
        return this.time.getBounds(this.day, dayHeight, dayWidth, this.col * columnOffset, clip, offsetX, offsetY);
    }
    /**
     * Changes the cancellation status of this event. By default this cancels
     * this event - but `false` may be passed to undo a cancellation.
     *
     * @param cancelled Whether the event should be cancelled.
     */
    cancel(cancelled = true) {
        this.schedule.setCancelled(this.start, cancelled);
        this.cancelled = cancelled;
        return this;
    }
    /**
     * Changes the exclusion status of this event. By default this excludes this
     * event - but `false`  may be passed to undo an exclusion.
     *
     * @param excluded Whether the event should be excluded.
     */
    exclude(excluded = true) {
        this.schedule.setExcluded(this.start, excluded);
        return this;
    }
    /**
     * Moves this event to potentially another day and time. A move is
     * accomplished by excluding the current event and adding an inclusion of the
     * new day & time. Any [[CalendarEvent.meta]] on this event will be moved to
     * the new event. If the schedule represents a single event
     * ([[Schedule.isSingleEvent]]) then the schedule frequencies are updated
     * to match the timestamp provided.
     *
     * @param toTime The timestamp to move this event to.
     * @returns Whether the event was moved to the given time.
     */
    move(toTime) {
        return this.schedule.move(toTime, this.start);
    }
}

// CONCATENATED MODULE: ./src/Calendar.ts











/**
 * A collection of [[CalendarDay]]s, the events on the calendar, and all
 * [[CalendarEvent]]s generated based on the events.
 *
 * @typeparam T The type of data stored in the [[Event]] class.
 * @typeparam M The type of metadata stored in the schedule.
 */
class Calendar_Calendar {
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
    constructor(start, end, type, size, moveStart, moveEnd, input) {
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
        this.parseMeta = (x => x);
        /**
         * A function to use when parsing meta input into the desired type.
         *
         * @param input The input to parse.
         * @returns The meta parsed from the given input, if any.
         */
        this.parseData = (x => x);
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
        this.span = new DaySpan_DaySpan(start, end);
        this.filled = new DaySpan_DaySpan(start, end);
        this.type = type;
        this.size = size;
        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
        if (Functions.isDefined(input)) {
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
    set(input) {
        let typeChange = Functions.isDefined(input.type) && input.type !== this.type;
        let sizeChange = Functions.isDefined(input.size) && input.size !== this.size;
        if (typeChange || sizeChange) {
            let focus = Functions.coalesce(input.otherwiseFocus, 0.4999);
            let prefer = Functions.coalesce(input.preferToday, true);
            let size = Functions.coalesce(input.size, this.size);
            let type = Functions.coalesce(input.type, this.type);
            let around = Functions.coalesce(input.around, this.days[Math.floor((this.days.length - 1) * focus)]);
            let today = Day_Day.today();
            if (!around || (prefer && this.span.matchesDay(today))) {
                around = today;
            }
            let meta = Calendar_Calendar.TYPES[type];
            let start = meta.getStart(Day_Day.parse(around), size, focus);
            let end = meta.getEnd(start, size, focus);
            this.span.start = start;
            this.span.end = end;
            this.type = type;
            this.size = size;
            this.moveStart = meta.moveStart;
            this.moveEnd = meta.moveEnd;
        }
        else if (input.around) {
            let focus = Functions.coalesce(input.otherwiseFocus, 0.4999);
            let around = Day_Day.parse(input.around);
            let type = this.type;
            let size = this.size;
            let meta = Calendar_Calendar.TYPES[type];
            let start = meta.getStart(around, size, focus);
            let end = meta.getEnd(start, size, focus);
            this.span.start = start;
            this.span.end = end;
        }
        this.fill = Functions.coalesce(input.fill, this.fill);
        this.minimumSize = Functions.coalesce(input.minimumSize, this.minimumSize);
        this.repeatCovers = Functions.coalesce(input.repeatCovers, this.repeatCovers);
        this.listTimes = Functions.coalesce(input.listTimes, this.listTimes);
        this.eventsOutside = Functions.coalesce(input.eventsOutside, this.eventsOutside);
        this.updateRows = Functions.coalesce(input.updateRows, this.updateRows);
        this.updateColumns = Functions.coalesce(input.updateColumns, this.updateColumns);
        this.eventSorter = Functions.coalesce(input.eventSorter, this.eventSorter);
        this.parseMeta = Functions.coalesce(input.parseMeta, this.parseMeta);
        this.parseData = Functions.coalesce(input.parseData, this.parseData);
        if (Functions.isArray(input.events)) {
            this.setEvents(input.events, true);
        }
        if (!input.delayRefresh) {
            this.refresh();
        }
        return this;
    }
    /**
     * Sets the [[Calendar.minimumSize]] value and returns `this` for method
     * chaining.
     *
     * @param minimumSize The new value.
     */
    withMinimumSize(minimumSize) {
        this.minimumSize = minimumSize;
        this.refresh();
        return this;
    }
    /**
     * Sets the [[Calendar.repeatCovers]] value and returns `this` for method
     * chaining.
     *
     * @param repeatCovers The new value.
     */
    withRepeatCovers(repeatCovers) {
        this.repeatCovers = repeatCovers;
        this.refreshEvents();
        return this;
    }
    /**
     * Sets the [[Calendar.listTimes]] value and returns `this` for method
     * chaining.
     *
     * @param listTimes The new value.
     */
    withListTimes(listTimes) {
        this.listTimes = listTimes;
        this.refreshEvents();
        return this;
    }
    /**
     * Sets the [[Calendar.eventsOutside]] value and returns `this` for method
     * chaining.
     *
     * @param eventsOutside The new value.
     */
    withEventsOutside(eventsOutside) {
        this.eventsOutside = eventsOutside;
        this.refreshEvents();
        return this;
    }
    /**
     * Sets the [[Calendar.updateRows]] value and returns `this` for method
     * chaining.
     *
     * @param updateRows The new value.
     * @param refresh If the rows should be updated now if `updateRows` is `true`.
     */
    withUpdateRows(updateRows, refresh = true) {
        this.updateRows = updateRows;
        if (refresh && updateRows) {
            this.refreshRows();
        }
        return this;
    }
    /**
     * Sets the [[Calendar.updateColumns]] value and returns `this` for method
     * chaining.
     *
     * @param updateColumns The new value.
     * @param refresh If the columns should be updated now if `updateColumns` is
     *    `true`.
     */
    withUpdateColumns(updateColumns, refresh = true) {
        this.updateColumns = updateColumns;
        if (refresh && updateColumns) {
            this.refreshColumns();
        }
        return this;
    }
    /**
     * Returns the start day of the calendar. If this calendar is filled, this
     * may not represent the very first day in the calendar.
     */
    get start() {
        return this.span.start;
    }
    /**
     * Returns the end day of the calendar. If this calendar is filled, this
     * may not represent the very last day in the calendar.
     */
    get end() {
        return this.span.end;
    }
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
    summary(dayOfWeek = true, short = false, repeat = false, contextual = true, delimiter = ' - ') {
        return this.span.summary(this.type, dayOfWeek, short, repeat, contextual, delimiter);
    }
    /**
     * Splits up this calendar into an iterable collection of calendars. The
     * resulting iterator will return `size / by` number of calendars.
     *
     * @param by The new size of the resulting calendars. If the the size of the
     *    current calendar is not divisible by this value the resulting calendars
     *    may cover more or less than this calendar covers.
     * @returns An iterator for the calendars produced.
     */
    split(by = 1) {
        return new Iterator_Iterator(iterator => {
            let start = this.start;
            let end = this.moveEnd(this.end, by - this.size);
            for (let i = 0; i < this.size; i++) {
                let calendar = new Calendar_Calendar(start, end, this.type, by, this.moveStart, this.moveEnd, this);
                if (iterator.act(calendar) === IteratorAction.Stop) {
                    return;
                }
                start = this.moveStart(start, by);
                end = this.moveEnd(end, by);
            }
        });
    }
    /**
     * Refreshes the days and events in this calendar based on the start and end
     * days, the calendar properties, and its eventss.
     *
     * @param today The current day to update the calendar days via
     *    [[CalendarDay.updateCurrent]].
     */
    refresh(today = Day_Day.today()) {
        this.length = this.span.days(Op.UP, true);
        this.resetDays();
        this.refreshCurrent(today);
        this.refreshSelection();
        this.refreshVisible();
        this.refreshEvents();
        return this;
    }
    /**
     * Updates the [[Calendar.filled]] span based on [[Calendar.start]],
     * [[Calendar.end]], and [[Calendar.fill]] properties.
     */
    resetFilled() {
        this.filled.start = this.fill ? this.start.startOfWeek() : this.start;
        this.filled.end = this.fill ? this.end.endOfWeek() : this.end;
        return this;
    }
    /**
     * Updates [[Calendar.days]] to match the span of days in the calendar.
     */
    resetDays() {
        this.resetFilled();
        let days = this.days;
        let filled = this.filled;
        let current = filled.start;
        let daysBetween = filled.days(Op.UP);
        let total = Math.max(this.minimumSize, daysBetween);
        for (let i = 0; i < total; i++) {
            let day = days[i];
            if (!day || !day.sameDay(current)) {
                day = new CalendarDay_CalendarDay(current.date);
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
    }
    /**
     * Updates the list of visible schedules.
     */
    refreshVisible() {
        let start = this.filled.start;
        let end = this.filled.end;
        this.visible = this.events.filter(e => {
            return e.visible && e.schedule.matchesRange(start, end);
        });
        return this;
    }
    /**
     * Updates the days with the current day via [[CalendarDay.updateCurrent]].
     *
     * @param today The new current day.
     */
    refreshCurrent(today = Day_Day.today()) {
        this.iterateDays().iterate(d => {
            d.updateCurrent(today);
        });
        return this;
    }
    /**
     * Updates the selection flags in [[CalendarDay]] based on the
     * [[Calendar.selection]] property.
     */
    refreshSelection() {
        this.iterateDays().iterate(d => {
            if (this.selection) {
                d.updateSelected(this.selection);
            }
            else {
                d.clearSelected();
            }
        });
        return this;
    }
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
    refreshEvents() {
        this.iterateDays().iterate(d => {
            if (d.inCalendar || this.eventsOutside) {
                d.events = this.eventsForDay(d, this.listTimes, this.repeatCovers);
            }
        });
        if (this.updateRows) {
            this.refreshRows();
        }
        if (this.updateColumns) {
            this.refreshColumns();
        }
        return this;
    }
    /**
     * Refreshes the [[CalendarEvent.row]] property as described in the link.
     */
    refreshRows() {
        let eventToRow = {};
        let onlyFullDay = this.listTimes;
        this.iterateDays().iterate(d => {
            if (d.dayOfWeek === 0) {
                eventToRow = {};
            }
            let used = {};
            for (let event of d.events) {
                if (onlyFullDay && !event.fullDay) {
                    continue;
                }
                if (event.id in eventToRow) {
                    used[event.row = eventToRow[event.id]] = true;
                }
            }
            let rowIndex = 0;
            for (let event of d.events) {
                if ((onlyFullDay && !event.fullDay) || event.id in eventToRow) {
                    continue;
                }
                while (used[rowIndex]) {
                    rowIndex++;
                }
                eventToRow[event.id] = event.row = rowIndex;
                rowIndex++;
            }
        });
        return this;
    }
    /**
     * Refreshes the [[CalendarEvent.col]] property as described in the link.
     */
    refreshColumns() {
        this.iterateDays().iterate(d => {
            let markers = [];
            for (let event of d.events) {
                if (!event.fullDay) {
                    markers.push({
                        time: event.time.start.time,
                        event: event,
                        start: true,
                        parent: null
                    });
                    markers.push({
                        time: event.time.end.time - 1,
                        event: event,
                        start: false,
                        parent: null
                    });
                }
            }
            markers.sort((a, b) => {
                return a.time - b.time;
            });
            let parent = null;
            for (let marker of markers) {
                if (marker.start) {
                    marker.parent = parent;
                    parent = marker;
                }
                else if (parent) {
                    parent = parent.parent;
                }
            }
            for (let marker of markers) {
                if (marker.start) {
                    marker.event.col = marker.parent ? marker.parent.event.col + 1 : 0;
                }
            }
        });
        return this;
    }
    /**
     * Gets the calendar day for the given day.
     *
     * @param input The day to get the calendar day for.
     * @returns The reference to the calendar day, or null if the given input
     *    is not on this calendar.
     */
    getDay(input) {
        let parsed = Day_Day.parse(input);
        if (parsed) {
            let dayCount = parsed.start().daysBetween(this.days[0], Op.DOWN, false);
            return this.days[dayCount];
        }
        return null;
    }
    /**
     * Iterates over all days in this calendar and passes each day to `iterator`.
     *
     * @param iterator The function to pass [[CalendarDay]]s to.
     */
    iterateDays() {
        return new Iterator_Iterator(iterator => {
            let days = this.days;
            for (let i = 0; i < days.length; i++) {
                switch (iterator.act(days[i])) {
                    case IteratorAction.Stop:
                        return;
                }
            }
        });
    }
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
    eventsForDay(day, getTimes = true, covers = true, sorter = this.eventSorter) {
        let events = [];
        let entries = this.visible;
        for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
            let entry = entries[entryIndex];
            let schedule = entry.schedule;
            let eventId = entryIndex * Constants.MAX_EVENTS_PER_DAY;
            let timeIndex = 0;
            schedule.iterateSpans(day, covers).iterate((span, iterator) => {
                events.push(new CalendarEvent_CalendarEvent(eventId + timeIndex++, entry, span, day));
                if (!getTimes) {
                    iterator.stop();
                }
            });
        }
        if (sorter) {
            events.sort(sorter);
        }
        return events;
    }
    /**
     * Finds the event given one of the ways to identify the event.
     *
     * @param input The value to use to search for an event.
     * @returns The refrence to the event or null if not found.
     */
    findEvent(id) {
        for (let event of this.events) {
            if (event === id || event.schedule === id || event.data === id || event.id === id) {
                return event;
            }
        }
        return null;
    }
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
    removeEvents(events = null, delayRefresh = false) {
        if (events) {
            for (let event of events) {
                this.removeEvent(event, true);
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
    }
    /**
     * Removes the given event if it exists on the calendar.
     *
     * @param event The event to remove if it exists.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the event is removed.
     * @see [[Calendar.refreshEvents]]
     */
    removeEvent(event, delayRefresh = false) {
        let found = this.findEvent(event);
        if (found) {
            this.events.splice(this.events.indexOf(found), 1);
            this.refreshVisible();
            if (!delayRefresh) {
                this.refreshEvents();
            }
        }
        return this;
    }
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
    addEvent(event, allowDuplicates = false, delayRefresh = false) {
        let parsed = Parse_Parse.event(event, this.parseData, this.parseMeta);
        if (!allowDuplicates) {
            let existing = this.findEvent(parsed);
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
    }
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
    addEvents(events, allowDuplicates = false, delayRefresh = false) {
        for (let event of events) {
            this.addEvent(event, allowDuplicates, true);
        }
        if (!delayRefresh) {
            this.refreshEvents();
        }
        return this;
    }
    /**
     * Sets the given events to this calendar replacing the current list of
     * events.
     *
     * @param events The events to set to the calendar.
     * @param delayRefresh When `true` the [[Calendar.refreshEvents]] will not be
     *    called after the events are added.
     * @see [[Calendar.refreshEvents]]
     */
    setEvents(events, delayRefresh = false) {
        const parsedEvents = [];
        for (let i = 0; i < events.length; i++) {
            let parsed = Parse_Parse.event(events[i], this.parseData, this.parseMeta);
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
    }
    /**
     * Sets the selection point or range of the calendar and updates the flags
     * in the days.
     *
     * @param start The start of the selection.
     * @param end The end of the selection.
     * @see [[Calendar.refreshSelection]]
     */
    select(start, end = start) {
        this.selection = new DaySpan_DaySpan(start, end);
        this.refreshSelection();
        return this;
    }
    /**
     * Sets the selection of the calendar to nothing.
     *
     * @see [[Calendar.refreshSelection]]
     */
    unselect() {
        this.selection = null;
        this.refreshSelection();
        return this;
    }
    /**
     * Shifts the calendar days by the given amount.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    move(jump = this.size, delayRefresh = false) {
        this.span.start = this.moveStart(this.start, jump);
        this.span.end = this.moveEnd(this.end, jump);
        if (!delayRefresh) {
            this.refresh();
        }
        return this;
    }
    /**
     * Moves the calenndar to the next set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    next(jump = this.size, delayRefresh = false) {
        return this.move(jump, delayRefresh);
    }
    /**
     * Moves the calenndar to the previous set of days.
     *
     * @param jump The amount to shift the calendar by.
     * @param delayRefresh When `true` [[Calendar.refresh]] will not be called
     *    after calendar is moved.
     */
    prev(jump = this.size, delayRefresh = false) {
        return this.move(-jump, delayRefresh);
    }
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
    toInput(plain = false, plainData = d => d, plainMeta = m => m) {
        let out = {};
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
        for (let event of this.events) {
            if (plain) {
                let plainEvent = {};
                if (Functions.isDefined(event.id)) {
                    plainEvent.id = event.id;
                }
                if (Functions.isDefined(event.data)) {
                    plainEvent.data = plainData(event.data);
                }
                if (!event.visible) {
                    plainEvent.visible = event.visible;
                }
                plainEvent.schedule = event.schedule.toInput();
                let meta = plainEvent.schedule.meta;
                if (meta) {
                    for (let identifier in meta) {
                        meta[identifier] = plainMeta(meta[identifier]);
                    }
                }
                out.events.push(plainEvent);
            }
            else {
                out.events.push(event);
            }
        }
        return out;
    }
    /**
     * Creates a calendar based on the given input.
     *
     * @param input The input which has at least the `type` specified.
     * @returns A new calendar instance.
     */
    static fromInput(input) {
        let initial = Day_Day.today();
        return new Calendar_Calendar(initial, initial, null, 1, null, null, input);
    }
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
    static forType(type, size = 1, around = Day_Day.today(), focus = 0.49999, input) {
        let meta = this.TYPES[type];
        let start = meta.getStart(around, size, focus);
        let end = meta.getEnd(start, size, focus);
        return new Calendar_Calendar(start, end, type, size, meta.moveStart, meta.moveEnd, input || meta.defaultInput);
    }
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
    static days(days = 1, around = Day_Day.today(), focus = 0.4999, input) {
        return this.forType(Units.DAY, days, around, focus, input);
    }
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
    static weeks(weeks = 1, around = Day_Day.today(), focus = 0.4999, input) {
        return this.forType(Units.WEEK, weeks, around, focus, input);
    }
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
    static months(months = 1, around = Day_Day.today(), focus = 0.4999, input) {
        return this.forType(Units.MONTH, months, around, focus, input);
    }
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
    static years(years = 1, around = Day_Day.today(), focus = 0.4999, input) {
        return this.forType(Units.YEAR, years, around, focus, input);
    }
}
/**
 * A map of functions and properties by [[Units]] used to create or morph
 * Calendars.
 */
Calendar_Calendar.TYPES = {
    [Units.DAY]: {
        getStart(around, size, focus) {
            return around.start().relativeDays(-Math.floor(size * focus));
        },
        getEnd(start, size, focus) {
            return start.relativeDays(size - 1).end();
        },
        moveStart(day, amount) {
            return day.relativeDays(amount);
        },
        moveEnd(day, amount) {
            return day.relativeDays(amount);
        },
        defaultInput: undefined
    },
    [Units.WEEK]: {
        getStart(around, size, focus) {
            return around.start().startOfWeek().relativeWeeks(-Math.floor(size * focus));
        },
        getEnd(start, size, focus) {
            return start.relativeWeeks(size - 1).endOfWeek();
        },
        moveStart(day, amount) {
            return day.relativeWeeks(amount);
        },
        moveEnd(day, amount) {
            return day.relativeWeeks(amount);
        },
        defaultInput: undefined
    },
    [Units.MONTH]: {
        getStart(around, size, focus) {
            return around.start().startOfMonth().relativeMonths(-Math.floor(size * focus));
        },
        getEnd(start, size, focus) {
            return start.relativeMonths(size - 1).endOfMonth();
        },
        moveStart(day, amount) {
            return day.relativeMonths(amount);
        },
        moveEnd(day, amount) {
            return day.startOfMonth().relativeMonths(amount).endOfMonth();
        },
        defaultInput: { fill: true }
    },
    [Units.YEAR]: {
        getStart(around, size, focus) {
            return around.start().startOfYear().relativeYears(-Math.floor(size * focus));
        },
        getEnd(start, size, focus) {
            return start.relativeYears(size - 1).endOfYear();
        },
        moveStart(day, amount) {
            return day.relativeYears(amount);
        },
        moveEnd(day, amount) {
            return day.relativeYears(amount);
        },
        defaultInput: { fill: true }
    }
};

// CONCATENATED MODULE: ./src/Month.ts

/**
 * The months in a year.
 */
class Month {
}
Month.JANUARY = 0;
Month.FEBRUARY = 1;
Month.MARCH = 2;
Month.APRIL = 3;
Month.MAY = 4;
Month.JUNE = 5;
Month.JULY = 6;
Month.AUGUST = 7;
Month.SEPTEMBER = 8;
Month.OCTOBER = 9;
Month.NOVEMBER = 10;
Month.DECEMBER = 11;
/**
 * The full list of months in a year.
 */
Month.LIST = [
    Month.JANUARY,
    Month.FEBRUARY,
    Month.MARCH,
    Month.APRIL,
    Month.MAY,
    Month.JUNE,
    Month.JULY,
    Month.AUGUST,
    Month.SEPTEMBER,
    Month.OCTOBER,
    Month.NOVEMBER,
    Month.DECEMBER
];

// CONCATENATED MODULE: ./src/Weekday.ts

/**
 * The days in a week.
 */
class Weekday {
}
Weekday.SUNDAY = 0;
Weekday.MONDAY = 1;
Weekday.TUESDAY = 2;
Weekday.WEDNESDAY = 3;
Weekday.THURSDAY = 4;
Weekday.FRIDAY = 5;
Weekday.SATURDAY = 6;
/**
 * The full list of days in a week.
 */
Weekday.LIST = [
    Weekday.SUNDAY,
    Weekday.MONDAY,
    Weekday.TUESDAY,
    Weekday.WEDNESDAY,
    Weekday.THURSDAY,
    Weekday.FRIDAY,
    Weekday.SATURDAY
];
/**
 * The list of days starting with Monday and ending on Friday.
 */
Weekday.WEEK = [
    Weekday.MONDAY,
    Weekday.TUESDAY,
    Weekday.WEDNESDAY,
    Weekday.THURSDAY,
    Weekday.FRIDAY
];
/**
 * The days on the weekend, starting with Saturday and ending with Sunday.
 */
Weekday.ENDS = [
    Weekday.SATURDAY,
    Weekday.SUNDAY
];

// CONCATENATED MODULE: ./src/Pattern.ts





/**
 * A class which helps describe [[ScheduleInput]] if it matches a pattern.
 */
class Pattern_Pattern {
    /**
     * Creates a new pattern.
     *
     * @param name The unique name of the pattern.
     * @param listed If the pattern is "listed" [[Pattern.listed]].
     * @param describe A function to describe the pattern given a [[Day]].
     * @param rules The rules which describe how to detect and apply the pattern
     *    to schedule input.
     */
    constructor(name, listed, describe, rules) {
        this.name = name;
        this.listed = listed;
        this.describe = describe;
        this.rules = rules;
    }
    /**
     * Applies this pattern to a [[Schedule]] or [[ScheduleInput]] removing and
     * adding any necessary properties from the input to match this pattern -
     * based around the day provided.
     *
     * @param schedule The schedule to update to match this pattern.
     * @param day The day to base the schedule on.
     * @returns The reference to the input passed in.
     */
    apply(schedule, day) {
        if (schedule instanceof Schedule_Schedule) {
            this.applyGeneric(day, (prop, frequency) => schedule.setFrequency(prop, frequency), (prop) => schedule.setFrequency(prop));
            schedule.updateChecks();
        }
        else {
            this.applyGeneric(day, (prop, frequency) => schedule[prop] = frequency, (prop) => delete schedule[prop]);
        }
        return schedule;
    }
    /**
     * Applies this pattern to any object provided they implement the
     * `setFrequency` and `removeFrequency` functions.
     *
     * @param day The day to base the schedule on.
     * @param setFrequency The function which sets the frequency on the object.
     * @param removeFrequency The function to remove a frequency from the object.
     */
    applyGeneric(day, setFrequency, removeFrequency) {
        for (let prop of Pattern_Pattern.PROPS) {
            let rule = this.rules[prop];
            // Should have one value
            if (rule === 1) {
                setFrequency(prop, [day[prop]]);
            }
            // Can be any of the values in the array
            if (Functions.isArray(rule)) {
                setFrequency(prop, rule);
            }
            // Must not be present
            if (!Functions.isDefined(rule)) {
                removeFrequency(prop);
            }
        }
    }
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
    isMatch(schedule, exactlyWith) {
        if (schedule instanceof Schedule_Schedule) {
            return this.isMatchGeneric((prop) => schedule[prop].input, exactlyWith);
        }
        else {
            return this.isMatchGeneric((prop) => schedule[prop], exactlyWith);
        }
    }
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
    isMatchGeneric(getFrequency, exactlyWith) {
        let exactly = Functions.isDefined(exactlyWith);
        for (let prop of Pattern_Pattern.PROPS) {
            let rule = this.rules[prop];
            let curr = getFrequency(prop);
            // Optional, skip it
            if (rule === false) {
                continue;
            }
            // Requires any value
            if (rule === true && !curr) {
                return false;
            }
            // Must not be present
            if (!Functions.isDefined(rule) && curr) {
                return false;
            }
            // Must be an array of the same size
            if (Functions.isNumber(rule)) {
                if (Functions.isArray(curr) && curr.length === rule) {
                    if (exactly && curr.indexOf(exactlyWith[prop]) === -1) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            // Must be an array of the same values
            if (Functions.isArray(rule)) {
                if (!Functions.isArray(curr)) {
                    return false;
                }
                if (rule.length !== curr.length) {
                    return false;
                }
                for (var i = 0; i < rule.length; i++) {
                    if (rule[i] !== curr[i]) {
                        return false;
                    }
                }
                if (exactly && rule.indexOf(exactlyWith[prop]) === -1) {
                    return false;
                }
            }
            // Must be an object with same over & offset.
            if (Functions.isObject(rule)) {
                if (!Functions.isObject(curr)) {
                    return false;
                }
                var ruleOffset = rule.offset || 0;
                var currOffset = curr.offset || 0;
                if (currOffset !== ruleOffset || curr.every !== rule.every) {
                    return false;
                }
                if (exactly && (exactlyWith[prop] % rule.every) !== ruleOffset) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Returns the pattern with the given name if one exists. If you add your own
     * patterns make sure to add them to [[PatternMap]].
     *
     * @param name The name of the pattern to return.
     * @return The instance to the pattern with the same name.
     */
    static withName(name) {
        return PatternMap[name];
    }
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
    static findMatch(input, listedOnly = true, exactlyWith) {
        for (let pattern of Patterns) {
            if ((pattern.listed || !listedOnly) && pattern.isMatch(input, exactlyWith)) {
                return pattern;
            }
        }
        return null;
    }
}
/**
 * The properties in the [[ScheduleInput]] which are compared against the
 * rules of a pattern.
 */
Pattern_Pattern.PROPS = [
    'dayOfWeek', 'dayOfMonth', 'lastDayOfMonth', 'dayOfYear',
    'month', 'week', 'year',
    'weekOfYear', 'weekspanOfYear', 'fullWeekOfYear', 'lastWeekspanOfYear', 'lastFullWeekOfYear',
    'weekOfMonth', 'weekspanOfMonth', 'fullWeekOfMonth', 'lastWeekspanOfMonth', 'lastFullWeekOfMonth'
];
/**
 * The list of patterns that can be searched through for matches to schedule
 * input.
 *
 * @see [[Pattern.findMatch]]
 */
let Patterns = [
    new Pattern_Pattern('none', true, (day) => 'Does not repeat', {
        year: 1,
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern_Pattern('daily', true, (day) => 'Daily', {}),
    new Pattern_Pattern('weekly', true, (day) => 'Weekly on ' + day.format('dddd'), {
        dayOfWeek: 1
    }),
    new Pattern_Pattern('monthlyWeek', true, (day) => 'Monthly on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd'), {
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern_Pattern('annually', true, (day) => 'Annually on ' + day.format('MMMM Do'), {
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern_Pattern('annuallyMonthWeek', true, (day) => 'Annually on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'), {
        month: 1,
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern_Pattern('weekday', true, (day) => 'Every weekday (Monday to Friday)', {
        dayOfWeek: [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY]
    }),
    new Pattern_Pattern('monthly', true, (day) => 'Monthly on the ' + day.format('Do') + ' day', {
        dayOfMonth: 1
    }),
    new Pattern_Pattern('custom', true, (day) => 'Custom...', {
        dayOfWeek: false,
        dayOfMonth: false,
        lastDayOfMonth: false,
        dayOfYear: false,
        year: false,
        month: false,
        week: false,
        weekOfYear: false,
        weekspanOfYear: false,
        fullWeekOfYear: false,
        lastWeekspanOfYear: false,
        lastFullWeekOfYear: false,
        weekOfMonth: false,
        weekspanOfMonth: false,
        fullWeekOfMonth: false,
        lastWeekspanOfMonth: false,
        lastFullWeekOfMonth: false
    })
];
/**
 * The map of patterns keyed by their name.
 *
 * @see [[Pattern.withName]]
 */
let PatternMap = {};
for (let pattern of Patterns) {
    PatternMap[pattern.name] = pattern;
}

// CONCATENATED MODULE: ./src/Sort.ts

/**
 * A class with [[SortEvent]] functions and functions which accept other
 * [[SortEvent]]s and return a new [[SortEvent]].
 *
 * ```typescript
 * // Sorts full day events first, then events in descending order based on start time.
 * Sorts.List([Sorts.FullDay, Sorts.Desc(Sorts.Start)]);
 * ```
 */
class Sorts {
    /**
     * Sorts the two events by their start time - the earliest event being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the start of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    static Start(a, b) {
        return a.time.start.time - b.time.start.time;
    }
    /**
     * Sorts the two events by their end time - the earliest to end being first
     * in order.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in time between the end of `a` and `b`.
     * @see [[CalendarEvent.time]]
     */
    static End(a, b) {
        return a.time.end.time - b.time.end.time;
    }
    /**
     * Sorts the two events placing the full day events before the timed events.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns If both are timed or both are full day then `0` is returned,
     *    otherwise `-1` is returned if `a` is full day and `1` is returned if
     *    `b` is full day.
     * @see [[CalendarEvent.fullDay]]
     */
    static FullDay(a, b) {
        let af = a.fullDay ? 0 : 1;
        let bf = b.fullDay ? 0 : 1;
        return af - bf;
    }
    /**
     * Sorts the two events placing the shorter events before the longer events.
     * Full day or multiple day events actually take up a day and will be ordered
     * last.
     *
     * @param a The first event.
     * @param b The second event.
     * @returns The difference in milliseconds between `a` and `b`.
     * @see [[CalendarEvent.time]]
     * @see [[DaySpan.millis]]
     */
    static Duration(a, b) {
        return a.time.millis() - b.time.millis();
    }
    /**
     * Returns a [[SortEvent]] that effectively orders the given sorter in the
     * opposite (often descending) order.
     *
     * @param sorter The sorter to reverse.
     * @returns A new sorter which reverses the one passed in.
     */
    static Desc(sorter) {
        return (a, b) => {
            return sorter(b, a);
        };
    }
    /**
     * Returns a [[SortEvent]] that orders the events based on a string in each
     * event. A function must be supplied which takes an event of type `T` and
     * returns a string.
     *
     * @param getString A function which returns a string from the event.
     * @returns A sorter which sorts strings alphabetically.
     */
    static Alphabetical(getString) {
        return (a, b) => {
            let as = getString(a.event) || '';
            let bs = getString(b.event) || '';
            return as.localeCompare(bs);
        };
    }
    /**
     * Returns a [[SortEvent]] that orders events based on a number in each event.
     * A function must be supplied which takes an event of type `T` and returns
     * a number.
     *
     * @param getOrder A function which returns a number from the event.
     * @returns A sorter which sorts events based on a number in ascending order.
     */
    static Ordered(getOrder) {
        return (a, b) => {
            let ao = getOrder(a.event);
            let bo = getOrder(b.event);
            return ao - bo;
        };
    }
    /**
     * Returns a [[SortEvent]] that orders events based on an array of sorters.
     * The first sorter which returns a non-zero result is used.
     *
     * @param sorters A list of sorting functions to test one at a time.
     * @returns A sorter which sorts based on a list of sorters.
     */
    static List(sorters) {
        return (a, b) => {
            for (let sorter of sorters) {
                let compare = sorter(a, b);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        };
    }
}

// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar_Calendar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarDay", function() { return CalendarDay_CalendarDay; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CalendarEvent", function() { return CalendarEvent_CalendarEvent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Day", function() { return Day_Day; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DaySpan", function() { return DaySpan_DaySpan; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Identifier", function() { return Identifier_Identifier; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "IteratorAction", function() { return IteratorAction; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Iterator", function() { return Iterator_Iterator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Month", function() { return Month; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Op", function() { return Op; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "operate", function() { return operate; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Pattern", function() { return Pattern_Pattern; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Patterns", function() { return Patterns; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PatternMap", function() { return PatternMap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Schedule", function() { return Schedule_Schedule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScheduleModifier", function() { return ScheduleModifier_ScheduleModifier; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Sorts", function() { return Sorts; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Suffix", function() { return Suffix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Time", function() { return Time_Time; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Units", function() { return Units; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Weekday", function() { return Weekday; });
























/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map