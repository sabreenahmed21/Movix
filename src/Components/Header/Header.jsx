import "./Style.scss";
import logo from "../../images/movix-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiAlignRight, FiX } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";

function Header() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movie
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            Tv
          </li>
          <li className="menuItem">
            <BsSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <BsSearch onClick={openSearch} />
          {mobileMenu ? (
            <FiX onClick={() => setMobileMenu(false)} />
          ) : (
            <FiAlignRight onClick={openMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <FiX onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
