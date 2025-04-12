import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BannerDiv, Heading } from "../styles/Styled"
import travel from "../assets/images/Travel.jpg"
import TravelSearchBar from "../components/TravelSearchBar"
import AirOfferCarousel from "../components/AirOfferCarousel"
import BusOfferCarousel from "../components/BusOfferCarousel"
import AirTaillogo from '../assets/images/AirLogo.png'
import {useState} from "react"
// import { useLocation } from "react-router-dom"


const Travel = () => {
 

let [searchEngineType,setType]=useState("");

  return (
    <>
    <Navbar/>
    <BannerDiv className="container-fluid border border-white " style={{backgroundImage:`url(${travel})`
    ,backgroundSize:"100% 600px"}}>
    <TravelSearchBar className="my-auto" setType={setType}/>
      
    </BannerDiv>
    {searchEngineType==="Flight"?(<TravelFlightBottom/>):(<TravelBusBottom/>)}

    <Footer/>
    </>
  )
}

const TravelBusBottom=()=>{

  //Why Choose us Points

  const features = [
    {
      title: "Easy and Secure Booking",
      description: "Book your tickets in just a few clicks with our user-friendly interface and secure payment gateway."
    },
    {
      title: "Best Prices Guaranteed",
      description: "We offer competitive prices and exclusive discounts to ensure you get the best value for your money."
    },
    {
      title: "Wide Range of Options",
      description: "Choose from a vast selection of tickets for various events, including movies, concerts, plays, and sports."
    },
    {
      title: "Quick Refunds and Cancellations",
      description: "Enjoy hassle-free refunds and cancellations with our flexible policies."
    }
  ];
  
  
  return (
    <>
 <div className="container my-4">
  
            <div className="row mb-4">
              <div className="col">
              <Heading className="my-4">Offers on Bus</Heading>
                <BusOfferCarousel />
              </div>
            </div>

            <div className="row">
              <div className="col">
              <Heading className="mt-4">Why Choose Us For Bus Ticket Booking</Heading>
              <ol  type="1" className="fs-3 my-5">
               {
                features.map((item)=>(
                  
                    <li key={Math.random()} className="my-4">
                      <p className="fw-bold">{item.title}</p>
                      <p className="fs-4">{item.description}</p>
                      </li>
             
                ))
               }
              </ol>
              </div>
            </div>
      </div>
    </>
  )
}

export const TravelFlightBottom=()=>{


 
  return (
    <>
       <div className="container  bg-danger rounded-3 mt-5">
        <div className="row row-cols-1 row-cols-md-4 p-5 gy-3">
          <div className="col">
            <input type="text" className="form-control" placeholder="Airline Name" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="number" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="date" />
          </div>
          <div className="col">
            <button className="btn btn-warning">search</button>
          </div>
        </div>
      </div>


      <div className="container mt-4">
           <div className="row">
            <div className="col">
            <Heading>Track Flight Status</Heading>
            <p className="fs-4 ms-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nemo quos quaerat voluptates odio aspernatur assumenda fuga excepturi, non maiores aperiam, totam dolores sed modi eaque quas nobis iste ad.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam explicabo, fugiat optio, animi alias facilis illo quisquam voluptates recusandae quas sint perferendis error rerum incidunt? Nemo suscipit maiores pariatur totam.
            </p>
            </div>
            </div>


            <div className="row flightoffer">
              <div className="col">
              <Heading>Today's Flight Offers</Heading>
                <AirOfferCarousel/>
              </div>
            </div>

            <div className="row flightwinglogo">
              <div className="col">
              <Heading>Popular Domestic Airlines</Heading>
              <div className="row my-4">
                <div className="col my-4">
                   <img src={AirTaillogo} className="w-100" alt="airtaillogo" />
                </div>
              </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default Travel