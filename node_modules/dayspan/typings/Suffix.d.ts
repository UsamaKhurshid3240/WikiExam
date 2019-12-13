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
export declare class Suffix {
    /**
     * The array of suffixes used.
     */
    static MAP: string[];
    /**
     * An internal cache of [[Suffix._CACHE_SIZE]] suffixes.
     */
    private static _CACHE;
    /**
     * The number of values to store in the cache (inclusive).
     */
    private static _CACHE_SIZE;
    /**
     * The cache of number & suffix pairs.
     */
    static readonly CACHE: string[];
    /**
     * Determines the suffix for a given number.
     *
     * @param value The number to find the suffix for.
     * @returns The suffix determined.
     */
    static determine(value: number): string;
    /**
     * Gets the suffix for a number and optionally appends it before the suffix.
     *
     * @param value The number to get the suffix for.
     * @param prepend When `true` the value is prepended to the suffix.
     * @returns The suffix or value & suffix pair determined.
     */
    static get(value: number, prepend?: boolean): string;
}
