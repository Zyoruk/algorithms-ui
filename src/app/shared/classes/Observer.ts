export type ObservedDataEvent = {
  type: "swap" | "compare" | "set";
  indices: number[];
};

type ObserverDataEventAdd = {
  type: "add";
  nodes: number[];
};

type ObserverDataEventRemove = {
  type: "remove";
  nodes: number[];
};

type ObserverDataEventGet = {
  type: "get";
  node: number;
  edges: number[];
};

type ObserverDataEventDijkstra = {
  type: "dijkstra";
  previousNodes: { [key: number]: number };
  endNode: number;
};

export type ObservedDataEventGraph =
  | ObserverDataEventAdd
  | ObserverDataEventRemove
  | ObserverDataEventGet
  | ObserverDataEventDijkstra;

export abstract class Observer<T> {
  abstract update(
    data: T,
    event: ObservedDataEvent | ObservedDataEventGraph
  ): void;
}
