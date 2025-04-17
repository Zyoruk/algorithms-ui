import { ObservableTree } from '@/app/shared/classes/ObservableTree'
import { TreeAnimation } from '@/app/shared/classes/TreeAnimation'
import { TreeNode } from '@/app/shared/classes/TreeNode'

import { BinaryTreeSearch } from './model'

export class Controller {
  private observableTree = new ObservableTree<number>()
  private model = new BinaryTreeSearch(this.observableTree)
  private animation!: TreeAnimation
  private root!: TreeNode<number>

  /**
   * Initialize the tree, animation and render initial state.
   */
  init(svg: SVGSVGElement, values: number[], target: number) {
    // build BST and wire up observers → animation
    if (values.length === 0) {
        return
    }
    try { 
        console.log(values)
        this.root = this.model.build(values)
        this.animation = new TreeAnimation(svg, this.observableTree, this.root)
        this.animation.render()      // draw nodes/edges
        this.animation.center()      // center in viewport
        this.animation.update()      // initial styling
        this.animation.highlightTarget(target)
    } catch (e) {
        console.error('Error building tree:', e)
    }
  }

  /**
   * Kick off the search traversal (fires visit events).
   */
  startSearch(target: number) {
    this.animation.resetHighlights()
    this.model.search(this.root, target)
  }

  /**
   * Reset entire tree & animation (e.g. on “shuffle” or “new input”).
   */
  reset(svg: SVGSVGElement, values: number[], target: number) {
    this.observableTree = new ObservableTree<number>()
    this.model = new BinaryTreeSearch(this.observableTree)
    this.init(svg, values, target)
  }
}