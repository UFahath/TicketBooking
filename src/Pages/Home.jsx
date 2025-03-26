import React from 'react';
import { Navbar } from '../components/Navbar';
import { BannerDiv } from '../styles/Styled.js';
import SearchBarContainer from '../components/SearchBarContainer.jsx';
import {headings} from '../data/data1.js'
import MovieCarousel from '../components/MovieCarousel.jsx';
import EventBookingPage from '../components/EventBookingPage.jsx';
import AboutUs from '../components/AboutUs.jsx';
import Footer from '../components/Footer.jsx';

export const Home = () => {
 
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Banner Section */}
      <BannerDiv style={{ paddingTop: '20%' }}>
        <SearchBarContainer/>
      </BannerDiv>


      {/* Movie Carousel */}
      <MovieCarousel heading={headings[0]} isFirst={1}/>

      {/* Event Booking */}
      <EventBookingPage heading={headings[1]}/>

      {/* AboutUs */}
      <AboutUs heading={[headings[2],headings[3]]}/>

      {/* Footer */}
      <Footer/>
    </>
  );
};
