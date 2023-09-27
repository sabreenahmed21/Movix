import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../../Hooks/UseFetch";
import { useSelector } from "react-redux";
import Image from "../../../Components/LazyLoadImage/Image";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import "./Style.scss";

function HeroBanner() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const [background, setBackground] = useState("");
  const { data, loading } = UseFetch("/movie/upcoming");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 20);
    const bg = url.backdrop + data?.results?.[randomIndex]?.backdrop_path;
    setBackground(bg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const SearchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="herobanner-content">
        <div className="backdrop-img">
          {!loading && (
            <Image src={background} className="Lazy_load_img-background" />
          )}
        </div>
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="herobanner-text">
            <h1 className="title">Welcome.</h1>
            <p className="sub-title">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show....."
                onKeyUp={SearchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => navigate(`/search/${query}`)}>search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}

export default HeroBanner;
