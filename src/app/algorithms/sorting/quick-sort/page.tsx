"use client";

import { useEffect, useRef } from "react";
import { Controller } from "./controller";

const data = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100));

const Page = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const animation = new Controller(svgRef.current);
    animation.sortAndAnimate(data).then();
  }, [svgRef]);

  return (
    <div>
      <svg ref={svgRef} width="1000" height="500"></svg>
    </div>
  );
};

export default Page;
