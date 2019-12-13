"use strict";
import { Functions as fn } from './Functions';
import { Suffix } from './Suffix';
import { Weekday } from './Weekday';
import { Schedule } from './Schedule';
/**
 * A class which helps describe [[ScheduleInput]] if it matches a pattern.
 */
export class Pattern {
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
        if (schedule instanceof Schedule) {
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
        for (let prop of Pattern.PROPS) {
            let rule = this.rules[prop];
            // Should have one value
            if (rule === 1) {
                setFrequency(prop, [day[prop]]);
            }
            // Can be any of the values in the array
            if (fn.isArray(rule)) {
                setFrequency(prop, rule);
            }
            // Must not be present
            if (!fn.isDefined(rule)) {
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
        if (schedule instanceof Schedule) {
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
        let exactly = fn.isDefined(exactlyWith);
        for (let prop of Pattern.PROPS) {
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
            if (!fn.isDefined(rule) && curr) {
                return false;
            }
            // Must be an array of the same size
            if (fn.isNumber(rule)) {
                if (fn.isArray(curr) && curr.length === rule) {
                    if (exactly && curr.indexOf(exactlyWith[prop]) === -1) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            // Must be an array of the same values
            if (fn.isArray(rule)) {
                if (!fn.isArray(curr)) {
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
            if (fn.isObject(rule)) {
                if (!fn.isObject(curr)) {
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
Pattern.PROPS = [
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
export let Patterns = [
    new Pattern('none', true, (day) => 'Does not repeat', {
        year: 1,
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern('daily', true, (day) => 'Daily', {}),
    new Pattern('weekly', true, (day) => 'Weekly on ' + day.format('dddd'), {
        dayOfWeek: 1
    }),
    new Pattern('monthlyWeek', true, (day) => 'Monthly on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd'), {
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern('annually', true, (day) => 'Annually on ' + day.format('MMMM Do'), {
        month: 1,
        dayOfMonth: 1
    }),
    new Pattern('annuallyMonthWeek', true, (day) => 'Annually on the ' + Suffix.CACHE[day.weekspanOfMonth + 1] + ' ' + day.format('dddd') + ' of ' + day.format('MMMM'), {
        month: 1,
        dayOfWeek: 1,
        weekspanOfMonth: 1
    }),
    new Pattern('weekday', true, (day) => 'Every weekday (Monday to Friday)', {
        dayOfWeek: [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY, Weekday.FRIDAY]
    }),
    new Pattern('monthly', true, (day) => 'Monthly on the ' + day.format('Do') + ' day', {
        dayOfMonth: 1
    }),
    new Pattern('custom', true, (day) => 'Custom...', {
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
export let PatternMap = {};
for (let pattern of Patterns) {
    PatternMap[pattern.name] = pattern;
}
//# sourceMappingURL=Pattern.js.map