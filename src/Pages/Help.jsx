import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { Heading } from "../styles/Styled"
import instructions from '../data/Help'

const Help = () => {
  return (
   <>
   <Navbar/>
   <div className="container">
   <Heading className="fw-bold mt-5">Help</Heading>
    <div className="row">
      <div className="col">
          <h1 className="my-4">Need Assistance? We're Here For You!</h1>
          <p className="fs-4 ms-5">
            We are Committed to making your booking experience as smooth and hassle-free as possible.
            If you need help with anything, you've come to the right place.
          </p>
      </div>
    </div>

    <h1 className="my-4">Common Issues And Solutions</h1>
    <div className="row fs-3">
      {
        instructions.map((items)=>(
        
          <ul key={Math.random()} className="my-3">
              <h3 className="ms-5 fs-2">{items.question}</h3>
            <li className="fs-4 ms-5">{items.steps[0]}</li>
            <li className="fs-4 ms-5">{items.steps[1]}</li>
          </ul>
        ))
      }
    </div>
    

    <div className="row">
      <div className="col">
          <p className="fs-4 ms-5 my-5">
          We're here to help you every step of the way.If you need further assistance,please don't hesitate to reach out to us. Thank you for choosing us!
          </p>
      </div>
    </div>

   </div>
   <Footer/>
   </>
  )
}



export default Help