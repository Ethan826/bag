import BagEntry from "../src/Bag/BagEntry";

describe("BagEntry", () => {
  describe("constructor", () => {
    it("has one item when constructed", () => {
      const subject = new BagEntry("test");
      expect(subject.count()).toBe(1);
    });
  });

  describe("increment()", () => {
    it("increments correctly", () => {
      const subject = new BagEntry("test");
      const originalCount = subject.count();
      subject.increment();
      expect(subject.count()).toBe(originalCount + 1);
    });
  });

  describe("decrement()", () => {
    it("decrements correctly", () => {
      const subject = new BagEntry("test");
      subject.increment();
      const originalCount = subject.count();
      subject.decrement();
      expect(subject.count()).toBe(originalCount - 1);
    });

    it("raises an error if we decrement zero", () => {
      const subject = new BagEntry("test");
      subject.decrement();
      expect(() => subject.decrement()).toThrowError(
        "Cannot decrement below zero",
      );
    });
  });

  describe("unwrap()", () => {
    it("returns the correct value", () => {
      const expectedValue = "test";
      const subject = new BagEntry(expectedValue);
      expect(subject.unwrap()).toBe(expectedValue);
    });
  });

  describe("isEqual()", () => {
    const value = "test";
    const subject = new BagEntry(value);

    it("returns the correct result for equal values", () => {
      expect(subject.isEqual(value)).toBe(true);
    });

    it("returns the correct result for unequal values", () => {
      expect(subject.isEqual("blah")).toBe(false);
    });
  });
});
