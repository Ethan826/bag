import "../src/Hashable/String";
import { HashTable } from "../src/Bag/HashTable";
import Bucket from "../src/Bag/Bucket";
import { mocked } from "ts-jest/utils";

jest.mock("../src/Bag/Bucket");

describe("HashTable", () => {
  it("inserts and retrieves the same value", () => {
    String.prototype.hashCode = jest.fn(() => 12345);

    const subject = new HashTable(100, Bucket);
    const bucketFirst = subject.fetchBucket("Hello");
    const bucketSecond = subject.fetchBucket("Goodbye");
    expect(bucketFirst).toEqual(bucketSecond);
  });

  describe("toArray()", () => {
    const mockedBucket = mocked(Bucket, true).mockImplementation(() => {
      return {
        toArray: (): string[] => ["Hello"],
      };
    });
    const subject = new HashTable(
      5,
      (mockedBucket as unknown) as typeof Bucket,
    );

    expect(subject.toArray()).toEqual([
      "Hello",
      "Hello",
      "Hello",
      "Hello",
      "Hello",
    ]);
  });
});
