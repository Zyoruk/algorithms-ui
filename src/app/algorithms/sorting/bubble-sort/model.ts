import { ObservableArray } from "@/app/shared/classes/ObservableArray";

export class BubbleSort {
  async sort(arr: ObservableArray) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (arr.compare(j, j + 1)) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          arr.swap(j, j + 1);
        }
      }
    }
  }
}
