export abstract class AlgorithmController {
    constructor(protected svgRef: SVGSVGElement) {}
    abstract sortAndAnimate(arr: number[]): Promise<void>;
}
