import { Navbar } from "../components/Navbar"
import Footer from "../components/Footer"
import SearchHeader from "../components/BusBooking/SearchHeader"
import { useEffect,useRef,useState } from "react"
import BusFilters from "../components/BusBooking/BusFilters"
import { BusInfo } from "../components/BusBooking/BusInfo"

const BusResults = () => {
  const[busDetails,setBusDetails]=useState([])
  const[filterData,setFilterData]=useState({});
  const isLoad=useRef(false);
 
  const[navi,setNavi]=useState(()=>{
    const stored=sessionStorage.getItem("naviindex:");
    return stored?JSON.parse(stored):1;
  });
  useEffect(()=>{
    let controller=new AbortController();
    let signal=controller.signal;
    const navigationEntry=performance.getEntriesByType("navigation")[0].type
    if(navigationEntry==='reload')
    {
      console.log("iam reloading")
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
       console.log("iam navigating")
       sessionStorage.removeItem("naviindex:")
      }
      }

      let handleNavigate=()=>{
        sessionStorage.removeItem("naviindex:")
      }
     window.addEventListener("beforeunload", handleUnload,{signal})
     window.addEventListener('popstate',handleNavigate,{signal})
      return ()=>{controller.abort()}
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
        return (<BusInfo filterData={filterData}/>)
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