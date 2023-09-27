import HeroBanner from "./HeroBanner/HeroBanner"
import './Style.scss'
import Trending from "./Trending/Trending"
import WhatPopular from './WhatPopular/WhatPopular'
import TopRated from "./TopRated/TopRated"

function Home() {
  return (
    <>
    <HeroBanner />
    <Trending />
    <WhatPopular />
    <TopRated />
    </>
  )
}

export default Home