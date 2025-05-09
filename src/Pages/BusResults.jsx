

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import SearchHeader from "../components/BusBooking/SearchHeader";
import { lazy, Suspense, useEffect, useState } from "react";
import BusFilters from "../components/BusBooking/BusFilters";
import { BusInfo } from "../components/BusBooking/BusInfo";
import BoardingDroppingSelection from "../components/BusBooking/BoardingDroppingSelection";
import SeatSelection from "../components/BusBooking/SeatSelection";
import { ReviewBooking } from "../components/BusBooking/ReviewBooking";
// import { PaymentOptions, PaymentTimeout } from "./FlightPaymentOption";
const PaymentOptions=lazy(()=>import("./FlightPaymentOption").then((module)=>({default:module.PaymentOptions})));
const PaymentTimeout=lazy(()=>import("./FlightPaymentOption").then((module)=>({default:module.PaymentTimeout})))


const navigationEntry = (performance.getEntriesByType("navigation")[0].type||"")==='reload'; 
const BusResults = () => {
  const [busDetails, setBusDetails] = useState([]);
  const [filterData, setFilterData] = useState({});
  
  const [paymentSessionTrack,setSessionTrack]=useState(true);
  const [resultData, setResultData] = useState(null);
  const [navi, setNavi] = useState(() => {
    const stored = sessionStorage.getItem("naviindex:");
    return stored ? JSON.parse(stored) : 1;
  });

  useEffect(() => {
    
    console.log("Navigation Type:", performance.getEntriesByType("navigation")[0].type);

    if (!navigationEntry) {
      sessionStorage.removeItem("naviindex:");
    }
    const busDetails = JSON.parse(localStorage.getItem("bus_detail"));
    if (busDetails) {
      setBusDetails(busDetails);
    }

    let handleFilterUpdate=()=>{
      if (localStorage.getItem("Filterdata:")) {
        setFilterData(JSON.parse(localStorage.getItem("Filterdata:")));
      }
    }
   

 

    let handleNavigate = () => {
      sessionStorage.removeItem("naviindex:");
    };

    let handleResultDataUpdate=()=>{
      const data = JSON.parse(sessionStorage.getItem("resultdata:"));
      if (data) {
        setResultData(data);
      } else {
        alert("No data Present Now");
      }
    }
  
    window.addEventListener('filterdataupdated',handleFilterUpdate)
    window.addEventListener('resultdataupdated',handleResultDataUpdate)
    window.addEventListener("popstate", handleNavigate);
   return ()=>{setNavi("");sessionStorage.removeItem("naviindex:")}
  }, []);

  useEffect(() => {
    sessionStorage.setItem("naviindex:", JSON.stringify(navi));
  }, [navi]);
  const renderBusComponent = () => { 
    switch (navi) {
      case 1: {
        return <BusFilters setNavi={setNavi} />;
      }
      case 2: {
        return <BusInfo filterData={filterData} setNavi={setNavi} />;
      }
      case 3: {
        return  <BoardingDroppingSelection resultData={resultData} setNavi={setNavi}/>
      }
      case 4: {
        return  <SeatSelection setNavi={setNavi}/>
      }
      case 5: {
        return  <ReviewBooking setNavi={setNavi}/>
      }
      case 6: {
        return  <div className="my-5">
               <Suspense fallback={
                <div className="container text-center">
                <div className="spinner-grow text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-primary" role="status">
                   <span className="visually-hidden">Loading...</span>
                </div>
                <p className="fs-5">Loading</p>
                </div>
               }>
               {paymentSessionTrack?(<PaymentOptions mode="Bus" setSessionTrack={setSessionTrack}/>):
               (<PaymentTimeout/>)}
               </Suspense>
        </div>
      }
    }
  };
  return (
    <>
      <Navbar />
      {busDetails.length > 0 && (
        <SearchHeader
          from={busDetails[0]?.from}
          to={busDetails[0]?.to}
          date={busDetails[0]?.date}
        />
      )}
      {renderBusComponent()}
      <Footer />
    </>
  );
};

export default BusResults;
