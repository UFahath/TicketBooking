import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import faq from "../data/Faq"
import {Heading} from '../styles/Styled'


  
const FeedbackLink=()=>{
//link text
  let an=faq[faq.length-1].answer.substring(faq[faq.length-1].answer.lastIndexOf(" ")+1)
  return <a href="#">{an}</a>
}
const Faq = () => {
  let beforeWord=faq[faq.length-1].answer.substring(0,faq[faq.length-1].answer.lastIndexOf(" "))

  return (
    <>
    <Navbar/>
    <div className="container">
     <Heading className="fw-bold mt-5">FAQ</Heading>
      {
       faq.map((item,index)=>(
        <div className="row mb-3" key={Math.random()}>
          <div className="col my-4">
            <div className="row fs-2 my-3">
            Q:{item.question}
            </div>
            <div className="row fs-4">
             A:
             {index===faq.length-1?(
              <>
              {beforeWord}
              <FeedbackLink/>
              </>
            ): item.answer}
             
            
             </div>
          </div>
        </div>
       ))
      }
    </div>
    <Footer/>
    </>
  )
}



export default Faq