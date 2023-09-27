/* eslint-disable react/no-unescaped-entities */
import './Style.scss';
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import SwitchTab from '../../../Components/TabSwitch/SwitchTab';
import { useState } from 'react';
import UseFetch from '../../../Hooks/UseFetch'
import Carousel from '../../../Components/Carousel/Carousel';

function Whatpopular() {
  const [endPoint, setEndPoint] = useState('movie');
  const {data, loading} = UseFetch(`/${endPoint}/popular`);
  const onTabChange =(tab) => {
    setEndPoint(tab === 'Movie' ? 'movie': 'tv')
  };
  return (
    <div className='carouselSearch'>
      <ContentWrapper>
        <h2 className='carouselTitle'> What's Popular</h2>
        <SwitchTab onTabChange={onTabChange} data={['Movies', 'Tv Shows']}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default  Whatpopular