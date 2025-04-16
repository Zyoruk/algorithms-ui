'use client';
import React, { useEffect, useRef, useMemo } from 'react';
import { AlgorithmController } from '../classes/SortingAlgorithmControllet';

interface Props<C extends AlgorithmController> {
  Controller: new (svg: SVGSVGElement) => C;
  initialSize?: number;
}

export default function SortingVisualizer<C extends AlgorithmController>({
  Controller,
  initialSize = 50,
}: Props<C>) {
  const data = useMemo(
    () => Array.from({ length: initialSize }, () =>
      Math.floor(Math.random() * initialSize)
    ),
    [initialSize]
  );
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const anim = new Controller(svgRef.current);
    anim.sortAndAnimate(data);
  }, [Controller, data]);

  return <svg ref={svgRef} width="1000" height="500" />;
}