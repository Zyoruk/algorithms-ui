'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react'

import { Controller } from './controller'

export const BinaryTreeSearchUI: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    const [values, setValues] = useState<number[]>([])
    const [target, setTarget] = useState<number>(0)
    const controllerRef = useRef<Controller | null>(null)

    // generate a new random array
    const shuffleValues = () => {
        const arr = Array.from({ length: 30 }, () =>
            Math.floor(Math.random() * 100)
        )
        setValues(arr)
        setTarget(arr[0])
    }

    // build/reset the tree
    const buildTree = useCallback(() => {
        if (!svgRef.current) return
        controllerRef.current = new Controller()
        controllerRef.current.init(svgRef.current, values, target)
    }, [values, target])

    useEffect(() => {
        shuffleValues()
    }, [])

    useEffect(() => {
        buildTree()
    }, [values, target, buildTree])

    useEffect(() => {
        if (controllerRef.current) {
            controllerRef.current.reset(svgRef.current!, values, target)
        }
    }, [values, target])
    return (
        <div className="w-[80vw] flex flex-col h-full">
            <div className="flex gap-2 mb-4" suppressHydrationWarning>
                <button onClick={shuffleValues} className="btn" suppressHydrationWarning>Shuffle</button>
                <input
                    suppressHydrationWarning
                    type="number"
                    value={target}
                    onChange={e => setTarget(Number(e.target.value))}
                    className="input text-black placeholder-gray-500"
                />
                <button
                    suppressHydrationWarning
                    onClick={() => controllerRef.current?.startSearch(target)}
                    className="btn"
                >
                    Search
                </button>
                <button onClick={buildTree} className="btn" suppressHydrationWarning>
                    Reset
                </button>
            </div>

            <div className="flex-1 w-full overflow-x-auto overflow-y-hidden">
                <div className="inline-block min-w-max">
                    <svg
                        ref={svgRef}
                        className="h-[600px]"
                    />
                </div>
            </div>
        </div>
    )
}