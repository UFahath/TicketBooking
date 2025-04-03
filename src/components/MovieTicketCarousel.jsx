import {Swiper,SwiperSlide} from 'swiper/react'
import { EffectCoverflow,Pagination,Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import {OfferAirImages} from '../data/Offers'
import {carouselItems} from '../data/data1'

const MovieTicketCarousel = () => {
  return (
    <>
      <div className="container">
        <Swiper modules={[Pagination,EffectCoverflow,Autoplay]}
        pagination={{clickable:true}}
        effect='coverflow'
        coverflowEffect={
          {
          scale:1,
          // rotate:12,
          stretch:0,
          depth:20,
          modifier:1,
          slideShadows:true,
          }
        }
        autoplay={{
          delay:2000
        }}
     
        loop={true}
        breakpoints={{
          320:{
            slidesPerView:1,
          },
          568:{
            slidesPerView:2,
          },
          768:{
            slidesPerView:4,
          }
        }}
        >
          {
            carouselItems.map((item,index)=>(
          <SwiperSlide className=' mx-auto my-4' key={index}>
            <img  src={item} alt="busoffer" style={{width:"100%",maxHeight:"440px"}} className="rounded-top-5"/>
          </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </>
  )
}

MovieTicketCarousel.propTypes = {}

export default MovieTicketCarousel