import "../Hashable/String"; // Our extended string
import BagEntry from "./BagEntry";
import Hashable from "../Hashable";
import Bucket from "./Bucket";

class HashTable<T extends Hashable> {
  private hashTable: Array<Bucket<T>>;

  /**
   * Create an instance of HashTable.
   *
   * @param numBuckets - The number of buckets for the Set.
   */
  constructor(private numBuckets = 100) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.hashTable = [...Array(numBuckets)].map(_ => new Bucket());
  }

  public bucketCorrespondingToValue(value: T): Bucket<T> {
    return this.hashTable[this.computeBucket(value)];
  }

  /**
   * Determine what bucket—meaning the index of `hashTable`—the `value` belongs
   * in. This is the result of taking the hashcode for `value` and determining
   * proprotionately how far between the minimum and maximum `hashCode` values
   * that `value` falls, then finding what integer that falls into from zero to
   * `numBuckets`.
   *
   * @param value - The value to determine the bucket for.
   * @returns The bucket number, meaning the index for `hashTable`.
   */
  private computeBucket(value: T): number {
    const sizeOfRange = value.maximumHashValue - value.minimumHashValue;
    const distanceFromFloor =
      (value.hashCode() - value.minimumHashValue) / sizeOfRange;
    return Math.floor(distanceFromFloor * this.numBuckets);
  }
}

/**
 * Represents a bag, also known as a multiset. Insertion order is not
 * preserved. All operations are best case `O(1)`, worst case `O(n)`, except
 * `length()`, which is always `O(1)`, and `toArray()`, which is `O(n)`.
 */
export default class Bag<T extends Hashable> {
  private hashTable: HashTable<T>;
  private numElements: number;

  /**
   * Create an instance of Bag.
   */
  constructor() {
    this.hashTable = new HashTable<T>();
    this.numElements = 0;
  }

  /**
   * Insert a value into the bag.
   *
   * @param value - The value to insert into the Bucket.
   */
  public insert(value: T): void {
    ++this.numElements;
    const bucketContents = this.hashTable.bucketCorrespondingToValue(value);
    bucketContents.insert(value);
  }

  /**
   * Given a value, determine if the Bag contains at least one occurrence of
   * that value.
   *
   * @param value - The value to search the Bag for.
   * @returns - Whether the value is present.
   */
  public contains(value: T): boolean {
    const bucketContents = this.hashTable.bucketCorrespondingToValue(value);
    return bucketContents.contains(value);
  }

  /**
   * Remove one copy of the element from the bag. The boolean indicates whether
   * the value was removed (i.e., the value was initially present). If there
   * are multiple occurrences of the value, delete only one—use `deleteAll()`
   * to remove all values.
   *
   * @param value - The value to remove.
   * @returns Whether the value was found and removed.
   */
  public delete(value: T): boolean {
    const bucketContents = this.hashTable.bucketCorrespondingToValue(value);
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
   * @param value - The value to remove.
   * @returns Whether the value was found and removed.
   */
  public deleteAll(value: T): boolean {
    const bucketContents = this.hashTable.bucketCorrespondingToValue(value);
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
   * @param value - The value to count occurrences of.
   * @returns How many times `value` occurs in the Bag.
   */
  public count(value: T): number {
    return this.hashTable.bucketCorrespondingToValue(value).count(value);
  }

  /**
   * How many total elements, including repeats, are in the Bag.
   *
   * @returns The number of elements.
   */
  public length(): number {
    return this.numElements;
  }

  /**
   * Create an array that is equivalent to the Bag in arbitrary order.
   *
   * @returns The array with the Bag's contents.
   */
  public toArray(): Array<T> {
    return this.hashTable.reduce((result, bucketContents) => {
      bucketContents.forEach(element => {
        for (let _i = 0; _i < element.count(); ++_i) {
          result.push(element.unwrap());
        }
      });
      return result;
    }, [] as Array<T>);
  }

  /**
   * Given the contents of a bucket, which is an array of `BagEntry`, figure
   * out what the index for that value is. If `value` isn't present, return
   * `null`.
   *
   * @param value - The value to search for.
   * @param bucketContents - The bucket contents to search.
   * @returns The index of the contents, if found, or `null`, if not found.
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
}
