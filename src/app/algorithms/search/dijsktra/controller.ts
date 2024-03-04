import { Dijkstra } from "./model";
import { ObservableWeightedGraph } from "@/app/shared/classes/ObservableWeightedGraph";
import { GraphAnimation } from "@/app/shared/classes/GraphAnimation";

export class Controller {
  sorter: Dijkstra;
  animation!: GraphAnimation;

  constructor(private svgRef: SVGSVGElement) {
    this.sorter = new Dijkstra();
  }

  async searchAndAnimate(target: number) {
    let observableArr = new ObservableWeightedGraph();
    this.animation = new GraphAnimation(observableArr, this.svgRef);
    observableArr.addObserver(this.animation);

    let numNodes = 10;
    let maxWeight = 20;

    // Add nodes to the graph
    for (let i = 0; i < numNodes; i++) {
      observableArr.addNode(i);
    }

    // Add edges to the graph
    for (let i = 0; i < numNodes; i++) {
      // random j
      let j = Math.floor(Math.random() * numNodes);
      for (j; j < numNodes; j++) {
        let weight = Math.floor(Math.random() * maxWeight) + 1;
        observableArr.addEdge(i, j, weight);
      }
    }
    console.log(observableArr);

    // pick a random starting node
    await this.sorter.search(
      observableArr,
      Math.floor(Math.random() * numNodes),
      target
    );
  }
}
