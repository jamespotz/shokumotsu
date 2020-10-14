import React, { useState, useEffect } from "react";
import ResultList from "./ResultList";

type ResultListsProps = {
  number?: number;
  offset?: number;
  totalResults?: number;
  results?: Array<object>;
  baseUri?: string;
};

const ResultLists: React.FC<ResultListsProps> = ({
  number,
  totalResults,
  offset,
  results,
}) => {
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    if (totalResults && number) {
      setPageCount(Math.ceil(totalResults / number));
      return;
    }
    setPageCount(0);
  }, [totalResults, number]);

  return (
    <div>
      <span>
        {(offset || 0) + 1}/{pageCount}
      </span>
      {results && results.map((r) => <ResultList {...r} />)}
    </div>
  );
};

export default ResultLists;
