import DetailsBanner from "./DetailsBanner/DetailsBanner"
import UseFetch from "../../Hooks/UseFetch";
import { useParams } from "react-router-dom";
import Cast from "./Cast/Cast";
import VideoSec from "./VideoSeaction/VideoSec";
import Recommendation from "./Carousels/Recommindations/Recommindation";
import Similar from "./Carousels/Similar/Similar";


function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}/videos`);
  const { data:credits, loading:creditsLoading } = UseFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSec data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details