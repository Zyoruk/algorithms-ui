export class PriorityQueue {
  queue: {
    node: number;
    priority: number;
  }[];
  constructor() {
    this.queue = [];
  }

  enqueue(node: number, priority: number) {
    this.queue.push({ node, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }
}
