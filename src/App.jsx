import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchDataFromApi } from "./utilities/Api";

import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./Slices/HomeSlice";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Explore from "./Pages/Explore/Explore";
import PageNotFound from "./Pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
};

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
