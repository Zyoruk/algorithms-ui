import { ObservableArray } from "@/app/shared/classes/ObservableArray";

export class QuickSort {
  array: ObservableArray;
  constructor() {
    this.array = new ObservableArray();
  }

  async sort(array: ObservableArray) {
    this.array = array;
    await this.iterativeQuickSort(0, array.length - 1);
  }

  private async partition(low: number, high: number) {
    const pivot = this.array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.array[j] <= pivot) {
        i++;
        this.array.swap(i, j);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    this.array.swap(i + 1, high);
    return i + 1;
  }

  private async iterativeQuickSort(low: number, high: number) {
    const stack: { low: number; high: number }[] = [];
    stack.push({ low, high });

    while (stack.length) {
      const popped: { low: number; high: number } | undefined = stack.pop();
      if (!popped) continue;
      const { low, high } = popped;
      if (low < high) {
        const pivotIndex = await this.partition(low, high);
        stack.push({ low, high: pivotIndex - 1 });
        stack.push({ low: pivotIndex + 1, high });
      }
    }
  }
}
