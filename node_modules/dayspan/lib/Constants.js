"use strict";
/**
 * A class that stores commonly used values.
 */
var Constants = (function () {
    function Constants() {
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
    Constants.DURATION_DEFAULT_UNIT = function (all) { return all ? Constants.DURATION_DEFAULT_UNIT_ALL :
        Constants.DURATION_DEFAULT_UNIT_TIMES; };
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
    return Constants;
}());
export { Constants };
//# sourceMappingURL=Constants.js.map