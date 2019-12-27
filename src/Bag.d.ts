declare global {
  interface String {
    hashCode: () => number;
    maximumHashValue: number;
    minimumHashValue: number;
  }
}

export {};
