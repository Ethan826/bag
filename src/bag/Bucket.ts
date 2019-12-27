import BagEntry from "./BagEntry";

/**
 * Represents a Bucket in a HashTable, meaning the array of values that have
 * the same hashcode. Hopefully this will be small, but that's the concern of
 * the `hashCode` implementation on type `T` that must implement `Hashable`.
 *
 * @export
 * @class Bucket
 * @template T
 */
export default class Bucket<T> {
  /**
   * The contents of the Bucket.
   *
   * @private
   * @type {Array<BagEntry<T>>}
   * @memberof Bucket
   */
  private contents: Array<BagEntry<T>>;

  /**
   *Creates an instance of Bucket.
   *
   * @memberof Bucket
   */
  constructor() {
    this.contents = [];
  }

  /**
   * Count the number of occurrences of `value`.
   *
   * @param {T} value The value to count occurrences of.
   * @returns {number} How many occurrences of `value` there are.
   * @memberof Bucket
   */
  public count(value: T): number {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    return entryIndex !== -1 ? this.contents[entryIndex].count() : 0;
  }

  /**
   * Call `fn` on each element of the Bucket for side effects.
   *
   * @param {(value: BagEntry<T>, index: number, array: BagEntry<T>[]) => void} fn
   * @memberof Bucket
   */
  public forEach(
    fn: (value: BagEntry<T>, index: number, array: BagEntry<T>[]) => void,
  ) {
    this.contents.forEach(fn);
  }

  /**
   * Insert a value into the Bucket.
   *
   * @param {T} value The value to insert.
   * @memberof Bucket
   */
  public insert(value: T) {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    entryIndex !== -1
      ? this.contents[entryIndex].increment()
      : this.contents.push(new BagEntry(value));
  }

  /**
   * Given a value, determine if the Bucket contains at least one occurrence of
   * that value.
   *
   * @param {T} value The value to search the Bucket for.
   * @returns {boolean} Whether the Bucket contains that value.
   * @memberof Bucket
   */
  public contains(value: T): boolean {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    return entryIndex !== -1;
  }

  /**
   * Remove one copy of the element from the Bucket. The boolean indicates
   * whether the value was removed (i.e., the value was initially present). If
   * there are multiple occurrences of the value, delete only one—use
   * `deleteAll()` to remove all values.
   *
   * @param {T} value The value to remove.
   * @returns {boolean} Whether the value was found and removed.
   * @memberof Bucket
   */
  public delete(value: T): boolean {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    // Is the element present?
    if (entryIndex !== -1) {
      // If so, is there more than one?
      if (this.contents[entryIndex].count() > 1) {
        // If more than one, just decrement the number.
        this.contents[entryIndex].decrement();
      } else {
        // If only one, remove it from the array.
        this.contents.splice(entryIndex, 1);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove all copies of the element from the bag. The number returned
   * indicates how many copies were deleted. To remove only one occurrence of
   * the value from the Bucket, use `delete()`.
   *
   * @param {T} value The value to remove.
   * @returns {boolean} Whether the value was found and removed.
   * @memberof Bucket
   */
  public deleteAll(value: T): number {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    if (entryIndex !== -1) {
      const numDeleted = this.contents[entryIndex].count();
      this.contents.splice(entryIndex, 1);
      return numDeleted;
    } else {
      return 0;
    }
  }
}
