
import {Swiper,SwiperSlide} from 'swiper/react'
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { OfferAirImages } from "../data/Offers"

const AirOfferCarousel = () => {
  return (

    <Swiper  className="my-5" modules={[Pagination,Autoplay]}
    pagination={{clickable:true}}
    spaceBetween={30}
    breakpoints={{
      320:{
        slidesPerView:2
      },
      568:{
        slidesPerView:3
      },
      768:{
        slidesPerView:4
      }
    }}
     
    autoplay={{
      delay:2000,
    }}

    loop={true}
    >
        {
          OfferAirImages.map(({offer})=>(
          <SwiperSlide key={Math.random()}>
            <img src={offer} alt="" className="rounded-4"  style={{width:"100%",minHeight:"250px"}} />
          </SwiperSlide>
          ))
       
        }
      
    </Swiper>
   
  )
}



export default AirOfferCarousel