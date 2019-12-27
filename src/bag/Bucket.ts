import BagEntry from "./BagEntry";

/**
 *
 *
 * @export
 * @class Bucket
 * @template T
 */
export default class Bucket<T> {
  private contents: Array<BagEntry<T>>;
  constructor() {
    this.contents = [];
  }
  public count(value: T): number {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    return entryIndex !== -1 ? this.contents[entryIndex].count() : 0;
  }
  public push(value: BagEntry<T>) {
    this.contents.push(value);
  }
  public forEach(
    fn: (value: BagEntry<T>, index: number, array: BagEntry<T>[]) => void,
  ) {
    this.contents.forEach(fn);
  }
  public insert(value: T) {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    entryIndex !== -1
      ? this.contents[entryIndex].increment()
      : this.contents.push(new BagEntry(value));
  }
  public contains(value: T): boolean {
    const entryIndex = this.contents.findIndex(entry => entry.isEqual(value));
    return entryIndex !== -1;
  }
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
