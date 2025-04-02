import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import{useState,useEffect,useRef} from 'react'

export const MovieBookingPage = () => {
  let[selectedSlot,setSlot]=useState(null)
  let cont=useRef()
  useEffect(()=>{
           setSlot(JSON.parse(localStorage.getItem("PickedSlot:")))
          let container=document.getElementById("container");
          container.innerHTML=selectedSlot
          // console.log(container)
          return ()=>{};
  },[selectedSlot])
  return (
    <>
    <Navbar/>
    <div ref={cont}className="container my-4" id="container" >
      
    </div>
    <Footer/>
    </>
  )
}
