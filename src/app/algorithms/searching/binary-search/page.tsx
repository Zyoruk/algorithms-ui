import { SearchProvider } from "@/app/shared/context/SearchContext";

import BinarySearchPage from "./binarySearch";

const data = new Array(100)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100))
  .sort((a, b) => a - b);

const Page = () => {
  return (
      <SearchProvider range={{ min: Math.min(...data), max: Math.max(...data) }}>
        <BinarySearchPage data={data} />
      </SearchProvider>
  );
};

export default Page;
