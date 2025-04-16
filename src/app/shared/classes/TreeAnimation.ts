import { ObservableTree, TreeEvent } from './ObservableTree'
import { TreeNode } from './TreeNode'

interface Pos { x: number; y: number }

export class TreeAnimation {
  private svg: SVGSVGElement
  private tree: ObservableTree<number>
  private root: TreeNode<number>
  private positions = new Map<TreeNode<number>, Pos>()
  private nodeGMap = new Map<TreeNode<number>, SVGGElement>()

  // spacing
  private hSpacing = 60
  private vSpacing = 80
  private nodeR = 18

  constructor(
    svg: SVGSVGElement,
    tree: ObservableTree<number>,
    root: TreeNode<number>
  ) {
    this.svg = svg
    this.tree = tree
    this.root = root
    this.tree.addObserver(ev => this.onEvent(ev))
  }

  /** computes inorder positions */
  private computeLayout() {
    this.positions.clear()
    let idx = 0
    const dfs = (node: TreeNode<number> | null, depth: number) => {
      if (!node) return
      dfs(node.left, depth + 1)
      this.positions.set(node, {
        x: idx++ * this.hSpacing + this.nodeR,
        y: depth * this.vSpacing + this.nodeR
      })
      dfs(node.right, depth + 1)
    }
    dfs(this.root, 0)
  }

  render() {
    // clear
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild)
    this.computeLayout()

    console.log(this.positions)
    // draw edges
    for (const [node, pos] of this.positions) {
      ;[ 'left', 'right' ] .forEach(dir => {
        const child = (node as any)[dir] as TreeNode<number> | null
        if (child && this.positions.has(child)) {
          const cp = this.positions.get(child)!
          const line = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'line'
          )
          line.setAttribute('x1', pos.x.toString())
          line.setAttribute('y1', pos.y.toString())
          line.setAttribute('x2', cp.x.toString())
          line.setAttribute('y2', cp.y.toString())
          line.setAttribute('stroke', '#aaa')
          this.svg.appendChild(line)
        }
      })
    }

    // draw nodes
    this.nodeGMap.clear()
    for (const [node, pos] of this.positions) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('transform', `translate(${pos.x},${pos.y})`)

      // circle
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      c.setAttribute('r', this.nodeR.toString())
      c.setAttribute('fill', '#fff')
      c.setAttribute('stroke', '#333')
      g.appendChild(c)

      // label
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      t.setAttribute('text-anchor', 'middle')
      t.setAttribute('dy', '5')
      t.textContent = node.value.toString()
      g.appendChild(t)

      // finally append and cache
      this.svg.appendChild(g)
      this.nodeGMap.set(node, g)
    }
  }

  /** optional centering if svg is in a container */
  center() {
    // no-op or implement viewBox centering
  }

  update() {
    // no-op for now
  }

  highlightTarget(target: number) {
    // highlight the node whose value === target
    for (const [node, g] of this.nodeGMap) {
      if (node.value === target) {
        const c = g.querySelector('circle')
        if (c) c.setAttribute('stroke', 'orange')
      }
    }
  }

  resetHighlights() {
    for (const g of this.nodeGMap.values()) {
      const c = g.querySelector('circle')
      if (c) {
        c.setAttribute('fill', '#fff')
        c.setAttribute('stroke', '#333')
      }
    }
  }

  private onEvent(ev: TreeEvent<number>) {
    const g = this.nodeGMap.get(ev.node)
    if (!g) return
    const c = g.querySelector('circle')
    if (!c) return

    switch (ev.type) {
      case 'insert':
        c.setAttribute('fill', '#e0ffe0')
        break
      case 'compare':
        c.setAttribute('stroke', 'blue')
        break
      case 'visit':
        c.setAttribute('fill', '#ffeb3b')
        break
    }
  }
}