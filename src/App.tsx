import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const urlBase = "https://reqres.in/api/products";
  let params = { page: 1, per_page: 5 };
  const [rawProductsData, setRawProductsData] = useState();
  const abortController = new AbortController();

  const fetchData = useCallback(async () => {
    await axios
      .get(urlBase, { params: params, signal: abortController.signal })
      .then((response) => {
        setRawProductsData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const unmountCleanup = () => {
    console.log("unmountCleanup");
    abortController.abort();
  };

  useEffect(() => {
    fetchData();

    //return () => unmountCleanup();
  }, [fetchData]);

  console.log(rawProductsData);
  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
}

export default App;
