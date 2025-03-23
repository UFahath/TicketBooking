import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import {Heading} from '../styles/Styled'
import termsAndConditions from "../data/Terms"

const TermsAndConditions = ()=> {
  return (
    <>
    <Navbar/>
     
     <div className="container mb-5">
     <Heading className="fw-bold mt-5">Terms And Conditions</Heading>
      {termsAndConditions.map((item) => (
        <div key={item.id} className="fs-4 my-4">
          <h2 className="mb-4">{item.id}. {item.title}</h2>
          <p className="ms-5">{item.description}</p>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  )
}



export default TermsAndConditions