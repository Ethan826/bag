import Hashable from "../Hashable";
import Bucket from "./Bucket";

export class HashTable<T extends Hashable> {
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

  /**
   * Get the appropriate bucket based on the value passed in, whether that
   * bucket contains that value or not.
   *
   * @param value - The value to fetch the matching bucket for.
   * @returns - The bucket appropriate to the value.
   */
  public fetchBucket(value: T): Bucket<T> {
    return this.hashTable[this.computeBucket(value)];
  }

  /**
   * Create an array that is equivalent to the HashTable in arbitrary order.
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
