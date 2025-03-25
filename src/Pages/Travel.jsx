import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BannerDiv, Heading } from "../styles/Styled"
import travel from "../assets/images/Travel.jpg"
import TravelSearchBar from "../components/TravelSearchBar"
import AirOfferCarousel from "../components/AirOfferCarousel"
import AirTaillogo from '../assets/images/AirLogo.png'


const Travel = () => {


  return (
    <>
    <Navbar/>
    <BannerDiv className="container-fluid border border-black " style={{backgroundImage:`url(${travel})`
    ,backgroundSize:"100% 600px"}}>
    <TravelSearchBar className="my-auto"/>
      
    </BannerDiv>
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


            <div className="row">
              <div className="col">
              <Heading>Today's Flight Offers</Heading>
                <AirOfferCarousel/>
              </div>
            </div>

            <div className="row">
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

    <Footer/>
    </>
  )
}



export default Travel