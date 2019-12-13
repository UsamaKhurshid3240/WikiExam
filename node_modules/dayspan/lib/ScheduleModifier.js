"use strict";
import { Functions as fn } from './Functions';
import { Identifier } from './Identifier';
import { Iterator, IteratorAction } from './Iterator';
/**
 * A class that can modify the events of a schedule by storing [[Identifier]]s
 * and an associated value.
 *
 * @typeparam T The type of data that modifies the schedule.
 */
var ScheduleModifier = (function () {
    /**
     * Creates a new schedule modifier.
     */
    function ScheduleModifier() {
        this.map = {};
    }
    /**
     * Clears the modifier of all modifications.
     */
    ScheduleModifier.prototype.clear = function () {
        this.map = {};
        return this;
    };
    /**
     * Returns `true` if this modifier lacks any modifications, otherwise `false`.
     */
    ScheduleModifier.prototype.isEmpty = function () {
        // @ts-ignore
        for (var id in this.map) {
            return !id;
        }
        return true;
    };
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
    ScheduleModifier.prototype.get = function (day, otherwise, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        var map = this.map;
        return (lookAtTime && map[day.timeIdentifier]) ||
            map[day.dayIdentifier] ||
            map[day.monthIdentifier] ||
            map[day.weekIdentifier] ||
            map[day.quarterIdentifier] ||
            otherwise;
    };
    /**
     * Gets the most specific identifier type for the span over the given day.
     * If the day does not have a modification, `null` is returned.
     *
     * @param day The day to get the type for.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific identifier for the given day, otherwise `null`.
     */
    ScheduleModifier.prototype.getIdentifier = function (day, lookAtTime) {
        if (lookAtTime === void 0) { lookAtTime = true; }
        var map = this.map;
        if (lookAtTime && fn.isDefined(map[day.timeIdentifier]))
            return Identifier.Time;
        if (fn.isDefined(map[day.dayIdentifier]))
            return Identifier.Day;
        if (fn.isDefined(map[day.monthIdentifier]))
            return Identifier.Month;
        if (fn.isDefined(map[day.weekIdentifier]))
            return Identifier.Week;
        if (fn.isDefined(map[day.quarterIdentifier]))
            return Identifier.Quarter;
        if (fn.isDefined(map[day.year]))
            return Identifier.Year;
        return null;
    };
    /**
     * Gets all values in this modifier for the given day. If none exist, an empty
     * array is returned. The values returned in the array are returned in most
     * specific to least specific.
     *
     * @param day The day to get the values for.
     * @returns An array of values (modifications) for the given day.
     */
    ScheduleModifier.prototype.getAll = function (day) {
        var map = this.map;
        var all = [];
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
    };
    /**
     * Moves the value/modification from one identifier to another.
     *
     * @param from The day to take the identifier from.
     * @param fromType The identifier type.
     * @param to The day to move the value to.
     * @param toType The identifier type to move the value to.
     */
    ScheduleModifier.prototype.move = function (from, fromType, to, toType) {
        var fromIdentifier = fromType.get(from);
        var toIdentifier = toType.get(to);
        this.map[toIdentifier] = this.map[fromIdentifier];
        delete this.map[fromIdentifier];
        return this;
    };
    /**
     * Moves any identifiers with the matching time `fromTime` to `toTime` and
     * returns the number of moves.
     *
     * @param fromTime The time to move from.
     * @param toTime The time to move to.
     * @returns The number of modifiers moved.
     */
    ScheduleModifier.prototype.moveTime = function (fromTime, toTime) {
        var type = Identifier.Time;
        var moveIds = [];
        this.iterate().iterate(function (_a) {
            var id = _a[0], value = _a[1];
            if (type.is(id)) {
                var start = type.start(id);
                if (start.sameTime(fromTime)) {
                    moveIds.push(id);
                }
            }
        });
        var moved = 0;
        for (var _i = 0, moveIds_1 = moveIds; _i < moveIds_1.length; _i++) {
            var id = moveIds_1[_i];
            var value = this.map[id];
            var start = type.start(id);
            var newStart = start.withTime(toTime);
            var newId = type.get(newStart);
            if (!this.map[newId]) {
                this.map[newId] = value;
                delete this.map[id];
                moved++;
            }
        }
        return moved;
    };
    /**
     * Removes any identifiers and modifications that are at the given time.
     *
     * @param time The time to remove.
     * @returns The number of modifiers removed.
     */
    ScheduleModifier.prototype.removeTime = function (time) {
        var type = Identifier.Time;
        var removed = 0;
        this.iterate().iterate(function (_a, iterator) {
            var id = _a[0];
            if (type.is(id)) {
                var start = type.start(id);
                if (start.sameTime(time)) {
                    iterator.remove();
                    removed++;
                }
            }
        });
        return removed;
    };
    /**
     * Sets the value/modification in this map given a day, the value, and the
     * identifier type.
     *
     * @param day The day to take an identifier from.
     * @param value The value/modification to set.
     * @param type The identifier type.
     */
    ScheduleModifier.prototype.set = function (day, value, type) {
        this.map[type.get(day)] = value;
        return this;
    };
    /**
     * Removes the value/modification from this modifier based on the identifier
     * pulled from the day.
     *
     * @param day The day to take an identifier from.
     * @param type The identifier type.
     */
    ScheduleModifier.prototype.unset = function (day, type) {
        delete this.map[type.get(day)];
        return this;
    };
    /**
     * Iterates through the modifiers passing the identifier and the related value.
     *
     * @returns A new instance of an [[Iterator]].
     */
    ScheduleModifier.prototype.iterate = function () {
        var _this = this;
        return new Iterator(function (iterator) {
            var map = _this.map;
            for (var rawId in map) {
                var asNumber = parseInt(rawId);
                var validAsNumber = asNumber + '' === rawId;
                var id = validAsNumber ? asNumber : rawId;
                switch (iterator.act([id, map[rawId]])) {
                    case IteratorAction.Stop:
                        return;
                    case IteratorAction.Remove:
                        delete map[rawId];
                        break;
                }
            }
        });
    };
    /**
     * Queries the modifier for all values/modifications which fall in the time
     * span that the given identifier represents. All identifiers and their value
     * are passed to the given callback.
     *
     * @param prefix The identifier
     * @returns A new instance of an [[Iterator]].
     */
    ScheduleModifier.prototype.query = function (query) {
        return this.iterate()
            .filter(function (_a) {
            var id = _a[0], value = _a[1];
            return Identifier.contains(query, id);
        });
        ;
    };
    /**
     * Returns all identifiers stored in this modifier.
     */
    ScheduleModifier.prototype.identifiers = function (filter) {
        return this.iterate()
            .filter(function (_a) {
            var id = _a[0], value = _a[1];
            return !filter || filter(value, id);
        })
            .map(function (_a) {
            var id = _a[0];
            return id;
        });
    };
    /**
     * Builds a list of spans and the associated values. The spans are calculated
     * from the identiier key via [[Identifier.span]].
     *
     * @param endInclusive If the end date in the spans should be the last
     *    millisecond of the timespan or the first millisecond of the next.
     * @returns An array of spans calculated from the identifiers with the
     *    associated values/modifications.
     */
    ScheduleModifier.prototype.spans = function (endInclusive) {
        if (endInclusive === void 0) { endInclusive = false; }
        return this.iterate()
            .map(function (_a) {
            var id = _a[0], value = _a[1];
            var type = Identifier.find(id);
            if (type) {
                var span = type.span(id, endInclusive);
                return { span: span, value: value };
            }
        });
    };
    /**
     * Builds a list of the descriptions of the identifiers in this modifier.
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built list of descriptions.
     */
    ScheduleModifier.prototype.describe = function (short) {
        if (short === void 0) { short = false; }
        return this.iterate()
            .map(function (_a) {
            var id = _a[0];
            var type = Identifier.find(id);
            if (type) {
                return type.describe(id, short);
            }
        });
    };
    /**
     * Builds a map of the values/modifications keyed by the descripton of the
     * identifier computed via [[Identifier.describe]].
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built map of description to values/modifications.
     */
    ScheduleModifier.prototype.describeMap = function (short) {
        if (short === void 0) { short = false; }
        var map = this.map;
        var out = {};
        for (var id in map) {
            var type = Identifier.find(id);
            if (type) {
                out[type.describe(id, short)] = map[id];
            }
        }
        return out;
    };
    return ScheduleModifier;
}());
export { ScheduleModifier };
//# sourceMappingURL=ScheduleModifier.js.map