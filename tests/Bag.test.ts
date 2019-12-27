import Bag from "../src/Bag/index";

describe("Bag", () => {
  const insertedValue = "Hello";
  const otherInsertedValue = "Goodbye";

  describe("insertion and retrieval", () => {
    describe("contains", () => {
      it("does not contain a value that was not inserted", () => {
        const subject = new Bag();
        expect(subject.contains(insertedValue)).toBe(false);
      });

      it("contains a value only after it is inserted", () => {
        const subject = new Bag();
        subject.insert(insertedValue);
        expect(subject.contains(insertedValue)).toBe(true);
      });
    });
  });

  describe("deletion", () => {
    describe("delete()", () => {
      it("deletes an item once inserted", () => {
        const subject = new Bag();
        subject.insert(insertedValue);
        subject.delete(insertedValue);
        expect(subject.contains(insertedValue)).toBe(false);
      });

      it("deletes exactly one occurrence", () => {
        const subject = new Bag();
        subject.insert(insertedValue);
        subject.insert(insertedValue);
        subject.delete(insertedValue);
        expect(subject.count(insertedValue)).toBe(1);
      });
    });

    describe("deleteAll()", () => {
      it("deletes an item once inserted", () => {
        const subject = new Bag();
        subject.insert(insertedValue);
        subject.deleteAll(insertedValue);
        expect(subject.contains(insertedValue)).toBe(false);
      });

      it("deletes exactly one occurrence", () => {
        const subject = new Bag();
        subject.insert(insertedValue);
        subject.insert(insertedValue);
        subject.deleteAll(insertedValue);
        expect(subject.contains(insertedValue)).toBe(false);
      });
    });
  });

  describe("count()", () => {
    it("correctly counts an arbitrary number", () => {
      const subject = new Bag();
      const repeats = 29;
      [...Array(repeats)].forEach(_ => subject.insert(insertedValue));
      expect(subject.count(insertedValue)).toBe(repeats);
    });

    it("does not count other entries", () => {
      const subject = new Bag();
      [...Array(17)].forEach(_ => subject.insert(otherInsertedValue));
      expect(subject.count(insertedValue)).toBe(0);
    });
  });

  describe("length()", () => {
    it("counts the correct number when no item exists", () => {
      const subject = new Bag();
      expect(subject.length()).toBe(0);
    });

    it("counts the correct number when only one item exists", () => {
      const subject = new Bag();
      const repeats = 29;
      [...Array(repeats)].forEach(_ => subject.insert(insertedValue));
      expect(subject.length()).toBe(repeats);
    });

    it("counts the correct number when more than one item exists", () => {
      const subject = new Bag();
      const insertedValueRepeats = 29;
      const otherInsertedValueRepeats = 17;
      [...Array(insertedValueRepeats)].forEach(_ =>
        subject.insert(insertedValue),
      );
      [...Array(otherInsertedValueRepeats)].forEach(_ =>
        subject.insert(otherInsertedValue),
      );

      expect(subject.length()).toBe(
        insertedValueRepeats + otherInsertedValueRepeats,
      );
    });
  });

  describe("toArray()", () => {});
});
