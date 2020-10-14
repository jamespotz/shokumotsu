import queryString from "query-string";
const BASE_URI: string = "https://api.spoonacular.com";
const API_KEY: string = "YOUR API KEY HERE";

type ApiProps = {
  endpoint: string;
  params?: object;
};

const api = async ({ endpoint, params }: ApiProps): Promise<object> => {
  const query: queryString.StringifiableRecord = {
    apiKey: API_KEY,
    ...params,
  };

  const formattedQuery: string = queryString.stringify(query);
  const url: string = `${BASE_URI}/${endpoint}?${formattedQuery}`;

  try {
    const result: Response = await fetch(url);
    const data: object = await result.json();
    return data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default api;
