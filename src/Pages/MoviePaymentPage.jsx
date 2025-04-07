import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom"
import image1 from '../assets/images/google-pay.png'
import image2 from '../assets/images/qr-code.png'
import image3 from '../assets/images/credit-card.png'
import image4 from '../assets/images/mobile-banking.png'
import image5 from '../assets/images/wallet.png'
export const MoviePaymentPage = () => {
  let details = [
    {
      heading: "Share Your Contact Details",
      types: ["email", "tel"],
      holderText: ["Enter Your Email Address", "+91"],
      buttonText: "Continue",
    },
    {
      heading: "Apply Promo Code (Optional)",
      types: ["text"],
      holderText: ["Apply Promo Code"],
      buttonText: "Check",
    },
  ];
  let paymentOptions = [
    "Pay by any UPI App",
    "Scan by QR Code",
    "Pay by Debit or Credit Card",
    "Net Banking",
    "Pay using Wallet",
  ];


  let [margin, setMargin] = useState("my-5");
  let [mail,setMail]=useState("");
  let [phno,setPhno]=useState("");
 
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        setMargin("my-3");
      } else if (window.innerWidth >= 768) {
        setMargin("my-5");
      }
    });
  }, []);

  function validate(event){
    event.preventDefault();
    // console.log("email:",email);
    alert("email",mail)
    console.log("submitted")
  }
  return (
    <>
      <Navbar />
      <form onSubmit={validate}>
      <Details
        details={details[0]}
        margin={margin}
     
      />
      <Details details={details[1]} margin={margin} setMail={setMail} setPhno={setPhno} mail={mail} phno={phno}/>
      <PaymentDetails paymentOptions={paymentOptions} margin={margin} />
      </form>
      <Footer />
      {/* <button type="submit">submit</button> */}
   
    </>
  );
};
const Details = ({ details, margin,setMail,setPhno,mail,phno}) => {
  let { heading, holderText, buttonText, types } = details;
  let inputs = useRef();
  let inputs1 = useRef();

   useEffect(()=>{
    console.log(setMail)
    // setEmail("test")
   },[setMail])
   useEffect(()=>{
    if (inputs.current&&inputs1.current) {
      inputs.current.setAttribute("required", "");
      inputs1.current.setAttribute("required", "");
    }
  },[])

  return (
    <>
      <div className="container shadow">
        <div className="row bg-danger text-white fs-3 fw-bold p-3 rounded-top-4 mt-3">
          <p className="my-auto">{heading}</p>
        </div>
  
          <div className="row border mb-5">
            <div className={`col-md-4 ${margin}`}>
              <input
                ref={inputs}
                value={mail}
                type={types[0]}
                name={types[0]}
                id={types[0]}
                onChange={(event)=>{
                  setMail(mail)
                }}
                className="form-control fs-4"
                placeholder={holderText[0]}
              />
            </div>
            {heading !== "Apply Promo Code (Optional)" && (
              <div className={`col-md-4 ${margin}`}>
                <input
                  ref={inputs1}
                  type={types[1]}
                  name={types[1]}
                  id={types[1]}
                  className="form-control fs-4"
                  placeholder={holderText[1]}
                  pattern="[0-9]{10}"
                />
              </div>
            )}

            <div className={`col-md-2 ${margin} text-center`}>
              <button className="btn btn-primary fs-4" onClick={(event)=>{event.stopPropagation()}}>
                {buttonText}
              </button>
            </div>
          </div>
      
      </div>
    </>
  );
};
const PaymentDetails = ({paymentOptions, margin}) => {

  let images=[image1,image2,image3,image4,image5];
  return (
    <>
      <div className="container shadow">
        <div className="row bg-danger text-white fs-3 fw-bold p-3 rounded-top-4 mt-3">
          <p className="my-auto">Payment Options</p>
        </div>

    
          <div className="row border mb-3">
           
            <div className={`col-md-4 ${margin}`}>
              {
                paymentOptions.map((item,index)=>(
              <div className="form-check fs-4 my-4" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  value={index}
                  onClick={(event)=>{console.log(event.target.value)}}
                  name="flexRadioDefault"
                  id={index}
                />
                <label className="form-check-label" htmlFor={index}>
                 <img src={images[index]} alt="images" className="me-2" style={{maxWidth:"40px"}} />
                  {item}
                </label>
              </div>
              ))
              }
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-primary w-25" type="submit">
            Continue
            </button>
          </div>
  
      </div>
    </>
  );
};
