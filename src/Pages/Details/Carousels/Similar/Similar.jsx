/* eslint-disable react/prop-types */
import Carousel from '../../../../Components/Carousel/Carousel'
import UseFetch from "../../../../Hooks/UseFetch";
import './Style.scss'

const Similar = ({ mediaType, id }) => {
  const { data, loading } = UseFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <section className="similar-section">
      <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
      />
    </section>
      
  );
};

export default Similar;