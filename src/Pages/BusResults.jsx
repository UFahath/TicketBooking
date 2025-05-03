import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import SearchHeader from "../components/BusBooking/SearchHeader"
import { useEffect,useRef,useState } from "react"
import BusFilters from "../components/BusBooking/BusFilters"
import { BusInfo } from "../components/BusBooking/BusInfo"
import BoardingDroppingSelection from "../components/BusBooking/BoardingDroppingSelection"

const BusResults = () => {
  const[busDetails,setBusDetails]=useState([])
  const[filterData,setFilterData]=useState({});
  let isLoad=useRef(false);
  const[resultData,setResultData]=useState(null);
  const[navi,setNavi]=useState(()=>{
    const stored=sessionStorage.getItem("naviindex:");
    return stored?JSON.parse(stored):1;
  });
  useEffect(()=>{
  
    const navigationEntry=performance.getEntriesByType("navigation")[0].type
    if(navigationEntry==='reload')
    {
     isLoad.current=true;
    }
     const busDetails=JSON.parse(localStorage.getItem("bus_detail"))
     if(busDetails)
     {
      setBusDetails(busDetails)
     }
     if(localStorage.getItem("Filterdata:"))
     {
      setFilterData(JSON.parse(localStorage.getItem("Filterdata:")))
     }
   

     let handleUnload=()=>{
      if(!isLoad.current)
      {
       sessionStorage.removeItem("naviindex:")
      }
      }

      let handleNavigate=()=>{
        sessionStorage.removeItem("naviindex:")
      }

     const data = JSON.parse(sessionStorage.getItem("resultdata:"));
if (data) {
  setResultData(data);
}

     window.addEventListener("beforeunload", handleUnload)
     window.addEventListener('popstate',handleNavigate)
      
  },[])


  
useEffect(()=>{
       sessionStorage.setItem("naviindex:",JSON.stringify(navi))
},[navi])
  const renderBusComponent=()=>{
    switch(navi){
      case 1:{
        return (<BusFilters setNavi={setNavi}/>)
      }
      case 2:{
        return (<BusInfo filterData={filterData} setNavi={setNavi}/>)
      }
      case 3:{
        return (<BoardingDroppingSelection resultData={resultData}/>)
      }
    }
  }
  return (
    <>
    <Navbar/>
      {
        busDetails.length>0&&
        <SearchHeader from={busDetails[0]?.from} to={busDetails[0]?.to} date={busDetails[0]?.date}/>
      }
      {
        renderBusComponent()
      }
    <Footer/>
    </>
  )
}

export default BusResults