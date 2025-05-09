import { Navbar } from "../Navbar";
import Footer from "../Footer";
 import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { BoardingDropping } from "./ReviewBooking";
import { Phone } from "lucide-react";
export const BusPaymentSuccess = () => {
  const [uId]=useState(()=>{
    let uniqId=uuid().substring(0,uuid().indexOf("-")).toUpperCase();
    let stored= sessionStorage.getItem("Id:");
    return stored?JSON.parse(stored):uniqId;
  });

  const [resultData]=useState(()=>{
    const stored=sessionStorage.getItem("resultdata:");
    return stored?JSON.parse(stored)[0]:[];
  })

  const [boardingDroppingProps]=useState(()=>{
    const stored=sessionStorage.getItem("boardingDroppingProps");
    return stored?JSON.parse(stored):{};
  })

  const [selectedBoarding]=useState(()=>{
    const stored=sessionStorage.getItem("selectedBoarding");
    return stored?JSON.parse(stored):{};
  })

  const [selectedDropping]=useState(()=>{
    const stored=sessionStorage.getItem("selectedDropping");
    return stored?JSON.parse(stored):{};
  })

  const [person]=useState(()=>{
     const stored=sessionStorage.getItem("traveller");
     return stored?JSON.parse(stored):{}
  })

  const [seats]=useState(()=>{
    const stored=sessionStorage.getItem("seats:");
    return stored?JSON.parse(stored):[];
  })
 
  useEffect(()=>{

    sessionStorage.setItem("Id:",JSON.stringify(uId))

    return ()=>{
      sessionStorage.removeItem("Id:")
    }
  },[])

  return (
    <>
    <Navbar/>
    <div className="container-fluid container-sm p-5">
      <div className="row gap-4">
        <div className="col-12 col-md-auto border border-dark d-flex justify-content-center flex-wrap my-2">
      <span className=" fs-2 fw-bold  border border-dark my-2 me-2">Booking ID:</span>
      <span className="fs-2 border border-dark my-2">{uId}</span>
      </div>
      <div className="col-12 col-md-auto border border-dark my-auto">
      <button className="btn btn-danger ms-2">Download Invoice</button>
      </div>
      </div>

      <div className="row border border-dark my-4">
        <div className="row row-cols-1">
          <div className="col-12 col-sm-6 border border-dark">
          <p>{resultData.operator}</p>
          </div>
          <div className="col-12 col-sm-6">
          <p>{resultData.busType}</p>
          </div>
          <hr style={{width:"100%",marginLeft:"12px"}}/>
        </div>
        <div className="row ms-2">
        <BoardingDropping result={resultData} travelDay={boardingDroppingProps.travelDay} nextDay={boardingDroppingProps.nextDay} selectedBoarding={selectedBoarding} selectedDropping={selectedDropping}/>
        </div>
        <div className="row">
        <hr style={{width:"100%",marginLeft:"12px"}}/>
          <div className="col">
            <p>{person.name}</p>
            <p>{person.gender.concat(",",person.age," yr")}</p>
          </div>
          <div className="col">
            <p>Seat No:{
              seats&&seats.length>0&&seats.map((seat,index,arr)=>{
                return index!==arr.length-1?seat+",":seat;
              })
              }</p>
            <p>{resultData.busType.substring(resultData.busType.indexOf(" "))}</p>
          </div>
        </div>
      </div>

      
      <button className="btn btn-danger d-flex justify-content-evenly">
        <Phone className="me-2"/>
        <a className="nav-link" href="tel:1234567890">+91 7234567890</a>
        </button>
    </div>

    
    <Footer/>
    </>
  )
}

export default BusPaymentSuccess;