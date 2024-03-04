import { ObservableWeightedGraph } from "./ObservableWeightedGraph";
import { Observer, ObservedDataEventGraph } from "./Observer";
import * as d3 from "d3";

interface Node {
  id: number;
}

interface Link {
  source: number;
  target: number;
  weight: number;
}

export class GraphAnimation extends Observer<ObservableWeightedGraph> {
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement | null, any>;
  width: number;
  height: number;

  constructor(private graph: ObservableWeightedGraph, svgRef: SVGSVGElement) {
    super();
    this.svg = d3.select(svgRef);
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.initializeGraph();
  }

  private async initializeGraph() {
    // Create force simulation
    const nodes = this.graph.getAllNodes().map((id) => ({ index: id }));
    const links = await Promise.all(
      this.graph.getAllNodes().flatMap(async (node) =>
        (await this.graph.getEdges(node)).map((edge) => ({
          source: node,
          target: edge.node,
          weight: edge.weight,
        }))
      )
    );

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.index!)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    // Add links
    const link = this.svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line");
  }

  animateDijkstra(previousNodes: { [key: number]: number }, endNode: number) {
    // Build the shortest path
    let shortestPath: number[] = [];
    let currentNode = endNode;
    while (currentNode != null) {
      shortestPath.unshift(currentNode);
      currentNode = previousNodes[currentNode];
    }

    // Animate the shortest path
    this.svg
      .selectAll("circle")
      .filter((d: any) => shortestPath.includes(d.index!))
      .transition()
      .duration(500)
      .style("fill", "purple");
  }

  update(graph: ObservableWeightedGraph, data: ObservedDataEventGraph) {
    // Bind data to circles
    let nodes = this.svg.selectAll("circle").data(graph.getAllNodes());

    // Update existing nodes
    nodes.attr("r", 10).style("fill", "steelblue");

    // Animate
    switch (data.type) {
      case "add":
        // Animate addition of a node or edge
        nodes
          .filter((d) => data.nodes.includes(d))
          .transition()
          .duration(500)
          .style("fill", "green");
        break;
      case "remove":
        // Animate removal of a node or edge
        nodes
          .filter((d) => data.nodes.includes(d))
          .transition()
          .duration(500)
          .style("fill", "red");
        break;
      case "get":
        // Animate getting of a node's edges
        nodes
          .filter((d) => d === data.node)
          .transition()
          .duration(500)
          .style("fill", "purple");
        break;
      case "dijkstra":
        // Animate Dijkstra's algorithm
        this.animateDijkstra(data.previousNodes, data.endNode);
        break;
    }
  }

  cleanUp(graph: ObservableWeightedGraph) {
    // Bind data to circles
    let nodes = this.svg.selectAll("circle").data(graph.getAllNodes());

    // Update existing nodes
    nodes.attr("r", 10).style("fill", "steelblue");
  }
}
