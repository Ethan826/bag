import "../Hashable/String"; // Our extended string
import BagEntry from "./BagEntry";
import Hashable from "../Hashable";
import Bucket from "./Bucket";

/**
 * Represents a bag, also known as a multiset. Insertion order is not
 * preserved. All operations are best case `O(1)`, worst case `O(n)`, except
 * `length()`, which is always `O(1)`, and `toArray()`, which is `O(n)`.
 *
 * @class Bag
 * @template T
 */
export default class Bag<T extends Hashable> {
  private numElements: number;
  private hashTable: Array<Bucket<T>>;

  /**
   * Creates an instance of Bag.
   *
   * @param {number} [numBuckets=100] The number of buckets for the Set.
   *   Further development of this class would involve handling this internally.
   * @memberof Bag
   */
  constructor(private numBuckets = 100) {
    this.hashTable = [...Array(numBuckets)].map(_ => new Bucket());
    this.numElements = 0;
  }

  /**
   * Insert a value into the bag.
   *
   * @param {T} value
   * @memberof Bag
   */
  public insert(value: T) {
    ++this.numElements;
    const bucketContents = this.bucketCorrespondingToValue(value);
    bucketContents.insert(value);
  }

  /**
   * Given a value, determine if the Bag contains at least one occurrence of
   * that value.
   *
   * @param {T} value The value to search the Bag for.
   * @returns {boolean} Whether the value is present.
   * @memberof Bag
   */
  public contains(value: T): boolean {
    const bucketContents = this.bucketCorrespondingToValue(value);
    return bucketContents.contains(value);
  }

  /**
   * Remove one copy of the element from the bag. The boolean indicates whether
   * the value was removed (i.e., the value was initially present). If there
   * are multiple occurrences of the value, delete only one—use `deleteAll()`
   * to remove all values.
   *
   * @param {T} value The value to remove.
   * @returns {boolean} Whether the value was found and removed.
   * @memberof Bag
   */
  public delete(value: T): boolean {
    const bucketContents = this.bucketCorrespondingToValue(value);
    if (bucketContents.delete(value)) {
      --this.numElements;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove all copies of the element from the bag. The boolean indicates
   * whether the value was removed (i.e., the value was initially present). To
   * remove only one occurrence of the value from the Bag, use `delete()`.
   *
   * @param {T} value The value to remove.
   * @returns {boolean} Whether the value was found and removed.
   * @memberof Bag
   */
  public deleteAll(value: T): boolean {
    const bucketContents = this.bucketCorrespondingToValue(value);
    const howManyOccurrences: number = bucketContents.deleteAll(value);

    if (howManyOccurrences === 0) {
      return false;
    } else {
      this.numElements -= howManyOccurrences;
      return true;
    }
  }

  /**
   * Count the number of occurrences of `value`.
   *
   * @param {T} value The value to count occurrences of.
   * @returns {number} How many times `value` occurs in the Bag.
   * @memberof Bag
   */
  public count(value: T): number {
    return this.bucketCorrespondingToValue(value).count(value);
  }

  /**
   * How many total elements, including repeats, are in the Bag.
   *
   * @returns {number} The number of elements.
   * @memberof Bag
   */
  public length(): number {
    return this.numElements;
  }

  /**
   * Create an array that is equivalent to the Bag in arbitrary order.
   *
   * @returns {Array<T>} The array with the Bag's contents.
   * @memberof Bag
   */
  public toArray(): Array<T> {
    return this.hashTable.reduce((result, bucketContents) => {
      bucketContents.forEach(element => {
        for (let _i = 0; _i < element.count(); ++_i) {
          result.push(element.unwrap());
        }
      });
      return result;
    }, <Array<T>>[]);
  }

  /**
   * Determine what bucket—meaning the index of `hashTable`—the `value` belongs
   * in. This is the result of taking the hashcode for `value` and determining
   * proprotionately how far between the minimum and maximum `hashCode` values
   * that `value` falls, then finding what integer that falls into from zero to
   * `numBuckets`.
   *
   * @private
   * @param {T} value The value to determine the bucket for.
   * @returns {number} The bucket number, meaning the index for `hashTable`.
   * @memberof Bag
   */
  private computeBucket(value: T): number {
    const sizeOfRange = value.maximumHashValue - value.minimumHashValue;
    const distanceFromFloor =
      (value.hashCode() - value.minimumHashValue) / sizeOfRange;
    return Math.floor(distanceFromFloor * this.numBuckets);
  }

  /**
   * Given the contents of a bucket, which is an array of `BagEntry`, figure
   * out what the index for that value is. If `value` isn't present, return
   * `null`.
   *
   * @private
   * @param {T} value The value to search for.
   * @param {Array<BagEntry<T>>} bucketContents The bucket contents to search.
   * @returns {(number | null)} The index of the contents, if found, or `null`,
   *   if not found.
   * @memberof Bag
   */
  private findEntryIndex(
    value: T,
    bucketContents: Array<BagEntry<T>>,
  ): number | null {
    // For the record, it's unspeakably gross that JavaScript uses -1 as a magic
    // value to signify an element wasn't found in an array.
    const indexOrNegative1 = bucketContents.findIndex(entry =>
      entry.isEqual(value),
    );
    return indexOrNegative1 === -1 ? null : indexOrNegative1;
  }

  private bucketCorrespondingToValue(value: T): Bucket<T> {
    return this.hashTable[this.computeBucket(value)];
  }
}
