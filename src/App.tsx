import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import axios from "axios";
import ProductList from "./ProductList";
import Searchbar from "./Searchbar";
import Paginator from "./Paginator";

function App() {
  const urlBase = "https://reqres.in/api/products";
  const [params, setParams] = useState({ per_page: 5 });
  const [rawProductsData, setRawProductsData] = useState();
  const [displayList, setDisplayList] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
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

  const displayContent = () => {
    if (isSearchPerformed && searchResults.length < 1){
      return <p>Nothing found</p>
    }
    const symbols =
        searchResults.length > 0
          ? sliceForPagination(searchResults)
          : sliceForPagination(rawProductsData);
    return <ProductList rawList={symbols} />
  }

  const sliceForPagination = (arrayToSlice) => {
    return arrayToSlice.slice(
      currentPage * 5,
      (currentPage + 1) * 5
    );
  };

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
        <div>
          <Searchbar />
          {displayContent()}
          <Paginator />
        </div>
      ) : (
        <p>Downloading data...</p>
      )}
    </div>
  );
}

export default App;
