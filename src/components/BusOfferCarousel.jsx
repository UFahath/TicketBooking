import { Swiper,SwiperSlide } from "swiper/react"
import {Navigation,Autoplay} from 'swiper/modules'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"

import { OfferBusImages } from "../data/Offers"

const BusOfferCarousel = () => {
  return (
    <>
    <div className="container">
      <Swiper modules={[Navigation,Autoplay]} navigation
      spaceBetween={50}
      breakpoints={{
        320:{
          slidesPerView:1,
          spaceBetween:10,
        },
        768:{
          slidesPerView:2,
          spaceBetween:20,
        }
      }}
    
      autoplay={{
        delay:2000,
      }}
      loop={true}
      >
        {
          OfferBusImages.map((offBus)=>(
          <SwiperSlide>
            <img src={offBus.offer} alt="busoffer" style={{width:"100%",maxHeight:"540px"}} className="rounded-top-5"/>
          </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
    </>
  )
}



export default BusOfferCarousel