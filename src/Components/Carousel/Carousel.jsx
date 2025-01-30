/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import "./Style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import Poster from "../../images/no-poster.png";
import ContenWrapper from "../ContentWrapper/ContentWrapper";
import dayjs from "dayjs";
import Image from "../LazyLoadImage/Image";
import { useNavigate } from "react-router-dom";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

const SWIPER_SETTINGS = {
  spaceBetween: 20,
  navigation: true,
  modules: [Navigation],
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    414: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
};

function Carousel({ data, endPoint, title }) {
  if (!Array.isArray(data)) {
    return null;
  }
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const swiper = (
    <Swiper {...SWIPER_SETTINGS} className="mySwiper">
      {data.map((item) => {
        const poster_url = item?.poster_path
          ? url.poster + item?.poster_path
          : Poster;
        return (
          <SwiperSlide
            key={item.id}
            onClick={() =>
              navigate(`/${item?.media_type || endPoint}/${item.id}`)
            }
          >
            <div className="box-carousel">
              <div className="posterBlock">
                <Image src={poster_url} className="img-carousel" />
                <div className="rate-genre">
                  <CircleRating rating={item?.vote_average.toFixed(1)} />
                  <Genres data={item?.genre_ids.slice(0, 1)} />
                </div>
              </div>
              <div className="textBlock">
                <span className="title-carousel">
                  {item?.title || item?.name}
                </span>
                <span className="date-carousel">
                  {dayjs(item?.release_date || item?.first_air_date).format(
                    "MMM D, YYYY"
                  )}
                </span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  return <ContenWrapper>
    {title && <div className="carouselTitle">{title}</div>}
    {swiper}
    </ContenWrapper>;
}

export default Carousel;
