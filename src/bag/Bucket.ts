import BagEntry from "./BagEntry";

/**
 * Represents a Bucket in a HashTable, meaning the array of values that have
 * the same hashcode. Hopefully this will be small, but that's the concern of
 * the `hashCode` implementation on type `T` that must implement `Hashable`.
 */
export default class Bucket<T> {
  /**
   * The contents of the Bucket.
   */
  private contents: Array<BagEntry<T>>;

  /**
   *Creates an instance of Bucket.
   */
  constructor() {
    this.contents = [];
  }

  /**
   * Count the number of occurrences of `value`.
   *
   * @param value - The value to count occurrences of.
   * @returns How many occurrences of `value` there are.
   */
  public count(value: T): number {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    return entryIndex !== -1 ? this.contents[entryIndex].count() : 0;
  }

  /**
   * Insert a value into the Bucket.
   *
   * @param value - The value to insert.
   */
  public insert(value: T): void {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    entryIndex !== -1
      ? this.contents[entryIndex].increment()
      : this.contents.push(new BagEntry(value));
  }

  /**
   * Given a value, determine if the Bucket contains at least one occurrence of
   * that value.
   *
   * @param value - The value to search the Bucket for.
   * @returns Whether the Bucket contains that value.
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
   * @param value - The value to remove.
   * @returns Whether the value was found and removed.
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
   * @param value - The value to remove.
   * @returns Whether the value was found and removed.
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

  /**
   * Create an array that is equivalent to the Bucket in arbitrary order.
   *
   * @returns The array with the Bag's contents.
   */
  public toArray(): Array<T> {
    return this.contents.reduce((result: Array<T>, bagEntry: BagEntry<T>) => {
      for (let _i = 0; _i < bagEntry.count(); ++_i) {
        result.push(bagEntry.unwrap());
      }
      return result;
    }, []);
  }
}
