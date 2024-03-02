import { ObservableArray } from "@/app/shared/classes/ObservableArray";
import { BinarySearch } from "./model";
import { BarsAnimation } from "@/app/shared/classes/BarsAnimation";

export class Controller {
  sorter: BinarySearch;
  animation!: BarsAnimation;

  constructor(private svgRef: SVGSVGElement) {
    this.sorter = new BinarySearch();
  }

  async searchAndAnimate(arr: number[], target: number) {
    let observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef);
    observableArr.addObserver(this.animation);
    await this.sorter.search(observableArr, target);
  }
}
