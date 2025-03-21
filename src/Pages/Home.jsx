import React from 'react';
import { Navbar } from '../components/Navbar';
import { BannerDiv } from '../styles/Styled.js';
import SearchBarContainer from '../components/SearchBarContainer.jsx';
import {headings} from '../data/data1.js'
import MovieCarousel from '../components/MovieCarousel.jsx';
import EventBookingPage from '../components/EventBookingPage.jsx';

export const Home = () => {
 
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Banner Section */}
      <BannerDiv style={{ paddingTop: '20%' }}>
        <SearchBarContainer/>
      </BannerDiv>



      <MovieCarousel heading={headings[0]}/>
      <EventBookingPage heading={headings[1]}/>
    </>
  );
};
