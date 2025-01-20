"use client";

import { useEffect, useRef, useContext } from "react";
import { Controller } from "./controller";
import SearchInput from "@/app/shared/components/SearchInput";
import { SearchContext } from "@/app/shared/context/SearchContext";

const BinarySearchPage = ( { data } : { data: Array<number>}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { target, isSearching, setIsSearching } = useContext(SearchContext);
  const  animationRef = useRef<Controller | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    animationRef.current = new Controller(svgRef.current);
    animationRef.current.initializeGraph(data);
  }, [data, svgRef]);

  useEffect(() => {
    if (!target || !animationRef.current) return;
    if (isSearching) { 
      animationRef.current.searchAndAnimate(data, target).finally(() => setIsSearching(false));
    }
  }, [data, target, isSearching, setIsSearching]);

  return (
      <div>
        <SearchInput disabled={isSearching} />
        <div>
        <svg ref={svgRef} width="1000" height="500"></svg>
        </div>
      </div>
  );
};

export default BinarySearchPage;
