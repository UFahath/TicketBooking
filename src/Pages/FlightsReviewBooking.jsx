import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { useEffect ,useRef,useState} from "react"
import winglogo from '../assets/images/wing.png'
import travelbag from '../assets/images/travel-bag.png'
import suitcase from '../assets/images/suitcases.png'
export const FlightsReviewBooking = () => {
 let {state}=useLocation();
 let[classSelected,setClassSelected]=useState("");
 let{source,destination,airline,departure_time,arrival_time,travel_duration,date}=state;
 useEffect(()=>{
  setClassSelected(JSON.parse(localStorage.getItem("passengercount:")||[]))
 },[])

function dateFormatter(date)
{
  let weekDay={
    Mon:"Monday",
    Tue:"Tuesday",
    Wed:"Wednesday",
    Thu:"Thrusday",
    Fri:"Friday",
    Sat:"Saturday",
    Sun:"Sunday"
  }
  date=date.split(' ');
  date.length=date.length-1;
  for(let day in weekDay)
  {
    if(day===date[0])
    {
      date[0]=weekDay[day]+",";break;
    }
  }
  date=date.join(" ");
  return date;
}

let newDate=new Date(date)
 console.log(state)
//  console.log("from:",source)
//  console.log("to:",destination)
//  console.log("airlinename:",airline)
//  console.log("departure_time:",departure_time)
//  console.log("arrivaltime:",arrival_time);
//  console.log("travelduration:",travel_duration)
 console.log("date:",dateFormatter(newDate.toDateString()))
 console.log(classSelected.classSelected)
  return (
    <>
    <Navbar/>
    <div className="container">
      <h2 className="text-warning my-4">Review Your Booking</h2>
      <BookingDetailsReview state={state} dateFormatter={dateFormatter} classSelected={classSelected}/>
    </div>
    <Footer/>
    </>
  )
}


let BookingDetailsReview=({state,dateFormatter,classSelected})=>{
  let head=useRef("");

  let newDate=new Date(state.date)
  useEffect(()=>{

    let handleSizing=()=>{
      let firstChildRow=head.current.firstElementChild;
     
      if(window.matchMedia("(min-Width:320px) and (max-Width:322px)").matches)
        {
          head.current.setAttribute('class',"rounded-4 p-4 bg-warning bg-opacity-75");
          firstChildRow.querySelector('.arrow').textContent="↓"
        }
        else if(window.matchMedia("(min-Width:322px) and (max-width:768px)").matches)
          {       
            head.current.setAttribute('class',"rounded-4 p-4 bg-warning bg-opacity-75");
            firstChildRow.querySelector('.arrow').textContent="🡢";
          }
        else
        {
          head.current.setAttribute('class',"fs-5 rounded-4 p-3 bg-warning bg-opacity-75");
          console.log("not yet reached")
        }
     
    }
    window.addEventListener('resize',handleSizing);
    return ()=>window.removeEventListener('resize',handleSizing)
  },[])
  return(
    <>
      <header ref={head} className="fs-5 rounded-4 p-3 bg-warning bg-opacity-75" style={{maxWidth:"900px",boxShadow:"7px 5px 3px  rgba(41, 37, 37, 0.5)",outline:"4px solid white"}}>
        <div className="row my-3">
          <div className="col-auto">
      <span className="fw-bold">{state.source}</span>
      </div>
      <div className="col-auto">
      <span className="arrow">🡢</span>
      </div>
      <div className="col-auto">
      <span className="fw-bold">{state.destination}</span>
      </div>
      </div>
      <div className="row">
        <div className="col-auto text-danger fw-bold">{dateFormatter(newDate.toDateString())}</div>
        
        <div className="col border-start border-dark"> NonStop-01:00</div>
      </div>
       <div className="row my-4">
        <div className="col">
          <div className="row">
          <div className="col-md">
        <img src={winglogo} alt="" className="img-fluid rounded-5" style={{width:"10%",mixBlendMode:"darken"}}/>
        <span className="ms-4 fs-3">{state.airline} </span>
        <span className="ms-4 fs-3">6E 673</span>
        <span className="badge text-bg-danger ms-3">AirBus 321</span>
        </div>
        <div className="col-md d-flex justify-content-center">
         <div className="border-top"></div>
        <p className="my-2 fs-3 text-primary fw-bold">{classSelected.classSelected}</p>
        </div>
        </div>
        </div>
       </div>
       <div className="row">
        <TravelDetails state={state}/>
        <Baggage/>
       </div>
      </header>
      <FairSummary/>
    </>
  )
}

let TravelDetails=({state})=>{
  return (
  <>
  <div className="container bg-white rounded-3 p-3" style={{width:"95%"}}>
    <div className="row">
      <div className="col-auto">
      <b>{state.departure_time}</b>
      </div>
      <div className="col-auto">
        <ul>
      <li><b>{state.source} </b>International Airport T2</li>
      </ul>
      </div>
    </div>
    <div className="row" style={{height:"90px",marginLeft:"27%"}}>
      <div className="col p-4" style={{borderLeft:"3px dashed black"}}>
        <span>{state.travel_duration}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-auto">
      <b>{state.arrival_time}</b>
      </div>
      <div className="col-auto">
        <ul>
      <li><b>{state.destination} </b>International Airport T1</li>
      </ul>
      </div>
    </div>
    <div className="row">
      <div className="col">
      <hr style={{border:"2px solid black"}}/>
      </div>
    </div>
    <div className="row" style={{fontSize:"1rem"}}>
      <div className="col d-flex justify-content-between">
        <span>
          <img src={travelbag} alt="travelbag" className="img-fluid" style={{width:"20px"}}/>
          <b className="ms-2">Cabin baggage:</b> 7KG(onepiece only)/Adult</span>
        <span className="ms-1">
          <img src={suitcase} alt="suitcase" className="img-fluid"  style={{width:"20px"}}/>
          <b className="ms-2">Check-in baggage:</b>
          15KG(one piece only)/Adult</span>
      </div>
    </div>
  </div>
  </>
  )
}

let Baggage=()=>{
  return(
    <>
    <p className="my-5">
      <img src={travelbag} alt="travelbag" className="img-fluid me-2"  style={{width:"20px"}}/>
      Got excess baggage?Don't stress,buy extra check-in baggage allowance for DEL-BOM at fab rates!</p>
      <div className="container text-end">
      <button className="btn text-danger fw-bold">
        Add baggage
      </button>
      </div>
    </>
  )
}

let FairSummary=()=>{
  return(
    <>
    <h1>Test</h1>
    </>
  )
}