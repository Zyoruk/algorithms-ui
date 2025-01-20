import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  target: number;
  setTarget: (target: number) => void;
  range: { min: number; max: number };
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  target: 0,
  setTarget: () => {},
  range: { min: 0, max: 0 },
  isSearching: false,
  setIsSearching: () => {},
});

export const SearchProvider = ({ children, range }: { children: ReactNode; range: { min: number; max: number } }) => {
  const [target, setTarget] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <SearchContext.Provider value={{ target, setTarget, range, isSearching, setIsSearching }}>
      {children}
    </SearchContext.Provider>
  );
};
