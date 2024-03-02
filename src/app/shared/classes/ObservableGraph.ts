import { ObservedDataEventGraph, Observer } from "./Observer";

export class ObservableGraph {
  private observers: Observer<ObservableGraph>[];
  private graph: Map<number, number[]>;
  constructor() {
    this.observers = [];
    this.graph = new Map();
  }

  addObserver(observer: Observer<ObservableGraph>) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<ObservableGraph>) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data: ObservedDataEventGraph) {
    this.observers.forEach((observer) => observer.update(this, data));
  }

  addEdge(node1: number, node2: number) {
    if (!this.graph.has(node1)) {
      this.graph.set(node1, []);
    }
    this.graph.get(node1)!.push(node2);
    this.notifyObservers({ type: "add", nodes: [node1, node2] });
  }

  removeEdge(node1: number, node2: number) {
    if (this.graph.has(node1)) {
      const edges = this.graph.get(node1)!;
      const index = edges.indexOf(node2);
      if (index > -1) {
        edges.splice(index, 1);
        this.notifyObservers({ type: "remove", nodes: [node1, node2] });
      }
    }
  }
  getEdges(node: number) {
    if (this.graph.has(node)) {
      this.notifyObservers({
        type: "get",
        node: node,
        edges: this.graph.get(node)!,
      });
      return this.graph.get(node)!;
    }
    return [];
  }
}
