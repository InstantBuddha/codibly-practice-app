import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import axios from "axios";
import ProductList from "./ProductList";

function App() {
  const urlBase = "https://reqres.in/api/products";
  const [params, setParams] = useState({ per_page: 5 });
  const [rawProductsData, setRawProductsData] = useState();
  const abortController = new AbortController();

  const getAxios = async (uniqueParams) => {
    return axios.get(urlBase, {
      params: uniqueParams,
      signal: abortController.signal,
    });
  };

  const fetchData = useCallback(async () => {
    await getAxios(params)
      .then((response) => {
        setRawProductsData(response.data.data);
        if (params.per_page !== response.data.total) {
          setParams((previousState) => {
            return { ...previousState, per_page: response.data.total };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const unmountCleanup = () => {
    console.log("unmountCleanup");
    abortController.abort();
  };

  useEffect(() => {
    fetchData();

    //return () => unmountCleanup();
  }, [fetchData, params]);

  console.log(rawProductsData);
  return (
    <div className="App">
      <h1>App</h1>
      {rawProductsData ? (
        <ProductList rawList={rawProductsData} />
      ) : (
        <p>Downloading data...</p>
      )}
    </div>
  );
}

export default App;
