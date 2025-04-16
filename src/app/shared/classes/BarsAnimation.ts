import { ObservableArray } from "./ObservableArray";
import { ObservedDataEvent, Observer } from "./Observer";
import * as d3 from "d3";

export class BarsAnimation extends Observer<ObservableArray> {
  private baseDuration = 500;
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement | null, any>;
  width: number;
  height: number;
  barWidth: number;

  constructor(private array: number[] = [], svgRef: SVGSVGElement, private speed = 1) {
    super();
    this.svg = d3.select(svgRef);
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.barWidth = this.width / this.array.length;
    this.initializeGraph();
  }

  private initializeGraph() {
    // Bind data to rectangles
    let bars = this.svg.selectAll("rect").data(this.array);

    // Enter new bars
    bars
      .enter()
      .append("rect")
      .attr("width", this.barWidth)
      .attr("height", (d) => (this.height * d) / (d3.max(this.array) ?? 1))
      .attr("x", (d, i) => this.barWidth * i)
      .attr(
        "y",
        (d) => this.height - (this.height * d) / (d3.max(this.array) ?? 1)
      )
      .style("fill", "steelblue");
  }

  resetGraph(array: number[]) {
    this.array = array;
    this.barWidth = this.width / this.array.length;
    this.svg.selectAll("rect").remove();
    this.initializeGraph();
  }

  update(array: ObservableArray, data: ObservedDataEvent) {
    // Bind data to rectangles
    let bars = this.svg.selectAll("rect").data(array);

    // Update existing bars
    bars
      .attr("height", (d) => (this.height * d) / d3.max(array))
      .attr("y", (d) => this.height - (this.height * d) / d3.max(array))
      .style("fill", "steelblue");

    // Animate
    const duration = this.baseDuration / this.speed;
    switch (data.type) {
      case "compare":
        // Animate comparison
        bars
          .filter((d, i) => data.indices.includes(i))
          .transition()
          .duration(duration)
          .style("fill", "red");
        break;
      case "swap":
        // Animate swap
        bars
          .filter((d, i) => data.indices.includes(i))
          .transition()
          .duration(duration)
          .style("fill", "green");
        break;
      case "set":
        // Animate setting of an element
        bars
          .filter((d, i) => data.indices.includes(i))
          .transition()
          .duration(duration)
          .style("fill", "purple");
        break;
    }
  }

  cleanUp(array: ObservableArray) {
    // Bind data to rectangles
    let bars = this.svg.selectAll("rect").data(array);
    // Update existing bars
    bars
      .attr("height", (d) => (this.height * d) / d3.max(array))
      .attr("y", (d) => this.height - (this.height * d) / d3.max(array))
      .style("fill", "steelblue");
  }
}
