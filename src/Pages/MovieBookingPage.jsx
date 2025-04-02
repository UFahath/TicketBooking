import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import{useState,useEffect,useRef} from 'react'

export const MovieBookingPage = () => {
  let[selectedSlot,setSlot]=useState(null)
  let selectedTheater=useRef()
  useEffect(()=>{
           setSlot(JSON.parse(localStorage.getItem("PickedSlot:")))
         
          selectedTheater.current.innerHTML=selectedSlot
          let buttons=selectedTheater.current.querySelectorAll('button');
          buttons.forEach((item)=>{
            if(!item.className.includes("btn-danger"))
            {
              item.setAttribute('disabled',"");
            }
          })
          return ()=>{};
  },[selectedSlot])
  return (
    <>
    <Navbar/>
    <div ref={selectedTheater}className="container my-4" >
      
    </div>
    <Footer/>
    </>
  )
}
