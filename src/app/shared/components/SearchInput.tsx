"use client";
import React, { useState, useContext } from 'react';

import { SearchContext } from '../context/SearchContext';

const SearchInput = ({ disabled }: { disabled: boolean }) => {
  const { setTarget, range, setIsSearching } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      setTarget(value);
      setIsSearching(true);
    }
  };

  return (
    <div>
      <div>
        <p>Enter a target value to search for:</p>
        <input type="number" value={inputValue} onChange={handleInputChange} disabled={disabled} max={range.max} min={range.min} style={{
          color: disabled ? "gray" : "black",
        }}/>
        <button onClick={handleSearchClick} disabled={disabled} style={{ marginLeft: 10}}>Start Search</button>
      </div>
      <div>
        <p>Range of values: {range.min} - {range.max}</p>
      </div>
    </div>
  );
};

export default SearchInput;
