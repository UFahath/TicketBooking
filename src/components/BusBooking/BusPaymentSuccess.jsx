import { Navbar } from "../Navbar";
import Footer from "../Footer";
 import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import { BoardingDropping } from "./ReviewBooking";
import { Phone,Wifi,Milk,Book,PlugZap} from "lucide-react";
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
  const iconArray=[Wifi,Milk,Book,PlugZap]
 
  useEffect(()=>{

    sessionStorage.setItem("Id:",JSON.stringify(uId))
   

    return ()=>{
      sessionStorage.removeItem("Id:")
    }
  },[])

 

  return (
    <>
    <style jsx="true">
{`
  .OuterBox {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-bottom: 30px;
  }

  @media (max-width: 568px) {
    .OuterBox {
      width: 95%;
    }
    .innerContainer {
      margin-left: 0;
    }
  }
`}
</style>

    <Navbar/>
  <div className="OuterBox">

  <div className="row justify-content-between align-items-center border border-dark p-3 mb-4 rounded-4 bg-info">
    <div className="col-12 col-md-auto text-center text-md-start">
      <span className="fs-4 fw-bold text-warning me-2">Booking ID:</span>
      <span className="fs-4 text-white">{uId}</span>
    </div>
    <div className="col-12 col-md-auto text-center my-2 my-md-0">
      <button className="btn btn-danger">Download Invoice</button>
    </div>
  </div>


  <div className="row border border-dark p-3 mb-4 rounded-4">
    <div className="col-12 col-sm-6">
      <p className="fs-5 fw-semibold text-primary mb-1">{resultData.operator}</p>
    </div>
    <div className="col-12 col-sm-6">
      <p className="fs-6 text-secondary mb-1">{resultData.busType}</p>
    </div>
    <hr />
    

    <div className="innerContainer">
      <BoardingDropping
        result={resultData}
        travelDay={boardingDroppingProps.travelDay}
        nextDay={boardingDroppingProps.nextDay}
        selectedBoarding={selectedBoarding}
        selectedDropping={selectedDropping}
      />
    </div>
    <hr />

 
    <div className="row mt-3">
      <div className="col">
        <p className="fw-semibold text-capitalize">{person.name}</p>
        <p className="text-secondary">{`${person.gender}, ${person.age} yr`}</p>
      </div>
      <div className="col">
        <p className="fw-semibold">Seat No:
          <span className="text-success ms-2">
            {
              seats && seats.length > 0 &&
              seats.map((seat, index, arr) =>
                index !== arr.length - 1 ? seat + ", " : seat
              )
            }
          </span>
        </p>
        <p className="text-secondary">
          {resultData.busType?.substring(resultData.busType.indexOf(" ")) || ""}
        </p>
      </div>
    </div>
  </div>

  
  <div className="text-center my-4">
    <button className="btn btn-outline-danger d-flex align-items-center mx-auto">
      <Phone className="me-2" />
      <a className="nav-link d-inline p-0" href="tel:1234567890">+91 7234567890</a>
    </button>
  </div>


  <div className="row border border-dark p-3 my-5 rounded-top-4">
    <h4 className="text-center mb-3 fs-3 fw-bold text-primary">Amenities</h4>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 text-center" >
      {
        resultData && Array.isArray(resultData.amenities) &&
        resultData.amenities.map((facil, index) => (
          <div className="col border border-secondary p-2 rounded-start rounded-end" style={{boxShadow:"10px 2px 10px black"}} key={index}>
            <span className="fw-semibold">{facil}</span><br />
            <span className="text-muted">{iconArray[index]&&React.createElement(iconArray[index])}</span>
          </div>
        ))
      }
    </div>
  </div>

 
  <div className="row text-center my-4">
    <div className="table-responsive col-12 col-sm-8 mx-auto">
      <table className="table table-bordered">
        <thead className="table-primary">
          <tr>
            <th colSpan={2}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paid Online</td>
            <td>${resultData.fare}</td>
          </tr>
          <tr>
            <td>UPI</td>
            <td>$0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    
    <Footer/>
    </>
  )
}

export default BusPaymentSuccess;