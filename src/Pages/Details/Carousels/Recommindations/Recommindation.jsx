/* eslint-disable react/prop-types */
import Carousel from '../../../../Components/Carousel/Carousel'
import UseFetch from "../../../../Hooks/UseFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = UseFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
      <section className='recommindation-section'>
        <Carousel
            title= "Recommendation"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
      </section>
      
    );
};

export default Recommendation;