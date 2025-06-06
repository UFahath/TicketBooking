import { useLocation, useNavigate } from "react-router-dom"
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
import 'bootstrap/dist/js/bootstrap.bundle.min';


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
  let[mode]=useState("Flight");
  let [presistOne,setPresistOne]=useState("");
  useEffect(()=>{
    localStorage.setItem("DataForFinalPage:",JSON.stringify(presistOne))
  },[presistOne])
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
    <PaymentOptions setSessionTrack={setSessionTrack} totalPrice={totalPrice} mode={mode}/>
    </div>
    ):(<PaymentTimeout/>)
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
      if(!tableContainer.current) return;
      if(window.innerWidth>=768)
      {
        tableContainer.current.classList.remove('w-100')
        tableContainer.current.classList.add("w-50");
      }
      else if(window.innerWidth<768)
      {
        tableContainer.current.classList.remove("w-50");
        tableContainer.current.classList.add('w-100')
      }
    }
    handleWidth();
    window.addEventListener("resize",handleWidth)
    return ()=>{window.removeEventListener('resize',handleWidth)}
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

export const PaymentOptions=({setSessionTrack=()=>{},totalPrice="",mode=""})=>{
  let [timeLeft,setTimeLeft]=useState("850");
  let [timeoutReached,setReached]=useState(true);
  let [cvv,setCvv]=useState("")
  let[cardAdded,setCardAdded]=useState(false);
  let[selectedPayment,setPayment]=useState("")
  let otherPayments=useRef([]);
  let [warning,setWarning]=useState("")
  let navigate=useNavigate();
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


  function handleNavigate()
  {
    if(mode==="Flight")
    {
       navigate('/otp',{state:mode})
    }
    else
    {
        navigate('/otp',{state:mode})
    }
  }

//cvv validation
  let handleCvv=()=>{
     const regex=new RegExp("^[0-9]{3,4}$")
     if(cvv==null)
     {
    
      return false;
     }
     if(regex.test(cvv)==true)
     {
      return true
     }
     else{
      return false;
     }
  }

  let handleCvvSucces=()=>{

    if(handleCvv())
    {
      // setWarning("")
      setCardAdded(true)
      console.log("This is Correct cvv")
    }
    else
    {
      setWarning("Please Fill the Card Verification Value")
      console.log("This is Wrong")
    }

  }

  return (
    <div className="container border border-dark rounded-4 mb-4 p-4 p-md-5 fs-5" style={{boxShadow: "5px 5px 5px 0 black"}}>
  <h3>Payment Options</h3>
  <p className="my-4 p-3 shadow-sm">
    Complete Payment in <b className="fs-4">{formatTime(timeLeft)}</b>
  </p>

  <form onSubmit={(event) => {
    event.preventDefault();
    handleNavigate();
  }}>
 
    <div className={`form-check my-3 ${selectedPayment.startsWith("HDFC")?"bg-danger text-white rounded-4 p-2":""}`}>
      <input type="radio" className={`form-check-input ${selectedPayment.startsWith("HDFC")&&"invisible"}`} name="radio" value="HDFC Bank Credit Card" id="hdfccreditcard" 
      checked={selectedPayment.startsWith("HDFC Bank Credit Card")}
      onChange={(e)=>{
        setPayment(e.target.value);
        otherPayments.current.forEach((inputs)=>{
          const inputField=inputs.querySelector("input");
          if(inputField)
          {
            inputField.disabled=true;
          }
        })
      }}/>
      <label className="form-check-label" htmlFor="hdfccreditcard">
        <img src={Hdfc} className="me-2 me-md-4" alt="HdfcCreditCardpng" />
        HDFC Bank Credit Card <span className="ms-2 ms-md-4">XXXX XXXX XXXX 8967</span>
      </label>

  
      <div className="row w-100 w-md-75 mx-auto">
        <div className="col-12 col-md my-3">
          <p>&#10004; 35 Inr Cashback on this transaction</p>
        </div>
        <div className="col-12 col-md my-3 text-md-end">
          <button className={`btn ${selectedPayment.startsWith("HDFC")?"text-white":"text-danger"}`}>Details</button>
        </div>
      </div>

  
      <div className="row w-100 w-md-75 mx-auto">
        {
          !cardAdded?(
          <>
        <div className="col-12 col-md my-2">
          <input type="text" inputMode="numeric"  disabled={!selectedPayment.startsWith("HDFC")&&true} className="form-control position-relative" placeholder="CVV" value={cvv}  onChange={(e)=>{
            setWarning("")
            setCvv(e.target.value)
          }}/>
          {warning&&(
            <div className="alert alert-warning position-absolute" role="alert" id="myalert">
            {warning}
            </div>
          )}
        </div>
        <div className="col-12 col-md my-2">
          <button className={`btn ${selectedPayment.startsWith("HDFC")?"btn-primary":"btn-danger"} w-100`}
          disabled={!selectedPayment.startsWith("HDFC")&&true} onClick={handleCvvSucces}>Continue</button>
        </div>
        </>):
        (
        <div className="container d-flex justify-content-center">
        <p className="fs-5 fw-bold bg-success text-white p-2 rounded-4">SuccessFully Added</p>
        </div>
        )
       }
      </div>
    </div>


    {[
      { id: "upi", label: "UPI Payments", img: Upi, desc: "Pay by Any UPI Apps" },
      { id: "creditcard", label: "Credit Card", img: CreditCard, desc: "Add and Secure by RBI Guidelines" },
      { id: "netbanking", label: "Net Banking", img: Bank, desc: "This instrument has low success, try UPI for better results" },
      { id: "wallets", label: "Wallets", img: Wallet, desc: "Pay by wallets" },
    ].map((opt,index) => (
      <div className="form-check my-3" ref={
        (payments)=>otherPayments.current[index]=payments
      } key={opt.id}>
        <input type="radio" className="form-check-input" name="radio" value={opt.label} id={opt.id} 
        checked={selectedPayment===opt.label} 
        onChange={(e)=>{
          setPayment(e.target.value)
        }}/>
        <label className="form-check-label" htmlFor={opt.id}>
          <img src={opt.img} className="me-2 me-md-4" alt={`${opt.id}png`} />
          {opt.label}
          <p className="my-2">{opt.desc}</p>
        </label>
      </div>
    ))}

   
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-4">
        <button type="submit" disabled={!cardAdded&&true} className="btn btn-danger w-100">
          Pay {mode==="Flight"&&String.fromCharCode(8377) + " " + totalPrice}
        </button>
      </div>
    </div>
  </form>
</div>

  )
}


export const PaymentTimeout = () => (
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