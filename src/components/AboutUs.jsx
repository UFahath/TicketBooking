
import { Heading } from "../styles/Styled";
// icons
import {Map,Handshake,Plane,Headset} from 'lucide-react'


const AboutUs =({heading}) => {
  return (
   <>
   <div className="container">
     <Heading className="fs-1 my-3 fw-bold">{heading[0]}</Heading>
     <p className="fs-3 ms-4 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quam labore eius aut. Architecto modi exercitationem repudiandae necessitatibus accusantium maiores, eveniet eos earum voluptatem aperiam, nostrum suscipit dolore at quibusdam!</p>
     <p className="fs-3 ms-4 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quam labore eius aut. Architecto modi exercitationem repudiandae necessitatibus accusantium maiores, eveniet eos earum voluptatem aperiam, nostrum suscipit dolore at quibusdam!</p>
     </div>
     <div className="container">
     <Heading className="fs-1 my-3 fw-bold">{heading[1]}</Heading>
     <p className="fs-3 ms-4 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quam labore eius aut. Architecto modi exercitationem repudiandae necessitatibus accusantium maiores, eveniet eos earum voluptatem aperiam, nostrum suscipit dolore at quibusdam!</p>
     </div>
     <div className="container">
      <div className="row row-cols-1 row-cols-sm-2">
        <div className="col-sm-5 my-4 my-sm-3">
        <div className="row border border-danger border-2 p-5 rounded-3">
          <div className="col-3  my-auto"><Map size={50} color="red"/></div>
          <div className="col-9">
            <p className="h3">3,50,000+ Bus Routes</p>
            <p className="fs-4 text-secondary"> offering unparalleled choices for your travel needs</p>
           
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>
        <div className="col-sm-5 my-4 my-sm-3">
        <div className="row border border-danger border-2 p-5 rounded-3">
          <div className="col-3 my-auto"><Handshake size={50} color="red"/></div>
          <div className="col-9">
            <p className="h3">4000+ Partners</p>
            <p className="fs-4 text-secondary">ranging from State RTCs to private partners </p>
           
            </div>
          </div>
        </div>

      
        <div className="col-sm-5  my-4 my-sm-3">
        <div className="row border border-danger border-2 p-5 rounded-3">
          <div className="col-3  my-auto"><Plane size={50} color="red"/></div>
          <div className="col-9">
            <p className="h3">Fastest Flight Booking</p>
            <p className="fs-4 text-secondary"> swift and seamless Flight ticket booking experience</p>
           
            </div>
          </div>
        </div>

        <div className="col-sm-2"></div>
        <div className="col-sm-5  my-4 my-sm-3 ">
        <div className="row border border-danger border-2 p-5 rounded-3">
          <div className="col-3 my-auto"><Headset size={50} color="red"/></div>
          <div className="col-9">
            <p className="h3">24/7 Customer Support</p>
            <p className="fs-4 text-secondary"> available for all your ticket booking needs</p>
            </div>
          </div>
        </div>
       
      </div>
     </div>
   </>
  )
}

export default AboutUs;