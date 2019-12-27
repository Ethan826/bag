/**
 * Represents a type that can be hashed to an integer value.
 *
 * @interface Hashable
 */
export default interface Hashable {
  hashCode: () => number;
  maximumHashValue: number;
  minimumHashValue: number;
}
