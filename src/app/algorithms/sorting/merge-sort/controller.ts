import { ObservableArray } from "@/app/shared/classes/ObservableArray";
import { BarsAnimation } from "@/app/shared/classes/BarsAnimation";
import {  MergeSort } from "./model";
import { AlgorithmController } from "@/app/shared/classes/SortingAlgorithmControllet";

export class MergeSortController extends AlgorithmController {
  private sorter = new MergeSort();
  private animation!: BarsAnimation;

  async sortAndAnimate(arr: number[]) {
    let observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef, this.speed);
    observableArr.addObserver(this.animation);
    await this.sorter.sort(observableArr);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.animation.cleanUp(observableArr);
  }
}
