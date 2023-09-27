/* eslint-disable react/prop-types */
import "./Style.scss";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import Image from "../../../Components/LazyLoadImage/Image";
import { FiPlay } from "react-icons/fi";
import { useState } from "react";
import VideoPopup from '../../../Components/VideoPopup/VideoPopup';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function VideoSec({ data, loading }) {

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const SWIPER_SETTINGS = {
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      516: {
        slidesPerView: 1.5,
      },
      667: {
        slidesPerView:2,
      },
      768: {
        slidesPerView: 2.25,
      },
      991: {
        slidesPerView: 3,
      },
    },
    
  };

  return (
    <section className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <Swiper {...SWIPER_SETTINGS} className="mySwiper">
            {data?.results?.map((video) => (
              <SwiperSlide
                key={video.id}
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    className='videoImg'
                    alt='video'
                  />
                  <FiPlay className="iconPlay"/>
                </div>
                <div className="videoTitle">{video.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
    </section>
  );
}

export default VideoSec;
