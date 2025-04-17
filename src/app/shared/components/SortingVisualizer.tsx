'use client';
import React, { useState, useEffect, useRef } from 'react';

import { AlgorithmController } from '../classes/SortingAlgorithmControllet';

import SortingControls from './SortingControls';

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
  // version → changes whenever we want a brand‑new SVG
  const [version, setVersion] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const shuffle = () => {
    setData(Array.from({ length: size }, () => Math.floor(Math.random() * size)));
    setVersion(v => v + 1);
  };

  const handleSpeedChange = (n: number) => {
    setSpeed(n);
    setVersion(v => v + 1);
  };

  useEffect(() => {
    if (!svgRef.current) return;
    // now svgRef.current is always a fresh node
    const controller = new Controller(svgRef.current, speed);
    controller.sortAndAnimate([...data]);
  }, [data, speed, Controller, version]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SortingControls
        size={size}
        speed={speed}
        onSizeChange={n => { setSize(n); shuffle(); }}
        onSpeedChange={handleSpeedChange}
        onShuffle={shuffle}
      />
      <div className="bg-white rounded-lg shadow p-2">
        <svg
          key={version} // ← force React to remount this SVG
          ref={svgRef}
          width="1000"
          height="400"
        />
      </div>
    </div>
  );
}