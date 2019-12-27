import Hashable from "./index";

/**
 * This is the equivalent of `impl`ing a trait in Rust.
 *
 * @interface String
 * @extends {Hashable}
 */
interface String extends Hashable {}

// https://stackoverflow.com/a/8076436/3396324
String.prototype.hashCode = function() {
  return [...this].reduce((hash, character) => {
    hash = (hash << 5) - hash + character.charCodeAt(0);
    return hash & hash;
  }, 0);
};
String.prototype.minimumHashValue = -0x80000000;
String.prototype.maximumHashValue = 0x7fffffff;

export default String;
