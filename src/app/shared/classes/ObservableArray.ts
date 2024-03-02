import { ObservedDataEvent, Observer } from "./Observer";

export class ObservableArray extends Array {
  private observers: Observer<ObservableArray>[];
  constructor(...items: number[]) {
    super(...items);
    this.observers = [];
  }

  addObserver(observer: Observer<ObservableArray>) {
    this.observers.push(observer);
  }

  notifyObservers(data: ObservedDataEvent) {
    this.observers.forEach((observer) => observer.update(this, data));
  }

  swap(i: number, j: number) {
    let temp = this[i];
    this[i] = this[j];
    this[j] = temp;
    this.notifyObservers({ type: "swap", indices: [i, j] });
  }

  compare(i: number, j: number) {
    this.notifyObservers({ type: "compare", indices: [i, j] });
    return this[i] > this[j];
  }

  set(i: number, value: number) {
    this[i] = value;
    this.notifyObservers({ type: "set", indices: [i] });
  }
}
