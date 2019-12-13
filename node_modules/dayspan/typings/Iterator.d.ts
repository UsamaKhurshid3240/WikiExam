/**
 * The callback which is invoked for each item in the Iterator. The callback
 * can call [[Iterator.stop]] at anytime to stop iteration.
 *
 * @param item The item found in the iterator.
 * @param iterator The iterator with the item.
 * @returns The result of the callback.
 */
export declare type IteratorCallback<T, R> = (item: T, iterator: Iterator<T>) => R;
/**
 * An [[Iterator]] source which handles iterating over items and calls
 * [[Iterator.act]] for each item, taking the requested action when possible.
 *
 * @param callback The function to invoke for each item.
 * @param iterator The iterator to check for early exists.
 */
export declare type IteratorSource<T> = (iterator: Iterator<T>) => any;
/**
 * A filter to apply duration iteration to only look at certain items when this
 * function returns `true`.
 *
 * @param item The item being iterated.
 * @returns `true` if the item should be iterated, otherwise `false`.
 */
export declare type IteratorFilter<T> = (item: T) => boolean;
/**
 * An action to perform on the source as instructed by the iterator.
 */
export declare enum IteratorAction {
    /**
     * Continue iteration.
     */
    Continue = 0,
    /**
     * Stop iteration.
     */
    Stop = 1,
    /**
     * Remove the current item if possible, and continue iteration.
     */
    Remove = 2,
    /**
     * Replace the current item with the provided value.
     */
    Replace = 3,
}
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
export declare class Iterator<T> {
    /**
     * A result of the iteration passed to [[Iterator.stop]].
     */
    result: any;
    /**
     * The last action (if any) called on this iterator.
     */
    action: IteratorAction;
    /**
     * The value to replace with the current item.
     */
    replaceWith: T;
    /**
     * The current callback passed to the iterator.
     */
    callback: IteratorCallback<T, any>;
    /**
     * The source of iterable items. This allows the iteration over any type of
     * structure. The source must call the callback for each item and its
     * recommended that the source checks the [[Iterator.iterating]] flag after
     * each callback invokation.
     */
    private source;
    /**
     * Creates a new Iterator given a source.
     *
     * @param source The source of items to iterator.
     */
    constructor(source: IteratorSource<T>);
    /**
     * Returns a clone of this iterator with the same source. This is necessary
     * if you want to iterate all or a portion of the source while already
     * iterating it (like a nested loop).
     */
    clone(): Iterator<T>;
    /**
     * Passes the given item to the iterator callback and returns the action
     * requested at this point in iteration.
     *
     * @param item The current item being iterated.
     */
    act(item: T): IteratorAction;
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    stop(result?: any): this;
    /**
     * Stops iteration and optionally sets the result of the iteration.
     *
     * @param result The result of the iteration.
     */
    replace(replaceWith: T): this;
    /**
     * Signals to the iterator source that the current item wants to be removed.
     */
    remove(): this;
    /**
     * Determines with this iterator is empty. A filter function can be specified
     * to only check for items which match certain criteria.
     *
     * @param filter A function to the checks items for certain criteria.
     * @returns `true` if no valid items exist in the source.
     */
    isEmpty(filter?: IteratorFilter<T>): boolean;
    /**
     * Counts the number of items in the iterator. A filter function can be
     * specified to only count items which match certain criteria.
     *
     * @param filter A function to count items for certain criteria.
     * @returns The number of items in the source that optionally match the given
     *    criteria.
     */
    count(filter?: IteratorFilter<T>): number;
    /**
     * Returns the first item in the iterator. A filter function can be specified
     * to only return the first item which matches certain criteria.
     *
     * @param filter A function to compare items to to match certain criteria.
     * @returns The first item found that optonally matches the given criteria.
     */
    first(filter?: IteratorFilter<T>): T;
    /**
     * Builds a list of items from the source. A filter function can be specified
     * so the resulting list only contain items that match certain criteria.
     *
     * @param out The array to place the items in.
     * @param filter The function which determines which items are added to the list.
     * @returns The reference to `out` which has had items added to it which
     *    optionally match the given criteria.
     */
    list(out?: T[], filter?: IteratorFilter<T>): T[];
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
    object(getKey: (item: T) => any, out?: any, filter?: IteratorFilter<T>): any;
    /**
     * Returns a new iterator that only returns a maximum number of items.
     *
     * @param amount The maximum number of items to return.
     * @returns A new iterator which returns a maximum number of items.
     */
    take(amount: number): Iterator<T>;
    /**
     * Returns a new iterator that skips the given number of items from the items
     * in this iterator.
     *
     * @param amount The number of items to skip.
     * @returns A new iterator which skipped the given number of items.
     */
    skip(amount: number): Iterator<T>;
    /**
     * Returns a new iterator thats items are the items in this iterator followed
     * by the items in the given iterators.
     *
     * @param iterators The iterators to append after this one.
     * @returns A new iterator based on this iterator followed by the given.
     */
    append(...iterators: Iterator<T>[]): Iterator<T>;
    /**
     * Returns a new iterator thats items are the items in the given iterators
     * followed by the items in this iterator.
     *
     * @param iterators The iterators to prepend before this one.
     * @returns A new iterator based on the given iterators followed by this.
     */
    prepend(...iterators: Iterator<T>[]): Iterator<T>;
    /**
     * Removes items from the source that match certain criteria.
     *
     * @param filter The function which determines which items to remove.
     */
    purge(filter: IteratorFilter<T>): this;
    /**
     * Returns an iterator which takes items from this iterator and presents them
     * in reverse.
     *
     * @returns A new iterator with the items in this iterator in reverse.
     */
    reverse(): Iterator<T>;
    /**
     * Reduces all the items in the source to a single value given the initial
     * value and a function to convert an item and the current reduced value
     */
    reduce<R>(initial: R, reducer: (item: T, reduced: R) => R, filter?: IteratorFilter<T>): R;
    /**
     * Returns an iterator where this iterator is the source and the returned
     * iterator is built on a subset of items which pass a `filter` function.
     *
     * @param filter The function which determines if an item should be iterated.
     * @returns A new iterator for the filtered items from this iterator.
     */
    filter(filter: IteratorFilter<T>): Iterator<T>;
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
    map<W>(mapper: IteratorCallback<T, W>, filter?: IteratorFilter<T>, unmapper?: (replaceWith: W, current: W, item: T) => T): Iterator<W>;
    /**
     * Invokes the callback for each item in the source of this iterator. The
     * second argument in the callback is the reference to this iterator and
     * [[Iterator.stop]] can be called at anytime to cease iteration.
     *
     * @param callback The function to invoke for each item in this iterator.
     */
    iterate(callback: IteratorCallback<T, any>): this;
    /**
     * Passes the result of the iteration to the given function if a truthy
     * result was passed to [[Iterator.stop]].
     *
     * @param getResult The function to pass the result to if it exists.
     */
    withResult(getResult: (result: any) => any): this;
    /**
     * Returns an iterator for the given array optionally iterating it in reverse.
     *
     * @param items The array of items to iterate.
     * @param reverse If the array should be iterated in reverse.
     * @returns A new iterator for the given array.
     */
    static forArray<T>(items: T[], reverse?: boolean): Iterator<T>;
    /**
     * Returns an iterator for the given object optionally checking the
     * `hasOwnProperty` function on the given object.
     *
     * @param items The object to iterate.
     * @param hasOwnProperty If `hasOwnProperty` should be checked.
     * @returns A new iterator for the given object.
     */
    static forObject<T>(items: {
        [key: string]: T;
    }, hasOwnProperty?: boolean): Iterator<T>;
    /**
     * Joins all the given iterators into a single iterator where the items
     * returned are in the same order as passed to this function. If any items
     * are removed from the returned iterator they will be removed from the given
     * iterator if it supports removal.
     *
     * @param iterators The array of iterators to join as one.
     * @returns A new iterator for the given iterators.
     */
    static join<T>(...iterators: Iterator<T>[]): Iterator<T>;
    /**
     * Returns a new iterator with no items.
     *
     * @returns A new iterator with no items.
     */
    static empty<T>(): Iterator<T>;
}
