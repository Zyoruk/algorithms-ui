import { ObservableWeightedGraph } from "@/app/shared/classes/ObservableWeightedGraph";

export class Dijkstra {
  graph: ObservableWeightedGraph;
  constructor() {
    this.graph = new ObservableWeightedGraph();
  }
  async search(array: ObservableWeightedGraph, start: number, target: number) {
    this.graph = array;
    return this.graph.dijsktra(start, target);
  }
}
