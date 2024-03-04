import { ObservedDataEventGraph, Observer } from "./Observer";
import { PriorityQueue } from "./PriorityQueue";

export class ObservableWeightedGraph {
  private graph: { [key: number]: { node: number; weight: number }[] } = {};
  private observers: Observer<ObservableWeightedGraph>[];
  constructor() {
    this.observers = [];
  }

  addObserver(observer: Observer<ObservableWeightedGraph>) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<ObservableWeightedGraph>) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  async notifyObservers(event: ObservedDataEventGraph) {
    this.observers.forEach((observer) => observer.update(this, event));
    return Promise.all([
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      }),
      ...this.observers.map((observer) => {
        return new Promise((resolve) => {
          observer.update(this, event);
          resolve(true);
        });
      }),
    ]);
  }

  async addNode(node: number) {
    if (!this.graph[node]) {
      this.graph[node] = [];
      await this.notifyObservers({ type: "add", nodes: [node] });
    }
  }

  async removeNode(node: number) {
    if (this.graph[node]) {
      delete this.graph[node];
      await this.notifyObservers({ type: "remove", nodes: [node] });
    }
  }

  async addEdge(node1: number, node2: number, weight: number) {
    this.addNode(node1);
    this.addNode(node2);
    this.graph[node1].push({ node: node2, weight });
    await this.notifyObservers({ type: "add", nodes: [node1, node2] });
  }

  async getEdges(node: number) {
    const edges = this.graph[node];
    await this.notifyObservers({
      type: "get",
      node,
      edges: edges.map((edge) => edge.node),
    });
    return edges;
  }

  getAllNodes(): number[] {
    return Object.keys(this.graph).map(Number);
  }

  async dijsktra(startNode: number, endNode: number) {
    let distances: Record<number, number> = {};
    let previousNodes: Record<number, number> = {};
    let queue = new PriorityQueue();

    // Initialize distances and queue
    Object.keys(this.graph)
      .map((k) => Number(k))
      .forEach((node) => {
        distances[node] = node === startNode ? 0 : Infinity;
        queue.enqueue(node, distances[node]);
      });

    while (queue.queue.length > 0) {
      let currentNode = queue.dequeue();
      if (currentNode === undefined) {
        break;
      }

      const currentNeighbors = this.graph[currentNode.node];
      if (currentNeighbors) {
        currentNeighbors.forEach((neighbor) => {
          let distance = distances[currentNode!.node] + neighbor.weight;
          if (distance < distances[neighbor.node]) {
            distances[neighbor.node] = distance;
            previousNodes[neighbor.node] = currentNode!.node;
            queue.enqueue(neighbor.node, distance);
          }
        });
      }
    }

    // Notify observers with the result of Dijkstra's algorithm
    await this.notifyObservers({ type: "dijkstra", previousNodes, endNode });
  }
}
