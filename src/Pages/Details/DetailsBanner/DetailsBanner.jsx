/* eslint-disable react/prop-types */
import UseFetch from "../../../Hooks/UseFetch";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import "./Style.scss";
import { useSelector } from "react-redux";
import Image from "../../../Components/LazyLoadImage/Image";
import Poster from "../../../images/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../Components/Genres/Genres";
import CircleRating from "../../../Components/CircleRating/CircleRating";
import { FiPlay } from "react-icons/fi";
import { useState } from "react";
import VideoPopup from "../../../Components/VideoPopup/VideoPopup";

function DetailsBanner({ crew, video }) {
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((s) => s.home);
  const genres = data?.genres?.map((g) => g.id);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <section className="detailsBanner">
      {!loading ? (
        data && (
          <>
            <div className="backdropImg_detail">
              {data?.poster_path ? (
                <Image
                  src={url.backdrop + data.backdrop_path}
                  className="img_details"
                />
              ) : (
                <Image src={Poster} className="img_details" />
              )}
            </div>
            <div className="opacity-layer"></div>
            <ContentWrapper>
              <div className="content">
                <div className="left">
                  <Image
                    src={url.poster + data.poster_path}
                    className="img-poster_details"
                  />
                </div>
                <div className="right">
                  <div className="title">
                    {data.name || data.title} (
                    {dayjs(data.release_date).format("YYYY")})
                  </div>
                  <div className="sub_title">{data.tagline}</div>
                  <Genres data={genres} />
                  <div className="row">
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <div className="playbtn">
                      <FiPlay
                        onClick={() => (setShow(true), setVideoId(video.key))}
                      />
                      <span onClick={() => (setShow(true), setVideoId(video.key))}>Watch Trailer</span>
                    </div>
                  </div>
                  <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">{data.overview}</div>
                  </div>
                  <div className="status">
                    {data.status && (
                      <div className="infoItem">
                        <span>Status: </span>
                        <span>{data.status}</span>
                      </div>
                    )}
                    {data.release_date && (
                      <div className="infoItem">
                        <span>Release Date: </span>
                        <span>
                          {dayjs(data.release_date).format("MMM  DD, YYYY")}
                        </span>
                      </div>
                    )}
                    {data.runtime && (
                      <div className="infoItem">
                        <span>Run Time: </span>
                        <span>{toHoursAndMinutes(data.runtime)}</span>
                      </div>
                    )}
                  </div>
                  {director?.length > 0 && (
                    <div className="info">
                      <span className="span-info">Director: </span>
                      <span>
                        {director.map((d, i) => (
                          <span key={i}>
                            {d.name}
                            {director.length - 1 !== i && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {writer?.length > 0 && (
                    <div className="info">
                      <span className="span-info">Writer: </span>
                      <span className="text">
                        {writer?.map((d, i) => (
                          <span key={i}>
                            {d.name}
                            {writer.length - 1 !== i && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {data?.created_by?.length > 0 && (
                    <div className="info">
                      <span className="span-info">Creator: </span>
                      <span className="text">
                        {data?.created_by?.map((d, i) => (
                          <span key={i}>
                            {d.name}
                            {data?.created_by.length - 1 !== i && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </ContentWrapper>
          </>
        )
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </section>
  );
}

export default DetailsBanner;
