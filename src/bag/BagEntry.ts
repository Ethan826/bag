/**
 * Represents an entry in a Bag, exposing simple setter and getter methods.
 */
export default class BagEntry<T> {
  private myCount: number;

  /**
   *Creates an instance of BagEntry.
   *
   * @param value - The value for this BagEntry.
   * @memberof BagEntry
   */
  constructor(private value: T) {
    this.myCount = 1;
  }

  /**
   * Increment the number of entries.
   *
   * @memberof BagEntry
   */
  public increment(): void {
    ++this.myCount;
  }

  /**
   * Decrement the number of entries. Raises an error if the current value is
   * zero.
   *
   * @memberof BagEntry
   */
  public decrement(): void {
    if (this.myCount === 0) throw Error("Cannot decrement below zero");
    --this.myCount;
  }

  public count(): number {
    return this.myCount;
  }

  public isEqual(value: T): boolean {
    return value === this.value;
  }

  public unwrap(): T {
    return this.value;
  }
}
