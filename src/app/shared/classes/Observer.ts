export type ObservedDataEvent = {
    type: 'swap' | 'compare' | 'set',
    indices: number[]
}

export abstract class Observer<T>  {
    abstract update(data: T, event: ObservedDataEvent): void;
}