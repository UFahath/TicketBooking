import { useEffect, useRef, useState } from "react"
import Footer from "../Footer"
import { Navbar } from "../Navbar"
import { auth } from "../../../firebase.config"
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth"

export const Otp = () => {
  let[loading,setLoading]=useState(true);
  let[ph,setPh]=useState("");
  let[otp,setOtp]=useState("");
  let[showOtpContainer,setOtpContainer]=useState(true);
  let mobileField=useRef(null);
  let [error,setError]=useState(null);

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
    return ()=>window.removeEventListener("resize",handleMobileFieldWidth)
  },[])

  function generateRecaptcha(){
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': () => {
        uponSubmission();
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    },auth);
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
        generateRecaptcha();
     


const appVerifier = window.recaptchaVerifier;


signInWithPhoneNumber(auth,"+91"+ph, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("sms sent")
    }).catch((error) => {
      console.log("unknown error")
    });
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

    <div className="container border border-dark text-center fs-5 p-3">
      <p>Enter Your <span className="text-primary">Mobile Number</span></p>
      {error&&<p className="text-danger position-absolute" style={{left:"50%",transform:"translateX(-80px)",textWrap:"nowrap"}}>{error}</p>}
      <input type="tel" ref={mobileField} pattern="[0-9]{10}" className="form-control mx-auto my-5" value={ph} placeholder="Enter Your Mobile Number"
      onChange={(e)=>{
        setError(null)
        setPh(e.target.value)
      }}/>
      <button  className="btn btn-danger d-flex justify-content-center align-items-center gap-3 mx-auto" style={{height:"50px"}}
      onClick={uponSubmission}>
      {
        loading&&
        <>
      <div className="spinner-border text-white my-3" role="status">
        <span className="visually-hidden">...loading</span>
      </div>
      </>
      }
        Click To Verify
        </button>
        <div id="recaptcha-container"></div>
    </div>

    {
      showOtpContainer&&(
      <div className="container border border-dark text-center fs-5 p-3">
      <p>Enter 6 digit <span className="text-primary">OTP</span> Received on your Mobile Number</p>
      <input type="text" pattern="[0-9]{4}" value={otp} className="form-control w-25 mx-auto my-5 otp" placeholder="OTP"/>
      <button className="btn btn-danger">Proceed To Pay</button>
    </div>)
    }
    <Footer/>
    </>
  )
}
