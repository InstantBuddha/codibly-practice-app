import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import axios from "axios";
import ProductList from "./ProductList";
import Searchbar from "./Searchbar";
import Paginator from "./Paginator";

export type Product = {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
};

const emptyProduct = {color: "white",
  id: 99,
  name: "Downloading data...",
  pantone_value: "",
  year: 2022}

function App() {
  const URL_BASE: string = "https://reqres.in/api/products";
  const [params, setParams] = useState<{ per_page: number }>({ per_page: 5 });
  const [rawProductsData, setRawProductsData] = useState<Product[]>([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(99);
  const abortController = new AbortController();

  const getAxios = async (uniqueParams: { per_page: number }) => {
    return axios.get(URL_BASE, {
      params: uniqueParams,
      signal: abortController.signal,
    });
  };

  const fetchData = useCallback(async () => {
    await getAxios(params)
      .then((response) => {
        setRawProductsData(response.data.data);
        resetPagination(response.data.data.length);
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
    if (isSearchPerformed && searchResults.length < 1) {
      return <p>Nothing found</p>;
    }
    const symbols =
      searchResults.length > 0
        ? sliceForPagination(searchResults)
        : sliceForPagination(rawProductsData);
    return <ProductList rawList={symbols} />;
  };

  const sliceForPagination = (arrayToSlice: [Product]) => {
    return arrayToSlice.slice(currentPage * 5, (currentPage + 1) * 5);
  };

  const changeCurrentPage = (isAddition: boolean) => {
    isAddition
      ? currentPage < lastPage && setCurrentPage(currentPage + 1)
      : currentPage > 0 && setCurrentPage(currentPage - 1);
  };

  const resetPagination = (displayArrLength: number) => {
    setLastPage(Math.floor(displayArrLength / 5));
    setCurrentPage(0);
  };

  const updateSearchResult = (searchedId: number) => {
    const rawSearchResults:any = rawProductsData.find((product) => {
      return searchedId == product.id;
    });
    setSearchResults(() => {
      if (rawSearchResults) {
        return [rawSearchResults];
      }
      return [{ name: "No items found", id: 99 }];
    });
    resetPagination(rawSearchResults?.length);
    setIsSearchPerformed(true);
  };

  const unmountCleanup = () => {
    console.log("unmountCleanup");
    abortController.abort();
  };

  useEffect(() => {
    fetchData();

    //return () => unmountCleanup();
  }, [fetchData, params]);

  return (
    <div className="App">
      <h1>App</h1>
      {rawProductsData ? (
        <div>
          <Searchbar
            updateSearchResult={updateSearchResult}
            maxNum={rawProductsData.length}
          />
          {displayContent()}
          <Paginator
            currentPage={currentPage}
            changeCurrentPage={changeCurrentPage}
          />
        </div>
      ) : (
        <p>Downloading data...</p>
      )}
    </div>
  );
}

export default App;
