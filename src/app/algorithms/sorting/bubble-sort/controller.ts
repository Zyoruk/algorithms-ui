import { BarsAnimation } from "@/app/shared/classes/BarsAnimation";
import { ObservableArray } from "@/app/shared/classes/ObservableArray";
import { AlgorithmController } from "@/app/shared/classes/SortingAlgorithmControllet";

import { BubbleSort } from "./model";

export class BubbleSortController extends AlgorithmController {
  private sorter = new BubbleSort();
  private animation!: BarsAnimation;

  async sortAndAnimate(arr: number[]) {
    const observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef, this.speed);
    observableArr.addObserver(this.animation);
    await this.sorter.sort(observableArr);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.animation.cleanUp(observableArr);
  }
}
