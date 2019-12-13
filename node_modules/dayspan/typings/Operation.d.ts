/**
 * An operation that can be performed on a single number.
 */
export declare enum Op {
    /**
     * The number is returned unmodified.
     */
    NONE = 0,
    /**
     * The number is rounded down to the nearest whole number.
     */
    FLOOR = 1,
    /**
     * The number is rounded up to the nearest whole number.
     */
    CEIL = 2,
    /**
     * The number is rounded up or down depending on if the fractional value is
     * greater than or less than 0.5 respectively.
     */
    ROUND = 3,
    /**
     * The fractional part of the number is dropped.
     */
    TRUNCATE = 4,
    /**
     * The number is rounded up when positive and down when negative. This is
     * effectively ceiling the absolute value where the result preserves the sign.
     */
    UP = 5,
    /**
     * The number is rounded down when positive and up when negative. This is
     * effectively floor the absolute value where the result preserves the sign.
     */
    DOWN = 6,
}
/**
 * Performs the requested operation on the given number, optionally taking
 * the absolute value of the number before the operation.
 *
 * @param value The number to operate on.
 * @param op The operation to perform.
 * @param absolute If the number should be positive before the operation.
 * @return The operated result, or the original value if its not a valid number.
 */
export declare function operate(value: number, op: Op, absolute?: boolean): number;
