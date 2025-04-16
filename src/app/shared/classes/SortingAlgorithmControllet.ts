export abstract class AlgorithmController {
    constructor(
      protected svgRef: SVGSVGElement,
      protected speed = 5  // ← default speed multiplier
    ) {}
    abstract sortAndAnimate(arr: number[]): Promise<void>;
  }