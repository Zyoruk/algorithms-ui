'use client';
import React from 'react';

interface Props {
  size: number;
  speed: number;
  onSizeChange(n: number): void;
  onSpeedChange(n: number): void;
  onShuffle(): void;
}

export default function SortingControls({
  size,
  speed,
  onSizeChange,
  onSpeedChange,
  onShuffle,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-lg shadow">
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="font-medium text-gray-700">Size:</label>
        <input
          id="size"
          type="range"
          min="10"
          max="200"
          value={size}
          onChange={e => onSizeChange(+e.target.value)}
          className="w-32 accent-blue-500"
        />
        <span className="w-8 text-right">{size}</span>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="speed" className="font-medium text-gray-700">Speed:</label>
        <input
          id="speed"
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={e => onSpeedChange(+e.target.value)}
          className="w-32 accent-blue-500"
        />
        <span className="w-8 text-right">{speed}×</span>
      </div>

      <button
        onClick={onShuffle}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Shuffle
      </button>
    </div>
  );
}
