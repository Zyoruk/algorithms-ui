"use client";

import { useEffect, useRef } from "react";
import { Controller } from "./controller";

const data = new Array(500)
  .fill(0)
  .map(() => Math.floor(Math.random() * 500))
  .sort((a, b) => a - b);

const Page = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const target = 249;

  useEffect(() => {
    if (!svgRef.current) return;
    const animation = new Controller(svgRef.current);
    animation.searchAndAnimate(data, target).then();
  }, [svgRef, target]);

  return (
    <div>
      <h1>Page</h1>
      <div>
        <p>Target: {target}</p>
      </div>
      <div>
        <svg ref={svgRef} width="1000" height="500"></svg>
      </div>
    </div>
  );
};

export default Page;
