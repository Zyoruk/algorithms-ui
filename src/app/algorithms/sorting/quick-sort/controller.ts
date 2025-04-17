import { BarsAnimation } from '@/app/shared/classes/BarsAnimation';
import { ObservableArray } from '@/app/shared/classes/ObservableArray';
import { AlgorithmController } from '@/app/shared/classes/SortingAlgorithmControllet';

import { QuickSort } from './model';

export class Controller extends AlgorithmController {
  private sorter = new QuickSort();
  private animation!: BarsAnimation;

  async sortAndAnimate(arr: number[]) {
    const observableArr = new ObservableArray(...arr);
    this.animation = new BarsAnimation(arr, this.svgRef, this.speed);
    observableArr.addObserver(this.animation);
    await this.sorter.sort(observableArr);
    await new Promise(r => setTimeout(r, 1000));
    this.animation.cleanUp(observableArr);
  }
}
