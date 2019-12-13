import { Identifier, IdentifierInput } from './Identifier';
import { Day } from './Day';
import { Time } from './Time';
import { DaySpan } from './DaySpan';
import { Iterator } from './Iterator';
/**
 * A map of values in the [[ScheduleModifier]] keyed by the descriptions of the
 * identifiers.
 */
export interface ScheduleModifierDescription<T> {
    [description: string]: T;
}
/**
 * An object which carries the span taken from an identifier and the value
 * mapped to it in a [[ScheduleModifier]].
 */
export interface ScheduleModifierSpan<T> {
    span: DaySpan;
    value: T;
}
/**
 * A class that can modify the events of a schedule by storing [[Identifier]]s
 * and an associated value.
 *
 * @typeparam T The type of data that modifies the schedule.
 */
export declare class ScheduleModifier<T> {
    /**
     * The map of values mapped by their [[Identifier]]s.
     */
    map: {
        [id: string]: T;
    };
    /**
     * Creates a new schedule modifier.
     */
    constructor();
    /**
     * Clears the modifier of all modifications.
     */
    clear(): this;
    /**
     * Returns `true` if this modifier lacks any modifications, otherwise `false`.
     */
    isEmpty(): boolean;
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
    get(day: Day, otherwise: T, lookAtTime?: boolean): T;
    /**
     * Gets the most specific identifier type for the span over the given day.
     * If the day does not have a modification, `null` is returned.
     *
     * @param day The day to get the type for.
     * @param lookAtTime If the specific time of the given day should be looked at.
     * @returns The most specific identifier for the given day, otherwise `null`.
     */
    getIdentifier(day: Day, lookAtTime?: boolean): Identifier;
    /**
     * Gets all values in this modifier for the given day. If none exist, an empty
     * array is returned. The values returned in the array are returned in most
     * specific to least specific.
     *
     * @param day The day to get the values for.
     * @returns An array of values (modifications) for the given day.
     */
    getAll(day: Day): T[];
    /**
     * Moves the value/modification from one identifier to another.
     *
     * @param from The day to take the identifier from.
     * @param fromType The identifier type.
     * @param to The day to move the value to.
     * @param toType The identifier type to move the value to.
     */
    move(from: Day, fromType: Identifier, to: Day, toType: Identifier): this;
    /**
     * Moves any identifiers with the matching time `fromTime` to `toTime` and
     * returns the number of moves.
     *
     * @param fromTime The time to move from.
     * @param toTime The time to move to.
     * @returns The number of modifiers moved.
     */
    moveTime(fromTime: Time, toTime: Time): number;
    /**
     * Removes any identifiers and modifications that are at the given time.
     *
     * @param time The time to remove.
     * @returns The number of modifiers removed.
     */
    removeTime(time: Time): number;
    /**
     * Sets the value/modification in this map given a day, the value, and the
     * identifier type.
     *
     * @param day The day to take an identifier from.
     * @param value The value/modification to set.
     * @param type The identifier type.
     */
    set(day: Day, value: T, type: Identifier): this;
    /**
     * Removes the value/modification from this modifier based on the identifier
     * pulled from the day.
     *
     * @param day The day to take an identifier from.
     * @param type The identifier type.
     */
    unset(day: Day, type: Identifier): this;
    /**
     * Iterates through the modifiers passing the identifier and the related value.
     *
     * @returns A new instance of an [[Iterator]].
     */
    iterate(): Iterator<[IdentifierInput, T]>;
    /**
     * Queries the modifier for all values/modifications which fall in the time
     * span that the given identifier represents. All identifiers and their value
     * are passed to the given callback.
     *
     * @param prefix The identifier
     * @returns A new instance of an [[Iterator]].
     */
    query(query: IdentifierInput): Iterator<[IdentifierInput, T]>;
    /**
     * Returns all identifiers stored in this modifier.
     */
    identifiers(filter?: (value: T, id: IdentifierInput) => boolean): Iterator<IdentifierInput>;
    /**
     * Builds a list of spans and the associated values. The spans are calculated
     * from the identiier key via [[Identifier.span]].
     *
     * @param endInclusive If the end date in the spans should be the last
     *    millisecond of the timespan or the first millisecond of the next.
     * @returns An array of spans calculated from the identifiers with the
     *    associated values/modifications.
     */
    spans(endInclusive?: boolean): Iterator<ScheduleModifierSpan<T>>;
    /**
     * Builds a list of the descriptions of the identifiers in this modifier.
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built list of descriptions.
     */
    describe(short?: boolean): Iterator<string>;
    /**
     * Builds a map of the values/modifications keyed by the descripton of the
     * identifier computed via [[Identifier.describe]].
     *
     * @param short If the description should use shorter language or longer.
     * @returns The built map of description to values/modifications.
     */
    describeMap(short?: boolean): ScheduleModifierDescription<T>;
}
