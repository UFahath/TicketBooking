import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import {Heading} from "../styles/Styled"
import {Swiper,SwiperSlide} from 'swiper/react'
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import OfferAir1 from '../assets/images/OfferAir1.jpg'

const Offers = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
    <Heading className="fw-bold mt-5">Offers On Flight Tickets:</Heading>
    <Swiper modules={[Navigation]} navigation
    spaceBetween={30}
    breakpoints={{
      320:{
        slidesPerView:1
      },
      568:{
        slidesPerView:2
      },
      768:{
        slidesPerView:4
      }
    }}
    >
      <SwiperSlide className="border border-dark">
        <img src={OfferAir1} alt="" className="w-100 h-50" />
      </SwiperSlide>
      <SwiperSlide className="border border-dark">2</SwiperSlide>
      <SwiperSlide className="border border-dark">3</SwiperSlide>
      <SwiperSlide className="border border-dark">4</SwiperSlide>
      <SwiperSlide className="border border-dark">5</SwiperSlide>
      <SwiperSlide className="border border-dark">6</SwiperSlide>
      <SwiperSlide className="border border-dark">7</SwiperSlide>
      <SwiperSlide className="border border-dark">8</SwiperSlide>

    </Swiper>
    </div>
    <Footer/>
    </>
  )
}


export default Offers