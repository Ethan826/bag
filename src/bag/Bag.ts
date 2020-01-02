import "../Hashable/String"; // Our extended string
import Hashable from "../Hashable";
import { HashTable } from "./HashTable";

/**
 * Represents a bag, also known as a multiset. Insertion order is not
 * preserved. All operations are best case `O(1)`, worst case `O(n)`, except
 * `length()`, which is always `O(1)`, and `toArray()`, which is `O(n)`.
 */
export default class Bag<T extends Hashable> {
  private numElements: number;

  /**
   * Create an instance of Bag.
   */
  constructor(private hashTable: HashTable<T> = new HashTable()) {
    this.numElements = 0;
  }

  /**
   * Insert a value into the bag.
   *
   * @param value - The value to insert into the Bucket.
   */
  public insert(value: T): void {
    ++this.numElements;
    const bucketContents = this.hashTable.fetchBucket(value);
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
    const bucketContents = this.hashTable.fetchBucket(value);
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
    const bucketContents = this.hashTable.fetchBucket(value);
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
    const bucketContents = this.hashTable.fetchBucket(value);
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
    return this.hashTable.fetchBucket(value).count(value);
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
    return this.hashTable.toArray();
  }
}
