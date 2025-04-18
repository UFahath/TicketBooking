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
//  let{source,destination,airline,departure_time,arrival_time,travel_duration,date}=state;
 let[discount,setDiscount]=useState(0);
 let [priceTotal,setPriceTotal]=useState(0);
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

// let newDate=new Date(date)
//  console.log(state)
// //  console.log("from:",source)
// //  console.log("to:",destination)
// //  console.log("airlinename:",airline)
// //  console.log("departure_time:",departure_time)
// //  console.log("arrivaltime:",arrival_time);
// //  console.log("travelduration:",travel_duration)
//  console.log("date:",dateFormatter(newDate.toDateString()))
//  console.log(classSelected.classSelected)
  return (
    <>
    <Navbar/>
    <h2 className="text-warning my-4" style={{marginLeft:"10%"}}>Review Your Booking</h2>
    <div className="container d-flex justify-content-between flex-wrap">
    
      <BookingDetailsReview state={state} dateFormatter={dateFormatter} classSelected={classSelected}/>
      <div className=" col-12 col-xl-10 col-xxl-3 d-flex flex-column">
      <FairSummary price={state.price} discount={discount} priceTotal={priceTotal} setPriceTotal={setPriceTotal}/>
      <ApplyPromoCode setDiscount={setDiscount} setPriceTotal={setPriceTotal}/>
      </div>

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
      <header ref={head} className="fs-5 rounded-4 p-3 bg-warning bg-opacity-75" style={{maxWidth:"900px",boxShadow:"7px 5px 3px  rgba(41, 37, 37, 0.5)",outline:"4px solid white",height:"fit-content"}}>
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
    <div className="row row-cols-1 row-cols-md-2" style={{fontSize:"1rem"}}>
      <div className="col">
        <span>
          <img src={travelbag} alt="travelbag" className="img-fluid" style={{width:"20px"}}/>
          <b className="ms-2">Cabin baggage:</b> 7KG(onepiece only)/Adult</span>
          </div>
          <div className="col">
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

let FairSummary=({price,discount,priceTotal,setPriceTotal})=>{

  

  let fairSummary=useRef(null);
  let fare=[{text:"Base Fare",prices:price},
    {text:"Taxes&SubCharge",prices:130},
    {text:"Discount",prices:discount}
]

useEffect(()=>{
  if(window.innerWidth<1400)
  {
    fairSummary.current.classList.add("mt-5")
  }
  let insertMarginTop=()=>{
    if(window.matchMedia("(min-Width:320px) and (max-Width:1400px)").matches)
    {
      fairSummary.current.classList.add("mt-5")
    }
    else
    {
      fairSummary.current.classList.remove("mt-5")
    }
  }
  window.addEventListener('resize',insertMarginTop)
  let total=fare.reduce((accu,current,index,arr)=>{
    if(index!==arr.length-1)
    {
        accu+=current.prices;
    }
    return accu;
},0);
  setPriceTotal(total-discount)

},[])

 

  
  return(
    <>
    <div ref={fairSummary} className="container border border-dark fs-5 p-4 rounded-4 bg-warning bg-opacity-75 text-center" style={{height:"fit-content"}}>
      <h2>Fair Summary</h2>
      {
        fare.map((item,index,arr)=>(
          <div key={index}>
      <div className="d-flex justify-content-between">
      <span className="text-wrap" style={{maxWidth:"60%"}}>{item.text}</span>
      <span>{index===arr.length-1?"-"+String.fromCharCode(8377):String.fromCharCode(8377)}{item.prices}</span>
      </div>
       {index!==1&&(<hr />)}
      </div>
       ))
      } 



      <div className="d-flex justify-content-between">
      
      <span className="text-wrap fw-bold" style={{maxWidth:"60%"}}>Total</span>
 
   
      <span>{String.fromCharCode(8377)}{priceTotal}</span>
     
    </div>
    </div>

    </>
  )
}

let ApplyPromoCode=({setDiscount,setPriceTotal})=>{
  let [promoCodeValue,setPromoCode]=useState("");
  let [newDiscount,setNewDiscount]=useState(0);
  let [appliedOffer,setAppliedOffer]=useState([]);
  useEffect(()=>{
    setDiscount((prev)=>prev+=newDiscount)
    setPriceTotal((prev)=>prev-=newDiscount)
  },[newDiscount,setDiscount,setPriceTotal])

  // useEffect(()=>{
  //   console.log(appliedOffer)
  // },[appliedOffer])

  function handleApply(promocode)
  {

    let availablePromoCode={
      ASFARE:100,
      BSFARE:200,
      CSFARE:300,
      DSFARE:400,
      ESFARE:500,
    }
  
      let offerValidate=appliedOffer.some((item)=>item==promocode)
      // console.log(offerValidate)
       if(!promocode)
       {
        alert("Nothing Entered")
        return;
       }
       if(!(promocode in availablePromoCode))
       {
        alert("There is no Such Offer Exist")
        return;
       }
       if(offerValidate)
       {
         alert("Offer is Applied Already")
         return;
       }
       setNewDiscount(availablePromoCode[promocode])
       setAppliedOffer([...appliedOffer,`${promocode}`])
      setPromoCode("")
  }
  return (
    <>
    <form onSubmit={(event)=>{event.preventDefault();handleApply(promoCodeValue)}}>
    <div className="card my-5">
      <div className="card-header bg-warning bg-gradient bg-opacity-75">
        <span>Apply Promo Code</span>
      </div>
      <div className="card-body">
        <input type="text" value={promoCodeValue} className="form-control" onChange={(event)=>setPromoCode(event.target.value)}placeholder="Enter Promo Code"
        pattern="[A-Z]{6}"/>
      </div>
      <div className="card-footer text-center bg-success bg-opacity-50">
        <button className="btn btn-danger" type="submit">Apply</button>
      </div>
    </div>
    </form>
    <div className="card">
      <div className="card-header bg-warning bg-gradient bg-opacity-75">
        <span>Demo Offer Code</span>
      </div>
      <div className="card-body text-center">
        <p>ASFARE-100</p>
        <p>BSFARE-200</p>
        <p>CSFARE-300</p>
        <p>DSFARE-400</p>
        <p>ESFARE-500</p>
      </div>
    </div>
    </>
  )
}