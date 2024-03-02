import { ObservableArray } from "@/app/shared/classes/ObservableArray";

export class MergeSort {
  array: ObservableArray;
  tempArray: number[];

  constructor() {
    this.array = new ObservableArray();
    this.tempArray = [];
  }

  async sort(array: ObservableArray) {
    this.array = array;
    this.tempArray = new Array(array.length);
    await this.mergeSort(0, array.length - 1);
  }

  private async mergeSort(low: number, high: number) {
    if (low < high) {
      let middle = Math.floor((low + high) / 2);
      await this.mergeSort(low, middle);
      await this.mergeSort(middle + 1, high);
      await this.merge(low, middle, high);
    }
  }
  private async merge(low: number, middle: number, high: number) {
    for (let i = low; i <= high; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.tempArray[i] = this.array[i];
    }

    let i = low;
    let j = middle + 1;
    let k = low;

    while (i <= middle && j <= high) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.tempArray[i] <= this.tempArray[j]) {
        this.array.set(k, this.tempArray[i]);
        i++;
      } else {
        this.array.set(k, this.tempArray[j]);
        j++;
      }
      k++;
    }

    while (i <= middle) {
      await  new Promise((resolve) => setTimeout(resolve, 100));
      this.array.set(k, this.tempArray[i]);
      k++;
      i++;
    }
  }
}
