import { useEffect, useRef, useState } from "react"
import Footer from "../Footer"
import { Navbar } from "../Navbar"


import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation, useNavigate } from "react-router-dom";
 



export const Otp = () => {
  let location=useLocation();
  let navigate=useNavigate();
  let[loading,setLoading]=useState(false);
  let[ph,setPh]=useState("");
  let[otp,setOtp]=useState("");
  let[showPhContainer,setPhContainer]=useState(true);
  let[showOtpContainer,setOtpContainer]=useState(false);
  let mobileField=useRef(null);
  let [error,setError]=useState(null);

  let[generatedOtp,setGeneratedOtp]=useState(0);
  let[finalPageLoading,setFinalPageLoading]=useState(false);
  let toastElement=useRef(null);
  let otpConfirmbtn=useRef(null);
  useEffect(()=>{
    let toastTimeoutId;
    if(toastElement.current)
      {
       let toast=new bootstrap.Toast(toastElement.current)
       toast.show();
       toastTimeoutId=setTimeout(()=>{
         toast.dispose();
         clearTimeout(toastTimeoutId)
       },3000)
      }
      return ()=>{clearTimeout(toastTimeoutId)}
  },[showOtpContainer])

  useEffect(()=>{
    if(generatedOtp)
    {
      let otpProcessing=setTimeout(()=>{
        alert(`Your Otp is ${generatedOtp}`)
        clearTimeout(otpProcessing)
      },2000)
      
    }
    
  },[generatedOtp])
  
 
  useEffect(()=>{


    let handleMobileFieldWidth=()=>{
       if(!mobileField.current) return;
    
      if(window.innerWidth<768)
      {
        mobileField.current.classList.remove("w-50")
        mobileField.current.classList.add('w-100')
      }
      else if(window.innerWidth>=768&&window.innerWidth<=992)
      {
        mobileField.current.classList.remove("w-25")
        mobileField.current.classList.remove("w-100");
        mobileField.current.classList.add("w-50")
      }
      else 
      {
        mobileField.current.classList.remove("w-50");
        mobileField.current.classList.add("w-25")
      }

    }
    handleMobileFieldWidth();
    window.addEventListener("resize",handleMobileFieldWidth)
    // console.log("State:",location.state)
    return ()=>window.removeEventListener("resize",handleMobileFieldWidth)
  },[])

  function generateOtp(){

    return Math.floor(1000+Math.random()*9000).toString();

  }

  function verifiyOtp(){
    if(otp===generatedOtp)
    {
      console.log("Successfully Logged",location.state)
      if(location.state==="Flight")
      {
         setOtp("");
         setFinalPageLoading(true)
         let slowNavigateId=setTimeout(()=>{
          clearTimeout(slowNavigateId);
          setFinalPageLoading(false)
          navigate('/flightpaymentSuccess')
         },2000)
      }
      else
      {
        console.log("Invalid route")
      }
    }
    else
    {
      !otp?alert("Otp Field is Empty"):alert("Invalid Otp")
    }
  }
  function uponSubmission(){
    if(!ph)
    {
      setError("Please Fill the Details")
      let errorTimeout=setTimeout(()=>{
        setError(null);
        clearTimeout(errorTimeout)
      },1500)
      return;
    }
    else{
      let regex=new RegExp("^[0-9]{10}$")
      if(regex.test(ph))
      {
        setLoading(true)
        let loadingTimeout=setTimeout(()=>{
           setLoading(false)
           setPhContainer(false)
           setOtpContainer(true)
           let randomOtp=generateOtp();
           setGeneratedOtp(randomOtp);
           clearTimeout(loadingTimeout)
      },1000)
       
      }
      else
      {
        alert("invalid format")
        setPh("")
      }
    }
   
  }

  return (
    <>
    <Navbar/>
   {
    showPhContainer&&
    <div className="container text-center fs-5 p-3">
      <p>Enter Your <span className="text-primary">Mobile Number</span></p>
      {error&&<p className="text-danger position-absolute" style={{left:"50%",transform:"translateX(-80px)",textWrap:"nowrap"}}>{error}</p>}
      <input type="tel" ref={mobileField} pattern="[0-9]{10}" className="form-control mx-auto my-5" value={ph} placeholder="Enter Your Mobile Number"
      onChange={(e)=>{
        setError(null)
        setPh(e.target.value)
      }}/>
      <button className="btn btn-danger d-flex justify-content-center align-items-center gap-3 mx-auto" style={{height:"50px"}}
      onClick={uponSubmission}>
      {
        loading?
        <>
      <div className="spinner-border text-white my-3" role="status">
        <span className="visually-hidden">...loading</span>
      </div>
      <span>Loading</span>
      </>:"Click To Verify"
      }
        </button>
    
    </div>
   }
    {
      showOtpContainer&&(
        <>
       {/* Toast */}
<div ref={toastElement} className="toast align-items-center border border-success text-success position-fixed top-0 start-50 translate-middle-x mx-auto"  style={{zIndex:"9999"}} role="alert" data-bs-autohide="true" data-bs-delay="3000" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body mx-auto">
     OTP Sent
    </div>
    
  </div>
</div>


      <div className="container text-center fs-5 p-3">
      <p>Enter 6 digit <span className="text-primary">OTP</span> Received on your Mobile Number</p>
      <input type="text" pattern="[0-9]{4}" value={otp} className="form-control w-25 mx-auto my-5 otp" placeholder="OTP" onChange={(e)=>setOtp(e.target.value)}/>
      {finalPageLoading&&(
        <>
        <div className="backdrop">
        <div className="spinner-border text-danger">
          <span className="visually-hidden">loading</span>
        </div>
        </div>
        </>
      )}
      <button ref={otpConfirmbtn} className="btn btn-danger" onClick={()=>verifiyOtp()}>Proceed To Pay</button>
    </div>
    </>
    )
    }
    <Footer/>
    </>
  )
}
