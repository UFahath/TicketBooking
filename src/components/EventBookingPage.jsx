import { Heading } from "../styles/Styled";
import EventGif from '../assets/images/Welcome.gif'

import {eventItems} from '../data/data1.js'

import {MovieImagesCard} from './MovieImagesCard'

import {useState,useEffect} from 'react'

const EventBookingPage = ({heading}) => {
  let [fontSize,setFontSize]=useState(0);
  useEffect(()=>{
    let handleSizing=()=>{
      if(window.innerWidth<600)
      {
        setFontSize("fs-5")
      }
      else{
        setFontSize("fs-3")
      }
    }
    window.addEventListener("resize",handleSizing)
    return ()=>{window.removeEventListener('resize',handleSizing)}
  })
  
  return (
    <>
    <div className="container-fluid d-flex align-items-center justify-content-center my-3">
    <Heading className="fs-1 my-3 rounded-3 p-3">{heading}</Heading>
     <img src={EventGif} alt="" width={100} height={100}/> 
     </div>
     <div className="container text-center">
     <p className="fs-4 fw-normal bg-primary text-white rounded-top-3 p-3" style={{boxShadow:"7px 7px 0 black",fontFamily:"monospace"}}>Join us for an exciting and entertained events.Unleash your inner laugh with our event organizer guidance. Get ready for an unforgettable concert and shows experience. Book your tickets now!</p>
     </div>
     <div className="container my-5">
      <div className="row">
      <h4 className="fw-bold text-center">Newly Added</h4>
      </div>
      <div className="row">
        {
          eventItems.map((item)=>(
            <div className="col" key={Math.random()}>
            <MovieImagesCard image={item.events}/>
            <h4 className={`text-center ${fontSize}`}>{item.title}</h4>
            </div>
          ))
        }
      </div>
     </div>
    </>
  )
}



export default EventBookingPage