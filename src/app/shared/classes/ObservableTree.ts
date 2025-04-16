import { TreeNode } from './TreeNode'

export type TreeEventType = 'visit' | 'compare' | 'insert'

export interface TreeEvent<T> {
  type: TreeEventType
  node: TreeNode<T>
}

export type TreeObserver<T> = (ev: TreeEvent<T>) => void

export class ObservableTree<T> {
  private root: TreeNode<T> | null = null
  private observers: TreeObserver<T>[] = []

  setRoot(root: TreeNode<T>) {
    this.root = root
  }

  getRoot(): TreeNode<T> | null {
    return this.root
  }

  addObserver(obs: TreeObserver<T>) {
    this.observers.push(obs)
  }

  notify(event: TreeEvent<T>) {
    this.observers.forEach(o => o(event))
  }
}