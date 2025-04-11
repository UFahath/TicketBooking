import { useEffect, useState,useRef } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { v4 as uuidv4 } from 'uuid';
import qrImage from "../assets/images/qrcode.png"; 
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { date,time } from "../data/time";
export const QRPaymentPage = () => {
  let [timeLeft, setTimeLeft] = useState(300); 
  let [totalTime]=useState(300);
  let [randomQr,setRandomQr]=useState(Math.random());
  let navigate=useNavigate();
  // let [qrId,setqrId]=useState("");
  // let location=useLocation();
  // console.log(randomQr)
  // let[paymentDone,setDone]=useState(false);
  // console.log("totaltime",totalTime)
  let [width,setWidth]=useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
       setRandomQr(String(randomQr))

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    let loadingTime=((totalTime - timeLeft ) / totalTime) * 100
    setWidth(loadingTime);
  },[timeLeft,totalTime])

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };
  function checkQr(){
  
     navigate('/moviepaymentsuccess')
   
  }

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h4 className="mb-4">Please wait while your payment is processed</h4>
        
        <div className="progress mb-4" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{ width:`${width}%`, backgroundColor: "blue" }}
            aria-valuenow={width}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <p className="fw-medium">Scan the QR code from one of the supported UPI apps.<br />Please pay before it times out!</p>
        <hr className="my-4" />

        <h5 className="mb-3">Remaining Time</h5>
        <div className="mb-4 text-primary fw-bold fs-4">
          ● {formatTime(timeLeft)}
        </div>

       
       
   
    <QRCode className="mb-5"
    size={256}
    style={{ maxWidth: "100%" }}
    value={randomQr}
    viewBox={`0 0 256 256`}/>

      <div className="text-center">
        <button className="btn btn-outline-danger w-50 mb-5" onClick={checkQr}>Confirm</button>
      </div>
       </div>

    

      <Footer />
    </>
  );
};

export const Success=()=>{

  let [fontSize,setFontSize]=useState('fs-5');
  let[margin,setMargin]=useState("ms-5");
  

 ///
 
//date Array
let dateArray=date.toDateString().split(' ')

//remove weekday from Array
dateArray.shift();

//swap and Array for formate dd mmm yyyy like this
let temp=dateArray[0];
dateArray[0]=dateArray[1];
dateArray[1]=temp;

//make it as string
let dateNow=dateArray.join(" ")
let seatInfo=useRef();
let [seatInformation,setInfo]=useState([]);
let rate=useRef();
let theaterLocation=useRef();
let movieTitle=useRef();
const id = uuidv4();
useEffect(()=>{
  rate.current=localStorage.getItem("totalrate:")||"nothing present"
  theaterLocation.current=JSON.parse(localStorage.getItem("theaterlocation:")||"nothing present")
  movieTitle.current=JSON.parse(localStorage.getItem("MoviePicked:")||"nothing present")
  movieTitle.current=movieTitle.current[0].original_title
  // console.log(theaterLocation.current)

},[rate,theaterLocation,movieTitle])
useEffect(()=>{
  seatInfo.current=JSON.parse(localStorage.getItem("seats::")||[]);
  setInfo(seatInfo.current||[])
},[seatInfo])



  useEffect(()=>{
    let sizeHandler=()=>{
      if(window.innerWidth<=768)
      {
        setFontSize("")
        setMargin("")
      }
      else if(window.innerWidth>=768)
      {
        setFontSize("fs-5")
        setMargin("ms-5")
      }
    }
    window.addEventListener("resize",sizeHandler)
    return ()=>{window.removeEventListener("resize",sizeHandler)}
  },[fontSize])
  return(
    <>
    <Navbar/>
    <div className="container">
      <div className="row">
      <div className={`col text-center ${fontSize}`}><span>Thanks for Booking Movie Tickets on SavvySeats. </span> </div>
      </div>
      <div className="row">
      <div className={`col text-center ${fontSize}`}><span>It is Pleasure To Serve You. </span></div>
      </div>
      <div className="row">
      <div className={`col text-center ${fontSize}`}><span>Please use this e-copy while check-in.</span></div>
      </div>


      <div className="row my-4">
        <div className="col-md-3"></div>
        <div className="col-md-6 border border-4 rounded-3 table-responsive">
          <table className="table">
            <tbody>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Booking Id:</span></td>
                <td><span className={`${margin}`}>{id}</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Reference No:</span></td>
                <td><span className={`${margin}`}>123456789</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Movie Name:</span></td>
                <td><span className={`${margin}`}>{movieTitle.current}</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Screen No:</span></td>
                <td><span className={`${margin}`}>7</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Location:</span></td>
                <td><span className={`${margin}`}>{theaterLocation.current}</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Date & Time:</span></td>
                <td><span className={`${margin}`}>{dateNow+" ,"+time()}</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Seat Info:</span></td>
                <td><span className={`${margin}`}>{seatInformation.map((item,index,array)=>
                  index!==array.length-1?item.seatSelected.concat(","):item.seatSelected
                )}</span></td>
              </tr>
              <tr className={`${fontSize}`}>
                <td><span className="fw-bold">Ticket Price:</span></td>
                <td><span className={`${margin}`}>Rs.{rate.current}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-3"></div>
      </div>

      <div className="row my-4">
        <div className="col-md-3"></div>
        <div className="col-md-6 text-center">
         <img src={qrImage} alt="QR Code" className="img-fluid" style={{ maxWidth: "220px" }} />
         </div>
         <div className="col-md-3"></div>
      </div>
      <div className="row text-center">
        <p className={`${fontSize}`}>Use this QR code While Check-in and Food Cart</p>
      </div>
    </div>
    
    <Footer/>
    </>
  )
}

