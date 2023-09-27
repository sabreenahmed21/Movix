import './Style.scss';
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import SwitchTab from '../../../Components/TabSwitch/SwitchTab';
import { useState } from 'react';
import UseFetch from '../../../Hooks/UseFetch'
import Carousel from '../../../Components/Carousel/Carousel';

function Trending() {
  const [endPoint, setEndPoint] = useState('day');
  const {data, loading} = UseFetch(`/trending/all/${endPoint}`);
  const onTabChange =(tab) => {
    setEndPoint(tab === 'Day' ? 'day': 'week')
  };
  return (
    <div className='carouselSearch'>
      <ContentWrapper>
        <h2 className='carouselTitle'>Trending</h2>
        <SwitchTab onTabChange={onTabChange} data={['Day', 'Week']}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending