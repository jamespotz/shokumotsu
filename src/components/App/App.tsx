import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import api from "../../utils/api";
import ResultLists from "../ResultLists/ResultLists";

type DataResponse = {
  offset?: number;
  number?: number;
  totalResults?: number;
  results?: Array<object>;
  baseUri?: string;
};

const App = () => {
  const [data, setData] = useState<DataResponse | null>(null);
  const onChange = async (name: string) => {
    const data: DataResponse = await api({
      endpoint: "recipes/complexSearch",
      params: {
        query: name,
        addRecipeInformation: true,
        addRecipeNutrition: true,
      },
    });

    if (data) {
      setData(data);
      return;
    }

    setData(null);
  };

  React.useEffect(() => {
    // 37 <- and 39 ->
    const watch = (event: any) => console.log(event.keyCode);

    document.addEventListener("keydown", watch);

    return () => document.removeEventListener("keydown", watch);
  }, []);

  return (
    <div>
      <SearchBox
        name="query"
        placeholder="Search for recipes.."
        onChange={onChange}
      />
      {data ? (
        <ResultLists
          totalResults={data.totalResults}
          number={data.number}
          offset={data.offset}
          results={data.results}
        />
      ) : null}
    </div>
  );
};

export default App;
