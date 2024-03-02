import { ObservableArray } from "@/app/shared/classes/ObservableArray";
import { BarsAnimation } from "@/app/shared/classes/BarsAnimation";
import {  MergeSort } from "./model";

export class MergeSortController {
  sorter: MergeSort;
  animation!: BarsAnimation;

  constructor(private svgRef: SVGSVGElement) {
    this.sorter = new MergeSort();
  }

  async sortAndAnimate(arr: number[]) {
    let observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef);
    observableArr.addObserver(this.animation);
    await this.sorter.sort(observableArr);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.animation.cleanUp(observableArr);
  }
}
