"use client";

import { useEffect, useRef } from "react";
import { BubbleSortController } from "./controller";

const data = new Array(100).fill(0).map(() => Math.floor(Math.random() * 100));

const Page = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const animation = new BubbleSortController(svgRef.current);
    animation.sortAndAnimate(data).then();
  }, [svgRef]);

  return (
    <div>
      <h1>Page</h1>
      <div>
        <svg ref={svgRef} width="1000" height="500"></svg>
      </div>
    </div>
  );
};

export default Page;
