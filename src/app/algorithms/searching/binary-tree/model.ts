import { ObservableTree } from '@/app/shared/classes/ObservableTree'
import { TreeNode } from '@/app/shared/classes/TreeNode'

export class BinaryTreeSearch {
  constructor(private observableTree: ObservableTree<number>) {}

  /**
   * Build a BST from an array of numbers, emitting an 'insert' event for each node.
   */
  build(values: number[]): TreeNode<number> {
    if (values.length === 0) {
        throw new Error('Cannot build a tree from an empty array')
    }
    const root = new TreeNode<number>(values[0])
    this.observableTree.setRoot(root)
    this.observableTree.notify({ type: 'insert', node: root })
    for (let i = 1; i < values.length; i++) {
      this.insert(root, values[i])
    }
    return root
  }

  /**
   * Recursive BST insert that emits 'compare' before descending
   * and 'insert' when a new node is created.
   */
  insert(node: TreeNode<number>, value: number): void {
    this.observableTree.notify({ type: 'compare', node })
    if (value < node.value) {
      if (node.left === null) {
        node.left = new TreeNode<number>(value)
        this.observableTree.notify({ type: 'insert', node: node.left })
      } else {
        this.insert(node.left, value)
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode<number>(value)
        this.observableTree.notify({ type: 'insert', node: node.right })
      } else {
        this.insert(node.right, value)
      }
    }
  }

  /**
   * Recursive BST search that emits 'visit' on each node it inspects.
   */
  search(node: TreeNode<number> | null, target: number): TreeNode<number> | null {
    if (!node) return null
    this.observableTree.notify({ type: 'visit', node })
    if (target === node.value) {
      return node
    }
    return target < node.value
      ? this.search(node.left, target)
      : this.search(node.right, target)
  }
}