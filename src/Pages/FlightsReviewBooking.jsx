import { useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { useEffect ,useRef,useState} from "react"

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
      <BookingDetailsReview state={state}/>
    </div>
    <Footer/>
    </>
  )
}


let BookingDetailsReview=({state})=>{
  let head=useRef();
  useEffect(()=>{

    let handleSizing=()=>{
      if(window.matchMedia("(min-Width:320px) and (max-width:768px)").matches)
        {
          head.current.setAttribute('class',"");
        }
        else
        {
          head.current.setAttribute('class',"fs-5");
          console.log("not yet reached")
        }
    }
    window.addEventListener('resize',handleSizing);
  })
  return(
    <>
    <div className="container">
      <header ref={head} className="fs-5">
      <span className="fw-bold me-4">{state.source}</span>
      <span className="me-4">🡢</span>
      <span className="fw-bold">{state.destination}</span>
      </header>
    </div>
    </>
  )
}