import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { BookingDetailsReview } from "./FlightsReviewBooking"
import { dateFormatter } from "../data/time"
import { useEffect,useMemo,useRef,useState} from "react"
import { Link } from "react-router-dom"
import Hdfc from '../assets/images/Hdfc.png'
import Upi from '../assets/images/Upi.png'
import CreditCard from '../assets/images/CreditCard.png'
import Bank from '../assets/images/Bank.png'
import Wallet  from "../assets/images/Wallet (2).png"


import { formatTime } from "./QrPaymentPage"
const FlightPaymentOption = () => {
  let {state} =useLocation();
  let[primaryName,setPrimaryName]=useState("")
  let[totalPersonCount,setTotalCount]=useState("")
  let[email,setEmail]=useState("")
  
  let[classSelected,setClassSelected]=useState("");
  let[travellersDetails,setTravellers]=useState([])
  let[paymentSessionTrack,setSessionTrack]=useState(true);
  let Fare1=useRef(0);

  let [totalPrice,setTotalPrice]=useState(0);
  
  let [presistOne,setPresistOne]=useState("");
  useEffect(()=>{
    if(state?.presistOne)
    {
      setPresistOne(state.presistOne)
    }
    const stored=localStorage.getItem("passengercount:");
    const fare1=localStorage.getItem("Fare1:")
    if(stored)
    setClassSelected(JSON.parse(stored))

    const storedTravellers=JSON.parse(localStorage.getItem("travellersDetails"));
    if(storedTravellers)
    setTravellers(JSON.parse(localStorage.getItem("travellersDetails")||"[]"))

    if(fare1)
    Fare1.current=JSON.parse(fare1);

    // setPresistOne(state.presistOne)
   },[])

   useEffect(()=>{
    if(travellersDetails.length>0)
    {
    setPrimaryName(travellersDetails[0].firstName+" "+travellersDetails[0].lastName);
    setTotalCount(Object.keys(travellersDetails).length)
    setEmail(travellersDetails[0].email)
    }
   },[travellersDetails,setPrimaryName,setTotalCount,totalPersonCount])
 
  return (
    <>
    <Navbar/>
    {
      paymentSessionTrack?(
    <div className="container">
    <BookingDetailsReview state={presistOne} email={email} totalPersonCount={totalPersonCount} primaryName={primaryName} dateFormatter={dateFormatter} classSelected={classSelected}/>
    <FairDetails Fare1={Fare1.current} setTotalPrice={setTotalPrice}/>
    <PaymentOptions setSessionTrack={setSessionTrack} totalPrice={totalPrice}/>
    </div>):(<PaymentTimeout/>)
    }
    <Footer/>
    </>
  )
}



const FairDetails=({Fare1,setTotalPrice})=>{
  const extraFees=790;
  let [total,setTotal]=useState(0);
  let tableContainer=useRef(null);
  const totalAmout=useMemo(()=>{
    setTotal(Fare1+extraFees)
    return Fare1+extraFees;
  },[Fare1])
  useEffect(()=>{
   setTotalPrice(total)
  },[total,setTotalPrice])

 
  useEffect(()=>{
    let handleWidth=()=>{
      if(window.innerWidth>=768&&tableContainer.current.classList.contains("w-100"))
      {
        tableContainer.current.classList.remove('w-100')
        tableContainer.current.classList.add("w-50");
      }
      else if(window.innerWidth<768&&tableContainer.current.classList.contains("w-50"))
      {
        tableContainer.current.classList.remove("w-50");
        tableContainer.current.classList.add('w-100')
      }
    }
    handleWidth();
    window.addEventListener("resize",handleWidth)
    return ()=>{window.addEventListener('resize',handleWidth)}
  },[])
  return(
        <div ref={tableContainer} className="container border w-100 my-5 rounded-4 shadow-lg">
        <table className="table table-borderless mt-4 w-100">
          <thead>
            <tr>
              <th className="text-danger">
                <h2 className="fw-bold">Total Price</h2>
              </th>
            </tr>
          </thead>
          <tbody  className="fs-5">
            <tr>
              <td>Fare:</td>
              <td>{String.fromCharCode(8377)+Fare1}</td>
            </tr>
            <tr>
             <td>Convenience Fees:</td>
             <td>{String.fromCharCode(8377)+extraFees}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td className="fw-semibold text-primary">{String.fromCharCode(8377)+(totalAmout)}</td>
            </tr>
          </tbody>
        </table>
        </div>
  )
}

