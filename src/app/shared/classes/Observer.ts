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

export type ObservedDataEventGraph =
  | ObserverDataEventAdd
  | ObserverDataEventRemove
  | ObserverDataEventGet;

export abstract class Observer<T> {
  abstract update(
    data: T,
    event: ObservedDataEvent | ObservedDataEventGraph
  ): void;
}
