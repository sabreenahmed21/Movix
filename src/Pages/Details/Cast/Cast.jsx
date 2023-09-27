/* eslint-disable react/prop-types */
import "./Style.scss";
import  ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Image from "../../../Components/LazyLoadImage/Image";
import avatar from "../../../images/avatar.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Cast({ data, loading }) {
  console.log(data);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  const { url } = useSelector((state) => state.home);

  const SWIPER_SETTINGS = {
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      414: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  };

  
  return (
    <>
      <section className="sectionCast">
        <ContentWrapper>
          <div className="cast-header">Top Cast</div>
          {!loading ? (
            data && (
              <Swiper {...SWIPER_SETTINGS} className="mySwiper">
                {data?.map((res) => {
                  const imgCast = res.profile_path
                    ? url.profile + res.profile_path
                    : avatar;
                  return (
                    <SwiperSlide className="cast_list-items" key={res.cast_id}>
                      <div className="castBox">
                        <div className="castImage">
                          <Image src={imgCast} className="cast-img" />
                        </div>
                        <div className="castText">
                          <div className="castName">{res.name}</div>
                          <div className="castCharacter">{res.character}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )
          ) : (
            <div className="castSkeleton">
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </ContentWrapper>
      </section>
    </>
  );
}

export default Cast;
