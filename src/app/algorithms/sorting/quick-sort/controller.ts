import { ObservableArray } from '@/app/shared/classes/ObservableArray';
import { QuickSort } from './model';
import { BarsAnimation } from '@/app/shared/classes/BarsAnimation';
import { AlgorithmController } from '@/app/shared/classes/SortingAlgorithmControllet';

export class Controller extends AlgorithmController {
  private sorter = new QuickSort();
  private animation!: BarsAnimation;

  constructor(svgRef: SVGSVGElement) {
    super(svgRef);
  }

  async sortAndAnimate(arr: number[]) {
    const observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef);
    observableArr.addObserver(this.animation);
    await this.sorter.sort(observableArr);
    await new Promise(r => setTimeout(r, 1000));
    this.animation.cleanUp(observableArr);
  }
}
