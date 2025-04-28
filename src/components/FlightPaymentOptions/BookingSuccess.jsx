import Footer from "../Footer"
import { Navbar } from "../Navbar"
import tickmark from '../../assets/images/tickmark.png'
import {useMemo ,useEffect, useState} from "react"
import {v4 as uuidv4} from "uuid"
import flighttail from '../../assets/images/flighttail.png'
const BookingSuccess = () => {
   let[flightDetails,setFlightDetails]=useState("");
   let[date,setDate]=useState('')
   let[source,setSource]=useState("")
   let[destination,setDestination]=useState("")
   let[passengersDetails,setPassengerDetails]=useState([]);
 
  let uniqNumber=useMemo(()=>{
    let savedRef=localStorage.getItem("Reference Number:");
    if(!savedRef)
    {
      let uniqId=uuidv4().toUpperCase().substring(0,uuidv4().indexOf("-"))
      localStorage.setItem("Reference Number:",uniqId)
      return uniqId;
    }
    else{
       return savedRef
    }
  },[])

  useEffect(()=>{
    let retrievedDate=new Date(flightDetails.date).toDateString();
    let parts=retrievedDate.split(' ');
    let formatedDate=`${parts[0]},${parts[1]}${parts[2]},${parts[3]}`
    setDate(formatedDate)
    let formatedSource=flightDetails.source;
    let formatedDestination=flightDetails.destination;
    if(formatedSource)
    {
      formatedSource=formatedSource.substring(0,formatedSource.indexOf(","))
    }
    setSource(formatedSource)

    if(formatedDestination)
    {
      formatedDestination=formatedDestination.substring(0,formatedDestination.indexOf(","))
    }
    setDestination(formatedDestination)
  },[flightDetails])

  useEffect(()=>{
       let dataForFinalPage=localStorage.getItem("DataForFinalPage:");
       let passengers=localStorage.getItem("travellersDetails");
       if(dataForFinalPage)
       {
         setFlightDetails(JSON.parse(dataForFinalPage));
       }
       if(passengers)
       {
        setPassengerDetails(JSON.parse(passengers))
       }
       return ()=>{localStorage.removeItem("Reference Number:")}
  },[])

  let categoryCount=useMemo(()=>{
    let filtered=passengersDetails.reduce((accu,current)=>{
          if(accu[current.type])
          {
            accu[current.type]+=1;
          }
          else
          {
            accu[current.type]=1;
          }
          return accu;
    },{})
      return filtered;
  },[passengersDetails])


 
  return (
    <>
    <Navbar/>
    <div className="container" style={{fontFamily:"Nunito Sans"}}>
      <header className="my-4 text-center d-flex justify-content-center align-items-center">
        <img src={tickmark} alt="tickmark" style={{width:"30px",height:"30px"}}/>
        <h2 className="text-danger ms-2">Booking Confirmed</h2>
      </header>
      <main>
      <p className="fs-5 fw-bold">Reference Number : {uniqNumber}</p>
      <div className="row rounded-3 p-3 text-center text-md-start text-semibold my-5" style={{background:"#FB0F1352"}}>
      <h5 style={{fontWeight:"700"}}>Departing Flight</h5>
      {/* First column */}
      <div className="col-sm-3 d-md-none"></div>
       <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 my-3">
        {/* First row in the first column */}
        <div className="row border border-dark text-center">
          <div className="col-2 d-md-none"></div>
          <div className="col-4">
          <img src={flighttail} alt="flighttail" style={{width:"70px",height:"53px"}} />
          </div>
          <div className="col-4 fs-4">
            <p className="text-start">{flightDetails.airline}</p>
            <p className="text-start">6E673</p>
          </div>
          <div className="col-2 d-md-none"></div>
        </div>
            {/* Second row in the first column */}
        <div className="row my-4 fs-5">
          <span>NonStop | Coach</span>
        </div>
       </div>
       <div className="col-sm-2 col-md-1"></div>

       {/* Second Column */}
       <div className="col-md-5 col-lg-6 col-xl-4 my-3 border border-dark text-md-center">
        <p className="mb-4 fs-5 fw-semibold">{date}</p>
        <div className="row border border-dark text-center mb-4 fs-5">
          <span>{source}</span>
          <span className="fw-semibold">Dummy4 - {flightDetails.departure_time}</span>
        </div>
        <div className="row border border-dark text-center mb-4 fs-5">
          <span>{destination}</span>
          <span className="fw-semibold">Dummy4 - {flightDetails.arrival_time}</span>
        </div>
       </div>
       <div className="col-md-3 col-xl-1"></div>
       <div className="col-md-6 col-xl-3 my-3 border border-dark fs-5">
        <p>Travel Time:</p>
        <p className="fw-semibold">{flightDetails.travel_duration}</p>
        <div className="row bg-white w-75 rounded-3 mx-auto">
          <p>Seats Selected</p>
          <p className="text-primary" style={{textShadow:"0 4px 7px rgba(0, 0, 0, 0.44)"}}>Airport Check In</p>
        </div>
       </div>
       <div className="col-md-3"></div>
      </div>


      {/* passengersDetails */}

      <div className="row  table-responsive">
        <h3 className="text-danger">Passengers Details</h3>
        <table className="border border-dark my-5 text-center rounded-4 fs-5" style={{borderSpacing:"0 10px",borderCollapse:"separate",textWrap:"nowrap",boxShadow:"0px 9px 5px black"}}>
        <tbody >
        {passengersDetails.map((person,index)=>(
            
              <tr key={index}>
                <th className="border border-dark bg-primary text-white rounded-3">
              <span>Passenger {index+1}  :</span>
                </th>
                <td>
              <span className="mx-2">{person.firstName+" "+person.lastName}</span>
              </td>
              <td>
              <span className="mx-2">{person.gender}</span>
              </td>
              </tr>
        ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Travellers :</th>
              <td>
               {categoryCount.adults&&<p className="mx-2 text-danger"> {categoryCount.adults} Adults</p>}
               {categoryCount.children&&<p className="mx-2 text-danger">{categoryCount.children} Childrens</p>}
               {categoryCount.infants&&<p className="mx-2 text-danger">{categoryCount.infants} Infants</p>}
              </td>
              </tr>
              <tr>
                <th>Contact Number:</th>
                <td>
                <span>{passengersDetails.length>0&&passengersDetails[0]&&passengersDetails[0].countryCode+" "+passengersDetails[0].mobile}</span>
                </td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>
                  <span>{passengersDetails.length>0&&passengersDetails[0]&&passengersDetails[0].email}</span>
                </td>
              </tr>
          </tfoot>
        </table>
      </div>
      </main>
    </div>
    <Footer/>
    </>
  )
}

export default BookingSuccess