import './Style.scss'
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import SwitchTab from '../../../Components/TabSwitch/SwitchTab';
import { useState } from 'react';
import UseFetch from '../../../Hooks/UseFetch'
import Carousel from '../../../Components/Carousel/Carousel';

function TopRated() {
  const [endPoint, setEndPoint] = useState('movie');
  const {data, loading} = UseFetch(`/${endPoint}/top_rated`);
  const onTabChange =(tab) => {
    setEndPoint(tab === 'Movies' ? 'movie': 'tv')
  };
  return (
    <div className='carouselSearch'>
      <ContentWrapper>
        <h2 className='carouselTitle'> Top Rated</h2>
        <SwitchTab onTabChange={onTabChange} data={['Movies', 'Tv Shows']}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default  TopRated