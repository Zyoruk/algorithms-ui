import { ObservableArray } from "@/app/shared/classes/ObservableArray";

export class BinarySearch {
  array: ObservableArray;
  constructor() {
    this.array = new ObservableArray();
  }
  async search(array: ObservableArray, target: number) {
    this.array = array;
    return await this.binarySearch(0, array.length - 1, target);
  }

  private async binarySearch(
    low: number,
    high: number,
    target: number
  ): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (high >= low) {
      let mid = Math.floor(low + (high - low) / 2);

      // Notify observers that we're comparing elements
      this.array.notifyObservers({ type: "compare", indices: [mid] });

      if (this.array[mid] === target) {
        return mid;
      }

      if (this.array[mid] > target) {
        return this.binarySearch(low, mid - 1, target);
      }

      return this.binarySearch(mid + 1, high, target);
    }

    return -1;
  }
}
