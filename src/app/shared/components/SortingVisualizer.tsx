'use client';
import React, { useState, useEffect, useRef } from 'react';
import SortingControls from './SortingControls';
import { AlgorithmController } from '../classes/SortingAlgorithmControllet';

interface Props<C extends AlgorithmController> {
  Controller: new (svg: SVGSVGElement, speed?: number) => C;
  initialSize?: number;
  initialSpeed?: number;
}

export default function SortingVisualizer<C extends AlgorithmController>({
  Controller,
  initialSize = 50,
  initialSpeed = 5,
}: Props<C>) {
  const [size, setSize] = useState(initialSize);
  const [speed, setSpeed] = useState(initialSpeed);
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: initialSize }, () => Math.floor(Math.random() * initialSize))
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const shuffle = () => {
    setData(Array.from({ length: size }, () => Math.floor(Math.random() * size)));
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const controller = new Controller(svgRef.current, speed);
    controller.sortAndAnimate([...data]);
  }, [data, speed, Controller]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SortingControls
        size={size}
        speed={speed}
        onSizeChange={n => { setSize(n); shuffle(); }}
        onSpeedChange={setSpeed}
        onShuffle={shuffle}
      />
      <div className="bg-white rounded-lg shadow p-2">
        <svg ref={svgRef} width="1000" height="400" />
      </div>
    </div>
  );
}