const PaymentOptions=({setSessionTrack,totalPrice})=>{
  let [timeLeft,setTimeLeft]=useState("850");
  let [timeoutReached,setReached]=useState(true);

  useEffect(()=>{
    const timer=setInterval(()=>{
         setTimeLeft((prev)=>{
          if(prev<1)
          {
            clearInterval(timer)
            setReached(false);
            return 0
          }
           return prev-1;
         })  
    },1000)
  },[])
  useEffect(()=>{
   setSessionTrack(timeoutReached)
  },[timeoutReached,setSessionTrack])

  return (
    <div className="container border border-dark rounded-4 mb-4 p-4 p-md-5" style={{boxShadow: "5px 5px 5px 0 black"}}>
  <h3>Payment Options</h3>
  <p className="my-4 p-3 shadow-sm">
    Complete Payment in <b className="fs-4">{formatTime(timeLeft)}</b>
  </p>

  <form onSubmit={(event) => event.preventDefault()}>
 
    <div className="form-check my-3">
      <input type="radio" className="form-check-input" name="radio" id="hdfccreditcard" />
      <label className="form-check-label" htmlFor="hdfccreditcard">
        <img src={Hdfc} className="me-2 me-md-4" alt="HdfcCreditCardpng" />
        HDFC Bank Credit Card <span className="ms-2 ms-md-4">XXXX XXXX XXXX 8967</span>
      </label>

  
      <div className="row w-100 w-md-75 mx-auto">
        <div className="col-12 col-md my-3">
          <p>&#10004; 35 Inr Cashback on this transaction</p>
        </div>
        <div className="col-12 col-md my-3 text-md-end">
          <button className="btn text-danger">Details</button>
        </div>
      </div>

  
      <div className="row w-100 w-md-75 mx-auto">
        <div className="col-12 col-md my-2">
          <input type="text" className="form-control" placeholder="CVV" />
        </div>
        <div className="col-12 col-md my-2">
          <button className="btn btn-danger w-100">Continue</button>
        </div>
      </div>
    </div>


    {[
      { id: "upi", label: "UPI Payments", img: Upi, desc: "Pay by Any UPI Apps" },
      { id: "creditcard", label: "Credit Card", img: CreditCard, desc: "Add and Secure by RBI Guidelines" },
      { id: "netbanking", label: "Net Banking", img: Bank, desc: "This instrument has low success, try UPI for better results" },
      { id: "wallets", label: "Wallets", img: Wallet, desc: "Pay by wallets" },
    ].map((opt) => (
      <div className="form-check my-3" key={opt.id}>
        <input type="radio" className="form-check-input" name="radio" id={opt.id} />
        <label className="form-check-label" htmlFor={opt.id}>
          <img src={opt.img} className="me-2 me-md-4" alt={`${opt.id}png`} />
          {opt.label}
          <p className="my-2">{opt.desc}</p>
        </label>
      </div>
    ))}

   
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-4">
        <button type="submit" className="btn btn-danger w-100">
          Pay {String.fromCharCode(8377) + " " + totalPrice}
        </button>
      </div>
    </div>
  </form>
</div>

  )
}


const PaymentTimeout = () => (
  <div className="container text-center my-5">
    <h2 className="text-danger">Payment Timeout</h2>
    <p>Your session has expired. Try Again</p>
    <Link to="/travel" className="btn btn-primary mx-2">Back to Travel</Link>
    <a href="#" onClick={(event)=>{
      event.preventDefault();
      window.location.reload();
    }} className="btn btn-primary">Click to Refresh</a>
  </div>
);




export default FlightPaymentOption