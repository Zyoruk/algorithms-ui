import { ObservableArray } from "@/app/shared/classes/ObservableArray";

export class QuickSort {
  array: ObservableArray;
  constructor() {
    this.array = new ObservableArray();
  }

  async sort(array: ObservableArray) {
    this.array = array;
    await this.quickSort(0, array.length - 1);
  }

  private async quickSort(low: number, high: number) {
    if (low < high) {
      let pivotIndex = await this.partition(low, high);
      await this.quickSort(low, pivotIndex - 1);
      await this.quickSort(pivotIndex + 1, high);
    }
  }

  private async partition(low: number, high: number) {
    let pivot = this.array[high];
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
}
