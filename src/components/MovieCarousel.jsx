import { Heading } from "../styles/Styled";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Pagination,Autoplay } from 'swiper/modules';
import { MovieImagesCard } from "./MovieImagesCard";

import {carouselItems} from '../data/data1'

const MovieCarousel = ({heading}) => {
  return (
    <div className="container-fluid" style={{ marginTop: "120px" }}>
      <div className="row row-cols-1 row-cols-xlg-3 my-5">
        <div className="col"></div>
        <div className="col text-center">
        <Heading className="fs-1 fw-bold bg-warning rounded-3 p-3">{heading}</Heading>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <Swiper modules={[Pagination,Autoplay]}

        pagination={{clickable:true}}
        spaceBetween={20}
          breakpoints={{
            320:{
              slidesPerView:1,
            },
            568:{
              slidesPerView:2,
            },
            768:{
              slidesPerView:3,
            },

          }}
          autoplay={{
            delay:2000,
          }}
          loop={true}
        >
          {
            carouselItems.map((item)=>(
              <SwiperSlide key={Math.random()} >
              <MovieImagesCard image={item}/>
           </SwiperSlide>
            ))
         
           }
        
        </Swiper>
      </div>
      <div className="col-2"></div>
      </div>
    </div>
  );
};

export default MovieCarousel;
