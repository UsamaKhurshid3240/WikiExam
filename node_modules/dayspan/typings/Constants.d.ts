/**
 * A class that stores commonly used values.
 */
export declare class Constants {
    /**
     * The number of milliseconds in a second.
     */
    static MILLIS_IN_SECOND: number;
    /**
     * The number of milliseconds in a minute.
     */
    static MILLIS_IN_MINUTE: number;
    /**
     * The number of milliseconds in an hour.
     */
    static MILLIS_IN_HOUR: number;
    /**
     * The number of milliseconds in a day (not including DST days).
     */
    static MILLIS_IN_DAY: number;
    /**
     * The number of milliseconds in a week (not including ones that include DST).
     */
    static MILLIS_IN_WEEK: number;
    /**
     * The number of minutes in an hour.
     */
    static MINUTES_IN_HOUR: number;
    /**
     * The number of minutes in a day (not including DST days).
     */
    static MINUTES_IN_DAY: number;
    /**
     * The number of days in a week.
     */
    static DAYS_IN_WEEK: number;
    /**
     * The number of months in a year.
     */
    static MONTHS_IN_YEAR: number;
    /**
     * The number of hours in a day (not including DST days).
     */
    static HOURS_IN_DAY: number;
    /**
     * The first month of the year.
     */
    static MONTH_MIN: number;
    /**
     * The last month of the year.
     */
    static MONTH_MAX: number;
    /**
     * The first day of a month.
     */
    static DAY_MIN: number;
    /**
     * The last day of the longest month.
     */
    static DAY_MAX: number;
    /**
     * The first hour of the day.
     */
    static HOUR_MIN: number;
    /**
     * The last hour of the day.
     */
    static HOUR_MAX: number;
    /**
     * The first minute of the hour.
     */
    static MINUTE_MIN: number;
    /**
     * The last minute of the hour.
     */
    static MINUTE_MAX: number;
    /**
     * The first second of the minute.
     */
    static SECOND_MIN: number;
    /**
     * The last second of the minute.
     */
    static SECOND_MAX: number;
    /**
     * The first millisecond of the second.
     */
    static MILLIS_MIN: number;
    /**
     * The last millisecond of the second.
     */
    static MILLIS_MAX: number;
    /**
     * The first day of the week.
     */
    static WEEKDAY_MIN: number;
    /**
     * The last day of the week.
     */
    static WEEKDAY_MAX: number;
    /**
     * The default duration for an event.
     */
    static DURATION_DEFAULT: number;
    /**
     * The default duration unit for an all day event.
     */
    static DURATION_DEFAULT_UNIT_ALL: string;
    /**
     * The default duration unit for an event at a given time.
     */
    static DURATION_DEFAULT_UNIT_TIMES: string;
    /**
     * Computes the duration unit given its for an all day event.
     *
     * @param all If the event is all day.
     * @return The default unit for the event.
     */
    static DURATION_DEFAULT_UNIT: (all: boolean) => string;
    /**
     * The number of milliseconds for various duration units. These are worse case
     * scenario and do not include DST changes.
     */
    static DURATION_TO_MILLIS: {
        minute: number;
        minutes: number;
        hour: number;
        hours: number;
        day: number;
        days: number;
        week: number;
        weeks: number;
        month: number;
        months: number;
    };
    /**
     * The maximum estimated number of events per day. This is used to calculate
     * [[CalendarEvent.id]] to give each event a unique ID. If you think you will
     * have more events than this per day, you can enlarge the value.
     */
    static MAX_EVENTS_PER_DAY: number;
    /**
     * The day of the week which determines the first week of the year or month.
     * By default this day is Thursday.
     */
    static WEEK_OF_MONTH_MINIMUM_WEEKDAY: number;
}
